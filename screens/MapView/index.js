import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

import Pin from "../../assets/location.png";

const { width, height } = Dimensions.get("screen");

const ASPECT_RATIO = width / height;
const latitudeDelta = 0.12;
const longitudeDelta = latitudeDelta * ASPECT_RATIO;
const mapRef = React.createRef();

function MapViewContainer(props) {
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);

  const loadForecast = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setLocation(location);
  };

  useEffect(() => {
    if (props.route?.params) {
      setMapRegion({
        latitude: props.route.params.cityInfo.coord.lat,
        longitude: props.route.params.cityInfo.coord.lon,
        latitudeDelta,
        longitudeDelta,
      });
    }
    loadForecast();
  }, []);

  if (location === null) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  function pinToCurrentLocation() {
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta,
      longitudeDelta,
    });
    mapRef.current.animateToRegion(mapRegion, 500);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView ref={mapRef} style={{ flex: 1 }} initialRegion={mapRegion}>
        {mapRegion.latitude && mapRegion.longitude ? (
          <Marker
            pinColor="#3085d6"
            coordinate={{
              latitude: mapRegion.latitude,
              longitude: mapRegion.longitude,
            }}
          />
        ) : null}
      </MapView>
      <TouchableOpacity
        style={styles.pinLocationContainer}
        onPress={() => pinToCurrentLocation()}
      >
        <Image source={Pin} style={styles.pin} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  pinLocationContainer: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
    position: "absolute",
    right: 20,
    top: 20,
  },
  pin: { width: 30, height: 30, resizeMode: "contain" },
});

export default MapViewContainer;
