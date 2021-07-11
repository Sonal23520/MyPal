import React, {useState, useEffect} from 'react';
import {HStack, Box, Text, IconButton} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const Header = () => {
  const navigation = useNavigation();

  const [month, setmonth] = useState();
  useEffect(() => {
    const date = new Date();
    setmonth(monthNames[date.getMonth()]);
  }, []);

  async function asyncDelete() {
    await AsyncStorage.removeItem('user').then(() => {
      navigation.navigate('Main');
    });
  }

  return (
    <HStack
      bg={'#fbfffa'}
      justifyContent="space-between"
      alignItems="center"
      h="50px">
      <Box>
        <IconButton
          icon={<AntDesign name="menufold" size={20} color="#2d3436" />}
        />
      </Box>
      <Box w="30%">
        <Text fontFamily={'PerpectBrightDemoRegular'}>My Pal</Text>
      </Box>
      <Box w="30%">
        <Text fontSize="16px">{month}</Text>
      </Box>
      <Box>
        <IconButton
          icon={<AntDesign name="search1" size={20} color="#2d3436" />}
        />
      </Box>
      <Box>
        <IconButton
          icon={
            <AntDesign
              name="logout"
              onPress={asyncDelete}
              size={20}
              color="#2d3436"
            />
          }
        />
      </Box>
      {/* ///// */}

      {/* ///// */}
    </HStack>
  );
};

export default Header;
