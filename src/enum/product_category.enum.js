const statusProductCategory = {
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

const listStatusProductCategory  = Object.values(statusProductCategory)
module.exports = {
    statusProductCategory,
    listStatusProductCategory
}