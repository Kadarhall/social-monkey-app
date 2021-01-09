import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import { connect } from 'net';

const styles = {
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
      position: 'relative'
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
    }
  }
  };


  const StaticProfile = (props) => {
    const { classes, profile: { handle, createdAt, imageUrl, bio, website, location }} = props;

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                <img src={imageUrl} alt="profile" className="profile-image"/>
                
                </div>
                <hr/>
                <div className="profile-details">
                <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                    @{handle}
                </MuiLink>
                <hr/>
                {bio && <Typography variant="body2">{bio}</Typography>}
                <hr/>
                {location && (
                    <Fragment>
                    <LocationOn color="primary"/> <span>{location}</span>
                    <hr/>
                    </Fragment>
                )}
                {website && (
                    <Fragment>
                    <LinkIcon color="primary"/>
                    <a href={website} target="_blank" rel="noopener noreferrer">
                        {' '}{website}
                    </a>
                    <hr/>
                    </Fragment>
                )}
                <CalendarToday color="primary"/>{' '}
                <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                </div>
                
            </div>
        </Paper>
    )
  }

  StaticProfile.propTypes = {
      profile: PropTypes.object.isRequired,
      classes: PropTypes.object.isRequired
  }

  export default withStyles(styles)(StaticProfile);