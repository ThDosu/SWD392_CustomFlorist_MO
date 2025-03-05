import { View, Text, ScrollView, Image } from "react-native";

export default function Guide1() {
    return (
        <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>Cách nhận đơn hàng mới</Text>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>
                Để nhận đơn hàng mới, bạn cần mở ứng dụng, đăng nhập vào tài khoản và truy cập mục **Đơn hàng**.
            </Text>

            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>Bước 1: Mở ứng dụng</Text>
            <Text>- Đăng nhập vào tài khoản của bạn.</Text>
            <Text>- Chọn mục **Đơn hàng mới** từ menu chính.</Text>

            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10, marginBottom: 5 }}>Bước 2: Xác nhận đơn hàng</Text>
            <Text>- Nhấn vào đơn hàng để xem chi tiết.</Text>
            <Text>- Nhấn nút **Xác nhận đơn hàng** để nhận đơn.</Text>
        </ScrollView>
    );
}
