const statusProduct = {
    new: {
        id: 1,
        label: 'Mới tạo'
    },
    active: {
        id: 2,
        label: "Đang hoạt động"
    },
    unactive: {
        id: -2,
        label: "Ngưng hoạt động"
    }
}

const listStatusProduct  = Object.values(statusProduct)
module.exports = {
    statusProduct,
    listStatusProduct
}