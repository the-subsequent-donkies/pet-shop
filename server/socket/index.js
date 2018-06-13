const axios = require('axios')

const ANALYTICS_URL = 'http://pet-shop-analytics.herokuapp.com'

const SOCKET_CONNECTION = 'SOCKET_CONNECTION'
const SOCKET_DISCONNECT = 'SOCKET_DISCONNECT'

const visitorData = {}

module.exports = (io) => {
  io.on('connection', async (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.on(SOCKET_CONNECTION, async (data) => {
      await axios.post(`${ANALYTICS_URL}/api/requests`, data)
    })

    socket.on('SELECTED_PRODUCT_VIEW', async (data) => {
      await axios.post(`${ANALYTICS_URL}/api/requests`, data)
    })

    socket.on('ADD_PRODUCT_CART', async (data) => {
      await axios.post(`${ANALYTICS_URL}/api/requests`, data)
    })

    socket.on('SUBMIT_REVIEW', async (data) => {
      await axios.post(`${ANALYTICS_URL}/api/requests`, data)
    })

    socket.on('SELECT_CATEGORY', async (data) => {
      await axios.post(`${ANALYTICS_URL}/api/requests`, data)
    })

    socket.on('SUBMIT_ORDER', async (data) => {
      await axios.post(`${ANALYTICS_URL}/api/requests`, data)
    })

    socket.on('ORDER_VIEW', async (data) => {
      await axios.post(`${ANALYTICS_URL}/api/requests`, data)
    })

    socket.on('disconnect', async (data) => {
      await axios.post(`${ANALYTICS_URL}/api/requests`, {reqType: SOCKET_DISCONNECT, socketId: socket.id, time: Date.now()})
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}

// module.exports = io => {
//   io.on('connection', socket => {
//     console.log(`A socket connection to the server has been made: ${socket.id}`)

//     socket.on('disconnect', () => {
//       console.log(`Connection ${socket.id} has left the building`)
//     })
//   })
// }
