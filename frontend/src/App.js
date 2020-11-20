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
                    <Route path="/cart/" component={CartScreen} exact />
                    <Route path="/login/" component={LoginScreen} exact />
                    <Route path="/register/" component={RegisterScreen} exact />
                </main>
            </Container>
            <Footer />
        </Router>
    )
}

export default App
