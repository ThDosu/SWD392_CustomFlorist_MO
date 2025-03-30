// import { View, Text, TextInput } from "react-native";
// import React from "react";

// import { COLORS, FONTS, SIZES } from "../constants";

// export default function EditProfileCategory({ title, placeholder }) {
//     return (
//         <View style={{ width: "100%", marginBottom: 18 }}>
//             <Text
//                 style={{
//                     ...FONTS.Roboto_400Regular,
//                     fontSize: 14,
//                     color: COLORS.black,
//                     marginBottom: 10,
//                     textTransform: "capitalize",
//                 }}
//             >
//                 {title}
//             </Text>
//             <View
//                 style={{
//                     width: "100%",
//                     height: 44,
//                     backgroundColor: COLORS.lightGray,
//                     borderRadius: 10,
//                     paddingHorizontal: 18,
//                     justifyContent: "center",
//                 }}
//             >
//                 <TextInput placeholder={placeholder} style={{ flex: 1 }} />
//             </View>
//         </View>
//     );
// }

import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";

import { COLORS, FONTS, SIZES } from "../constants";

export default function EditProfileCategory({ 
    title, 
    placeholder, 
    value, 
    onChangeText, 
    editable = false, 
    onPress 
}) {
    return (
        <View style={{ width: "100%", marginBottom: 18 }}>
            <Text
                style={{
                    ...FONTS.Roboto_400Regular,
                    fontSize: 14,
                    color: COLORS.black,
                    marginBottom: 10,
                    textTransform: "capitalize",
                }}
            >
                {title}
            </Text>
            <TouchableOpacity 
                activeOpacity={editable ? 1 : 0.7} // Nếu không thể edit, cho phép nhấn để kích hoạt
                onPress={onPress} // Kích hoạt chế độ chỉnh sửa
                style={{
                    width: "100%",
                    height: 44,
                    backgroundColor: editable ? COLORS.white : COLORS.lightGray,
                    borderRadius: 10,
                    paddingHorizontal: 18,
                    justifyContent: "center",
                    borderWidth: editable ? 1 : 0,
                    borderColor: COLORS.gray,
                }}
            >
                <TextInput 
                    placeholder={placeholder} 
                    value={value} 
                    onChangeText={onChangeText} 
                    editable={editable} 
                    style={{ flex: 1, color: COLORS.black }}
                />
            </TouchableOpacity>
        </View>
    );
}

