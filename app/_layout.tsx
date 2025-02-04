
import { router, Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { Provider } from 'react-redux'
import store from '@/app/store/store';
import "../global.css";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  useEffect(() => {
    SplashScreen.hideAsync();
    router.replace('/screens/home/home')
  }, []);


  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <Slot />
      </Provider>
    </>
  );
}
