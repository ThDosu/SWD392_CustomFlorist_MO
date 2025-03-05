import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FlashMessage from "react-native-flash-message";

import {
    SignIn,
    FavoriteList,
    Profile,
    MainLayout,
    Home,
    NeedHelp,
    ForgotPassword,
    NewPassword,
    PasswordHasBeenReset,
    Guide1,
    Guide2,
    Guide3,
    GuideDetail,
    Order,
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
                <Stack.Screen name="FavoriteList" component={FavoriteList} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="MainLayout" component={MainLayout} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="NeedHelp" component={NeedHelp} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="NewPassword" component={NewPassword} />
                <Stack.Screen name="PasswordHasBeenReset" component={PasswordHasBeenReset} />
                <Stack.Screen name="Guide1" component={Guide1} />
                <Stack.Screen name="Guide2" component={Guide2} />
                <Stack.Screen name="Guide3" component={Guide3} />
                <Stack.Screen name="GuideDetail" component={GuideDetail} />
                <Stack.Screen name="Order" component={Order} />
            </Stack.Navigator>
            <FlashMessage position="top" />
        </NavigationContainer>
    );
}
