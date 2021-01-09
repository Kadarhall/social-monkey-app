import React, { Fragment} from 'react';
import NoImg from '../images/no-img.png';
import PropTypes from 'prop-types';

// Material UI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import withStyles from '@material-ui/core/styles/withStyles';

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
    card: {
        display: 'flex',
        marginBottom: 20
    },
    cardContent: {
        width: '100%',
        flexDirection: 'column',
        padding: 25
    },
    cover: {
        minWidth: 200,
        objectFit: 'cover'
    },
    handle: {
        width: 60,
        height: 18,
        backgroundColor: '#2e73ab',
        marginBottom: 7
    },
    date: {
        width: 100,
        height: 14,
        backgroundColor: 'rgba(0,0,0,0.4)',
        marginBottom: 10
    },
    fullLine: {
        height: 15,
        width: '90%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        marginBottom: 10
    },
    halfLine: {
        height: 15,
        width: '50%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        marginBottom: 10
    }
}

const ScreamSkeleton = (props) => {
    const { classes } = props;

    const content = Array.from({ length: 5 }).map((item, index) => (
        <Card className={classes.card} key={index}>
            <CardMedia className={classes.cover} image={NoImg} />
            <CardContent className={classes.cardContent}>
                <div className={classes.handle} />
                <div className={classes.date} />
                <div className={classes.fullLine} />
                <div className={classes.fullLine} />
                <div className={classes.halfLine} />
            </CardContent>
        </Card>
    ))

    return <Fragment>{content}</Fragment>

}

ScreamSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ScreamSkeleton);