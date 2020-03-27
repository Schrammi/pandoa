import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { SplashScreen } from "expo";

import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as Permissions from "expo-permissions";
// Translations
// import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize"; // Use for caching/memoize for better performance
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";
import Store from "./configureStore";
import { addLocation } from "./actions";
import { StyleProvider } from "native-base";
import getTheme from "./native-base-theme/components";
import material from "./native-base-theme/variables/commonColor";
import { LOCATION_TRACKING } from "./constants/Tracking";

const Stack = createStackNavigator();

const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  de: () => require("./translations/de.json"),
  en: () => require("./translations/en.json")
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

const setI18nConfig = () => {
  // // fallback if no available language fits
  // const fallback = { languageTag: "en", isRTL: false };
  //
  // const { languageTag, isRTL } =
  // RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
  // fallback;
  //
  // // clear translation cache
  // translate.cache.clear();
  // // update layout direction
  // I18nManager.forceRTL(isRTL);
  // // set i18n-js config
  // i18n.translations = { [languageTag]: translationGetters[languageTag]() };
  // i18n.locale = languageTag;
};

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  
  setI18nConfig(); // set initial config
  
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();
        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());
        
        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }
    
    loadResourcesAndDataAsync();
  }, []);
  
  useEffect(() => {
    const config = async () => {
      let res = await Permissions.askAsync(Permissions.LOCATION);
      if (res.status !== "granted") {
        console.log("Permission to access location was denied");
      } else {
        console.log("Permission to access location granted");
      }
    };
    
    config();
  }, []);
  
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Provider store={Store().store}>
        <PersistGate loading={null} persistor={Store().persistor}>
          <StyleProvider style={getTheme(material)}>
            <View style={styles.container}>
              {/* Platform.OS === "ios" && <StatusBar barStyle="default" /> */}
  
              <NavigationContainer
                ref={containerRef}
                initialState={initialNavigationState}
              >
                <Stack.Navigator headerMode="none">
                  <Stack.Screen name="Root" component={BottomTabNavigator} />
                </Stack.Navigator>
              </NavigationContainer>
            </View>
          </StyleProvider>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    console.log("LOCATION_TRACKING task ERROR:", error);
    return;
  }
  if (data) {
    const { locations } = data;
    let lat = locations[0].coords.latitude;
    let lng = locations[0].coords.longitude;
  
    console.log(
      `Location: ${new Date(Date.now()).toISOString()}: ${lat},${lng}`
    );
  
    let result = await Location.reverseGeocodeAsync({
      latitude: lat,
      longitude: lng
    });
  
    Store().store.dispatch(
      addLocation({
        time: new Date(Date.now()).toISOString(),
        lat,
        lng,
        geocode: result
      })
    );
  }
});
