import React from 'react';
import {NativeBaseProvider} from 'native-base';
import Header from '../component/Header';

const User = () => {
  return (
    <NativeBaseProvider>
      <Header />
    </NativeBaseProvider>
  );
};

export default User;
