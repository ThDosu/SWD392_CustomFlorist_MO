import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "./context/AuthContext";
import "core-js/stable/atob";

import {
  Header,
  ProfileCategory,
  Dollar,
  Store,
  Address,
  Terms,
  Languages,
  Logout,
} from "../components";
import { SAFEAREAVIEW, FONTS, COLORS, SIZES } from "../constants";

export default function Profile() {
  const navigation = useNavigation();
  const { authToken } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({ name: "Shipper" });

  // decode authToken từ token
    useEffect(() => {
      if (authToken) {
        try {
          const decodedUser = jwtDecode(authToken);
          setUser({ name: decodedUser.FullName || "Shipper" });
        } catch (error) {
          console.error("Lỗi giải mã token:", error);
        }
      }
    }, [authToken]);

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: 42,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            ...FONTS.Roboto_500Medium,
            color: COLORS.black,
            textTransform: "capitalize",
          }}
        >
          Profile
        </Text>
      </View>
    );
  }

  function renderProfile() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 30,
          paddingBottom: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("ProfileDetail")}>
          <Image
            source={require("../assets/images/user/shipper1.gif")}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              alignSelf: "center",
              marginTop: 30,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              textAlign: "center",
              ...FONTS.Roboto_700Bold,
              fontSize: 16,
              color: COLORS.green,
              marginBottom: 3,
            }}
          >
            {user.name}
          </Text>
        </TouchableOpacity>

        <ProfileCategory
          icon={require("../assets/icons/profile.png")}
          title="Account"
          subtitle="Personal Information"
          onPress={() => navigation.navigate("ProfileDetail")}
          iconBgColor={COLORS.lightGreen}
        />
        <ProfileCategory
          icon={require("../assets/icons/faq.png")}
          title="FAQ"
          subtitle="frequently questions"
          onPress={() => navigation.navigate("NeedHelp")}
          iconBgColor={COLORS.lightLilac}
        />
        <ProfileCategory
          icon={require("../assets/icons/exit.png")}
          title="Logout"
          iconBgColor={COLORS.lightPink}
          onPress={() => setShowModal(true)}
        />
      </ScrollView>
    );
  }

  function SignOutModal() {
    return (
      <Modal
        isVisible={showModal}
        onBackdropPress={setShowModal}
        hideModalContentWhileAnimating={true}
        backdropTransitionOutTiming={0}
        style={{ margin: 0 }}
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        <View
          style={{
            width: SIZES.width - 60,
            backgroundColor: COLORS.white,
            marginHorizontal: 30,
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 34,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              ...FONTS.Roboto_700Bold,
              fontSize: 16,
              marginBottom: 26,
            }}
          >
            Are you sure you want to Logout ?
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: 130,
                height: 40,
                backgroundColor: COLORS.lightRed,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 7.5,
              }}
              onPress={() => setShowModal(false)}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.Roboto_700Bold,
                  fontSize: 16,
                  color: COLORS.red,
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 130,
                height: 40,
                backgroundColor: COLORS.green,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 7.5,
              }}
              onPress={() => {
                setShowModal(false);
                navigation.navigate("SignIn");
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.Roboto_700Bold,
                  fontSize: 16,
                }}
              >
                Sure
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
      {renderHeader()}
      {renderProfile()}
      {<SignOutModal />}
    </SafeAreaView>
  );
}