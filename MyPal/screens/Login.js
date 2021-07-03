/* eslint-disable prettier/prettier */
import React from 'react';
import * as native from 'native-base';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

StatusBar.setBarStyle('light-content', true);
StatusBar.setBackgroundColor('#010400');

function test() {
  axios({
    method: 'post',
    url: 'http://192.168.42.235:3000/userLogin',
    data: {ss: 'sonal'},
  }).catch(er => {
    console.log(er);
  });
}
const Login = () => {
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
      <native.Box
        flex={1}
        // bg={'red.500'}
        justifyContent="center"
        alignItems="center">
        <native.KeyboardAvoidingView
          w="100%"
          h="40%"
          // bg={'blue.500'}
          justifyContent="center"
          alignItems="center"
          behavior="padding"
          keyboardVerticalOffset={20}>
          <native.Input
            placeholder="E-mail"
            w="75%"
            borderRadius={'50px'}
            borderWidth={1}
            mb={4}
            h="50px"
          />
          <native.Input
            placeholder="Password"
            w="75%"
            type="password"
            borderRadius={'50px'}
            borderWidth={1}
            mb={4}
            h="50px"
          />
          <native.Button
            mb={2}
            w="75%"
            borderRadius={'50px'}
            colorScheme={'green'}
            onPress={test}>
            Login
          </native.Button>
          <native.Text w="75%" color="gray.300" textAlign="right">
            forgotten password ?
          </native.Text>
        </native.KeyboardAvoidingView>
        <native.Box position="absolute" w="100%" bottom={5}>
          <native.Button
            colorScheme={'green'}
            h="52px"
            w="75%"
            borderRadius={'50px'}
            margin="auto"
            onPress={() => navigation.navigate('Signup')}>
            Sign up
          </native.Button>
        </native.Box>
      </native.Box>
    </native.NativeBaseProvider>
  );
};

export default Login;
