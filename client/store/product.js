import axios from 'axios'
import history from '../history'

//action types

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const POST_NEW_PRODUCT = 'POST_NEW_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

// action creators

const postNewProduct = (newProduct) => {
  return {
    type: POST_NEW_PRODUCT,
    newProduct
  }
}


const updateProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}
const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

const getSingleProduct = (selectedProduct) => {
  return {
    type: GET_SINGLE_PRODUCT,
    selectedProduct
  }
}

// thunk creators


export const postNewProductServer = (newProduct) => {
  return async (dispatch) => {
    await axios.post(`/api/products`, newProduct)
    dispatch(postNewProduct(newProduct))
  }
}

export const updateProductServer = (product) => {
  return async (dispatch) => {
    await axios.put(`/api/products/${product.id}`, product)
    dispatch(updateProduct(product))
  }
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

// reducers

export const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case POST_NEW_PRODUCT:
      return {
        state: [...state, action.newProduct]
      }
    case UPDATE_PRODUCT:
      return {
        state: [...state, action.product]
      }
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

