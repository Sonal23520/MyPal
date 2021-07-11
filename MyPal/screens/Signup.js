import React, {useState, useRef} from 'react';
import * as native from 'native-base';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-toast-message';

StatusBar.setBarStyle('light-content', true);
StatusBar.setBackgroundColor('#010400');

const Signup = () => {
  const navigation = useNavigation();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');

  const [erromsg, seterromsg] = useState(false);
  const [erromsgtype, seterromsgtype] = useState('');

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const cpasswordRef = useRef();

  function clear() {
    nameRef.current.clear();
    emailRef.current.clear();
    passwordRef.current.clear();
    cpasswordRef.current.clear();
  }

  function isEmailExists() {
    return axios({
      method: 'GET',
      url: `http://192.168.43.46:3000/user/${email}`,
    })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }

  function saveUser() {
    isEmailExists()
      .then(result => {
        if ((name == '') | (name == null)) {
          Toast.show({
            type: 'error',
            text1: 'Please fill name field',
            position: 'top',
            autoHide: true,
            topOffset: 60,
            visibilityTime: 1000,
          });
        } else if ((email == '') | (email == null)) {
          Toast.show({
            type: 'error',
            text1: 'Please fill email field',
            position: 'top',
            autoHide: true,
            topOffset: 60,
            visibilityTime: 1000,
          });
        } else if (result) {
          Toast.show({
            type: 'error',
            text1: 'Email already exists',
            position: 'top',
            autoHide: true,
            topOffset: 60,
            visibilityTime: 1000,
          });
          // seterromsg(true);
          // seterromsgtype('Email already exists');
        } else if (
          (password == '') |
          (password == null) |
          (confirmpassword == '') |
          (confirmpassword == null)
        ) {
          Toast.show({
            type: 'error',
            text1: 'Please fill password fields',
            position: 'top',
            autoHide: true,
            topOffset: 60,
            visibilityTime: 1000,
          });
        } else if (password != confirmpassword) {
          seterromsg(true);
          seterromsgtype(`Password doesn't match`);
        } else {
          axios({
            method: 'POST',
            url: 'http://192.168.43.46:3000/user',
            data: {
              name: name,
              email: email,
              password: password,
            },
          })
            .then(res => {
              if (res.data) {
                navigation.navigate('BottomNav');
                clear();
              }
            })
            .catch(err => {
              console.log(err);
            });
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
          keyboardVerticalOffset={140}>
          <native.Input
            placeholder="Name"
            w="75%"
            borderRadius={'50px'}
            borderWidth={1}
            mb={4}
            h="50px"
            color={'white'}
            onChangeText={name => {
              setname(name);
            }}
            ref={nameRef}
          />
          <native.Input
            placeholder="E-mail"
            w="75%"
            borderRadius={'50px'}
            borderWidth={1}
            mb={4}
            color={'white'}
            h="50px"
            onChangeText={email => {
              setemail(email);
            }}
            ref={emailRef}
          />
          <native.Input
            placeholder="Password"
            w="75%"
            type="password"
            borderRadius={'50px'}
            borderWidth={1}
            color={'white'}
            mb={4}
            h="50px"
            onChangeText={password => {
              setpassword(password);
            }}
            ref={passwordRef}
          />
          <native.Input
            placeholder="Confirm Password"
            w="75%"
            type="password"
            borderRadius={'50px'}
            borderWidth={1}
            color={'white'}
            mb={4}
            h="50px"
            onChangeText={cpassword => {
              setconfirmpassword(cpassword);
            }}
            ref={cpasswordRef}
          />
          {erromsg ? (
            <native.Text mb={2} color={'red.500'}>
              {erromsgtype}
            </native.Text>
          ) : null}
          <native.Button
            mb={2}
            w="75%"
            borderRadius={'50px'}
            colorScheme={'green'}
            onPress={saveUser}>
            Signup
          </native.Button>
        </native.KeyboardAvoidingView>
        <native.Box position="absolute" w="100%" bottom={5}>
          <native.Button
            colorScheme={'green'}
            h="52px"
            w="75%"
            borderRadius={'50px'}
            margin="auto"
            onPress={() => navigation.goBack()}>
            Login
          </native.Button>
        </native.Box>
      </native.Box>
      <Toast ref={ref => Toast.setRef(ref)} />
    </native.NativeBaseProvider>
  );
};

export default Signup;
