import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productsReducer, selectedProductReducer, filteredProductReducer } from './product'
import { categoriesReducer } from './categories'
import userReducer from './user'
import { orderReducer, orderByUserReducer } from './order'
import { reviewsReducer, selectedReviewReducer } from './reviews'

const reducer = combineReducers({
  products: productsReducer,
  selectedProduct: selectedProductReducer,
  filteredProducts: filteredProductReducer,
  categories: categoriesReducer,
  user: userReducer,
  order: orderReducer,
  orders: orderByUserReducer,
  reviews: reviewsReducer,
  selectedReview: selectedReviewReducer
})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))
const store = createStore(reducer, middleware)

export default store
export * from './product'
