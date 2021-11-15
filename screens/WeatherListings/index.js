import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  LogBox,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import moment from "moment";
// import Weather from "../Components/Weather";
import Search from "../../components/Search";
import WeatherCard from "../../components/WeatherCard";

const API_KEY = "2e9861164cf7a2110910759b9938e95a";
LogBox.ignoreAllLogs();
function CityWise(props) {
  const [weatherData, setWeatherData] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [cityInfo, setcityInfo] = useState(null);
  const [graphData, setGraphData] = useState([]);
  const [temperature, setTemperature] = useState([]);
  const [days, setDays] = useState([]);

  async function fetchWeatherData(cityName) {
    setLoaded(false);
    setGraphData([]);
    const API = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&&appid=${API_KEY}`;
    try {
      const response = await fetch(API);
      if (response.status == 200) {
        const data = await response.json();
        setcityInfo(data.city);
        setWeatherData(data);
        setGraphDataSet(data);
      } else {
        setWeatherData(null);
      }
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }

  renderWeatherCard = ({ item, index }) => {
    return <WeatherCard item={item} />;
  };

  useEffect(() => {
    fetchWeatherData("Islamabad");
  }, []);

  function setGraphDataSet(data) {
    let graphVal = [];
    let temperature = [];
    let days = [];
    if (data) {
      data?.list.map((val, index) => {
        if (index === 0 || index % 7 === 0) {
          graphVal.push(val);
          temperature.push(parseInt(val.main.temp - 273, 10));
          days.push(moment(val.dt_txt).format("dddd"));
        }
      });
      setDays(days);
      setTemperature(temperature);
      setGraphData(graphVal);
    }
  }

  if (!loaded) {
    return (
      <SafeAreaView style={styles.container}>
        <Search fetchWeatherData={fetchWeatherData} cityInfo={cityInfo} />
        <ActivityIndicator color="gray" size={36} />
      </SafeAreaView>
    );
  } else if (!weatherData?.list?.length) {
    return (
      <SafeAreaView style={styles.container}>
        <Search fetchWeatherData={fetchWeatherData} cityInfo={cityInfo} />
        <Text style={styles.primaryText}>
          City Not Found! Try Different City
        </Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Search fetchWeatherData={fetchWeatherData} cityInfo={cityInfo} />
      <FlatList
        style={{ flex: 1 }}
        data={graphData}
        renderItem={renderWeatherCard}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <LineChart
        data={{
          labels: days,
          datasets: [
            {
              data: temperature,
            },
          ],
        }}
        width={Dimensions.get("window").width - 20} // from react-native
        height={220}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          borderRadius: 16,
          marginBottom: 50,
          marginLeft: 10,
        }}
      />
      <TouchableOpacity
        style={styles.viewOnMapBtnContainer}
        onPress={() =>
          props.navigation.navigate("MapView", {
            cityInfo,
          })
        }
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>View City on map</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  primaryText: {
    margin: 20,
    fontSize: 28,
  },
  viewOnMapBtnContainer: {
    borderRadius: 10,
    backgroundColor: "#7c7c7c",
    alignSelf: "flex-end",
    marginRight: "5%",
    width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default CityWise;
