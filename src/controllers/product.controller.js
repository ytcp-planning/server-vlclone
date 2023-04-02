const { statusProduct } = require("../enum/product.enum");
const { statusProductCategory } = require("../enum/product_category.enum");
const ProductLog = require("../models/product.log.model");
const Product = require("../models/product.model");
const ProductCategory = require("../models/product_category.model");

//#region Product
const getAllProduct = async (req, res, next) => {
    try {
        const { download } = req.body;
        const product = await Product.findAll({
            include: [
                {
                    model: ProductCategory,
                    as: "ProductCategory",
                    attributes: ["title"],
                },
            ],
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
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            msg: "server_err",
            status_code: 500,
        });
    }
};
const getProductByID = async (req, res, next) => {
    try {
        const { id } = req.params;

        const member = await Product.findByPk(id);
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
const postProduct = async (req, res, next) => {
    const { title, status, category_id, list_service } = req.body;
    const member = req.user
    try {
        const product_category = await ProductCategory.findByPk(category_id);
        if (!product_category) {
            return res.status(400).json({ msg: "Danh mục không tồn tại", status_code: 400 });
        }
        if (product_category.status !== statusProductCategory.active.id) {
            return res.status(422).json({ msg: "Danh mục chưa được kích hoạt.", status_code: 422 });
        } 
        const product = await Product.create({
            title,
            list_service,
            category_id: category_id,
            status: status ?? statusProduct.new.id
        });
        const productLog = await ProductLog.create({
            column: "status",
            product_id: product.id,
            creator: {
              id: member.id,
              title: member.fullname,
              email: member.email,
            },
            new_data: {
              status: product.status
            }
        })
        await productLog.save()
        await product.save()
        return res.status(200).json({ msg: "success", status_code: 200, data: { ...product.dataValues, category_info: product_category } });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "server_err", status_code: 500 });
    }

};

const updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const {title, price, list_service,status, quantity} = req.body
    const product = await Product.findByPk(id);

    if (!product) {
        return res.status(404).json({
            status_code: 404,
            error: "Không tìm thấy sản phẩm",
        });
    }
    try {
        const result = await product.update(
            {
                title,
                price,
                list_service,
                status,
                quantity
            }
        );
        await result.save();
        console.log(Object.keys( req.body));
        return res.status(200).json({ msg: "success", status_code: 200, data: result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "server_err", status_code: 500 });
    };

};
//#endregion


module.exports = {
    getAllProduct,
    getProductByID,
    postProduct,
    updateProduct
};
