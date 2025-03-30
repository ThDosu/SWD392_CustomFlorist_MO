import {
  View,
  Alert,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { jwtDecode } from "jwt-decode"; // Sửa lỗi import
import "core-js/stable/atob";

import { EditProfileCategory, Header, Button } from "../components";
import { SAFEAREAVIEW, COLORS, SIZES } from "../constants";
import { useAuth } from "./context/AuthContext";

export default function EditProfile() {
  const navigation = useNavigation();
  const { authToken } = useAuth();

  const [isEditingName, setIsEditingName] = useState(false);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  // Lấy thông tin user từ token và fetch dữ liệu user
  useEffect(() => {
    if (!authToken) return;
    try {
      const decodedUser = jwtDecode(authToken);
      if (decodedUser?.UserID) {
        fetchUserInfo(decodedUser.UserID);
      } else {
        console.error("Không tìm thấy UserID trong token.");
      }
    } catch (error) {
      console.error("Lỗi giải mã token:", error);
    }
  }, [authToken]);

  const fetchUserInfo = async (userId) => {
    try {
      const response = await fetch(
        `https://custom-florist.onrender.com/custom-florist/api/v1/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUser(data.data);
        setName(data.data.name);
        setPhone(data.data.phone);
        setGender(data.data.gender);
        setAddress(data.data.address);
      } else {
        console.error("Lỗi lấy thông tin user:", data);
      }
    } catch (error) {
      console.error("Lỗi kết nối API user:", error);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user?.id) {
      Alert.alert("Error", "User ID not found!");
      return;
    }

    const updatedProfile = {
      name,
      phone,
      address,
      gender,
    };

    console.log("Sending data:", JSON.stringify(updatedProfile)); // ✅ Debug dữ liệu gửi đi

    try {
      const response = await fetch(
        `https://custom-florist.onrender.com/custom-florist/api/v1/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(updatedProfile),
        }
      );

      const data = await response.json();
      console.log("Response data:", data); // ✅ Debug phản hồi từ API

      if (response.ok) {
        Alert.alert("Success", "Profile updated successfully!");
        navigation.goBack();
      } else {
        Alert.alert("Error", data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Network error.");
    }
  };

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      {/* Header */}
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 30,
          flexGrow: 1,
          paddingVertical: SIZES.paddingVertical,
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Form chỉnh sửa thông tin */}
        {/* <EditProfileCategory
          title="Full name"
          placeholder={user?.name || "Enter your name"}
          value={name}
          editable={isEditingName}
          onPress={() => setIsEditingName(true)}
          onChangeText={setName}
        />
        <EditProfileCategory
          title="Telephone number"
          placeholder={user?.phone || "Enter your phone number"}
          value={phone}
          editable={isEditingName}
          onPress={() => setIsEditingName(true)}
          onChangeText={setPhone}
        />
        <EditProfileCategory
          title="Gender"
          placeholder={user?.gender || "Enter gender"}
          value={gender}
          editable={isEditingName}
          onPress={() => setIsEditingName(true)}
          onChangeText={setGender}
        />
        <EditProfileCategory
          title="Address"
          placeholder={user?.address || "Enter Address"}
          value={address}
          editable={isEditingName}
          onPress={() => setIsEditingName(true)}
          onChangeText={setAddress}
        /> */}
        <EditProfileCategory
    title="Full name"
    placeholder={user?.name || "Enter your name"}
    value={name}
    editable={isEditingName}
    onPress={() => setIsEditingName(true)}
    onChangeText={setName}
/>
<EditProfileCategory
    title="Telephone number"
    placeholder={user?.phone || "Enter your phone number"}
    value={phone}
    editable={isEditingName}
    onPress={() => setIsEditingName(true)}
    onChangeText={setPhone}
/>
<EditProfileCategory
    title="Gender"
    placeholder={user?.gender || "Enter gender"}
    value={gender}
    editable={isEditingName}
    onPress={() => setIsEditingName(true)}
    onChangeText={setGender}
/>
<EditProfileCategory
    title="Address"
    placeholder={user?.address || "Enter Address"}
    value={address}
    editable={isEditingName}
    onPress={() => setIsEditingName(true)}
    onChangeText={setAddress}
/>


        {/* Nút cập nhật */}
        <Button
          title="Update Now"
          containerStyle={{
            backgroundColor: COLORS.green,
            marginBottom: 20,
          }}
          onPress={handleUpdateProfile}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
