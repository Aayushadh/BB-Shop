import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { updateProduct } from '../actions/productActions'
import FormContainer from '../components/FormContainer'
import { listProductDetails } from '../actions/productActions'

const ProductEditScreen = ({ match, location, history }) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [countInStock, setCountInStock] = useState(0)

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productUpdate = useSelector((state) => state.productUpdate)
    const {
        success,
        loading: updateLoading,
        error: updateError,
    } = productUpdate

    useEffect(() => {
        if (!product || product._id !== match.params.id)
            dispatch(listProductDetails(match.params.id))
        else {
            setName(product.name)
            setDescription(product.description)
            setBrand(product.brand)
            setCategory(product.category)
            setPrice(product.price)
            setImage(product.image)
            setCountInStock(product.countInStock)
        }
        if (success) {
            window.alert('Updated Successfully !!')
            dispatch(listProductDetails(match.params.id))
        }
    }, [userInfo, history, product, match, dispatch, success])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(
            updateProduct(match.params.id, {
                name,
                description,
                brand,
                category,
                price,
                image,
                countInStock,
            })
        )
    }

    return (
        <>
            <Link to="/admin/products/" className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h2>EDIT PRODUCT</h2>
                {error && <Message variant="danger">{error}</Message>}
                {success && (
                    <Message variant="success">
                        {'Updated successfully !'}
                    </Message>
                )}
                {updateLoading && <Loader />}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            type="textbox"
                            placeholder="Enter Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Image Url"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="countInStock">
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Count In Stock"
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        Update
                    </Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default ProductEditScreen
