import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { listProducts } from '../actions/productActions'
import Loader from 'react-loader-spinner'
import Message from '../components/Message'
import { LinkContainer } from 'react-router-bootstrap'
import ProductCarousel from '../components/ProductCarousel'
import { Link } from 'react-router-dom'

const HomeScreen = ({ match }) => {
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList)
    const { loading, error, products, pages, page } = productList

    useEffect(() => {
        dispatch(listProducts(match.params.keyword, match.params.pageNumber))
    }, [dispatch, match.params.keyword, match.params.pageNumber])

    let active = page
    let items = []
    for (let number = 1; number <= pages; number++) {
        items.push(
            <LinkContainer
                key={number}
                to={
                    match.params.keyword
                        ? `/search/${match.params.keyword}/page/${number}`
                        : `/page/${number}`
                }
            >
                <Pagination.Item key={number} active={number === active}>
                    {number}
                </Pagination.Item>
            </LinkContainer>
        )
    }

    return (
        <>
            {!match.params.keyword ? (
                <ProductCarousel />
            ) : (
                <Link to="/" className="btn btn-light">
                    Go Back
                </Link>
            )}
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
                <>
                    <Row>
                        {products.map((product) => (
                            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Pagination>{items}</Pagination>
                </>
            )}
        </>
    )
}

export default HomeScreen
