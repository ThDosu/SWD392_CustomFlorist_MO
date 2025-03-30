import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Modal from "react-native-modal";
import "core-js/stable/atob";

import { COLORS, FONTS, SAFEAREAVIEW, SIZES } from "../constants";
import { Header, InputField, Button } from "../components";

export default function ForgotPassword() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = async () => {
        if (!email) {
            Alert.alert("Lỗi", "Vui lòng nhập địa chỉ email.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(
                `https://custom-florist.onrender.com/custom-florist/api/v1/users/reset-password/request?email=${encodeURIComponent(email)}`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                    },
                }
            );

            const data = await response.json();
            if (response.ok && data.status === "OK") {
                setShowModal(true);
            } else {
                Alert.alert("Lỗi", data.message || "Có lỗi xảy ra, vui lòng thử lại.");
            }
        } catch (error) {
            Alert.alert("Lỗi", "Không thể kết nối đến máy chủ.");
        } finally {
            setLoading(false);
        }
    };

    function renderContent() {
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 30,
                    paddingVertical: SIZES.paddingVertical,
                }}
                showsVerticalScrollIndicator={false}
            >
                <Text
                    style={{
                        textAlign: "center",
                        ...FONTS.Roboto_400Regular,
                        fontSize: 16,
                        color: COLORS.gray2,
                        marginBottom: 25,
                        lineHeight: 16 * 1.5,
                    }}
                >
                    Vui lòng nhập địa chỉ email của bạn. Bạn sẽ nhận được một liên kết
                    để tạo mật khẩu mới qua email.
                </Text>
                <InputField
                    placeholder="Địa chỉ Email"
                    containerStyle={{ marginBottom: 30 }}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <Button title={loading ? "Đang gửi..." : "Gửi"} onPress={handleForgotPassword} disabled={loading} />
            </KeyboardAwareScrollView>
        );
    }

    function EmailSentModal() {
        return (
            <Modal
                isVisible={showModal}
                onBackdropPress={() => {
                    setShowModal(false);
                    navigation.navigate("SignIn"); // Điều hướng về trang đăng nhập
                }}
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
                    }}
                >
                    <View
                        style={{
                            backgroundColor: COLORS.green,
                            height: 50,
                            justifyContent: "center",
                            alignItems: "center",
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }}
                    >
                        <Text
                            style={{
                                color: COLORS.white,
                                ...FONTS.Roboto_700Bold,
                                fontSize: 20,
                            }}
                        >
                            Kiểm Tra Email
                        </Text>
                    </View>
                    <View
                        style={{ paddingVertical: 24, paddingHorizontal: 60 }}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                marginBottom: 24,
                                color: COLORS.gray2,
                                ...FONTS.Roboto_400Regular,
                                fontSize: 14,
                            }}
                        >
                            Một email đã được gửi đến bạn.
                            Hãy làm theo hướng dẫn trong email để đặt lại mật khẩu.
                        </Text>
                        <TouchableOpacity
                            style={{
                                width: 190,
                                height: 41,
                                backgroundColor: COLORS.green,
                                borderRadius: 25,
                                justifyContent: "center",
                                alignItems: "center",
                                alignSelf: "center",
                            }}
                            onPress={() => {
                                setShowModal(false);
                                navigation.navigate("SignIn"); // Điều hướng về SignIn
                            }}
                        >
                            <Text
                                style={{
                                    ...FONTS.Roboto_700Bold,
                                    fontSize: 16,
                                    color: COLORS.white,
                                    textTransform: "uppercase",
                                }}
                            >
                                OK
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

    return (
        <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            <Header
                title="Quên Mật Khẩu"
                onPress={() => navigation.goBack()}
            />
            {renderContent()}
            <EmailSentModal />
        </SafeAreaView>
    );
}
