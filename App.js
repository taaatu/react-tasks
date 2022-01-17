import React from 'react';
import {ImageBackground, SafeAreaView, Text, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import GlobalStyles from './utils/GlobalStyles';
import List from './components/List';
import {Settings} from 'react-native-feather';

const headerImage = {uri: 'http://placekitten.com/2041/1922'};

const App = () => {
  return (
    <>
      <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
        <StatusBar style="light" />
        <View style={GlobalStyles.container}>
          <ImageBackground
            source={headerImage}
            style={GlobalStyles.header}
            imageStyle={GlobalStyles.headerImage}
          >
            <Text style={GlobalStyles.headerTitle}>Homeless Kittens</Text>
            <Settings
              stroke={'white'}
              strokeWidth={1}
              width={50}
              height={50}
              style={GlobalStyles.settingsIcon}
            />
          </ImageBackground>

          <List />
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
