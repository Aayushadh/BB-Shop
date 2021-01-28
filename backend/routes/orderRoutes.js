import express from 'express'
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
} from '../controllers/orderController.js'
import { protect } from '../middlewares/authmiddleware.js'

const router = express.Router()

router.route('/myOrders').get(protect, getMyOrders)
router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router
