import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';

//MaterialUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

//Redux
import { connect } from 'react-redux';
import { postScream, clearErrors } from '../../redux/actions/dataActions';

const styles = (theme) => ({
    palette: {
        primary: {
            //light: '#83c3f7',
            main: '#2e73ab',
            dark: '#467ea',
            contrastText: '#fff'
        },
        secondary: {
            //light: '#f6685e',
            main: '#f44336',
            dark: '#aa2e25',
            contrastText: '#fff'
        },
        },
        typography: {
        useNextVariants: true
    },
    form: {
      textAlign: 'center'
    },
    image: {
        margin: '20px auto 20px auto'
      },
      pageTitle: {
        margin: '10px auto 10px auto'
      },
      textField: {
        margin: '10px auto 10px auto'
      },
      button: {
        marginTop: 20,
        position: 'relative'
      },
      customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
      },
      progress: {
        position: 'absolute'
      },
      invisibleSeparator: {
        border: 'none',
        margin: 4
      },
      visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
      },
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    }
})

class PostScream extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }

        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({
                body: '',
                open: false,
                errors: {}
            });
        }
    }

    handleOpen = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.postScream({ body: this.state.body })
    }

    render() {
        const { errors } = this.state;
        const { classes, UI: { loading } } = this.props;

        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Post a Grievance!">
                    <AddIcon />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon />
                    </MyButton>
                    <DialogTitle>Post what is on your mind!</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                id="filled-basic"
                                name="body"
                                type="text"
                                label="Grievance"
                                multiline
                                rows="3"
                                placeholder="Just tell it like it is here!"
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                className={classes.TextField}
                                onChange={this.handleChange}
                                variant="filled"
                                fullWidth 
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submitButton}
                                disabled={loading}
                            >
                                Submit
                                {loading && (
                                    <CircularProgress className={classes.progressSpinner} />
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI
})

export default connect(mapStateToProps, { postScream, clearErrors })(withStyles(styles)(PostScream));