import React from 'react';
import {connect} from 'react-redux';
import * as firebase from 'firebase';
import {signOut} from '../redux/actions';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';


class AccountSettings extends React.Component{
    constructor(){
        super();
        this.state = {
            username : "",
            profilePicture : "",
            email : "",
            password : "",
            passwordConfirm : "",
            noChanges : true,
            pictureChanged : false,
            savingChanges : false,
        }
    }

    signOut = () => {
        if(window.confirm("Are you sure you want to sign out?")){
            firebase.auth().signOut();
            this.props.signOut();
        }else{
            return;
        }
    }

    handleChange = (e, type = "text") => {
        if(type === "text"){
            this.setState({[e.target.name] : e.target.value});
        }
        else{
            const image = e.target.files[0];
            this.setState({ profilePicture : image, pictureChanged : true })
            console.log("file", image)
        }
        this.checkForChanges(e.target.name, e.target.value);
    }

    checkForChanges = (name, value) => {
        if(value === this.props.user[name]){
            this.setState({ noChanges : true})
        }else{
            this.setState({ noChanges : false })
        }
    }

    onSubmit = async e => {
        const {username, email, profilePicture, pictureChanged} = this.state;
        e.preventDefault();
        if(username){
            let url = "";
            this.setState({ savingChanges : true });
            if(pictureChanged){
                let uploadTask = await firebase.storage().ref('users/profilePictures').child(`${this.props.user.uid}-profilePicture.jpg`).put(this.state.profilePicture);
                console.log(uploadTask.ref.getDownloadURL());
                console.log(uploadTask)
                await uploadTask.ref.getDownloadURL().then(downloadURL => {
                    console.log("download url", downloadURL);
                    url = downloadURL;
                });
            }
            console.log("URL Generated", url)
            const ref = firebase.database().ref(`/users/${this.props.user.uid}`);
            ref.update(this.state.pictureChanged ? { username : username, profilePicture : url} : {username : username});
            this.setState({ savingChanges : false, noChanges : true })
        }else{
            alert("Please input a username");
        }
    }

    componentDidMount(){
        console.log("PROPS", this.props)
        const { username, profilePicture, email} = this.props.user
        this.setState({username : username, profilePicture : profilePicture, email : email})
    }

    render(){
        const { username, profilePicture, email} = this.state;
        return(
            <div>
                <h2>Account Settings</h2>
                <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
                    <TextField
                        label="Username"
                        value={username}
                        name="username"
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                    />

                    <input
                        accept="image/*"
                        style={{display : "none"}}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={e => this.handleChange(e, "file")}
                    />

                    <label htmlFor="contained-button-file">
                        <Button variant="contained" component="span">
                            Profile Picture
                            {this.state.pictureChanged ? this.state.profilePicture.name : ""}
                        </Button>
                    </label>

                    <Button onClick={this.onSubmit} disabled={this.state.noChanges} type="submit" variant="contained" size="small">
                        {this.state.savingChanges 
                        ? 
                        <CircularProgress /> 
                        : 
                        <SaveIcon />
                        }
                    </Button>

                </form>
                <button onClick={this.signOut}>SignOut</button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user : state.user
    }
}

export default connect(mapStateToProps, {signOut})(AccountSettings);