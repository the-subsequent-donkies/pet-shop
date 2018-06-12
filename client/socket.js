import io from 'socket.io-client'
import axios from 'axios'

const axiosInstance = axios.create({
  timeout: 10000,
  withCredentials: true,
  transformRequest: [(data) => JSON.stringify(data.data)],
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    crossdomain: true,
  }
});

const socket = io(window.location.origin)

socket.on('connect', async () => {
  console.log('Connected!')
  const myVisitor = {
    type: 'SOCKET_CONNECTION',
    referringSite: document.referrer,
    page: location.pathname,
    time: Date.now(),
    userAgent: navigator.userAgent,
    browser: navigator.vendor
  }

  // const res = await axiosInstance.post(`http://localhost:6969/api/requests`, )
  socket.emit('hi', myVisitor)
})

socket.on('disconnect', () => {
  console.log(`Connection ${socket.id} has left the building`)
})

export default socket
