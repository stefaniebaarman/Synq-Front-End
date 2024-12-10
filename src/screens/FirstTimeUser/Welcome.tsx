import { Button, Text, View } from '../../components/Themed';
import {  Image } from 'react-native';

const accentGreen: string = '#7DFFA6';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View className="flex-1 justify-between px-4 py-8">
      <View className='flex-1 justify-center items-center'>
        <Text className='text-6xl mb-8 mt-16'>SYNQ</Text>
        <Text className='text-center text-lg'>
          A social tool that connects you with available friends for spontaneous time together.
        </Text>
        <Image 
          source={require('./pulse.gif')} 
          style={{ width: 200, height: 200, marginTop: 50 }} 
          resizeMode="contain" 
        />
      </View>
      <View className="items-center mb-8 space-y-0">
        <Button text="Create account" onPress={() => navigation.navigate('CreatePhoneScreen')}
        style={{ backgroundColor: '#7DFFA6' }} />
        <Button text="Sign in" onPress={() => navigation.navigate('SignInWithEmail')} style={{ backgroundColor: '#7DFFA6', borderBlockColor: '#7DFFA6' }}/>
      </View>
    </View>
  );
}
