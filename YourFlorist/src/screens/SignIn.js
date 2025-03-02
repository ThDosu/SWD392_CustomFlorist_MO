import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { InputField, Button, Mail, Lock, Check } from "../components";
import { SAFEAREAVIEW, FONTS, COLORS, SIZES, IMAGES } from "../constants";

export default function SignInScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSignIn = () => {
    console.log("Signing in with:", email, password);
    navigation.navigate("MainLayout");
  };

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 30,
          alignItems: "center",
          paddingTop: SIZES.paddingTop_02,
        }}
      >
        {/* Logo */}
        <Image
          // source={require("C:/Users/phaml/OneDrive/Documents/SWD392 - PhuongLHK/YourFlorist/assets/Logo.png")} 
          source={require("../assets/Logo.png")}
          style={{ width: 400, height: 200, marginBottom: 20 }}
          resizeMode="contain"
        />
        
        <Text
          style={{
            fontSize: 22,
            marginBottom: 5,
            ...FONTS.Roboto_700Bold,
            color: COLORS.green,
            textTransform: "capitalize",
            textAlign: "center",
            lineHeight: 22 * 1.2,
          }}
        >
          Chào mừng trở lại!
        </Text>
        <Text
          style={{
            ...FONTS.Roboto_400Regular,
            fontSize: 16,
            color: COLORS.gray2,
            marginBottom: 37,
            textAlign: "center",
          }}
        >
          Đăng nhập để tiếp tục
        </Text>

        {/* Email Input */}
        <InputField
          contaynerStyle={{ marginBottom: 15 }}
          placeholder="Nhập email của bạn"
          leftIcon={<Mail />}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password Input */}
        <InputField
          leftIcon={<Lock />}
          placeholder="Nhập mật khẩu của bạn"
          contaynerStyle={{ marginBottom: 37 }}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        {/* Remember Me & Forgot Password */}
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: 20,
            marginBottom: 18,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => setRemember(!remember)}
          >
            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: 3,
                borderWidth: 1,
                borderColor: COLORS.green,
                marginRight: 8,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {remember && <Check />}
            </View>
            <Text
              style={{
                ...FONTS.Roboto_400Regular,
                fontSize: 16,
                color: COLORS.black,
              }}
            >
              Ghi nhớ tôi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
            <Text
              style={{
                ...FONTS.Roboto_400Regular,
                fontSize: 16,
                color: COLORS.carrot,
                paddingRight: 20,
              }}
            >
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Button */}
        <Button
          title="Đăng nhập"
          containerStyle={{ backgroundColor: COLORS.green }}
          onPress={handleSignIn}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}