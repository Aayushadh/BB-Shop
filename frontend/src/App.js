import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
const App = () => {
    return (
        <Router>
            <Header />
            <Container>
                <main className="py-3">
                    <Route path="/" component={HomeScreen} exact />
                    <Route
                        path="/product/:id"
                        component={ProductScreen}
                        exact
                    />

                    <Route path="/cart/:id" component={CartScreen} exact />
                    <Route path="/order/:id" component={OrderScreen} exact />
                    <Route path="/cart/" component={CartScreen} exact />
                    <Route path="/login/" component={LoginScreen} exact />
                    <Route path="/register/" component={RegisterScreen} exact />
                    <Route path="/profile/" component={ProfileScreen} exact />
                    <Route path="/shipping/" component={ShippingScreen} exact />
                    <Route path="/payment/" component={PaymentScreen} exact />
                    <Route path="/admin/products/" component={ProductListScreen} exact />
                    <Route
                        path="/admin/users"
                        component={UserListScreen}
                        exact
                    />
                    <Route
                        path="/user/:id/edit"
                        component={UserEditScreen}
                        exact
                    />
                    <Route
                        path="/placeOrder/"
                        component={PlaceOrderScreen}
                        exact
                    />
                     <Route
                        path="/admin/products/:id/edit"
                        component={ProductEditScreen}
                        exact
                    />
                </main>
            </Container>
            <Footer />
        </Router>
    )
}

export default App
