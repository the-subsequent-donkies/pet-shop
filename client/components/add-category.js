'use strict'

import React, { Component } from 'react'
import history from '../history'
import { connect } from 'react-redux'
import { postCategoryServer } from '../store/category'
import { Form, List, Segment, Input, TextArea, Button, Dropdown, Card } from 'semantic-ui-react'

class AddCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: 'default'
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.postCategory(this.state)
    history.push('/profile')
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className='home-wrapper'>
        <Card.Group centered>
          <Card fluid />
          <Form
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
          >
            <Form.Field
              name='name'
              control={Input}
              placeholder='Enter Category Name'
              label='Add Category'
              value={this.state.name}
            />
            <Form.Field
              control={Button}
              type='submit'
              content='submit'
              align='right'
            />
          </Form>
        </Card.Group>
      </div>
    )
  }

}

const mapState = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatch = dispatch => {
  return {
    postCategory: category => dispatch(postCategoryServer(category))
  }
}

export default connect(mapState, mapDispatch)(AddCategory)
