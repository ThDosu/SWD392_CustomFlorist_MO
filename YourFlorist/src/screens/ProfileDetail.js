import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

import { Header, Button } from "../components";
import { SAFEAREAVIEW, FONTS, COLORS, SIZES } from "../constants";
import { useAuth } from "./context/AuthContext";

export default function ProfileDetail() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const { authToken } = useAuth();

  // Decode authToken để lấy userId
  useEffect(() => {
    if (authToken) {
      try {
        const decodedUser = jwtDecode(authToken);
        const userId = decodedUser.UserID;
        fetchUserInfo(userId);
      } catch (error) {
        console.error("Lỗi giải mã token:", error);
      }
    }
  }, [authToken]);

  const fetchUserInfo = async (userId) => {
    if (!authToken) return;
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
      } else {
        console.error("Lỗi lấy thông tin user:", data);
      }
    } catch (error) {
      console.error("Lỗi kết nối API user:", error);
    }
  };

  if (!user) {
    return (
      <SafeAreaView
        style={{
          ...SAFEAREAVIEW.AndroidSafeArea,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={COLORS.green} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <Header title="Profile Details" onPress={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 30,
          flexGrow: 1,
          paddingVertical: SIZES.paddingVertical,
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Ảnh đại diện */}
        <View style={{ width: "100%", alignItems: "center", marginBottom: 30 }}>
          <Image
            source={require("../../src/assets/images/user/shipper1.gif")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              ...FONTS.Roboto_700Bold,
              fontSize: 18,
              color: COLORS.black,
            }}
          >
            {user.name || "Shipper"}
          </Text>
        </View>

        {/* Thông tin người dùng */}
        <InfoItem title="Full Name" value={user.name} />
        <InfoItem title="Telephone Number" value={user.phone} />
        <InfoItem title="Email" value={user.email} />
        <InfoItem title="Address" value={user.address} />
        <InfoItem title="Gender" value={user.gender} />

        {/* Nút chỉnh sửa */}
        <Button
          title="Edit Profile"
          containerStyle={{ backgroundColor: COLORS.green, marginBottom: 20 }}
          onPress={() => navigation.navigate("EditProfile")}
        />

        <Button
          title="Change Password"
          containerStyle={{ backgroundColor: COLORS.red, marginBottom: 20 }}
          onPress={() => navigation.navigate("ChangePassword")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * Component hiển thị thông tin từng mục
 */
const InfoItem = ({ title, value }) => (
  <View style={{ marginBottom: 20, width: "100%" }}>
    <Text
      style={{ ...FONTS.Roboto_700Bold, fontSize: 18, color: COLORS.black }}
    >
      {title}
    </Text>
    <Text
      style={{ ...FONTS.Roboto_400Regular, fontSize: 16, color: COLORS.gray }}
    >
      {value || "N/A"}
    </Text>
  </View>
);
