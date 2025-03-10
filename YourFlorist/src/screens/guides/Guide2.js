import { View, Text, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../../components";
import { COLORS, SAFEAREAVIEW } from "../../constants";

export default function Guide2() {
    const navigation = useNavigation();

    return (
        <View style={{ ...SAFEAREAVIEW.AndroidSafeArea, backgroundColor: COLORS.white }}>
            <Header title="Hướng Dẫn" onPress={() => navigation.goBack()} />

            <ScrollView style={{ flex: 1, padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10, color: COLORS.black }}>
                    Cách giao hàng đúng thời gian
                </Text>
                <Text style={{ fontSize: 16, marginBottom: 10, color: COLORS.darkGray }}>
                    Để đảm bảo giao hàng đúng thời gian, hãy kiểm tra kỹ thông tin đơn hàng và sắp xếp tuyến đường hợp lý.
                </Text>

                <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5, color: COLORS.black }}>
                    Bước 1: Xác nhận thời gian giao hàng
                </Text>
                <Text style={{ fontSize: 16, color: COLORS.darkGray }}>- Kiểm tra thời gian giao hàng dự kiến trên ứng dụng.</Text>
                <Text style={{ fontSize: 16, color: COLORS.darkGray }}>- Nếu cần điều chỉnh, hãy liên hệ với khách hàng trước.</Text>

                <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10, marginBottom: 5, color: COLORS.black }}>
                    Bước 2: Sắp xếp lộ trình hợp lý
                </Text>
                <Text style={{ fontSize: 16, color: COLORS.darkGray }}>- Dùng Google Maps hoặc bản đồ trên ứng dụng để tìm đường nhanh nhất.</Text>
                <Text style={{ fontSize: 16, color: COLORS.darkGray }}>- Tránh các tuyến đường có thể bị kẹt xe.</Text>
            </ScrollView>
        </View>
    );
}
