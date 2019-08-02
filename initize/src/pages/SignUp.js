import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as firebase from "firebase"
import {connect} from 'react-redux';
import {handleSignup, handleLogin, changeSelected} from '../redux/actions';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 12,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    avatar2: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});


class SignUp extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            isLoadingSignIn: false,
            isLoadingSignUp: false,
            email : "",
            password : "",
            username : "",
            error : "",
        }
    }

    handleChange = e => {
        this.setState({[e.target.name] : e.target.value});
        console.log(this.state);
    }

    handleSignUp = (e) => {
        e.preventDefault();
        let {email, password, username} = this.state;
        if(email && password && username){
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
                const user = {
                    email : res.user.email,
                    uid : res.user.uid,
                    username : username,
                    boards : [],
                    dateJoined : Date.now(),
                    profilePicture : "https://banner2.kisspng.com/20180722/gfc/kisspng-user-profile-2018-in-sight-user-conference-expo-5b554c0968c377.0307553315323166814291.jpg",
                };
                firebase.database().ref('/users/' + user.uid).set(user).then(async () => {
                    await this.props.handleSignup(user);
                    this.props.history.push('/account-settings');
                })
                .catch(err => {
                    this.setState({error : "Sorry there was a problem signing you in"});
                    console.log(err)
                })
            })
            .catch(err => {
                this.setState({error : err.message})
            })
        }else{
            this.setState({error : "All fields must be filled in when making an account."})
        }
    }

    handleSignIn = (e) => {
        e.preventDefault();
        this.setState({isLoadingSignIn : true})
        const {email, password} = this.state;
        if(email && password){
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                firebase.database().ref('/users/' + res.user.uid).once('value').then(async snap => {
                    await this.props.handleLogin(snap.val());
                    if(snap.val().boards){
                        const selected = Object.keys(snap.val().boards)[0]
                        this.props.changeSelected(snap.val().boards[selected]);
                        this.props.history.push('/dashboard/' + selected)
                    }else{
                        this.props.history.push("/account-settings");
                    } 
                })
            })
            .catch(err => {
                this.setState({error : err.message})
            })
        }else{
            this.setState({error : "Please fill out both email and password fields when signing in."})
        }
        this.setState({isLoadingSignIn : false})
    }

    render() {
        return (
            <React.Fragment> 
            <main className={this.props.classes.main}>
            <CssBaseline />

            <AppBar position="absolute" color="default" className={this.props.classes.appBar}>
                <Toolbar style={{'display':'flex','justifyContent':'center'}}>
                <Typography variant="h4" color="primary" noWrap >
                    Authentication
                </Typography>
                </Toolbar>
            </AppBar>

            <Paper className={this.props.classes.paper}>
                {this.state.error ? 
                <Paper>
                    <Typography variant="h6" color="secondary" noWrap >
                        {this.state.error}
                    </Typography>
                </Paper> 
                : null}

                <Avatar className={this.props.classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <form className={this.props.classes.form}>

                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input onChange={this.handleChange} id="email" name="email" autoComplete="email" autoFocus />
                    </FormControl>

                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Username</InputLabel>
                        <Input onChange={this.handleChange} id="username" name="username" autoComplete="username" autoFocus />
                    </FormControl>

                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input onChange={this.handleChange} name="password" type="password" id="password" autoComplete="current-password" />
                    </FormControl>

                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}

                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={this.props.classes.submit}
                        disabled={this.state.isLoading}
                        onClick={this.handleSignUp}
                    >
                    {this.state.isLoadingSignUp ? <CircularProgress color="white"/>:'Sign Up' }
                    </Button>

                </form>

                <p>or</p>
                <Avatar className={this.props.classes.avatar2}>
                    <LockOutlinedIcon />
                </Avatar>

                <form className={this.props.classes.form}>

                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input onChange={this.handleChange} name="email" autoComplete="email" autoFocus />
                    </FormControl>

                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input onChange={this.handleChange} name="password" type="password" autoComplete="current-password" />
                    </FormControl>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={this.props.classes.submit}
                        disabled={this.state.isLoading}
                        onClick={this.handleSignIn}
                    >
                    
                    {this.state.isLoadingSignIn ? <CircularProgress color="white"/>:'Sign In' }
                    </Button>

                </form>
                
                <Link to="/" ><p>Back to Homescreen</p></Link>
            </Paper>
            
            </main>
            </React.Fragment>
            
        );
    }
}



SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        loggedIn : state.loggedIn,
    };
};

export default connect(mapStateToProps, {handleSignup, handleLogin, changeSelected})(withStyles(styles)(SignUp))

