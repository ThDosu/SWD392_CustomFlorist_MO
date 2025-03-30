import { View, TextInput } from "react-native";
import React from "react";
import { COLORS } from "../constants";

export default function InputField({
    containerStyle,
    placeholder,
    leftIcon,
    rightIcon,  // ✅ Hỗ trợ rightIcon
    value,
    onChangeText,
    secureTextEntry,
    keyboardType,
    autoCapitalize,
}) {
    return (
        <View
            style={{
                width: "100%",
                height: 50,
                backgroundColor: COLORS.lightGray,
                borderRadius: 10,
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: 20,
                justifyContent: "space-between", // ✅ Đảm bảo căn chỉnh hợp lý
                ...containerStyle,
            }}
        >
            {/* Hiển thị icon bên trái nếu có */}
            {leftIcon && <View style={{ paddingRight: 14 }}>{leftIcon}</View>}
            
            {/* Ô nhập liệu */}
            <TextInput
                style={{ flex: 1 }}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
            />
            
            {/* Hiển thị icon bên phải nếu có */}
            {rightIcon && (
                <View style={{ paddingLeft: 14 }}>
                    {rightIcon}
                </View>
            )}
        </View>
    );
}
