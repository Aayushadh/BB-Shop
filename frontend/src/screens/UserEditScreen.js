import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUser } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const UserEdit = ({ match, location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdate = useSelector((state) => state.userUpdate)
    const { success, loading: updateLoading, error: updateError } = userUpdate

    useEffect(() => {
        if (!user || user.id != match.params.id)
            dispatch(getUserDetails(match.params.id))
        else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [userInfo, history, user, match, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser(match.params.id, { name, email, isAdmin }))
        console.log('hello')
    }

    return (
        <>
            <Link to="/admin/users/" className="btn btn-light my-3">
                Go Back
            </Link>
            <FormContainer>
                <h2>EDIT PROFILE</h2>
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
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="isAdmin">
                        <Form.Check
                            checked={isAdmin}
                            label="Admin"
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        ></Form.Check>
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        Update
                    </Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default UserEdit
