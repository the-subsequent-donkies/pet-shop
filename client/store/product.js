import axios from 'axios'
import history from '../history'

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

const getProducts = (products) => {
  return {  type: GET_PRODUCTS,
            products }
}

const getProduct = (selectedProduct) => {
  return {  type: GET_SINGLE_PRODUCT,
            selectedProduct }
}

export const getProductsServer = (categoryId = false) => {
  return async (dispatch) => {
    const products = await axios.get(`/api/products${(categoryId) ? `/categories/${categoryId}` : ''}`)
    dispatch(getProducts(products))
  }
}

export const getProductServer = (id) => {
  return async (dispatch) => {
    const selectProduct = await axios.get(`/api/products/${id}`)
    dispatch(getProducts(selectedProduct))
  }
}

const defaultState = {
  products: [],
  selectedProduct: {}
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, products: action.products}
    case GET_SINGLE_PRODUCT:
      return {...state, selectedProduct: action.selectedProduct}
    default:
      return state
  }
}

