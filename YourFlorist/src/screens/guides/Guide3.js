import { View, Text, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../../components";
import { COLORS, SAFEAREAVIEW } from "../../constants";

export default function Guide3() {
    const navigation = useNavigation();

    return (
        <View style={{ ...SAFEAREAVIEW.AndroidSafeArea, backgroundColor: COLORS.white }}>
            <Header title="Hướng Dẫn" onPress={() => navigation.goBack()} />

            <ScrollView style={{ flex: 1, padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10, color: COLORS.black }}>
                    Hướng dẫn thanh toán và nhận tiền
                </Text>
                <Text style={{ fontSize: 16, marginBottom: 10, color: COLORS.darkGray }}>
                    Sau khi hoàn thành đơn hàng, bạn có thể nhận thanh toán qua ứng dụng hoặc trực tiếp từ khách hàng.
                </Text>

                <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5, color: COLORS.black }}>
                    Bước 1: Kiểm tra số dư tài khoản
                </Text>
                <Text style={{ fontSize: 16, color: COLORS.darkGray }}>- Truy cập mục <Text style={{ fontWeight: "bold" }}>Ví tiền</Text> trên ứng dụng.</Text>
                <Text style={{ fontSize: 16, color: COLORS.darkGray }}>- Xem số dư và lịch sử giao dịch.</Text>

                <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10, marginBottom: 5, color: COLORS.black }}>
                    Bước 2: Nhận thanh toán
                </Text>
                <Text style={{ fontSize: 16, color: COLORS.darkGray }}>- Nếu khách hàng thanh toán bằng tiền mặt, đảm bảo kiểm tra số tiền nhận được.</Text>
                <Text style={{ fontSize: 16, color: COLORS.darkGray }}>- Nếu thanh toán qua ứng dụng, số tiền sẽ tự động cập nhật trong tài khoản.</Text>
            </ScrollView>
        </View>
    );
}

