import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import ProductList from './components/product-list'
import ProductForm from './components/product-form'
import Navbar from './components/navbar'
import { Login, Signup } from './components/auth-form'
import { me, logout } from './store/user'
import CategorySelector from './components/category-selector'
import { Home } from './components'
//import { me } from './store'



/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/newproduct' render={() => <ProductForm action='newproduct' />} />
          <Route exact path='/products/:productId/edit' component={ProductForm} />
          <Route exact path='/categories' component={CategorySelector} />
        </div>
      </Router>
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
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    }
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
