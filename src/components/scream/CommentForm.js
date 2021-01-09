import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// Material UI
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

// Redux
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

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
    paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
        }
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle'
        },
        '& a': {
          color: '#00bcd4'
        }
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0'
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer'
        }
      }
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    }
})

class CommentForm extends Component {
    state = {
        body: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '' });
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.screamId, { body: this.state.body });
    }
    render() {
        const { classes, authenticated } = this.props;
        const { errors } = this.state;

        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{ textAlign: 'center' }}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        id="filled-basic"
                        name="body"
                        type="text"
                        label="Comment on post"
                        errors={errors.comment ? true : false}
                        helperText={errors.comment}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                        variant="filled"
                        className={classes.textField}
                    />
                        <Button
                            type="submit" 
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >Post</Button>
                </form>
                <hr className={classes.visibleSeparator} />
            </Grid>
        ) : null;
        return commentFormMarkup
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm));
