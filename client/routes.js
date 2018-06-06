import React, { Component } from 'react'
//import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
//import PropTypes from 'prop-types'
import ProductList from './components/product-list'
import ProductForm from './components/product-form'
import Navbar from './components/navbar'
import CategorySelector from './components/category-selector'
//import { me } from './store'


import ReactForm
import ReduxForm

  <ReduxForm
    redirectOnSuccess={(props) => `/{props.object.id}`)
  />


/**
 * COMPONENT
 */
export default class Routes extends Component {
  // componentDidMount () {
  //   this.props.loadInitialData()
  // }

  render() {
    return (
      <Router>


        <div>
          <Navbar />
          <Route exact path='/' component={ProductList} />
          {
            /*
             * REVIEW:
             * <ProductForm action='newproduct'> vs <NewProductForm>
             *
             * const NewProductForm = (props) => <ProductForm {...props} action='newproduct'/>
             */
          }
          <Route exact path='/newproduct' render={() => <ProductForm action='newproduct' />} />
          {/* REVIEW: long boye */}
          <Route
            path='products/:productId/edit'
            render={({ match }) => <ProductForm match={match} action='editproduct' />}
          />
          <Route exact path='/categories' component={CategorySelector} />
        </div>
      </Router>
    )
  }
}

// /**
//  * CONTAINER
//  */
// const mapState = (state) => {
//   return {
//     // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
//     // Otherwise, state.user will be an empty object, and state.user.id will be falsey
//     isLoggedIn: !!state.user.id
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     loadInitialData () {
//       dispatch(me())
//     }
//   }
// }

// // The `withRouter` wrapper makes sure that updates are not blocked
// // when the url changes
// export default withRouter(connect(mapState, mapDispatch)(Routes))

// /**
//  * PROP TYPES
//  */
// Routes.propTypes = {
//   loadInitialData: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
