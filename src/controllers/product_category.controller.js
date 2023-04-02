const dayjs = require("dayjs");
const { statusProductCategory } = require("../enum/product_category.enum");
const { typeRole } = require("../enum/role.enum");
const ProductCategoryLog = require("../models/product_category.log.model");
const ProductCategory = require("../models/product_category.model");

//#region ProductCategory
const getAllProductCategory = async (req, res, next) => {
    try {
        const { download } = req.body;
        const productCategory = await ProductCategory.findAll({
            order: [
                ["createdAt", "DESC"],
                [
                    "createdAt",
                    "DESC",
                ],
            ],
        })
        return res.status(200).json({
            message: "success",
            status_code: 200,
            data: productCategory,
        });
    } catch (error) { 
        return res.status(500).json({
            msg: "server_err",
            status_code: 500,
        });
    }
};
const getProductCategoryByID = async (req, res, next) => {
    try {
        const { id } = req.params;

        const member = await ProductCategory.findByPk(id);
        return res.status(200).json({
            message: "success",
            status_code: 200,
            data: member,
        });
    } catch (error) {
        return res.status(500).json({
            msg: "err_server",
            status_code: 500,
        });
    }
};
//#endregion

//#region Post/Put
const postProductCategory = async (req, res, next) => {
    const { title, status } = req.body; 
    const member = req.user
    try {
        const product_category = await ProductCategory.create({
            title,
            status: status ?? statusProductCategory.new.id
        });
        await product_category.save();
        const product_categoryLog = await ProductCategoryLog.create({
            column: "status",
            product_category_id: product_category.id,
            creator: {
                id: member.id,
                fullname: member.fullname,
                email: member.email,
            },
            new_data: {
                status: statusProductCategory.new.id
            }
        });
        await product_categoryLog.save();

        return res.status(200).json({ msg: "success", status_code: 200, data: product_category });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "server_err", status_code: 500 });
    }

};

const updateProductCategory = async (req, res, next) => {
    const { id } = req.params;
    const data = await ProductCategory.findByPk(id);

    if (!data) {
        return res.status(404).json({
            status_code: 404,
            error: "Không tìm thấy danh mục sản phẩm",
        });
    }
    try {
        const result = await data.update(
            {
                ...req.body
            }
        );
        await result.save();

        return res.status(200).json({ msg: "success", status_code: 200, data: data });
    } catch (error) {
        return res.status(500).json({ msg: "server_err", status_code: 500 });
    };

};
//#endregion


module.exports = {
    getAllProductCategory,
    getProductCategoryByID,
    postProductCategory,
    updateProductCategory
};
