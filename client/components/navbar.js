import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store/user'
import { Menu } from 'semantic-ui-react'

class Navbar extends Component {
  state = {}

  handleItemClick = (event, { name }) => this.setState({ activeItem: name })

  render () {
    const { activeItem } = this.state
    const isLoggedIn = Object.keys(this.props.user).length === 1

    return (
      <Menu>
        <Menu.Item
          as={Link}
          name='home'
          to='/'
          active={activeItem === 'home'}
          content='Pet Shop'
        />
        {
          (this.props.user.isAdmin) ?
            <Menu.Item
              as={Link}
              name='newproduct'
              to='/newproduct'
              active={activeItem === 'newproduct'}
              content='New Product'
            /> : null
        }
        <Menu.Menu position='right'>
          {
            Object.keys(this.props.user).length === 0 ?
                <Menu.Item
                  as={Link}
                  name='login'
                  to='/login'
                  active={activeItem === 'login'}
                  content='Login'
                /> : null
          }
          {
            Object.keys(this.props.user).length === 0 ?
                <Menu.Item
                  as={Link}
                  name='signup'
                  to='/signup'
                  active={activeItem === 'signup'}
                  content='Sign Up'
                /> :
                <Menu.Item
                  name='logout'
                  active={activeItem === 'logout'}
                  content='Logout'
                  onClick={this.props.logout}
                />
          }
          <Menu.Item
            as={Link}
            name='cart'
            to='/order'
            active={activeItem === 'home'}
            content={`Cart (${this.props.itemNum})`}
          />
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    itemNum: state.order.line_items.length
  }
}

const mapDispatch = (dispatch) => {
  return {
    logout() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

// import {logout} from '../store'

// const Navbar = ({ handleClick, isLoggedIn }) => (
//   <div>
//     <h1>BOILERMAKER</h1>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/home">Home</Link>
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//         </div>
//       ) : (
//         <div>
//           {/* The navbar will show these links before you log in */}
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//         </div>
//       )}
//     </nav>
//     <hr />
//   </div>
// )

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     isLoggedIn: !!state.user.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     }
//   }
// }

// export default connect(mapState, mapDispatch)(Navbar)

// /**
//  * PROP TYPES
//  */
// Navbar.propTypes = {
//   handleClick: PropTypes.func.isRequired,
//   isLoggedIn: PropTypes.bool.isRequired
// }
