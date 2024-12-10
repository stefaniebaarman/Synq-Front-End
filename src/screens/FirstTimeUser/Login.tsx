import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { auth, signInWithPhoneNumber, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "./firebaseConfig";

interface AuthProps {
  navigation: any;
}

export const Login = ({  navigation }: AuthProps) => {
  const [code, setCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("")
  const [confirm, setConfirm] = useState<any>(null);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailAuth, setIsEmailAuth] = useState(false); 
  const [isLogin, setIsLogin] = useState(false); 
  const countryCode = "+1";

  const handlePhoneNumberChange = (text: string) => {
    setPhoneNumber(text.startsWith(countryCode) ? text : countryCode + text);
  };

  const sendVerificationCode = async () => {
    try {
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber);
      setConfirm(confirmation);
      setIsCodeSent(true);
    } catch (error: any) {
      Alert.alert("Error", "Failed to send verification code. Please try again.");
    }
  };

  const verifyCode = async () => {
    try {
      await confirm.confirm(code);
      navigation.navigate("StepTwo");
    } catch (error) {
      Alert.alert("Error", "Incorrect verification code. Please try again.");
    }
  };

  const handleEmailSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match", "Please ensure both passwords are identical.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Sign up successful!", "Your account has been created.");
      navigation.navigate("StepTwo", { user: userCredential.user });
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Login successful!", "Welcome back.");
      navigation.replace("Returning", { user: userCredential.user });
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View className="w-full items-center mt-8">
      {!isEmailAuth ? (
        <>
          {!isCodeSent ? (
            <>
              <Text style={{ color: "white" }}>Enter your phone number to receive the code</Text>
              <TextInput
                value={phoneNumber}
                onChangeText={handlePhoneNumberChange}
                placeholder="Enter phone number"
                className="border border-gray-400 p-2 w-full mt-4"
                style={{ color: "white" }}
                keyboardType="phone-pad"
              />
              <TouchableOpacity onPress={sendVerificationCode} className="bg-purple-600 px-4 py-2 rounded mt-4">
                <Text className="text-white">Send Code</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={{ color: "white" }}>Enter the code sent to your phone</Text>
              <TextInput
                value={code}
                onChangeText={setCode}
                placeholder="Enter code"
                className="border border-gray-400 p-2 w-full mt-4"
                style={{ color: "white" }}
                keyboardType="number-pad"
              />
              <TouchableOpacity onPress={verifyCode} className="bg-green-600 px-4 py-2 rounded mt-4">
                <Text className="text-white">Confirm Code</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      ) : (
        <>
          <Text style={{ color: "white" }}>{isLogin ? "Log In" : "Sign Up"}</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            className="border border-gray-400 p-2 w-full mt-4"
            style={{ color: "white" }}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry
            className="border border-gray-400 p-2 w-full mt-4"
            style={{ color: "white" }}
          />
          {!isLogin && (
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm password"
              secureTextEntry
              className="border border-gray-400 p-2 w-full mt-4"
              style={{ color: "white" }}
            />
          )}
          <TouchableOpacity
            onPress={isLogin ? handleEmailLogin : handleEmailSignUp}
            className={`bg-${isLogin ? "blue" : "purple"}-600 px-4 py-2 rounded mt-4`}
          >
            <Text className="text-white">{isLogin ? "Log In" : "Sign Up"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)} className="bg-gray-600 px-4 py-2 rounded mt-4">
            <Text className="text-white">{isLogin ? "Switch to Sign Up" : "Already have an account? Sign in"}</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity onPress={() => setIsEmailAuth(!isEmailAuth)} className="bg-gray-600 px-4 py-2 rounded mt-4">
        <Text className="text-white">{isEmailAuth ? "Switch to Phone Sign-Up" : "Use Email Instead"}</Text>
      </TouchableOpacity>
    </View>
  );
};
