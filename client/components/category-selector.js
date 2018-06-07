import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategoriesServer } from '../store/category'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import history from '../history'
// refactor the redux store
// add a action to get the products by id
// use history to push the redirect
class CategorySelector extends Component {
  constructor(props) {
    super(props)
    this.props.getCategoriesServer()
    this.state = {
      category: '',
      fireRedirect: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    history.push(`/categories/${this.state.category}`)



  }

  handleChange = (event) => {
    this.setState({ category: event.target.value })
  }
  render() {

    return (
      <div className='category-selector' >
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <select className='custom-select' >
            <option>Select a Category</option>
            {this.props.categories.map(category => <option value={category.id} key={category.id} >{category.name}</option>)}
          </select>
          <button type='submit' className='btn btn-primary'>Filter</button>
        </form>
        {/* {this.state.fireRedirect && (<Redirect to={`/categories/${this.state.category}`} />)} */}
      </div>

    )
  }

}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoriesServer: () => dispatch(getCategoriesServer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelector)
  ;
