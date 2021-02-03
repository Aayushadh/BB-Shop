import express from 'express'
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getAllOrders,
    updateOrderToDelivered,
    deleteOrder,
} from '../controllers/orderController.js'
import { admin, protect } from '../middlewares/authmiddleware.js'

const router = express.Router()

router.route('/myOrders').get(protect, getMyOrders)
router.route('/').post(protect, addOrderItems).get(protect, admin, getAllOrders)
router
    .route('/:id')
    .get(protect, getOrderById)
    .delete(protect, admin, deleteOrder)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/delivered').put(protect, admin, updateOrderToDelivered)

export default router
