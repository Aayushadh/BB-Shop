import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { deleteUser, getUserList } from '../actions/userActions'

const UserListScreen = ({ location, history }) => {
    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector((state) => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.admin) dispatch(getUserList())
        else {
            history.push('/login')
        }
        if (successDelete) dispatch(getUserList())
    }, [dispatch, history, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Do you really want to delete ?'))
            dispatch(deleteUser(id))
    }

    return (
        <>
            <h2>Users</h2>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>
                                        {user.email}
                                    </a>
                                </td>
                                <td>
                                    {user.isAdmin ? (
                                        <i className="fa fa-check"></i>
                                    ) : (
                                        <i
                                            className="fa fa-times"
                                            aria-hidden="true"
                                        ></i>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer
                                        to={`/user/${user._id}/edit`}
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
                                            deleteHandler(user._id)
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

export default UserListScreen
