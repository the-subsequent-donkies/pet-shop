import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productsReducer, selectedProductReducer } from './product'
import { categoriesReducer } from './categories'
import userReducer from './user'

const reducer = combineReducers({
  products: productsReducer,
  selectedProduct: selectedProductReducer,
  categories: categoriesReducer,
  user: userReducer
})

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './product'
