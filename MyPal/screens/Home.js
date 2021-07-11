import React, {useEffect, useState} from 'react';
import {
  Box,
  Center,
  Divider,
  HStack,
  NativeBaseProvider,
  Text,
  VStack,
} from 'native-base';
import Header from '../component/Header';
import Pie from 'react-native-pie';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {FlatList} from 'react-native';
import {StatusBar} from 'react-native';
StatusBar.setBarStyle('light-content', true);
StatusBar.setBackgroundColor('#20c65c');

const renderItem = ({item}) => (
  <Box
    bg="#fdfffd"
    flexDirection="row"
    h="40px"
    alignItems="center"
    justifyContent="space-between"
    px={5}>
    <HStack w="40%" justifyContent="space-between">
      <Text fontSize="14px" color="gray.500">
        {item.type}
      </Text>
      <Text fontSize="14px" color="gray.500">
        {item.date}
      </Text>
    </HStack>
    <HStack w="40%" justifyContent="space-between">
      {item.status == 'expense' ? (
        <Text fontSize="14px" color="gray.500">
          {item.category}
        </Text>
      ) : (
        <Box></Box>
      )}
      {item.status == 'income' ? (
        <Text fontSize="14px" color="blue.500">
          +{item.price}
        </Text>
      ) : (
        <Text fontSize="14px" color="red.500">
          -{item.price}
        </Text>
      )}
    </HStack>
  </Box>
);

const Home = () => {
  const [income, setincome] = useState(0);
  const [expense, setexpense] = useState(0);
  const [total, settotal] = useState(0);

  const [incomepercentage, setincomepercentage] = useState(50);
  const [expensespercentage, setexpensepercentage] = useState(50);
  const [profitpercentage, setprofitpercentage] = useState(50);

  const [data, setdata] = useState([]);

  useEffect(() => {
    settotal(income - expense);
  }, [income, expense]);

  useEffect(() => {
    axios({method: 'GET', url: 'http://192.168.43.46:3000/datadiss'}).then(
      res => {
        setdata(res.data);
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
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NativeBaseProvider>
      <Header />
      <Divider size={2} />
      <Text
        fontSize={22}
        pl={2}
        pt={2}
        w="100%"
        fontWeight="bold"
        bg={'#fdfffd'}>
        Statistics
      </Text>
      <HStack bg={'#fdfffd'} flex={1}>
        <Box ml={6} justifyContent="center" alignItems="center">
          <Box position={'absolute'}>
            <Text fontSize={24} fontFamily="PerpectBrightDemoRegular">
              My Pal
            </Text>
          </Box>
          <Box position={'absolute'}>
            <Pie
              radius={80}
              innerRadius={70}
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
            radius={100}
            innerRadius={80}
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
        </Box>
        <Box
          w="120px"
          flexDirection="column"
          alignItems="baseline"
          justifyContent="space-around">
          <Box
            ml={6}
            flexDirection="row"
            alignItems="center"
            justifyContent="center">
            <MaterialCommunityIcons name="circle" size={20} color={'#2bcd6d'} />
            <Text fontSize={15} color={'gray.500'} ml={2}>
              Income
            </Text>
          </Box>

          <Box
            ml={6}
            flexDirection="row"
            alignItems="center"
            justifyContent="center">
            <MaterialCommunityIcons name="circle" size={20} color={'#cf6960'} />
            <Text fontSize={15} color={'gray.500'} ml={2}>
              Expense
            </Text>
          </Box>

          <Box
            ml={6}
            flexDirection="row"
            alignItems="center"
            justifyContent="center">
            <MaterialCommunityIcons name="circle" size={20} color={'#3b96d1'} />
            <Text fontSize={15} color={'gray.500'} ml={2}>
              Profit
            </Text>
          </Box>
        </Box>
      </HStack>

      <Box bg={'#fdfffd'}>
        <Text fontSize={22} pl={2} pb={2} w="100%" fontWeight="bold">
          Summary
        </Text>
        <HStack w="100%" justifyContent="space-around" alignItems="center">
          <Box
            border={1}
            borderColor={'#2bcd6d'}
            borderRadius={10}
            justifyContent="center"
            h="100px"
            w="100px">
            <Text fontSize={18} textAlign="center">
              {income}
            </Text>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="center">
              <MaterialCommunityIcons
                name="arrow-up"
                size={20}
                color={'#2bcd6d'}
              />
              <Text fontSize={15} color={'gray.500'} ml={1}>
                Income
              </Text>
            </Box>
          </Box>

          <Box
            border={1}
            borderColor={'#e44d39'}
            borderRadius={10}
            justifyContent="center"
            h="100px"
            w="100px">
            <Text fontSize={18} textAlign="center">
              {expense}
            </Text>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="center">
              <MaterialCommunityIcons
                name="arrow-down"
                size={20}
                color={'#e44d39'}
              />
              <Text fontSize={15} color={'gray.500'} ml={1}>
                Expenses
              </Text>
            </Box>
          </Box>

          <Box
            border={1}
            borderColor={'#3c97cd'}
            borderRadius={10}
            justifyContent="center"
            h="100px"
            w="100px">
            <Text fontSize={18} textAlign="center">
              {total}
            </Text>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="center">
              <MaterialCommunityIcons name="plus" size={20} color={'#3498db'} />
              <Text fontSize={15} color={'gray.500'} ml={1}>
                Profit
              </Text>
            </Box>
          </Box>
        </HStack>
      </Box>
      <Text
        bg={'#fdfffd'}
        fontSize={22}
        pl={2}
        pb={2}
        pt={2}
        w="100%"
        fontWeight="bold">
        Activities
      </Text>
      <Divider size={1} />
      <Box bg={'#fdfffd'} flex={1}>
        <FlatList data={data} renderItem={renderItem} />
      </Box>
      <Divider size={1} />
    </NativeBaseProvider>
  );
};

export default Home;
