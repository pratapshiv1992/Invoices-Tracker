import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types';
import { 
    Link as RouterLink,
} from 'react-router-dom';


const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    body:{
        minHeight:'calc(85vh - 120px)',
        minWidth:'100%',
    },
    footer:{
        minWidth: '100%',
        background: 'gray',
        minHeight:60,

    },
    conatainer:{
        marginBottom:10
    },
    light:{
        marginTop: '30px',
        background: '#f8f5f573',
        color: '#932626',
        textAlign: 'center',
    },
    link:{
        color:'white'
    }
};

const LinkData = [{
    text:'Invoice Listing',
    to:'/',
},{
    text:'Add Invoice',
    to:'/add-invoice',
},{
    text:'About Developer',
    to:'/about-developer',
}];

const MyLink = props =>{ 
return <RouterLink to={props.to} {...props} />
}

const AllLinks = ({classes})=>{
    return LinkData.map((link)=><Button variant="text" color="primary"  >
        <Link component={MyLink} to={link.to} color='textSecondary' underline="none" classes={{root:classes.link}} >{link.text}</Link>
      </Button>
)
}

const Navbar = ({classes})=> {
    return (
        <div className={classes.root}>
            <AppBar position="static" color="secondary" >
                <Toolbar  >
                    <IconButton onClick={()=>alert('Menu button clicked')} className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <AllLinks classes={classes} />
                </Toolbar>
            </AppBar>
        </div>
    );
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);