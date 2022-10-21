const { Router } = require('express');
const router = Router();

const { getAll, getAllOrders, editProduct, newOrder, deleteOrder, createProduct } = require('../controllers/products');

router.get('/getAll', getAll);
router.get('/getAllOrders', getAllOrders);
router.put('/editProduct/:id', editProduct);
router.post('/newOrder', newOrder);
router.delete('/deleteDate/:order_id', deleteOrder);

router.post('/createProduct', createProduct);

module.exports = router;