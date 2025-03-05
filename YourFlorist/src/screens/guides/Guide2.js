import { View, Text, ScrollView, Image } from "react-native";

export default function Guide2() {
    return (
        <ScrollView style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>Cách giao hàng đúng thời gian</Text>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>
                Để đảm bảo giao hàng đúng thời gian, hãy kiểm tra kỹ thông tin đơn hàng và sắp xếp tuyến đường hợp lý.
            </Text>

            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>Bước 1: Xác nhận thời gian giao hàng</Text>
            <Text>- Kiểm tra thời gian giao hàng dự kiến trên ứng dụng.</Text>
            <Text>- Nếu cần điều chỉnh, hãy liên hệ với khách hàng trước.</Text>

            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10, marginBottom: 5 }}>Bước 2: Sắp xếp lộ trình hợp lý</Text>
            <Text>- Dùng Google Maps hoặc bản đồ trên ứng dụng để tìm đường nhanh nhất.</Text>
            <Text>- Tránh các tuyến đường có thể bị kẹt xe.</Text>
        </ScrollView>
    );
}
