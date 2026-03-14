
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'; // This the  Importantion fo definitions

export default function App() {

  const [city, setCity] = useState("");         //Well, this section contains all the constants needed to define each of the variables
  const [weather, setWeather] = useState<any>(null);

  const getWeather = () => {       // This part contains the variable needed to connect to the Weather app's API and access the weather data required for the application.
    setWeather(null);
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6d261f420af0dc30c56e5e3673b74996&units=metric`)
    .then(response => response.json())
    .then(data => {
      setWeather(data);
    })
    .catch(error => {
      console.log(error);
    });
};

const getWeatherImage = ()=>{ // This part contains the condotions  for make display images acoording the weather 
  if (!weather || !weather.weather || !weather.weather[0]){
    return require('@/assets/images/clouds.webp');
    }

  const condition =  weather.weather[0].main;

  if(condition === "Clear") {
    return require('@/assets/images/clear.webp');
  }
  if(condition === "Clouds") {
    return require('@/assets/images/clouds.webp');
  }
  if(condition === "Rain") {
    return require('@/assets/images/rain.webp');
  }
  if(condition === "Snow") {
    return require('@/assets/images/snow-images.webp');
  }

  return require ('@/assets/images/clouds.webp')

};
const getBackgroundColor = () => {  //This part contaings the condition for change color  according display the weather that search  the user's
  if (!weather) return "#87CEEB";

  const condition = weather.weather[0].main;

  if (condition === "Clear") return "#c5b34d";
  if (condition === "Clouds") return "#B0C4DE";
  if (condition === "Rain") return "#778899";
  if (condition === "Snow") return "#E0FFFF";

  return "#87CEEB";
};
const formatTime = (timestamp:number) => { // This part contains for use  display the timestamp for convert
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString();
};
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#000', dark: '#000' }}
      headerImage={
        <Image
          source={getWeatherImage()}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to your country's weather finder app</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={[styles.container,{backgroundColor:getBackgroundColor()}]}>
        
        
        <TextInput
  placeholder="Write  your city"
  value={city}
  onChangeText={setCity}
  style ={{
    borderWidth: 1,
    padding:10,
    margin:10,
    width:250,
    fontSize:20,
    borderRadius:'30px',
    textAlign:"center",
    }}
/>
<TouchableOpacity style={styles.searchButton} onPress ={getWeather}>
 <ThemedText style ={styles.buttonText}>
   Search Weather
 </ThemedText>
  </TouchableOpacity>

{weather && (  //This part conatains all tag for display and discriptions for  weather  ans dates 
   <>
   
  <ThemedView style ={styles.weatherCard}> 
  <View style={styles.row}>
  <ThemedText style={{ fontSize: 35 ,color:"black"}}>
  {weather?.main?.temp} °C
 </ThemedText>
 </View>
<Image
  style={{ width: 100, height: 100 }}
  source={{
    uri: `https://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png` // The Url for connect  icon according the weather
  }}
/>
  <View style={styles.row}> 
  <ThemedText style ={{fontSize: 17,color:"black"}}>                            
  City: {weather?.name}
  </ThemedText>
  </View>
   
   <View style={styles.row}>
  <ThemedText style={{fontSize:17,color:"black"}}>
  Country: {weather?.sys?.country}
  </ThemedText>
  </View>

 <View style={styles.row}>
  <ThemedText style ={{fontSize: 17,color:"black"}}>
  Weather: {weather?.weather?.[0]?.description}
  </ThemedText>
  </View>

  <View style={styles.row}>
  <ThemedText style= {{fontSize:17,color:"black"}}>
  Wind: {weather?.wind?.speed} m/s
  </ThemedText>
  </View>

<View style={styles.row}>
<ThemedText style ={{fontSize:17,color:"black"}}>
  Feels like: {weather?.main?.feels_like}°C
</ThemedText>
</View>

<View style={styles.row}>
<ThemedText style= {{fontSize:17,color:"black"}}>
  Humidity: {weather?.main?.humidity} %
</ThemedText>
</View>

<View style={styles.row}>
<ThemedText style={{fontSize:17,color:"black"}}>
  Presure: {weather?.main?.pressure} hPa
</ThemedText>
</View> 

<View style={styles.row}>
<ThemedText style={{ color: "black" }}>
  Sunrise: {formatTime(weather?.sys?.sunrise)}
</ThemedText>
</View>

<View style={styles.row}>
<ThemedText style={{ color: "black" }}>
  Sunset: {formatTime(weather?.sys?.sunset)}
</ThemedText>
</View>
</ThemedView>
</>

)}

        <ThemedText>
           <ThemedText type="defaultSemiBold"></ThemedText> 
          {' '}
          <ThemedText type="defaultSemiBold">
            
            
          </ThemedText>{' '}
         
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert('Delete pressed')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>
         
        </ThemedText>
      </ThemedView>
     
         
    </ParallaxScrollView>
  );
}
// This part Contains all tags for use design the  app ex:colo,background
const styles = StyleSheet.create({

   searchButton :{
    backgroundColor:"#007AFF",
    paddingVertical:15,
    paddingHorizontal:40,
    borderRadius: 10,
    marginTop:10,

   },
  buttonText:{
  color:"white",
  fontSize:18,
  fontWeight:"bold",
  textAlign:"center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    textAlign:'center',
    marginLeft:'20%',
  },
  stepContainer: {
    gap: 7,
    marginBottom: 8,
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    resizeMode:'cover',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  weatherCard: {
    backgroundColor:"rgba(255,255,255,0.85)",
    padding: 20,
    borderRadius:15,
    alignItems:"center",
    marginTop:20,
    shadowColor:"#000",
    shadowOpacity:0.2,
    shadowRadius:10,
    elevation: 4,
    width:'90%',
    maxWidth:400,
    alignSelf: "center",
  },
row: {
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
  marginTop: 6,
},

label: {
  color: "black",
  fontWeight: "bold",
},

value: {
  color: "black",
},

});
