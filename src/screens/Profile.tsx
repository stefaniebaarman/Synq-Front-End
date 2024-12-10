import { useState } from 'react';
import { Text, View } from '../components/Themed';
import { Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { mockMonaUser } from '../constants/Mocks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from './FirstTimeUser/firebaseConfig';
import QRCode from 'react-native-qrcode-svg';
import { getFirestore, collection, getDocs } from "firebase/firestore"; 

export function ProfileScreen() {
  const db = getFirestore();
  console.log('db: ', db)

  const fetchUsers = async () => {
    try {
      const usersCollectionRef = collection(db, 'users');
  
      const querySnapshot = await getDocs(usersCollectionRef);
  
      const usersList: { id: string; }[] = [];
  
      querySnapshot.forEach((doc) => {
        usersList.push({
          id: doc.id, 
          ...doc.data(), 
        });
      });
  
      console.log('Fetched users:', usersList);
  
      return usersList; 
  
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  };
  

  const [isQRExpanded, setQRExpanded] = useState(false);
  const user = mockMonaUser;
  const activationCount = 10; 
  // console.log('auth: ', auth.currentUser);

  const accountData = {
    id: auth.currentUser?.uid,
    email: auth.currentUser?.email,
    displayName: auth.currentUser?.displayName,
  };
  fetchUsers();

  return (
    <SafeAreaView className="flex items-center">
      <Text className="p-4 self-end">Settings</Text>
      <View className="w-3/4 py-12 items-center">
        <View style={styles.qrContainer}>
          <View style={styles.qrCode}>
            <QRCode
              value={JSON.stringify(accountData)}
              size={160}
              color="black"
              backgroundColor="white"
              logo={{ uri: 'https://example.com/logo.png' }}
              logoSize={40}
              logoMargin={2}
              logoBackgroundColor="transparent"
            />
          </View>
          <TouchableOpacity
            onPress={() => setQRExpanded(true)}
            style={styles.profileImageWrapper}
          >
            <Image
              source={user.photoUrl}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        <View className="flex items-center gap-y-2 mt-2">
          <Text>{auth.currentUser?.displayName}</Text>
          <Text className="text-gray-500">{user.id}</Text>
        </View>
        <Text className="text-green-500 mt-10">Active SYNQ: 00:00:00</Text>
      </View>
      <View className="w-3/4 items-start">
        <View>
          <Text className="text-lg">Top Connections</Text>
          <Text className="text-green-500 mt-2">In the past week, you have activated {activationCount} times!</Text>
        </View>
        <View className="flex flex-row justify-between mt-10 gap-x-4">
  <View className="items-center">
    <Image className="w-20 h-20 rounded-full" source={user.photoUrl} />
    <Text className="mt-2 text-center">Name 1</Text>
  </View>
  <View className="items-center">
    <Image className="w-20 h-20 rounded-full" source={user.photoUrl} />
    <Text className="mt-2 text-center">Name 2</Text>
  </View>
  <View className="items-center">
    <Image className="w-20 h-20 rounded-full" source={user.photoUrl} />
    <Text className="mt-2 text-center">Name 3</Text>
  </View>
</View>

      </View>

      <Modal visible={isQRExpanded} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setQRExpanded(false)}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <View style={styles.expandedQR}>
            <QRCode
              value={JSON.stringify(accountData)}
              size={300}
              color="black"
              backgroundColor="white"
              // logo={{ uri: 'https://example.com/logo.png' }}
              logoSize={60}
              logoMargin={2}
              logoBackgroundColor="transparent"
            />
          </View>

        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  qrContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: 160, 
    height: 160, 
  },
  qrCode: {
    position: 'absolute',
    opacity: 0.5,
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 4,
    zIndex: 1,
  },
  profileImageWrapper: {
    position: 'absolute',
    zIndex: 2,
    width: 100, 
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 45,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    zIndex: 2,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  expandedQR: {
    borderWidth: 4,
  },
});
