import io from 'socket.io-client'
import axios from 'axios'
import store from './store'
const SOCKET_CONNECTION = 'SOCKET_CONNECTION'
const SOCKET_DISCONNECT = 'SOCKET_DISCONNECT'

const socket = io(window.location.origin)

socket.on('connect', async () => {
  console.log('Connected!')
  // const myVisitor = {
  //   type: SOCKET_CONNECTION,
  //   referringSite: document.referrer,
  //   page: location.pathname,
  //   time: Date.now(),
  //   userAgent: navigator.userAgent,
  //   browser: navigator.vendor
  // }

  // socket.emit(SOCKET_CONNECTION, myVisitor)
})

socket.on('disconnect', () => {
  console.log(`Connection ${socket.id} has left the building`)
  // const myVisitor = {
  //   type: SOCKET_DISCONNECT,
  //   referringSite: document.referrer,
  //   page: location.pathname,
  //   time: Date.now(),
  //   userAgent: navigator.userAgent,
  //   browser: navigator.vendor
  // }

  // socket.emit(SOCKET_DISCONNECT, myVisitor)
})

export const socketEmit = (type, obj) => {
  const myVisitor = {
    reqType: type,
    referringSite: document.referrer,
    page: location.pathname,
    time: Date.now(),
    userAgent: navigator.userAgent,
    browser: navigator.vendor,
    socketId: socket.id
  }
  console.log(myVisitor)
  socket.emit(type, Object.assign({...myVisitor}, {...obj}))
}

export default socket
