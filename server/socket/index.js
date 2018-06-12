const axios = require('axios')

module.exports = (io) => {
  io.on('connection', async (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.on('hi', async (data) => {
      console.log('data>>>>>>>>>>>>>>>>>>>', data)
      await axios.post(`http://localhost:6969/api/requests`, data)
    })

    socket.on('disconnect', () => {
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
