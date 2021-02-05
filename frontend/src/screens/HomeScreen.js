import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Loader from 'react-loader-spinner'
import Message from '../components/Message'
const HomeScreen = ({ match }) => {
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts(match.params.keyword))
    }, [dispatch, match.params.keyword])

    return (
        <>
            <h1>Latest Products</h1>
            {loading ? (
                <Col className="text-center">
                    {' '}
                    <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={120}
                        width={120}
                    />
                </Col>
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Row>
                    {products.map((product) => (
                        <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

export default HomeScreen
