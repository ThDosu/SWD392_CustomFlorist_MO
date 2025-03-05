import { View, Text, ScrollView, Image } from "react-native";

export default function Guide3() {
    return (
        <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>Hướng dẫn thanh toán và nhận tiền</Text>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>
                Sau khi hoàn thành đơn hàng, bạn có thể nhận thanh toán qua ứng dụng hoặc trực tiếp từ khách hàng.
            </Text>

            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>Bước 1: Kiểm tra số dư tài khoản</Text>
            <Text>- Truy cập mục **Ví tiền** trên ứng dụng.</Text>
            <Text>- Xem số dư và lịch sử giao dịch.</Text>

            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10, marginBottom: 5 }}>Bước 2: Nhận thanh toán</Text>
            <Text>- Nếu khách hàng thanh toán bằng tiền mặt, đảm bảo kiểm tra số tiền nhận được.</Text>
            <Text>- Nếu thanh toán qua ứng dụng, số tiền sẽ tự động cập nhật trong tài khoản.</Text>
        </ScrollView>
    );
}
