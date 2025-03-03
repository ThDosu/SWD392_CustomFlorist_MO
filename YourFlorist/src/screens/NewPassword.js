import { View, Text, ScrollView } from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import { Header, InputField, Button } from "../components";
import { FONTS, SAFEAREAVIEW, SIZES } from "../constants";

export default function NewPassword() {
    const navigation = useNavigation();

    function renderContent() {
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 30,
                    alignItems: "center",
                    paddingVertical: SIZES.paddingVertical,
                }}
                showsVerticalScrollIndicator={false}
            >
                <Text style={{ ...FONTS.H2, marginBottom: 30 }}>
                    Mật khẩu mới
                </Text>

                <InputField
                    placeholder="Mật khẩu mới"
                    contaynerStyle={{ marginBottom: 15 }}
                />
                <InputField
                    placeholder="Xác nhận lại mật khẩu"
                    contaynerStyle={{ marginBottom: 30 }}
                />
                <Button
                    title="Thay đổi mật khẩu"
                    onPress={() => navigation.navigate("PasswordHasBeenReset")}
                />
            </KeyboardAwareScrollView>
        );
    }

    return (
        <View style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            <Header
                title="Cài lại mật khẩu"
                onPress={() => navigation.goBack()}
            />
            {renderContent()}
        </View>
    );
}
