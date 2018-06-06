/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getProductsServer, getSingleProductServer, GET_PRODUCTS, GET_SINGLE_PRODUCT} from '../product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const seedProducts = [
    {
      id: '1',
      name: 'Bone',
      inventory: '4',
      price: '2.50',
      imgUrl: 'https://imgur.com/gallery/zzD13aO',
      description: 'this is a fun chew toy for dogs'
    },
    {
      id: '2',
      name: 'scratch post',
      inventory: '6',
      price: '22.50',
      imgUrl: 'https://imgur.com/gallery/jI1kMrK',
      description: 'Cats will scratch this'
    },
    {
      id: '3',
      name: 'fake mouse',
      inventory: '9',
      price: '5.00',
      imgUrl: 'https://imgur.com/gallery/dQ7u2Wg',
      description: 'Fake Mouse from the failing Meowyork times'
    },
    {
      id: '4',
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

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getProductsServer', () => {
    it('eventually dispatches the GET PRODUCTS action', () => {
      mockAxios.onGet('/api/products').replyOnce(200, seedProducts)
      return store.dispatch(getProductsServer())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal(GET_PRODUCTS)
          expect(actions[0].products).to.be.deep.equal(seedProducts)
        })
    })
  })

  describe('getSingleProductServer', () => {
    it('eventually dispatches the GET SINGLE PRODUCT action', () => {
      mockAxios.onGet('/api/products/1').replyOnce(200, seedProducts[0])
      return store.dispatch(getSingleProductServer(1))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal(GET_SINGLE_PRODUCT)
          expect(actions[0].selectedProduct).to.be.deep.equal(seedProducts[0])
        })
    })
  })

})
