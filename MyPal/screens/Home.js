import React, {useRef, useState, useEffect} from 'react';
import * as native from 'native-base';
import {StatusBar} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import ActionSheet from 'react-native-actions-sheet';
import Toast from 'react-native-toast-message';
import axios from 'axios';

StatusBar.setBarStyle('light-content', true);
StatusBar.setBackgroundColor('#20c65c');

///////////////

///////////////

const Home = () => {
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

  //For Updata Status//
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [total, setTotal] = useState(0);

  //Update data//
  const [month, setmonth] = useState();
  const [currentmonth, setcurrentmonth] = useState();
  const [key, setkey] = useState();

  //Flat List Update//
  const [data, setdata] = useState([]);

  useEffect(() => {
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
    const date = new Date();
    setmonth(monthNames[date.getMonth()]);
    setcurrentmonth(monthNames[date.getMonth()]);
  }, []);

  getData();
  function getData() {
    axios({method: 'GET', url: 'http://192.168.43.46:3000/data'})
      .then(res => {
        setkey(res.data.length + 1);
        setdata(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function addIncome() {
    if (
      (incomeVal == '') |
      (incomeVal == undefined) |
      (typeVal == '') |
      (typeVal == undefined)
    ) {
      Toast.show({
        type: 'error',
        text1: 'Please Fill Income Field & Type.',
        position: 'top',
        autoHide: true,
        topOffset: 60,
      });
    } else {
      incomeInput.current.clear();
      typeInput.current.clear();
      let val = await (parseInt(income) + parseInt(incomeVal));
      setIncome(val);
      setTotal(val - expenses);

      //////////////POST INCOME DATA///////////
      axios({
        method: 'POST',
        url: 'http://192.168.43.46:3000/data',
        data: {
          type: typeVal,
          month: currentmonth,
          status: 'income',
          price: incomeVal,
          key: key,
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
            });
            getData();
          }
        })
        .catch(err => {
          console.log(err);
        });
      /////////////////////////////////////////
    }
  }

  async function addExpenses() {
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
      });
    } else {
      expensesInput.current.clear();
      categoryInput.current.clear();
      let val = await (parseInt(expenses) + parseInt(expensesVal));
      setExpenses(val);
      ////Add Total////
      setTotal(income - val);

      ////////POST EXPENSE DATA//////
      axios({
        method: 'POST',
        url: 'http://192.168.43.46:3000/data',
        data: {
          type: categoryVal,
          month: currentmonth,
          status: 'expense',
          price: expensesVal,
          key: key,
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
            });
            getData();
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
        bg={'green.500'}
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
        <native.Box flexDirection="row">
          <AntDesign name="arrowdown" size={20} color="#2ecc71" />
          <native.Text ml={2}>{income}</native.Text>
        </native.Box>
        <native.Box flexDirection="row">
          <AntDesign name="arrowup" size={20} color="#e74c3c" />
          <native.Text ml={2}>{expenses}</native.Text>
        </native.Box>
        <native.Box flexDirection="row">
          <AntDesign name="plus" size={20} color="#3498db" />
          <native.Text ml={2}>{total}</native.Text>
        </native.Box>
      </native.HStack>
      <native.Divider size={2} />
      <native.FlatList
        bg="#f5f7f9"
        data={data}
        renderItem={({item}) => (
          <native.Box
            bg="#fdfffd"
            flexDirection="row"
            h="40px"
            alignItems="center"
            justifyContent="space-between"
            px={5}>
            <native.Text fontSize="14px" color="gray.500">
              {item.type}
            </native.Text>
            {item.status == 'income' ? (
              <native.Text fontSize="14px" color="blue.500">
                +{item.price}
              </native.Text>
            ) : (
              <native.Text fontSize="14px" color="red.500">
                -{item.price}
              </native.Text>
            )}
          </native.Box>
        )}
      />

      <native.HStack justifyContent="space-around">
        <native.Button
          startIcon={<AntDesign name={'arrowdown'} size={20} color="white" />}
          onPress={() => {
            incomeRef.current?.setModalVisible();
          }}
          colorScheme="green"
          w="50%"
          borderRadius="0px">
          Income
        </native.Button>
        <native.Button
          startIcon={<AntDesign name={'arrowup'} size={20} color="white" />}
          onPress={() => {
            expencesRef.current?.setModalVisible();
          }}
          colorScheme="red"
          w="50%"
          borderRadius="0px"
          _text={{
            color: 'white',
          }}>
          Expenses
        </native.Button>
      </native.HStack>
      {/* ////Expenses Sheet//// */}
      <ActionSheet
        ref={expencesRef}
        extraScroll={10}
        delayActionSheetDraw={true}
        delayActionSheetDrawTime={52}>
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
          />
        </native.Box>
      </ActionSheet>
      {/* ////Income Sheet//// */}
      <ActionSheet
        ref={incomeRef}
        extraScroll={10}
        delayActionSheetDraw={true}
        delayActionSheetDrawTime={52}>
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
          onSubmitEditing={() => {
            addIncome();
          }}
        />
        <native.Input
          placeholder="Type"
          w="100%"
          h="50px"
          border={0}
          borderBottomWidth={1}
          onChangeText={val => settypeVal(val)}
          ref={typeInput}
          onSubmitEditing={() => {
            addIncome();
          }}
        />
      </ActionSheet>
      <Toast ref={ref => Toast.setRef(ref)} />
    </native.NativeBaseProvider>
  );
};

export default Home;

//    {/* ////ROW 1/// */}
//    <native.HStack mt={2} flexDirection="row">
//    <native.Button
//      variant="outline"
//      colorScheme={'green'}
//      borderRadius="0px"
//      w="25%">
//      Bills
//    </native.Button>
//    <native.Divider orientation="vertical" />
//    <native.Button
//      variant="outline"
//      colorScheme={'green'}
//      borderRadius="0px"
//      w="25%">
//      Car
//    </native.Button>
//    <native.Divider orientation="vertical" />
//    <native.Button
//      variant="outline"
//      colorScheme={'green'}
//      borderRadius="0px"
//      w="25%">
//      Clothes
//    </native.Button>
//    <native.Divider orientation="vertical" />
//    <native.Button
//      variant="outline"
//      colorScheme={'green'}
//      borderRadius="0px"
//      w="25%">
//      Phone
//    </native.Button>
//  </native.HStack>
//  {/* ///ROW 2//// */}
//  <native.HStack flexDirection="row">
//    <native.Button
//      variant="outline"
//      colorScheme={'green'}
//      borderRadius="0px"
//      w="25%">
//      House
//    </native.Button>
//    <native.Divider orientation="vertical" />
//    <native.Button
//      variant="outline"
//      colorScheme={'green'}
//      borderRadius="0px"
//      w="25%">
//      Pets
//    </native.Button>
//    <native.Divider orientation="vertical" />
//    <native.Button
//      variant="outline"
//      colorScheme={'green'}
//      borderRadius="0px"
//      w="25%">
//      Food
//    </native.Button>
//    <native.Divider orientation="vertical" />
//    <native.Button
//      variant="outline"
//      colorScheme={'green'}
//      borderRadius="0px"
//      w="25%">
//      Health
//    </native.Button>
//  </native.HStack>
//  {/* ///ROW 3/// */}
//  <native.HStack flexDirection="row">
//    <native.Button
//      variant="outline"
//      colorScheme={'green'}
//      borderRadius="0px"
//      w="25%">
//      Sport
//    </native.Button>
//    <native.Divider orientation="vertical" />
//    <native.Button
//      variant="outline"
//      colorScheme={'green'}
//      borderRadius="0px"
//      w="25%">
//      Taxi
//    </native.Button>
//    <native.Divider orientation="vertical" />
//    <native.Button
//      variant="outline"
//      colorScheme={'green'}
//      borderRadius="0px"
//      w="25%">
//      Beauty
//    </native.Button>
//    <native.Divider orientation="vertical" />
//    <native.Button
//      variant="outline"
//      colorScheme={'green'}
//      borderRadius="0px"
//      w="25%">
//      Other
//    </native.Button>
//  </native.HStack>
//  {/* ////ROW END/// */}