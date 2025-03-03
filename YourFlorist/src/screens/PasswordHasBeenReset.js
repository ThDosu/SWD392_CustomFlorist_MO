import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Key, Button } from "../components";
import { COLORS, FONTS, SAFEAREAVIEW, SIZES } from "../constants";

export default function PasswordHasBeenReset() {
    const navigation = useNavigation();

    function renderCOntent() {
        return (
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingHorizontal: 30,
                    paddingVertical: SIZES.paddingVertical,
                }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ marginBottom: 36 }}>
                    <Key />
                </View>
                <Text
                    style={{
                        ...FONTS.H2,
                        marginBottom: 10,
                    }}
                >
                    Mật khẩu đã được thiết lập lại
                </Text>
                <Text
                    style={{
                        ...FONTS.H4,
                    }}
                >
                    Mật khẩu của bạn đã được cập nhật thành công.
                    Vui lòng sử dụng mật khẩu mới để đăng nhập vào tài khoản của bạn.
                </Text>
                <View style={{ height: SIZES.height / 5 }} />
                <Button
                    title="Hoàn Thành"
                    onPress={() => navigation.navigate("SignIn")}
                />
            </ScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            {renderCOntent()}
        </SafeAreaView>
    );
}
