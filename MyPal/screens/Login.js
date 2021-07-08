/* eslint-disable prettier/prettier */
import React, {useState, useRef} from 'react';
import * as native from 'native-base';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

StatusBar.setBarStyle('light-content', true);
StatusBar.setBackgroundColor('#010400');

const Login = () => {
  const navigation = useNavigation();

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [erromsg, seterromsg] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  function login() {
    axios({
      method: 'GET',
      url: `http://192.168.43.46:3000/user/${email}/${password}`,
    })
      .then(res => {
        if (!res.data) {
          seterromsg(true);
        } else {
          seterromsg(false);
          navigation.navigate('Home');
          emailRef.current.clear();
          passwordRef.current.clear();
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

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
            color={'white'}
            h="50px"
            onChangeText={email => setemail(email)}
            ref={emailRef}
          />
          <native.Input
            placeholder="Password"
            w="75%"
            type="password"
            borderRadius={'50px'}
            borderWidth={1}
            mb={4}
            color={'white'}
            h="50px"
            onChangeText={password => setpassword(password)}
            ref={passwordRef}
          />
          {erromsg ? (
            <native.Text color={'red.500'} mb={2}>
              Email or password wrong
            </native.Text>
          ) : null}
          <native.Button
            mb={2}
            w="75%"
            borderRadius={'50px'}
            colorScheme={'green'}
            onPress={login}>
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
