import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

//MaterialUI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//Redux
import { connect } from 'react-redux';
import { getScream, clearErrors } from '../../redux/actions/dataActions';

//Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

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
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
})

class ScreamDialog extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: ''
    }

    componentDidMount() {
        if (this.props.openDialog) {
            this.handleOpen();
        }
    }

    handleOpen = () => {
        let oldPath = window.location.pathname;

        const screamId = this.props.screamId;
        const userHandle = this.props.userHandle;

        const newPath = `/users/${userHandle}/scream/${screamId}`;

        if (oldPath === newPath) oldPath = `/users/${userHandle}`;

        window.history.pushState(null, null, newPath);

        this.setState({ open: true, oldPath, newPath });
        this.props.getScream(this.props.screamId);
    }

    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({ open: false });
        this.props.clearErrors();
    }

    render() {
        const { classes, scream: { screamId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments }, UI: { loading } } = this.props;
        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>
            </div>
        ) : (
            <Grid container spacing={2}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color="primary"
                        variant="h5"
                        to={`/users/${userHandle}`}
                    >
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator}></hr>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span>{commentCount} comments</span>
                </Grid>
                <hr className={classes.visibleSeparator} />
                <CommentForm screamId={screamId} />
                <Comments comments={comments} />
            </Grid>
        )
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Expand post" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary"/>
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
                
                    <DialogContent classes={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI
});

const mapActionsToProps = {
    getScream,
    clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));