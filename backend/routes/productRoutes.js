import express from 'express'
import {
    getProducts,
    getProductById,
    deleteProduct,
    addProduct,
    updateProductById,
    addReview,
    getTopProducts,
} from '../controllers/productController.js'
import { protect, admin } from '../middlewares/authmiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, addProduct)
router.get('/top', getTopProducts)

router
    .route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProductById)

router.route('/:id/reviews').post(protect, addReview)
export default router
