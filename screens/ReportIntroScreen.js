import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "native-base";
import VirusImage from "../assets/images/virus-image-01.svg";
import commonColor from "../native-base-theme/variables/commonColor";

export default function ReportIntroScreen({ navigation }) {
  return (
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.introWrapper}>
        <VirusImage width={220} style={styles.image} />
        <Text style={styles.title}>No case reported</Text>
        <Text style={styles.subTitle}>
          None of your positions will be send to the internet until you report a case.
        </Text>
        <Button primary onPress={() => navigation.push("ReportStatus")}>
          <Text>Add Report</Text>
        </Button>
        <Button primary onPress={() => navigation.push("Selfcheck")}>
          <Text>Selfcheck</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: commonColor.containerDarkBgColor
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
  },
  introWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    marginTop: -20,
    marginBottom: 10
  },
  title: {
    fontSize: 30,
    marginBottom: 10
  },
  subTitle: {
    textAlign: "center",
    fontSize: 15,
    color: commonColor.textColorLight,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20
  }
});
