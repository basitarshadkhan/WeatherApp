import React from "react";
import { View, Text, Image } from "react-native";
import moment from "moment";

import WeatherIcon from "../assets/weather.png";

export default function WeatherCard(props) {
  return (
    <View
      style={{
        borderWidth: 1.2,
        borderColor: "#ddd",
        borderRadius: 10,
        padding: 15,
        height: 250,
        marginLeft: 10,
      }}
    >
      <Text style={{ marginTop: 10 }}>
        <Text style={{ fontWeight: "bold" }}>Temperature:</Text>
        {parseInt(props.item?.main.temp - 273.15, 10)}
      </Text>
      <Text style={{ marginTop: 10 }}>
        <Text style={{ fontWeight: "bold" }}>Feel like:</Text>{" "}
        {props.item?.main?.feels_like}
      </Text>
      <Text style={{ marginTop: 10 }}>
        <Text style={{ fontWeight: "bold" }}>Description:</Text>{" "}
        {props.item?.weather[0]?.description}
      </Text>
      <Text style={{ marginTop: 10 }}>
        <Text style={{ fontWeight: "bold" }}>Date:</Text>{" "}
        {moment(props.item.dt_txt).format("Do MM YYYY")}
      </Text>
      <Image
        source={WeatherIcon}
        style={{ width: 100, height: 100, resizeMode: "contain" }}
      />
    </View>
  );
}
