import axios from 'axios'
import history from '../history'

const GET_ORDER = 'GET_ORDER'
const ADD_LINEITEM_TO_ORDER = 'ADD_LINEITEM_TO_ORDER'
const DELETE_LINEITEM = 'DELETE_LINEITEM'
const UPDATE_LINEITEM = 'UPDATE_LINEITEM'

const defaultOrder = {
  line_items: []
}

const getOrder = order => ({type: GET_ORDER, order})
const addLineitemToOrder = lineitem => ({type: ADD_LINEITEM_TO_ORDER, lineitem})
const deleteLineitem = lineitemId => ({type: DELETE_LINEITEM, lineitemId})
const updateLineitem = (lineitemId, quantity) => ({type: UPDATE_LINEITEM, lineitemId, quantity})

export const getOrderServer = (userId) => {
  return async (dispatch) => {
    const {data} = await axios.get(`/api/orders/me/${userId}`)
    dispatch(getOrder(data))
  }
}

export const addLineitemServer = (orderId, product) => {
  return async (dispatch) => {
    const {data} = await axios.post('/api/lineitems/',
      { orderId,
        quantity: 1,
        productId: product.id,
        currentPrice: product.price })
    dispatch(addLineitemToOrder(data))
  }
}

export const deleteLineitemServer = (lineitemId) => {
  return async (dispatch) => {
    const res = await axios.delete(`/api/lineitems/${lineitemId}`)
    dispatch(deleteLineitem(lineitemId))
  }
}

export const updateLineitemServer = (lineitemId, quantity) => {
  return async (dispatch) => {
    const {data} = await axios.put(`/api/lineitems/${lineitemId}`, {quantity: quantity})
    dispatch(updateLineitem(lineitemId, quantity))
  }
}

export default function (state = defaultOrder, action) {
  let tempItems
  switch (action.type) {
    case GET_ORDER:
      return action.order
    case ADD_LINEITEM_TO_ORDER:
      let inStore = false
      console.log(state)
      tempItems = state.line_items.map(lineItem => {
        if (lineItem.id === action.lineitem.id) {
          inStore = true
          return {...lineItem, quantity: lineItem.quantity + 1} }
        return lineItem
      })
      if (inStore) {
        return {...state, line_items: tempItems}
      }
      return {...state, line_items: [...state.line_items, action.lineitem]}
    case DELETE_LINEITEM:
      tempItems = state.line_items.filter(lineItem => {
        return lineItem.id !== action.lineitemId
      })
      return {...state, line_items: tempItems}
    case UPDATE_LINEITEM:
      tempItems = state.line_items.map(lineItem => {
        if (lineItem.id === action.lineitemId) { lineItem.quantity = action.quantity }
        return lineItem
      })
      return {...state, line_items: tempItems}
    default:
      return state
  }
}

