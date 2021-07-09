import React, {useRef, useState, useEffect} from 'react';
import * as native from 'native-base';
import {StatusBar, LogBox} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import ActionSheet from 'react-native-raw-bottom-sheet';
import FabButton from 'react-native-action-button';

import Toast from 'react-native-toast-message';
import axios from 'axios';

StatusBar.setBarStyle('light-content', true);
StatusBar.setBackgroundColor('#20c65c');

const renderItem = ({item}) => (
  <native.Box
    bg="#fdfffd"
    flexDirection="row"
    h="40px"
    alignItems="center"
    justifyContent="space-between"
    px={5}>
    <native.HStack w="40%" justifyContent="space-between">
      <native.Text fontSize="14px" color="gray.500">
        {item.type}
      </native.Text>
      <native.Text fontSize="14px" color="gray.500">
        {item.date}
      </native.Text>
    </native.HStack>
    <native.HStack w="40%" justifyContent="space-between">
      {item.status == 'expense' ? (
        <native.Text fontSize="14px" color="gray.500">
          {item.category}
        </native.Text>
      ) : (
        <native.Box></native.Box>
      )}
      {item.status == 'income' ? (
        <native.Text fontSize="14px" color="blue.500">
          +{item.price}
        </native.Text>
      ) : (
        <native.Text fontSize="14px" color="red.500">
          -{item.price}
        </native.Text>
      )}
    </native.HStack>
  </native.Box>
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
const Home = () => {
  //Flat List Update//
  const [data, setdata] = useState([]);
  //For Updata Status//
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [total, setTotal] = useState(0);
  const [previncome, setprevIncome] = useState(0);
  const [prevexpenses, setprevExpenses] = useState(0);
  const [prevtotal, setprevTotal] = useState(0);

  //For Action Sheelt//
  const expencesRef = useRef();
  const incomeRef = useRef();

  //For Ref Input//
  const incomeInput = useRef();
  const expensesInput = useRef();
  const categoryInput = useRef();
  const typeInput = useRef();

  //For Get Input Value//
  const [incomeVal, setincomeVal] = useState();
  const [expensesVal, setexpensesVal] = useState();
  const [categoryVal, setcategoryVal] = useState();
  const [typeVal, settypeVal] = useState();

  //Update data//
  const [month, setmonth] = useState();
  const [date, setdate] = useState();
  const [key, setkey] = useState(0);

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    const date = new Date();
    setmonth(monthNames[date.getMonth()]);
    setdate(date.getDate() + '/' + date.getMonth());
    listdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setkey(data.length + 1);
    console.log(data);
  }, [data]);
  useEffect(() => {
    setTotal(income - expenses);
  }, [expenses, income]);

  function listdata() {
    axios({
      method: 'GET',
      url: `http://192.168.43.46:3000/data/${key == 0 ? 0 : key - 1}`,
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

  function addIncome(typeOfButton) {
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
  }

  async function addExpenses(typeOfButton) {
    await expencesRef.current.close();
    if (
      (expensesVal == '') |
      (expensesVal == undefined) |
      (categoryVal == '') |
      (categoryVal == undefined)
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
      setcategoryVal('');
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
          category: categoryVal,
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
    <native.NativeBaseProvider>
      <native.HStack
        bg={'#fbfffa'}
        justifyContent="space-between"
        alignItems="center"
        h="50px">
        <native.Box>
          <native.IconButton
            icon={<AntDesign name="menufold" size={20} color="#2d3436" />}
          />
        </native.Box>
        <native.Box w="30%">
          <native.Text fontFamily={'PerpectBrightDemoRegular'}>
            My Pal
          </native.Text>
        </native.Box>
        <native.Box w="30%">
          <native.Text fontSize="16px">{month}</native.Text>
        </native.Box>
        <native.Box>
          <native.IconButton
            icon={<AntDesign name="search1" size={20} color="#2d3436" />}
          />
        </native.Box>
        <native.Box>
          <native.Text>
            <native.IconButton
              icon={
                <Entypo name="dots-three-vertical" size={20} color="#2d3436" />
              }
            />
          </native.Text>
        </native.Box>
      </native.HStack>
      <native.HStack
        bg={'#fdfffd'}
        justifyContent="space-between"
        alignItems="center"
        h="40px"
        w="100%"
        px={2}>
        <native.VStack justifyContent="center" alignItems="center">
          <native.Text ml={2} mb={1} fontSize="12px">
            Income
          </native.Text>
          <native.Box flexDirection="row">
            <AntDesign name="arrowdown" size={16} color="#2ecc71" />
            <native.Text>{income}</native.Text>
          </native.Box>
        </native.VStack>
        <native.VStack justifyContent="center" alignItems="center">
          <native.Text ml={2} mb={1} fontSize="12px">
            Expenses
          </native.Text>
          <native.Box flexDirection="row">
            <AntDesign name="arrowup" size={16} color="#e74c3c" />
            <native.Text>{expenses}</native.Text>
          </native.Box>
        </native.VStack>
        <native.VStack justifyContent="center" alignItems="center">
          <native.Text ml={2} mb={1} fontSize="12px">
            Total
          </native.Text>
          <native.Box flexDirection="row">
            <AntDesign name="plus" size={16} color="#3498db" />
            <native.Text>{total}</native.Text>
          </native.Box>
        </native.VStack>
      </native.HStack>
      <native.Divider size={2} />
      <native.FlatList bg="#f5f7f9" data={data} renderItem={renderItem} />
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
        <native.Box>
          <native.Input
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
          <native.Input
            w="100%"
            h="50px"
            border={0}
            borderBottomWidth={1}
            placeholder="Category"
            onChangeText={val => setcategoryVal(val)}
            ref={categoryInput}
            onSubmitEditing={() => {
              addExpenses();
            }}
            value={categoryVal}
          />
          <native.HStack mt={2} justifyContent="space-around">
            <native.Button
              colorScheme="green"
              flex={1}
              borderRadius={'0px'}
              onPress={() => addExpenses('account')}>
              Account
            </native.Button>
            <native.Divider orientation="vertical" />
            <native.Button
              flex={1}
              colorScheme="green"
              borderRadius={'0px'}
              onPress={() => addExpenses('cash')}>
              Cash
            </native.Button>
            <native.Divider orientation="vertical" />

            <native.Button
              flex={1}
              colorScheme="green"
              borderRadius={'0px'}
              onPress={() => addExpenses('salary')}>
              Salary
            </native.Button>
          </native.HStack>
        </native.Box>
      </ActionSheet>
      {/* ////Income Sheet//// */}
      <ActionSheet ref={incomeRef} height={110} openDuration={500}>
        <native.Input
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
        <native.HStack mt={2} justifyContent="space-around">
          <native.Button
            colorScheme="green"
            flex={1}
            borderRadius={'0px'}
            onPress={() => addIncome('account')}>
            Account
          </native.Button>
          <native.Divider orientation="vertical" />
          <native.Button
            flex={1}
            colorScheme="green"
            borderRadius={'0px'}
            onPress={() => addIncome('cash')}>
            Cash
          </native.Button>
          <native.Divider orientation="vertical" />

          <native.Button
            flex={1}
            colorScheme="green"
            borderRadius={'0px'}
            onPress={() => addIncome('salary')}>
            Salary
          </native.Button>
        </native.HStack>
      </ActionSheet>

      <Toast ref={ref => Toast.setRef(ref)} />
    </native.NativeBaseProvider>
  );
};

export default Home;

// <native.HStack justifyContent="space-around">
// <native.Button
//   startIcon={<AntDesign name={'arrowdown'} size={20} color="white" />}
//   onPress={() => {
//     incomeRef.current.open();
//   }}
//   colorScheme="green"
//   w="50%"
//   borderRadius="0px">
//   Income
// </native.Button>
// <native.Button
//   startIcon={<AntDesign name={'arrowup'} size={20} color="white" />}
//   onPress={() => {
//     expencesRef.current.open();
//   }}
//   colorScheme="red"
//   w="50%"
//   borderRadius="0px"
//   _text={{
//     color: 'white',
//   }}>
//   Expenses
// </native.Button>
// </native.HStack>
