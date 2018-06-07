import axios from 'axios'
import history from '../history'

//action types

export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
export const POST_NEW_PRODUCT = 'POST_NEW_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const GET_PRODUCTS_BY_CATEGORY = 'GET_PRODUCTS_BY_CATEGORY'

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

const getProductsByCategory = (products) => {
  return {
    type: GET_PRODUCTS_BY_CATEGORY,
    products
  }
}

// thunk creators


export const postNewProductServer = (newProduct) => {
  return async (dispatch) => {
    const { data } = await axios.post(`/api/products`, newProduct)
    dispatch(postNewProduct(data))
  }
}

export const updateProductServer = (product) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/api/products/${product.id}`, product)
    dispatch(updateProduct(data))
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

export const getProductsByCategoryServer = (categoryId) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/products/categories/${categoryId}`)
    dispatch(getProductsByCategory(data))
  }
}

// reducers

export const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case POST_NEW_PRODUCT:
      return [...state, action.newProduct]
    case UPDATE_PRODUCT:
      const otherProducts = state.filter(product => product.id !== action.product.id)
      return [...otherProducts, action.product]
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

export const filteredProductReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS_BY_CATEGORY:
      return action.products
    default:
      return state
  }
}
