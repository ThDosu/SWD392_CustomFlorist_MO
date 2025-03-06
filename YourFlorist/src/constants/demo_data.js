export const orders = [
    {
      id: "1",
      title: "Order #001",
      userImage: "https://randomuser.me/api/portraits/men/1.jpg",
      userName: "Nguyễn Văn A",
      status: "Chưa giao",
    },
    {
      id: "2",
      title: "Order #002",
      userImage: "https://randomuser.me/api/portraits/women/2.jpg",
      userName: "Trần Thị B",
      status: "Đang giao",
    },
    {
      id: "3",
      title: "Order #003",
      userImage: "https://randomuser.me/api/portraits/men/3.jpg",
      userName: "Phạm Văn C",
      status: "Đã giao",
    },
    {
      id: "4",
      title: "Order #004",
      userImage: "https://randomuser.me/api/portraits/women/4.jpg",
      userName: "Lê Thị D",
      status: "Chưa giao",
    },
  ];
  
  export const orderDetails = {
    "1": {
      products: [
        {
          productId: "P001",
          flowers: ["Hoa hồng đỏ", "Hoa baby"],
          unitPrice: 60000,
          bouquetPrice: 120000,
          totalFlowerPrice: 170000,
          finalPrice: 165000,
        },
      ],
      customer: {
        name: "Nguyễn Văn A",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        phone: "0987 123 456",
        email: "nguyenvana@example.com",
        address: "123 Đường ABC, Quận 1, TP.HCM",
      },
    },
    "3": {
      products: [
        {
          productId: "P006",
          flowers: ["Hoa sen", "Hoa lan"],
          unitPrice: 90000,
          bouquetPrice: 180000,
          totalFlowerPrice: 260000,
          finalPrice: 250000,
        },
        {
          productId: "P007",
          flowers: ["Hoa hướng dương", "Hoa cẩm tú cầu"],
          unitPrice: 85000,
          bouquetPrice: 170000,
          totalFlowerPrice: 245000,
          finalPrice: 235000,
        },
      ],
      customer: {
        name: "Phạm Văn C",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
        phone: "0978 654 321",
        email: "phamvanc@example.com",
        address: "789 Đường UVW, Quận 7, TP.HCM",
      },
    },
  };
  
  export const users = {
    "10": {
      id: "10",
      name: "Ngô Minh T",
      avatar: "https://randomuser.me/api/portraits/men/10.jpg",
      phone: "0901 555 666",
      email: "ngominht@example.com",
      address: "567 Đường XYZ, Quận 5, TP.HCM",
    },
    "11": {
      id: "11",
      name: "Lý Thị M",
      avatar: "https://randomuser.me/api/portraits/women/11.jpg",
      phone: "0912 333 444",
      email: "lythim@example.com",
      address: "234 Đường DEF, Quận 3, TP.HCM",
    },
  };
  