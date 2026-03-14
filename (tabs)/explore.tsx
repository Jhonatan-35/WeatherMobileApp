import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

export default function WorldWeather() {

const [weatherData, setWeatherData] = useState<any[]>([]);  // The city's that display in card the beust city in the world

const cities = [
  "Salt Lake City",
  "London",
  "Rio de Janeiro",
  "Paris",
  "Bogota",
  "Buenos Aires",
  "Madrid",
  "Hong Kong",
  "Barranquilla"
];

useEffect(() => {
  fetchWeather();
}, []);

const fetchWeather = async () => {
  const results = [];

  for (let city of cities) {
    const response = await fetch(  //The url for connect Api for the diaplay differentes weathers in the citys in the world 
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6d261f420af0dc30c56e5e3673b74996&units=metric`
    );

    const data = await response.json();
    results.push(data);
  }

  setWeatherData(results);
};

return (
  <ScrollView contentContainerStyle={styles.container}>
   {weatherData.map((cityWeather, index) => {

  if (!cityWeather?.main) return null;

  return (
    <View key={index} style={styles.card}>

      <Text style={styles.city}>
        {cityWeather?.name}, {cityWeather?.sys?.country}
      </Text>

      <Image
        style={styles.icon}
        source={{
          uri:`https://openweathermap.org/img/wn/${cityWeather?.weather?.[0]?.icon}@2x.png`
        }}
      />

      <Text style={styles.temp}>
        {cityWeather?.main?.temp} °C
      </Text>

      <Text style={styles.desc}>
        {cityWeather?.weather?.[0]?.description}
      </Text>

    </View>
  );
})}
  </ScrollView>
);
}
// The  style that design for  Pages for carads for differerents weather of the world
const styles = StyleSheet.create({
container:{
flexDirection:"row",
flexWrap:"wrap",
justifyContent:"center",
padding:20
},

card:{
backgroundColor:"white",
padding:20,
borderRadius:15,
marginBottom:15,
alignItems:"center",
shadowColor:"#000",
shadowOpacity:0.2,
shadowRadius:8,
elevation:5,
width:"30%",
margin:10
},

city:{
fontSize:20,
fontWeight:"bold"
},

temp:{
fontSize:30,
marginTop:5
},

desc:{
fontSize:16
},

icon:{
width:80,
height:80
}
});