export const orders = [
    {
        id: "1",
        title: "Order #001",
        userImage: "https://randomuser.me/api/portraits/men/1.jpg",
        userName: "Nguyễn Văn A",
        status: "Pending",
    },
    {
        id: "2",
        title: "Order #002",
        userImage: "https://randomuser.me/api/portraits/women/2.jpg",
        userName: "Trần Thị B",
        status: "Shipped",
    },
    {
        id: "3",
        title: "Order #003",
        userImage: "https://randomuser.me/api/portraits/men/3.jpg",
        userName: "Phạm Văn C",
        status: "Delivered",
    },
    {
        id: "4",
        title: "Order #004",
        userImage: "https://randomuser.me/api/portraits/women/4.jpg",
        userName: "Lê Thị D",
        status: "Cancelled",
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
        orderStatus: "Pending",
    },
    "2": {
        products: [
            {
                productId: "P002",
                flowers: ["Hoa cúc", "Hoa ly"],
                unitPrice: 70000,
                bouquetPrice: 140000,
                totalFlowerPrice: 190000,
                finalPrice: 185000,
            },
        ],
        customer: {
            name: "Trần Thị B",
            image: "https://randomuser.me/api/portraits/women/2.jpg",
            phone: "0965 432 210",
            email: "tranthib@example.com",
            address: "456 Đường LMN, Quận 2, TP.HCM",
        },
        orderStatus: "Shipped",
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
        orderStatus: "Delivered",
    },
    "4": {
        products: [
            {
                productId: "P008",
                flowers: ["Hoa lan tím", "Hoa cẩm chướng"],
                unitPrice: 75000,
                bouquetPrice: 150000,
                totalFlowerPrice: 210000,
                finalPrice: 205000,
            },
        ],
        customer: {
            name: "Lê Thị D",
            image: "https://randomuser.me/api/portraits/women/4.jpg",
            phone: "0932 789 555",
            email: "lethid@example.com",
            address: "159 Đường RST, Quận 4, TP.HCM",
        },
        orderStatus: "Cancelled",
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
        gender: "male",
        dateOfBirth: "1995-08-15"
    },
    "11": {
        id: "11",
        name: "Lý Thị M",
        avatar: "https://randomuser.me/api/portraits/women/11.jpg",
        phone: "0912 333 444",
        email: "lythim@example.com",
        address: "234 Đường DEF, Quận 3, TP.HCM",
        gender: "female",
        dateOfBirth: "1998-04-22"
    },
    "12": {
        id: "12",
        name: "Trần Văn B",
        avatar: "https://randomuser.me/api/portraits/men/12.jpg",
        phone: "0987 654 321",
        email: "tranvanb@example.com",
        address: "789 Đường LMN, Quận 1, TP.HCM",
        gender: "male",
        dateOfBirth: "1992-12-10"
    },
    "13": {
        id: "13",
        name: "Phạm Thu H",
        avatar: "https://randomuser.me/api/portraits/women/13.jpg",
        phone: "0934 567 890",
        email: "phamthuh@example.com",
        address: "123 Đường PQR, Quận 7, TP.HCM",
        gender: "female",
        dateOfBirth: "2000-06-05"
    }
};

/**
 * Hàm lấy thông tin user theo ID
 * @param {string} id - ID của user
 * @returns {object|null} - Trả về thông tin user hoặc null nếu không tìm thấy
 */
export const getUserById = (id) => {
    return users[id] || null;
};
