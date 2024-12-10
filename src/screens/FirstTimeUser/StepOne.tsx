import { TextInput, Text, View, Button } from '../../components/Themed';
import * as React from "react";
// import { getAuth, updateProfile } from 'firebase/auth'; // Import updateProfile
// import {  Image } from 'react-native';

// const auth = getAuth();

interface StepTwoProps {
  route: any;
  navigation: any;
}

export function StepOneScreen({ route, navigation }: StepTwoProps) {

  // const [firstName, setFirstName] = React.useState<string>(user.displayName || ''); // Default to displayName
  const [lastName, setLastName] = React.useState<string>('');

  return (
    <View className="flex-1 justify-between px-4 py-8">
      {/* Top section for the title and description */}
      <View className='flex-1 justify-center items-center'>
        <Text className='text-6xl mb-8 mt-16'>Welcome to SYNQ</Text>
        <Text className='text-left text-lg'>
          A social tool that connects you with available friends for spontaneous time together.
        </Text>
        {/* <Image 
          source={require('./pulse.gif')} 
          style={{ width: 200, height: 200, marginTop: 50 }} 
          resizeMode="contain" 
        /> */}
      </View>
      <View className="items-center mb-8 space-y-0">
        <Button text="Continue" onPress={() => navigation.navigate('StepTwo')}
        style={{ backgroundColor: '#7DFFA6' }} />
      </View>
    </View>
  );
}

