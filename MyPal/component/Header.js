import React, {useState, useEffect} from 'react';
import {HStack, Box, Text, IconButton} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

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
  const [month, setmonth] = useState();
  useEffect(() => {
    const date = new Date();
    setmonth(monthNames[date.getMonth()]);
  }, []);
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
        <Text>
          <IconButton
            icon={
              <Entypo name="dots-three-vertical" size={20} color="#2d3436" />
            }
          />
        </Text>
      </Box>
    </HStack>
  );
};

export default Header;
