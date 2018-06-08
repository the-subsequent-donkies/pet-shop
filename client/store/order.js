import axios from 'axios'
import history from '../history'

const GET_ORDER = 'GET_ORDER'

const defaultOrder = {
  lineItems: []
}

const getOrder = order => ({type: GET_ORDER, order})

export const getOrderServer = (userId) => {
  return async (dispatch) => {
    console.log('userId', userId)
    const {data} = await axios.get(`/api/orders/me/${userId}`)
    console.log('data', data)
    dispatch(getOrder(data))
  }
}

export default function (state = defaultOrder, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    default:
      return state
  }
}

