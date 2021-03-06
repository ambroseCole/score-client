import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import  MyButton  from '../Util/MyButton'
// MUI stuff
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import HomeIcon from '@material-ui/icons/Home'
import Notifications from '@material-ui/icons/Notifications'



class NavBar extends Component {
    render() {
        const { authenticated } = this.props
        return (
            <div>
                <AppBar>
                    <ToolBar className="nav-container">
                        {authenticated ? (
                            <Fragment>
                                <MyButton tip="Create a Scream">
                                    <AddIcon color="primary"/>
                                </MyButton>
                                <Link to="/">
                                <MyButton tip="Home">
                                    <HomeIcon color="Primary"/>
                                </MyButton>
                                </Link>
                                <MyButton tip="Notifications">
                                    <Notifications color="primary"/>
                                </MyButton>
                            </Fragment>
                        ) : (
                            <Fragment>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/signup">Signup</Button>
                            </Fragment>
                        )}
                    </ToolBar>
                </AppBar>
            </div>
        )
    }
}

NavBar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(NavBar)
