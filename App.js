import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import NavigatorView from "./navigation/AppNavigator";
export default function App() {
  return (
    <NavigationContainer>
      <NavigatorView onNavigationStateChange={() => {}} uriPrefix="/app" />
    </NavigationContainer>
  );
}
