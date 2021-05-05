import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import MyButton from '../Util/MyButton'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DeleteOutline from '@material-ui/icons/DeleteOutline'

import { deleteScream } from '../redux/actions/dataActions'
import { Fragment } from 'react'

const styles = {
    deleteButton: {
        position: 'absolute',
        top: '10%',
        left: '90%'
    }
}

class DeleteScream extends Component {
        state = {
            open: false
        }
        handleOpen = () => {
            this.setState({ open: true })
        }
        handleClose = () => {
            this.setState({ open: false })
        }
        deleteScream = () => {
            this.props.deleteScream(this.props.screamId)
            this.setState({ open: false })
        }
    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <MyButton tip="Delete Scream" onClick={this.handleOpen}btnClassName={classes.deleteButton}>
                    <DeleteOutline color="primary"/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>
                        Are you sure?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">
                            Cancel
                        </Button><Button onClick={this.deleteScream} color="primary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        
        )
        }
}

DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
}

export default connect(null, { deleteScream })(withStyles(styles)(DeleteScream))
