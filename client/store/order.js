import axios from 'axios'
import history from '../history'

const GET_ORDER = 'GET_ORDER'
const ADD_LINEITEM_TO_ORDER = 'ADD_LINEITEM_TO_ORDER'
const DELETE_LINEITEM = 'DELETE_LINEITEM'

const defaultOrder = {
  line_items: []
}

const getOrder = order => ({type: GET_ORDER, order})
const addLineitemToOrder = lineitem => ({type: ADD_LINEITEM_TO_ORDER, lineitem})
const deleteLineitem = lineitemId => ({type: DELETE_LINEITEM, lineitemId})

export const getOrderServer = (userId) => {
  return async (dispatch) => {
    const {data} = await axios.get(`/api/orders/me/${userId}`)
    console.log('order from get order', data)
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

export default function (state = defaultOrder, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    case ADD_LINEITEM_TO_ORDER:
      return {...state, line_items: [...state.line_items, action.lineitem]}
    case DELETE_LINEITEM:
      const tempItems = state.line_items.filter(lineItem => {
        return lineItem.id !== action.lineitemId
      })
      return {...state, line_items: tempItems}
    default:
      return state
  }
}

