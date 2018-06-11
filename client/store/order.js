import axios from 'axios'
import history from '../history'
import { manageInventoryServer } from './product'

const GET_ORDER = 'GET_ORDER'
const ADD_LINEITEM_TO_ORDER = 'ADD_LINEITEM_TO_ORDER'
const DELETE_LINEITEM = 'DELETE_LINEITEM'
const UPDATE_LINEITEM = 'UPDATE_LINEITEM'
const GET_LOCAL_ORDER = 'GET_LOCAL_ORDER'
const CREATE_LOCAL_ORDER = 'CREATE_LOCAL_ORDER'
const GET_ORDERS_BY_USER = 'GET_ORDERS_BY_USER'
const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'

const defaultOrder = {
  line_items: []
}

const getOrder = order => ({ type: GET_ORDER, order })
const addLineitemToOrder = lineitem => ({ type: ADD_LINEITEM_TO_ORDER, lineitem })
const deleteLineitem = lineitemId => ({ type: DELETE_LINEITEM, lineitemId })
const updateLineitem = (lineitemId, quantity) => ({ type: UPDATE_LINEITEM, lineitemId, quantity })
const getLocalOrder = order => ({ type: GET_LOCAL_ORDER, order })
const createLocalOrder = order => ({ type: CREATE_LOCAL_ORDER, order })
const updateOrderStatus = status => ({ type: UPDATE_ORDER_STATUS, status })
const getOrdersByUser = orders => ({ type: GET_ORDERS_BY_USER, orders })

export const getOrdersByUserServer = (userId) => {
  return async (dispatch) => {
    const { data } = await axios.get(`api/orders/user/${userId}`)
    dispatch(getOrdersByUser(data))
  }
}

export const getOrderServer = (userId) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/orders/me/${userId}`)
    dispatch(getOrder(data))
  }
}

export const addLineitemServer = (orderId, product) => {
  return async (dispatch) => {
    const { data } = await axios.post('/api/lineitems/',
      {
        orderId,
        quantity: 1,
        productId: product.id,
        currentPrice: product.price
      })

    dispatch(addLineitemToOrder(data))
  }
}

export const deleteLineitemServer = (lineitemId) => {
  return async (dispatch) => {
    await axios.delete(`/api/lineitems/${lineitemId}`)
    dispatch(deleteLineitem(lineitemId))
  }
}

export const updateLineitemServer = (lineitemId, quantity) => {
  return async (dispatch) => {
    await axios.put(`/api/lineitems/${lineitemId}`, { quantity: quantity })
    dispatch(updateLineitem(lineitemId, quantity))
  }
}

export const getLocalOrderServer = (orderId) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/orders/${orderId}`)
    dispatch(getLocalOrder(data))
  }
}

export const createLocalOrderServer = () => {
  return async (dispatch) => {
    const { data } = await axios.post(`/api/orders`)
    dispatch(createLocalOrder(data))
    localStorage.setItem('orderId', data.id)
  }
}

export const mergeOrdersServer = (localOrderId, userId) => {
  return async (dispatch) => {
    const localRes = await axios.get(`/api/orders/${localOrderId}`)
    const localOrder = localRes.data
    const accountRes = await axios.get(`/api/orders/me/${userId}`)
    const accountOrder = accountRes.data

    // Get product id's for account order
    let productIds = []
    accountOrder.line_items.forEach((lineItem) => {
      productIds.push(lineItem.productId)
    })

    localOrder.line_items.forEach((localLineitem) => {
      if (!productIds.includes(localLineitem.productId)) {
        dispatch(addLineitemServer(accountOrder.id, localLineitem.product))
      }
    })
  }
}

export const updateOrderStatusServer = (order, status, userId) => {
  return async (dispatch) => {
    if (status === 'Completed') {
      dispatch(manageInventoryServer(order))
    }
    const { data } = await axios.put(`/api/orders/${order.id}`, { status })
    dispatch(updateOrderStatus(data.status))
    if (status === 'Completed' || status === 'Cancelled') {
      dispatch(getOrderServer(userId))
    }
  }
}

export const orderReducer = (state = defaultOrder, action) => {
  let tempItems
  switch (action.type) {
    case GET_ORDER:
      return action.order
    case ADD_LINEITEM_TO_ORDER:
      let inStore = false
      tempItems = state.line_items.map(lineItem => {
        if (lineItem.id === action.lineitem.id) {
          inStore = true
          return { ...lineItem, quantity: lineItem.quantity + 1 }
        }
        return lineItem
      })
      if (inStore) {
        return { ...state, line_items: tempItems }
      }
      return { ...state, line_items: [...state.line_items, action.lineitem] }
    case DELETE_LINEITEM:
      tempItems = state.line_items.filter(lineItem => {
        return lineItem.id !== action.lineitemId
      })
      return { ...state, line_items: tempItems }
    case UPDATE_LINEITEM:
      tempItems = state.line_items.map(lineItem => {
        if (lineItem.id === action.lineitemId) { lineItem.quantity = action.quantity }
        return lineItem
      })
      return { ...state, line_items: tempItems }
    case CREATE_LOCAL_ORDER:
      return action.order
    case GET_LOCAL_ORDER:
      return action.order
    case UPDATE_ORDER_STATUS:
      return { ...state, status: action.status }
    default:
      return state
  }
}

export const orderByUserReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS_BY_USER:
      return action.orders
    default:
      return state
  }
}

