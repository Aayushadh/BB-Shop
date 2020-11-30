import React, { useState, useEffect } from 'react'
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch()

    const putdeci = (num) => (Math.round(num * 100) / 100).toFixed(2)
    const cart = useSelector((state) => state.cart)
    cart.itemPrice = putdeci(
        cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)
    )
    cart.shippingPrice = putdeci(cart.itemPrice > 100 ? 0 : 50)
    cart.taxPrice = putdeci(Number((cart.itemPrice * 0.15).toFixed(2)))
    cart.totalPrice = putdeci(
        Number(cart.itemPrice) +
            Number(cart.shippingPrice) +
            Number(cart.taxPrice)
    )

    const orderCreate = useSelector((state) => state.orderCreate)
    const { orders, success, error } = orderCreate

    useEffect(() => {
        if (success) {
            history.push(`/order/${orders._id}`)
        }
    }, [history, success])

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                itemPrice: cart.itemPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
                shippingPrice: cart.shippingPrice,
                paymentMethod: cart.paymentMethod,
            })
        )
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>
                                <br />
                                {cart.shippingAddress.address},<br />
                                {cart.shippingAddress.city}{' '}
                                {cart.shippingAddress.postalCode},
                                {cart.shippingAddress.country}
                                <br />
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                                <br />
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? (
                                <Message>Your cart is empty </Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link
                                                        to={`/products/${item.id}`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} =
                                                    ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="fluid">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && (
                                    <Message variant="danger">{error}</Message>
                                )}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn btn-block"
                                    onClick={placeOrderHandler}
                                    disabled={cart.cartItems === 0}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
