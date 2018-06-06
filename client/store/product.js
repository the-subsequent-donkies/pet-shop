import axios from 'axios'
import history from '../history'

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

const getProducts = (products) => {
  return {  type: GET_PRODUCTS,
            products }
}

const getSingleProduct = (selectedProduct) => {
  return {  type: GET_SINGLE_PRODUCT,
            selectedProduct }
}

export const getProductsServer = (categoryId = false) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/products${(categoryId) ? `/categories/${categoryId}` : ''}`)
    dispatch(getProducts(data))
  }
}

export const getSingleProductServer = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch(getSingleProduct(data))
  }
}

export const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export const selectedProductReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
    return action.selectedProduct
  default:
    return state
  }
}
