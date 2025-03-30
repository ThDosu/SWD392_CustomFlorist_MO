import { View, Text, SafeAreaView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import axios from "axios";

import { Header, InputField, Button } from "../components";
import { SAFEAREAVIEW, SIZES } from "../constants";
import { useAuth } from "./context/AuthContext";

export default function ChangePassword() {
  const navigation = useNavigation();
  const { authToken } = useAuth();

  const [userId, setUserId] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (authToken) {
      try {
        const decodedUser = jwtDecode(authToken);
        setUserId(decodedUser.UserID);
      } catch (error) {
        console.error("Lỗi giải mã token:", error);
      }
    }
  }, [authToken]);

  const resetPassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match.");
      return;
    }

    const url = `https://custom-florist.onrender.com/custom-florist/api/v1/users/${userId}/password?oldPassword=${oldPassword}&newPassword=${newPassword}`;

  try { 
    const response = await axios.put(url, null, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });
  
    if (response.status === 200) {
      Alert.alert("Success", response.data.message || "Password changed successfully!", [
        { text: "OK", onPress: () => navigation.navigate("MainLayout") },
      ]);
    } else {
      Alert.alert("Error", response.data?.message || "Failed to reset password.");
    }
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    Alert.alert("Error", error.response?.data?.message || "Network error.");
  }
};  

  function renderContent() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: SIZES.paddingVertical,
          paddingHorizontal: 30,
        }}
      >
        <InputField
          placeholder="Old Password"
          containerStyle={{ marginBottom: 15 }}
          secureTextEntry
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <InputField
          placeholder="New Password"
          containerStyle={{ marginBottom: 15 }}
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <InputField
          placeholder="Confirm Password"
          containerStyle={{ marginBottom: 25 }}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Button title="Save Now!" onPress={resetPassword} />
      </KeyboardAwareScrollView>
    );
  }

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <Header title="Change Password" onPress={() => navigation.goBack()} />
      {renderContent()}
    </SafeAreaView>
  );
}
