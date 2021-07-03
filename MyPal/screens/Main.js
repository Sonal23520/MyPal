import React from 'react';
import * as native from 'native-base';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';

StatusBar.setBarStyle('light-content', true);
StatusBar.setBackgroundColor('#010400');

const Main = () => {
  const navigation = useNavigation();

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
