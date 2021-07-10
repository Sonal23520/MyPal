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
  const [income, setincome] = useState(0);
  const [expense, setexpense] = useState(0);
  const [total, settotal] = useState(0);

  const [incomepercentage, setincomepercentage] = useState(50);
  const [expensespercentage, setexpensepercentage] = useState(50);
  const [profitpercentage, setprofitpercentage] = useState(50);

  useEffect(() => {
    settotal(income - expense);
  }, [income, expense]);

  useEffect(() => {
    axios({method: 'GET', url: 'http://192.168.43.46:3000/data'}).then(res => {
      let array = res.data;
      let incomeTotal = 0;
      let expensesTotal = 0;
      array.forEach(element => {
        if (element.status == 'income') {
          incomeTotal += parseInt(element.price);
        } else {
          expensesTotal += parseInt(element.price);
        }
      });
      setincome(incomeTotal);
      setexpense(expensesTotal);
      setincomepercentage(
        parseInt(
          Math.round((incomeTotal / (incomeTotal + expensesTotal)) * 100),
        ),
      );
      setexpensepercentage(
        parseInt(
          Math.round((expensesTotal / (incomeTotal + expensesTotal)) * 100),
        ),
      );
      setprofitpercentage(
        parseInt(
          Math.round(
            ((incomeTotal - expensesTotal) / (incomeTotal + expensesTotal)) *
              100,
          ),
        ),
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NativeBaseProvider>
      <Header />
      <Divider size={2} />
      <Center bg={'#f9fff7'} flex={1.2}>
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
                percentage: profitpercentage,
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
              percentage: expensespercentage,
              color: '#e74c3c',
            },
            {
              percentage: incomepercentage,
              color: '#2ecc71',
            },
          ]}
          dividerSize={4}
          strokeCap={'butt'}
        />

        <HStack
          position={'absolute'}
          bottom={0}
          mb={0}
          // bg="red.300"
          w="100%"
          justifyContent="space-around">
          <Box>
            <Text textAlign="center">{income}</Text>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="center">
              <Octicons name="primitive-dot" size={20} color={'#2bcd6d'} />
              <Text fontSize={15} color={'gray.500'} ml={2}>
                Income
              </Text>
            </Box>
          </Box>

          <Box>
            <Text textAlign="center">{expense}</Text>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="center">
              <Octicons name="primitive-dot" size={20} color={'#e44d39'} />
              <Text fontSize={15} color={'gray.500'} ml={2}>
                Expenses
              </Text>
            </Box>
          </Box>

          <Box>
            <Text textAlign="center">{total}</Text>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="center">
              <Octicons name="primitive-dot" size={20} color={'#3498db'} />
              <Text fontSize={15} color={'gray.500'} ml={2}>
                Total
              </Text>
            </Box>
          </Box>
        </HStack>
      </Center>
      <Center bg={'#f9fff7'} flex={1}></Center>
      <Divider size={1} />
    </NativeBaseProvider>
  );
};

export default Home;
