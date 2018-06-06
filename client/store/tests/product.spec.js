/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getProductsServer, getSingleProductServer} from '../product'
import {Product} from '../../../server/db/models'
import request from 'supertest'
import app from '../../../server/index'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../../history'

import store from '../index'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {

  const seedProducts = [
    {
      name: 'Bone',
      inventory: '4',
      price: '2.50',
      imgUrl: 'https://imgur.com/gallery/zzD13aO',
      description: 'this is a fun chew toy for dogs'
    },
    {
      name: 'scratch post',
      inventory: '6',
      price: '22.50',
      imgUrl: 'https://imgur.com/gallery/jI1kMrK',
      description: 'Cats will scratch this'
    },
    {
      name: 'fake mouse',
      inventory: '9',
      price: '5.00',
      imgUrl: 'https://imgur.com/gallery/dQ7u2Wg',
      description: 'Fake Mouse from the failing Meowyork times'
    },
    {
      name: 'Hamster wheel',
      inventory: '9',
      price: '7.50',
      imgUrl: 'https://imgur.com/gallery/fFptBSA',
      description: 'you spin my head right rond'
    }
  ]

  const seedCategory = [
    {
      id: '1',
      name: 'cats',
      description: 'Felis catus'
    },
    {
      id: '2',
      name: 'dogs',
      description: 'Canis lupus familiaris'
    },
    {
      id: '3',
      name: 'hamster',
      description: 'Cricetinae'
    }
  ]

  const initialState = {
    products: [],
    selectedProduct: {}
  }

  beforeEach( async () => {

    return await Promise.all(seedProducts.map((product) => {
      return Product.create(product)
    }))

  })

  describe('getProductsFromServer', () => {
    it('eventually dispatches the GET PRODUCTS action', () => {

      const apiProducts =  request(app)
        .get('/api/products')
        .expect(200)
        .then(res => res.body)

      return store.dispatch(getProductsServer())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_PRODUCTS')
          expect(actions[0].products).to.be.deep.equal(apiProducts)
        })


      // const myProducts = await axios.get('/api/products')
      // console.log('myProducts: ', myProducts)
      // mockAxios.onGet('/api/products').replyOnce(200, seedProducts)
      // return store.dispatch(getProductsServer())
      //   .then(() => {
      //     const actions = store.getActions()
      //     expect(actions[0].type).to.be.equal('GET_PRODUCTS')
      //     expect(actions[0].user).to.be.deep.equal(seedProducts)
      //   })
    })
  })

})
