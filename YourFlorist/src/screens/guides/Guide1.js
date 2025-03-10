import { View, Text, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../../components";
import { COLORS, SAFEAREAVIEW } from "../../constants";

export default function Guide1() {
  const navigation = useNavigation();

  return (
    <View style={{ ...SAFEAREAVIEW.AndroidSafeArea, backgroundColor: COLORS.white }}>
      <Header title="Hướng Dẫn" onPress={() => navigation.goBack()} />

      <ScrollView style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10, color: COLORS.black }}>
          Cách nhận đơn hàng mới
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 10, color: COLORS.darkGray }}>
          Để nhận đơn hàng mới, bạn cần mở ứng dụng, đăng nhập vào tài khoản và truy cập mục <Text style={{ fontWeight: "bold" }}>Đơn hàng</Text>.
        </Text>

        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5, color: COLORS.black }}>
          Bước 1: Mở ứng dụng
        </Text>
        <Text style={{ fontSize: 16, color: COLORS.darkGray }}>- Đăng nhập vào tài khoản của bạn.</Text>
        <Text style={{ fontSize: 16, color: COLORS.darkGray }}>- Chọn mục <Text style={{ fontWeight: "bold" }}>Đơn hàng mới</Text> từ menu chính.</Text>

        <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10, marginBottom: 5, color: COLORS.black }}>
          Bước 2: Xác nhận đơn hàng
        </Text>
        <Text style={{ fontSize: 16, color: COLORS.darkGray }}>- Nhấn vào đơn hàng để xem chi tiết.</Text>
        <Text style={{ fontSize: 16, color: COLORS.darkGray }}>- Nhấn nút <Text style={{ fontWeight: "bold" }}>Xác nhận đơn hàng</Text> để nhận đơn.</Text>
      </ScrollView>
    </View>
  );
}
