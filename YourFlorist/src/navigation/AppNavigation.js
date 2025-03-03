import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FlashMessage from "react-native-flash-message";

import {
    SignIn,
    CartIsEmpty,
    FavoriteList,
    Profile,
    MainLayout,
    Home,
    NeedHelp,
    ForgotPassword,
    NewPassword,
    PasswordHasBeenReset,
} from "../screens";

const Stack = createStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0,
                    },
                    headerShown: false,
                }}
                initialRouteName="SignIn"
            >
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="CartIsEmpty" component={CartIsEmpty} />
                <Stack.Screen name="FavoriteList" component={FavoriteList} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="MainLayout" component={MainLayout} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="NeedHelp" component={NeedHelp} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="NewPassword" component={NewPassword} />
                <Stack.Screen name="PasswordHasBeenReset" component={PasswordHasBeenReset} />
            </Stack.Navigator>
            <FlashMessage position="top" />
        </NavigationContainer>
    );
}
