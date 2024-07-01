# React Native Location Map Component

A React Native component that integrates Bing Maps API to display a map centered on the user's current location. Users can interact with the map and access location-specific services like finding nearby cardiologists.

## Features

- Displays a map using Bing Maps API.
- Fetches and displays the user's current location on the map.
- Includes a button to find nearby cardiologists using Google Maps.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Abishek0411/react-native-location-map.git

## Navigate to the project directory

cd react-native-location-map

## Install dependencies:

npm install

## Setup

Before running the app, ensure you have a valid Bing Maps API key (bingMapsApiKey) and update it in ComponentName.tsx.

## Usage

Import the ComponentName component into your app and use it as shown in the example below:
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ComponentName from './ComponentName';

const App = () => {
  return (
    <View style={styles.container}>
      <ComponentName />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

## Props

The component currently doesn't accept any props.

## Dependencies

- React Native
- @react-native-community/geolocation
- react-native-webview

## Contributions

Contributions are welcome! If you find any issues or have suggestions for improvements, please create a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- Built with React Native
- Bing Maps API provided by Microsoft
- Geolocation services by @react-native-community/geolocation
