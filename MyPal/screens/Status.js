import React, {useRef, useState, useEffect} from 'react';
import {
  NativeBaseProvider,
  Select,
  HStack,
  VStack,
  Text,
  Box,
  FlatList,
  Input,
  Divider,
  Button,
} from 'native-base';
import {StatusBar, LogBox} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ActionSheet from 'react-native-raw-bottom-sheet';
import FabButton from 'react-native-action-button';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import Header from '../component/Header';

StatusBar.setBarStyle('light-content', true);
StatusBar.setBackgroundColor('#20c65c');

let category = '';
const CategoryItems = () => {
  const [categoryVal, setcategoryVal] = useState();
  useEffect(() => {
    category = categoryVal;
  }, [categoryVal]);
  return (
    <Select
      placeholder="Select Category"
      selectedValue={categoryVal}
      w="100%"
      onValueChange={itemValue => setcategoryVal(itemValue)}>
      <Select.Item label="Food" value="food" />
      <Select.Item label="Bill" value="bill" />
      <Select.Item label="Health" value="health" />
      <Select.Item label="Car" value="car" />
      <Select.Item label="Transport" value="transport" />
    </Select>
  );
};

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
const Status = () => {
  //Flat List Update//
  const [data, setdata] = useState([]);
  //For Updata Status//
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [total, setTotal] = useState(0);

  //For Action Sheelt//
  const expencesRef = useRef();
  const incomeRef = useRef();

  //For Ref Input//
  const incomeInput = useRef();
  const expensesInput = useRef();

  //For Get Input Value//
  const [incomeVal, setincomeVal] = useState();
  const [expensesVal, setexpensesVal] = useState();

  //Update data//
  const [month, setmonth] = useState();
  const [date, setdate] = useState();
  const [key, setkey] = useState(0);

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    const date = new Date();
    setmonth(monthNames[date.getMonth()]);
    setdate(date.getDate() + '/' + date.getMonth());
    //////////////////////////////////////
    axios({method: 'GET', url: 'http://192.168.43.46:3000/data'}).then(res => {
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
      setIncome(income + incomeTotal);
      setExpenses(expenses + expensesTotal);
    });

    ////////////////////////////////////
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setkey(data.length + 1);
  }, [data]);
  useEffect(() => {
    setTotal(income - expenses);
  }, [expenses, income]);

  function listdata() {
    axios({
      method: 'GET',
      url: `http://192.168.43.46:3000/data/${key - 1}`,
    }).then(res => {
      let array = res.data;
      let incomeTotal = 0;
      let expensesTotal = 0;

      array.forEach(element => {
        setdata(old => [...old, element]);
        if (element.status == 'income') {
          incomeTotal += parseInt(element.price);
        } else {
          expensesTotal += parseInt(element.price);
        }
      });
      setIncome(income + incomeTotal);
      setExpenses(expenses + expensesTotal);
    });
  }

  const addIncome = typeOfButton => {
    incomeRef.current.close();
    if ((incomeVal == '') | (incomeVal == undefined)) {
      Toast.show({
        type: 'error',
        text1: 'Please Fill Income Field.',
        position: 'top',
        autoHide: true,
        topOffset: 60,
        visibilityTime: 50,
      });
    } else {
      setincomeVal('');
      let val = parseInt(income) + parseInt(incomeVal);
      setIncome(val);
      setTotal(val - expenses);

      //////////////POST INCOME DATA///////////
      axios({
        method: 'POST',
        url: 'http://192.168.43.46:3000/data',
        data: {
          key: key,
          type: typeOfButton,
          category: 'none',
          month: month,
          status: 'income',
          price: incomeVal,
          date: date,
        },
      })
        .then(res => {
          if (res) {
            Toast.show({
              type: 'success',
              text1: 'Income added',
              position: 'top',
              autoHide: true,
              topOffset: 60,
              visibilityTime: 50,
            });
            listdata();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  async function addExpenses(typeOfButton) {
    await expencesRef.current.close();
    if (
      (expensesVal == '') |
      (expensesVal == undefined) |
      (category == '') |
      (category == undefined)
    ) {
      Toast.show({
        type: 'error',
        text1: 'Please Fill Expenses Field & Category.',
        position: 'top',
        autoHide: true,
        topOffset: 60,
        visibilityTime: 50,
      });
    } else {
      setexpensesVal('');
      let val = await (parseInt(expenses) + parseInt(expensesVal));
      setExpenses(val);
      ////Add Total////
      setTotal(income - val);
      ////////POST EXPENSE DATA//////
      axios({
        method: 'POST',
        url: 'http://192.168.43.46:3000/data',
        data: {
          key: key,
          type: typeOfButton,
          category: category,
          month: month,
          status: 'expense',
          price: expensesVal,
          date: date,
        },
      })
        .then(res => {
          if (res) {
            Toast.show({
              type: 'success',
              text1: 'Expense added',
              position: 'top',
              autoHide: true,
              topOffset: 60,
              visibilityTime: 50,
            });
            listdata();
          }
        })
        .catch(err => {
          console.log(err);
        });
      ///////////////////////////////
    }
  }

  return (
    <NativeBaseProvider>
      <Header />

      <HStack
        mt={0}
        bg={'#fdfffd'}
        justifyContent="space-between"
        alignItems="center"
        h="40px"
        w="100%"
        px={2}>
        <VStack justifyContent="center" alignItems="center">
          <Text ml={2} mb={1} fontSize="12px">
            Income
          </Text>
          <Box flexDirection="row">
            <AntDesign name="arrowdown" size={16} color="#2ecc71" />
            <Text>{income}</Text>
          </Box>
        </VStack>
        <VStack justifyContent="center" alignItems="center">
          <Text ml={2} mb={1} fontSize="12px">
            Expenses
          </Text>
          <Box flexDirection="row">
            <AntDesign name="arrowup" size={16} color="#e74c3c" />
            <Text>{expenses}</Text>
          </Box>
        </VStack>
        <VStack justifyContent="center" alignItems="center">
          <Text ml={2} mb={1} fontSize="12px">
            Total
          </Text>
          <Box flexDirection="row">
            <AntDesign name="plus" size={16} color="#3498db" />
            <Text>{total}</Text>
          </Box>
        </VStack>
      </HStack>
      <Divider size={2} />
      <FlatList bg="#f5f7f9" data={data} renderItem={renderItem} />
      {/* /////////////////////////// */}
      <FabButton buttonColor="#20c65c">
        <FabButton.Item
          buttonColor="#ed4542"
          title="Expenses"
          onPress={() => {
            expencesRef.current.open();
          }}>
          <AntDesign name="arrowup" size={20} color="white" />
        </FabButton.Item>
        <FabButton.Item
          buttonColor="#1abc9c"
          title="Income"
          onPress={() => {
            incomeRef.current.open();
          }}>
          <AntDesign name="arrowdown" size={20} color="white" />
        </FabButton.Item>
      </FabButton>
      {/* ////////////////////////////////// */}
      {/* ////Expenses Sheet//// */}
      <ActionSheet
        ref={expencesRef}
        closeOnDragDown={true}
        height={180}
        openDuration={500}>
        <Box>
          <Input
            placeholder="Expenses"
            border={0}
            borderBottomWidth={1}
            keyboardType="numeric"
            w="100%"
            h="50px"
            ref={expensesInput}
            onChangeText={val => {
              setexpensesVal(val);
            }}
            onSubmitEditing={() => {
              addExpenses();
            }}
            value={expensesVal}
          />
          {/* /////////////////////////////////// */}
          <CategoryItems />
          {/* ////////////////////////////// */}

          <HStack mt={2} justifyContent="space-around">
            <Button
              colorScheme="green"
              flex={1}
              borderRadius={'0px'}
              onPress={() => addExpenses('account')}>
              Account
            </Button>
            <Divider orientation="vertical" />
            <Button
              flex={1}
              colorScheme="green"
              borderRadius={'0px'}
              onPress={() => addExpenses('cash')}>
              Cash
            </Button>
            <Divider orientation="vertical" />

            <Button
              flex={1}
              colorScheme="green"
              borderRadius={'0px'}
              onPress={() => addExpenses('salary')}>
              Salary
            </Button>
          </HStack>
        </Box>
      </ActionSheet>
      {/* ////Income Sheet//// */}
      <ActionSheet
        ref={incomeRef}
        height={130}
        closeOnDragDown={true}
        openDuration={500}>
        <Input
          placeholder="Income"
          border={0}
          borderBottomWidth={1}
          keyboardType="numeric"
          w="100%"
          h="50px"
          onChangeText={val => {
            setincomeVal(val);
          }}
          ref={incomeInput}
          value={incomeVal}
        />
        <HStack mt={2} justifyContent="space-around">
          <Button
            colorScheme="green"
            flex={1}
            borderRadius={'0px'}
            onPress={() => addIncome('account')}>
            Account
          </Button>
          <Divider orientation="vertical" />
          <Button
            flex={1}
            colorScheme="green"
            borderRadius={'0px'}
            onPress={() => addIncome('cash')}>
            Cash
          </Button>
          <Divider orientation="vertical" />

          <Button
            flex={1}
            colorScheme="green"
            borderRadius={'0px'}
            onPress={() => addIncome('salary')}>
            Salary
          </Button>
        </HStack>
      </ActionSheet>

      <Toast ref={ref => Toast.setRef(ref)} />
    </NativeBaseProvider>
  );
};

export default Status;
