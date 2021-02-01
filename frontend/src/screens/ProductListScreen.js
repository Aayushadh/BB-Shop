import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listProducts,deleteProduct, addProduct} from '../actions/productActions'
import { PRODUCT_ADD_FAIL, PRODUCT_ADD_RESET } from '../constants/productConstants'

const ProductListScreen = ({ location, history }) => {
    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productAdd = useSelector((state) => state.productAdd)
    const { id } = productAdd

    const productDelete = useSelector((state) => state.productDelete)
    const { success: successDelete } = productDelete

    useEffect(() => {
        if (userInfo && userInfo.admin) dispatch(listProducts())
        else {
            history.push('/login')
        }
        if (successDelete) dispatch(listProducts())
        if(id)
        {
            history.push(`/admin/products/${id}/edit`)
            dispatch({type:PRODUCT_ADD_RESET})
        }
    }, [dispatch, history,successDelete,id,PRODUCT_ADD_RESET])

    const deleteHandler = (id) => {
        if (window.confirm('Do you really want to delete ?'))
             dispatch(deleteProduct(id))
    }

    const addHandler=()=>{
        dispatch(addProduct())
        
    }

    return (
        <>
            <h2>Products</h2>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                <Col className='text-right'>

                <Button
                                        className="btn-sm"
                                        
                                        onClick={() => {
                                            addHandler()
                                        }}
                                    >
                                        <i
                                            className="fa fa-plus"
                                            aria-hidden="true"
                                        ></i>
                                    </Button>
                </Col>
                <br/>
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>
                                        ${product.price}
                            
                                </td>
                                <td>
                                  {product.category}
                                </td>
                                <td>
                                  {product.brand}
                                </td>
                                <td>
                                    <LinkContainer
                                        to={`/admin/products/${product._id}/edit`}
                                    >
                                        <Button className="btn-sm">
                                            <i
                                                className="fa fa-pencil-square-o"
                                                aria-hidden="true"
                                            ></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button
                                        className="btn-sm"
                                        variant="danger"
                                        onClick={() => {
                                            deleteHandler(product._id)
                                        }}
                                    >
                                        <i
                                            className="fa fa-trash"
                                            aria-hidden="true"
                                        ></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </>
            )}
        </>
    )
}

export default ProductListScreen
