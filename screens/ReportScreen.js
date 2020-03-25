import * as React from "react";
import ReportIntroScreen from "./ReportIntroScreen";
import ReportDetailScreen from "./ReportDetailScreen";
import ReportStatusScreen from "./ReportStatusScreen";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function LinksScreen() {
  return (
    <Stack.Navigator initialRouteName="ReportIntro">
      <Stack.Screen
        name="ReportIntro"
        component={ReportIntroScreen}
        options={{ title: "Report case" }}
      />
      <Stack.Screen
          name="ReportStatus"
          component={ReportStatusScreen}
          options={{ title: "Report Status" }}
      />
      <Stack.Screen
        name="ReportDetail"
        component={ReportDetailScreen}
        options={{ title: "Report details" }}
      />
    </Stack.Navigator>
  );
}
