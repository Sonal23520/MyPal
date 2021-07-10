import React, {useEffect, useState} from 'react';
import {
  Box,
  Center,
  Divider,
  HStack,
  NativeBaseProvider,
  Text,
} from 'native-base';
import Header from '../component/Header';
import Pie from 'react-native-pie';
import Octicons from 'react-native-vector-icons/Octicons';
import axios from 'axios';

const Home = () => {
  useEffect(() => {
    axios({method: 'GET', url: 'http://192.168.43.46:3000/data'}).then(
      res => {},
    );
  }, []);

  return (
    <NativeBaseProvider>
      <Header />
      <Divider size={2} />
      <Center bg={'#f9fff7'} flex={1}>
        <Box position={'absolute'}>
          <Text fontSize={24} fontFamily="PerpectBrightDemoRegular">
            My Pal
          </Text>
        </Box>
        <Box position={'absolute'}>
          <Pie
            radius={100}
            innerRadius={94}
            sections={[
              {
                percentage: 80,
                color: '#3498db',
              },
            ]}
            dividerSize={4}
            strokeCap={'butt'}
          />
        </Box>
        <Pie
          radius={120}
          innerRadius={100}
          sections={[
            {
              percentage: 20,
              color: '#e74c3c',
            },
            {
              percentage: 80,
              color: '#2ecc71',
            },
          ]}
          dividerSize={4}
          strokeCap={'butt'}
        />
        <HStack
          position={'absolute'}
          bottom={0}
          mb={100}
          // bg="red.300"
          w="100%"
          justifyContent="space-around">
          <Box>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="center">
              <Octicons name="primitive-dot" size={20} color={'#2bcd6d'} />
              <Text ml={2}>Income</Text>
            </Box>
          </Box>

          <Box>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="center">
              <Octicons name="primitive-dot" size={20} color={'#e44d39'} />
              <Text ml={2}>Expenses</Text>
            </Box>
          </Box>

          <Box>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="center">
              <Octicons name="primitive-dot" size={20} color={'#3498db'} />
              <Text ml={2}>Income</Text>
            </Box>
          </Box>
        </HStack>
      </Center>

      <Divider size={1} />
    </NativeBaseProvider>
  );
};

export default Home;
