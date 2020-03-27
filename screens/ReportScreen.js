import * as React from "react";
import ReportIntroScreen from "./ReportIntroScreen";
import ReportDetailScreen from "./ReportDetailScreen";
import ReportCurrentStatusScreen from "./ReportCurrentStatusScreen";

import { createStackNavigator } from "@react-navigation/stack";
import SelfcheckScreen from "./SelfcheckScreen";

const Stack = createStackNavigator();

export default function ReportScreen() {
  return (
    <Stack.Navigator initialRouteName="ReportIntro">
      <Stack.Screen
        name="ReportIntro"
        component={ReportIntroScreen}
        options={{ title: "Report case" }}
      />
      <Stack.Screen
        name="ReportStatus"
        component={ReportCurrentStatusScreen}
        options={{ title: "Report Status" }}
      />
      <Stack.Screen
        name="Selfcheck"
        component={SelfcheckScreen}
        options={{ title: "Selfcheck" }}
      />
      <Stack.Screen
        name="ReportDetail"
        component={ReportDetailScreen}
        options={{ title: "Report details" }}
      />
    </Stack.Navigator>
  );
}
