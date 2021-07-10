import React from 'react';
import {NativeBaseProvider} from 'native-base';
import Header from '../component/Header';

const Setting = () => {
  return (
    <NativeBaseProvider>
      <Header />
    </NativeBaseProvider>
  );
};

export default Setting;
