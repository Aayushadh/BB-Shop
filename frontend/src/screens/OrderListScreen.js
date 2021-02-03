import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { deleteOrder, deliveredOrder, getOrders } from '../actions/orderActions'

const OrderListScreen = ({ location, history }) => {
    const dispatch = useDispatch()

    const orderList = useSelector((state) => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    // const orderDelete = useSelector((state) => state.orderDelete)
    // const { success: successDelete } = orderDelete

    useEffect(() => {
        if (userInfo && userInfo.admin) dispatch(getOrders())
        else {
            history.push('/login')
        }
        // if (successDelete) dispatch(getorderList())
    }, [dispatch, history])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure that you want to delete ?'))
            dispatch(deleteOrder(id))
    }
    const deliveredHandler = (id) => {
        dispatch(deliveredOrder(id))
    }

    return (
        <>
            <h2>Orders</h2>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                {order.user ? (
                                    <td>{order.user.name}</td>
                                ) : (
                                    <td>User</td>
                                )}

                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>
                                    {order.isPaid ? (
                                        order.paidAt.substring(0, 10)
                                    ) : (
                                        <i
                                            className="fas fa-times"
                                            style={{ color: 'red' }}
                                        ></i>
                                    )}
                                </td>
                                <td>
                                    {order.isDelieverd ? (
                                        order.deliveredAt.substring(0, 10)
                                    ) : (
                                        <i
                                            className="fas fa-times"
                                            style={{ color: 'red' }}
                                        ></i>
                                    )}
                                </td>
                                <td>
                                    <Button
                                        className="btn-sm"
                                        onClick={() => {
                                            deliveredHandler(order._id)
                                        }}
                                        disabled={order.isDelieverd}
                                        title="Mark as Delivered"
                                    >
                                        <i
                                            className="fa fa-truck"
                                            aria-hidden="true"
                                        ></i>
                                    </Button>

                                    <Button
                                        className="btn-sm"
                                        variant="danger"
                                        onClick={() => {
                                            deleteHandler(order._id)
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
            )}
        </>
    )
}

export default OrderListScreen
