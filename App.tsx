import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, PermissionsAndroid, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import Geolocation from '@react-native-community/geolocation';

interface ComponentNameProps {}

const ComponentName: React.FC<ComponentNameProps> = ({}) => {
  const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const bingMapsApiKey = 'AvodEgHL-TuCN5eygkQM9U_9jXHQbvvV-T_o_TZX67lqHR-DJx1lRbhgSgJDMSe6'; // Replace with your actual API key

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to show the map.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the location');
        } else {
          console.log('Location permission denied');
        }
      } catch (err) { 
        console.warn(err);
      }
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setMapLoaded(true);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  };

  const generateMapHTML = (latitude: number, longitude: number) => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Bing Maps</title>
        <script type="text/javascript" src="https://www.bing.com/api/maps/mapcontrol?key=${bingMapsApiKey}"></script>
        <script type="text/javascript">
          function loadMap() {
            var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
              center: new Microsoft.Maps.Location(${latitude}, ${longitude}),
              zoom: 15 // Increased zoom level for closer view
            });
            var center = map.getCenter();
            var pin = new Microsoft.Maps.Pushpin(center, {
              title: 'You are here',
              icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><path d="M12 2C8.13 2 5 5.13 5 9c0 3.39 2.69 7.18 6.3 11.05.37.4.99.4 1.36 0C16.31 16.18 19 12.39 19 9c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z"/></svg>',
              anchor: new Microsoft.Maps.Point(24, 24) // Anchor point for larger icon
            });
            map.entities.push(pin);
          }

          function openCardiologists() {
            var latitude = ${latitude};
            var longitude = ${longitude};
            var url = 'https://www.google.com/maps/search/cardiovascular+clinics/@' + latitude + ',' + longitude + ',15z';
            window.open(url, '_blank');
          }
        </script>
        <style>
          html, body {
            height: 100%;
            margin: 0;
            padding: 0;
          }
          #myMap {
            height: 100%;
          }
          .button-container {
            position: absolute;
            bottom: 50px;
            right: 10px;
            z-index: 1;
          }
          .button {
            background-color: red;
            border-radius: 50px;
            width: 200px; /* Increased width */
            height: 70px; /* Increased height */
            display: flex;
            justify-content: center;
            align-items: center;
            shadow-color: #000;
            shadow-offset: { width: 0, height: 2 };
            shadow-opacity: 0.8;
            shadow-radius: 2px;
            elevation: 4;
            cursor: pointer;
          }
          .button-text {
            color: white;
            font-size: 20px; /* Increased font size */
          }
        </style>
      </head>
      <body onload="loadMap()">
        <div id="myMap"></div>
        <div class="button-container">
          <button class="button" onclick="openCardiologists()">
            <span class="button-text">Cardiologists</span>
          </button>
        </div>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={getCurrentLocation}>
        <Text style={styles.buttonText}>📍</Text>
      </TouchableOpacity>
      {mapLoaded && location && (
        <WebView
          originWhitelist={['*']}
          source={{ html: generateMapHTML(location.latitude, location.longitude) }}
          style={{ flex: 1 }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    top: 25,
    right: 10,
    backgroundColor: 'black',
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
});

export default ComponentName;
