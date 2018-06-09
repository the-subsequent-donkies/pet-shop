import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import ProductForm from './components/product-form'
import NewProductForm from './components/new-product-form'
import EditProductForm from './components/edit-product-form'
import Navbar from './components/navbar'
import { Login, Signup } from './components/auth-form'
import Order from './components/user-order'
import { me, logout } from './store/user'
import CategorySelector from './components/category-selector'
import { Home, ProductList } from './components'
import SelectedProduct from './components/selected-product'
import { getOrderServer } from './store/order';
//import { me } from './store'


/**
 * COMPONENT
 */
class Routes extends Component {
  constructor(props) {
    super(props)
    this.props.loadInitialData()
    .then( () => {
      this.props.getOrder(this.props.user.id)
    })
  }

  // async componentDidMount() {
  //   await this.props.loadInitialData()
  // }

  render() {
    return (
      <div>
        <Navbar />
        <Route exact path='/' component={Home} />
        <Route exact path='/categories/:categoryId' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route path='/newproduct' component={NewProductForm} />
        <Route exact path='/products/:productId' component={SelectedProduct} />
        <Route exact path='/products/:productId/edit' component={EditProductForm} />
        <Route exact path='/categories' component={CategorySelector} />
        <Route exact path="/order" component={Order} />
      </div>
    )
  }
}


/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData: () => dispatch(me()),
    getOrder: (userId) => dispatch(getOrderServer(userId))
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
