import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { InputField, Button, Mail, Lock, Check } from "../components";
import { SAFEAREAVIEW, FONTS, COLORS, SIZES } from "../constants";
import { useAuth } from "./context/AuthContext"; // Import context
import "core-js/stable/atob";


export default function SignInScreen() {
  const navigation = useNavigation();
  const { setAuthToken } = useAuth(); // Lấy setAuthToken từ context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    const loadRememberedUser = async () => {
      const savedEmail = await AsyncStorage.getItem("userEmail");
      const savedPassword = await AsyncStorage.getItem("userPassword");
      if (savedEmail && savedPassword) {
        setEmail(savedEmail);
        setPassword(savedPassword);
      }
    };
    loadRememberedUser();
  }, []);

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Vui lòng nhập email và mật khẩu!");
      return;
    }
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Email không hợp lệ!");
      return;
    }
  
    try {
      const response = await fetch(
        "https://custom-florist.onrender.com/custom-florist/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
  
      const result = await response.json();
  
      if (response.ok) {
        const token = result.data;
        const payload = JSON.parse(atob(token.split(".")[1])); // Giải mã JWT
        const userRole = payload.Role;
  
        // Kiểm tra nếu role là "customer" thì không cho đăng nhập
        if (userRole.toLowerCase() === "customer") {
          alert("Tài khoản của bạn không được phép truy cập!");
          return;
        }
  
        if (remember) {
          await AsyncStorage.setItem("userEmail", email);
          await AsyncStorage.setItem("userPassword", password);
        } else {
          await AsyncStorage.removeItem("userEmail");
          await AsyncStorage.removeItem("userPassword");
        }
  
        setAuthToken(token); // Lưu token vào context
        alert("Đăng nhập thành công!");
        navigation.navigate("MainLayout");
      } else {
        alert(result.message || "Đăng nhập thất bại!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
    }
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
          containerStyle={{ marginBottom: 15 }}
          placeholder="Nhập email của bạn"
          leftIcon={<Mail />}
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password Input */}
        <InputField
          leftIcon={<Lock />}
          placeholder="Nhập mật khẩu của bạn"
          containerStyle={{ marginBottom: 37 }}
          secureTextEntry={!passwordVisible} // Điều chỉnh hiển thị mật khẩu
          value={password}
          onChangeText={(text) => setPassword(text)}
          rightIcon={
            <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
              <Image
                source={
                  passwordVisible
                    ? require("../assets/icons/eye.png") // Icon hiển thị
                    : require("../assets/icons/eye-off.png") // Icon ẩn
                }
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          }
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
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
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