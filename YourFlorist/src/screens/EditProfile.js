import {
    View,
    TextInput,
    ScrollView,
    SafeAreaView,
    Text,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { EditProfileCategory, Header, Button } from "../components";
import { SAFEAREAVIEW, FONTS, COLORS, SIZES } from "../constants";

export default function EditProfile() {
    const navigation = useNavigation();

    function renderContent() {
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    paddingHorizontal: 30,
                    flexGrow: 1,
                    paddingVertical: SIZES.paddingVertical,
                }}
                showsVerticalScrollIndicator={false}
            >
                <EditProfileCategory
                    title="Full name"
                    placeholder="Jhon Smith"
                />
                <EditProfileCategory
                    title="Telephone number"
                    placeholder="0123 456 789"
                />
                <EditProfileCategory
                    title="Date of birth"
                    placeholder="Enter date of birth"
                />
                <EditProfileCategory
                    title="Gender"
                    placeholder="Enter gender"
                />
                <EditProfileCategory
                    title="Address"
                    placeholder="Enter Address"
                />
                <View style={{ width: "100%", marginBottom: 45 }}>
                    <Text
                        style={{
                            ...FONTS.Roboto_400Regular,
                            fontSize: 14,
                            color: COLORS.black,
                            marginBottom: 10,
                            textTransform: "capitalize",
                        }}
                    >
                        Photo
                    </Text>
                    <TouchableOpacity
                        style={{
                            width: "100%",
                            height: 44,
                            backgroundColor: COLORS.lightGray,
                            borderRadius: 10,
                            paddingHorizontal: 18,
                            justifyContent: "center",
                            borderStyle: "dashed",
                            borderWidth: 1,
                            borderColor: COLORS.gray2,
                        }}
                    >
                        <Text
                            style={{
                                ...FONTS.Roboto_400Regular,
                                fontSize: 14,
                                color: COLORS.gray2,
                            }}
                        >
                            Upload Photo
                        </Text>
                    </TouchableOpacity>
                </View>
                <Button
                    title="Update Now"
                    containerStyle={{
                        backgroundColor: COLORS.green,
                        marginBottom: 20,
                    }}
                    onPress={() => navigation.goBack()}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate("ChangePassword")}
                >
                    <Text
                        style={{
                            ...FONTS.Roboto_400Regular,
                            fontSize: 16,
                            textAlign: "center",
                            color: COLORS.green,
                        }}
                    >
                        Change Password
                    </Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        );
    }

    return (
        <SafeAreaView style={{ ...SAFEAREAVIEW.AndroidSafeArea }}>
            <Header title="Edit Profile" onPress={() => navigation.goBack()} />
            {renderContent()}
        </SafeAreaView>
    );
}
