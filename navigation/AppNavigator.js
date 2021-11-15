import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WeatherListing from "../screens/WeatherListings";
import MapView from "../screens/MapView";

const Stack = createStackNavigator();

export default function NavigatorView() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"WeatherListing"}
        component={WeatherListing}
        options={{ headerTitle: "Weather Listings" }}
      />
      <Stack.Screen
        name={"MapView"}
        component={MapView}
        options={{ headerTitle: "Map View" }}
      />
    </Stack.Navigator>
  );
}
