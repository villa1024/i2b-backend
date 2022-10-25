const { Op } = require("sequelize");

const Order = require("../models/Order");
const Product = require("../models/Product");

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = (await Product.findOne({
            where: {
                id
            },
            include: Order
        }));
        if (!product) {
            return res.status(404).json({
                ok: false,
                msg: 'Producto no encontrado...'
            });
        }
        return res.json({
            ok: true,
            product
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

const getAll = async (req, res) => {
    try {
        const { page } = req.query;
        const products = await Product.findAndCountAll({
            attributes: ['id', 'name', 'price', 'description'],
            limit: 5,
            offset: page * 5,
            order: [
                ['id', 'ASC']
            ]
        });
        return res.json({
            ok: true,
            totalPages: Math.ceil(products.count / 5),
            products
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const { page } = req.query;
        const orders = await Order.findAndCountAll({
            include: Product,
            limit: 5,
            offset: page * 5,
            order: [
                ['id', 'ASC']
            ]
        });
        return res.json({
            ok: true,
            totalPages: Math.ceil(orders.count / 5),
            orders: orders.rows
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

const editProduct = async (req, res) => {
    try {
        const { id, name, price, description } = req.body;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                ok: false,
                msg: 'El producto no existe...'
            });
        }
        await product.update({
            name,
            price,
            description
        });
        return res.json({
            ok: true,
            msg: 'Producto editado correctamente...'
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

const newOrder = async (req, res) => {
    try {
        const { product_id, date } = req.body;
        await Order.create({
            product_id,
            date
        });
        return res.status(200).json({
            ok: true,
            msg: 'Nueva orden agregada correctamente...'
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { order_id } = req.params;
        await Order.destroy({
            where: {
                id: order_id
            }
        });
        return res.json({
            ok: true,
            msg: 'Orden eliminada correctamente...'
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        await Product.create({
            name,
            price,
            description
        });
        return res.json({
            ok: true,
            msg: 'Producto creado correctamente...'
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message
        });
    }
};

module.exports = {
    getProductById,
    getAll,
    getAllOrders,
    editProduct,
    newOrder,
    deleteOrder,

    createProduct
};