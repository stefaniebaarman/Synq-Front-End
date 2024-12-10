import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import React from 'react';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const isFirstTimeUser = true;

  if (!isLoadingComplete) {
    console.log('loading not complete')
    return null;
  } else {
    console.log('loading now')
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} isFirstTimeUser={isFirstTimeUser} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
