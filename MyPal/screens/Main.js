import React, {useEffect} from 'react';
import * as native from 'native-base';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

StatusBar.setBarStyle('light-content', true);
StatusBar.setBackgroundColor('#20c65c');

const Main = () => {
  const navigation = useNavigation();
  async function getKey() {
    await AsyncStorage.getItem('user').then(res => {
      if (res == 'ok') {
        navigation.navigate('BottomNav');
      }
    });
    // let key = await AsyncStorage.getItem('user');
    // return key;
  }
  useEffect(() => {
    console.log(getKey());
  }, []);
  return (
    <native.NativeBaseProvider>
      <native.Image
        alt="Main Image"
        source={require('../asserts/main.jpeg')}
        position="absolute"
        resizeMode="cover"
        height="100%"
        width="100%"
      />
      <native.Center flex={1}>
        <native.Text
          color={'white'}
          w="100%"
          fontFamily="PerpectBrightDemoRegular"
          fontSize="50px"
          textAlign="center">
          My Pal
        </native.Text>
        <native.Text
          color={'white'}
          w="100%"
          fontFamily="Aston Sofianty"
          fontSize="30px"
          textAlign="center">
          The best way to manage money
        </native.Text>
      </native.Center>
      <native.Box position="absolute" w="100%" bottom={5}>
        <native.Button
          colorScheme={'green'}
          h="52px"
          w="75%"
          borderRadius={'50px'}
          margin="auto"
          onPress={() => navigation.navigate('Login')}>
          Get Started
        </native.Button>
      </native.Box>
    </native.NativeBaseProvider>
  );
};

export default Main;
