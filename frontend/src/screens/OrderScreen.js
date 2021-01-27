import React, { useState, useEffect } from 'react'
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap'
import {PayPalButton} from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { getOrderDetails,payOrder } from '../actions/orderActions'
import {ORDER_PAY_RESET} from '../constants/orderConstants'
import axios from 'axios'

const PlaceOrderScreen = ({ match }) => {
    const dispatch = useDispatch()
    const orderId = match.params.id
    const [sdkReady,setSdkReady]=useState(false)
   


    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const { loading:loadingPay, success:successPay } = orderPay
    const putdeci = (num) => (Math.round(num * 100) / 100).toFixed(2)

    useEffect(() => {
     const addPayPalScript= async()=>{
         const {data:clientId}=await axios.get('/api/config/paypal')
         const script = document.createElement('script')
         script.type='text/javascript'
         script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
         script.async=true
         script.onload=()=>{
             setSdkReady(true)
         }
         document.body.appendChild(script)
     }
     
      if(!order || successPay)
      {   dispatch({type:ORDER_PAY_RESET})
          dispatch(getOrderDetails(orderId))}
      else if(!order.isPaid){
          if(!window.paypal){
              addPayPalScript()
          }else{
              setSdkReady(true)
          }
      }
    }, [dispatch,orderId,order],successPay)

    
    if(!loading){
    order.itemPrice = putdeci(
        order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0)
    )
    }

    const successPaymentHandler=(paymentResult)=>{
          console.log(paymentResult)
          dispatch(payOrder(orderId,paymentResult))
    }


    return loading ? <Loader/>:error ? <Message variant='danger'>{error}</Message>:<>
       <Row>
           <h1>Order {order._id}</h1>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong>{order.user.name}</p>
                             <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}> {order.user.email}</a></p>
                            <p>
                                <strong>Address:</strong>
                                <br />
                                {order.shippingAddress.address},<br />
                                {order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode},
                                {order.shippingAddress.country}
                                <br />
                            </p>
                            {order.isDelievered ? <Message variant='success'>Delievered on {order.delieveredAt}</Message>:<Message variant='danger'>Not delievered</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                        
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                                <br />
                            </p>
                            {order.isPaid ? <Message variant='success'>Paid at {order.paidAt}</Message>:<Message variant='danger'>Not Paid</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? (
                                <Message>Your order is empty </Message>
                            ) : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
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
                                    <Col>${order.itemPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && (
                                    <Message variant="danger">{error}</Message>
                                )}
                            </ListGroup.Item>
                            {!order.isPaid && <ListGroup.Item>
                              {loadingPay && <Loader/>}
                              {!sdkReady?(<Loader/>) : (<PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>) }
                              
                            </ListGroup.Item>
                            
                            }
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
    </>
}

export default PlaceOrderScreen
