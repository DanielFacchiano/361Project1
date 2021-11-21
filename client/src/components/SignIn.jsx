import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'

// secondary container, contains background
var SignInInputs = {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    background: "lightblue",  
    padding: "6rem",
    justifyContent: "center"
  }

  // Main container for this page
var SignInContainerStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "row"
  };
// style for the box fields are contained within
  var SignUpText = {
    display: "flex",
    padding: "24px",
    borderRadius: "10px",
    background: "white",
    flexDirection: "column"

  }


// style for the text of the switch button
  var buttonColor = {
      color : "blue",
      cursor: "pointer"
  }
// style for the button wrapper
  var buttonHolderStyle= {
    marginTop: "2rem",
    display: "flex",
    justifyContent: "flex-start"
  }
  
  //style for sign in/ sign up buton
  var buttonStyle={
    borderRadius: "4px",
    background: "#000000",
    border: "1px solid #005fff",
    color: "#fff",
    fontWeight: "500",
    padding:" 0.5rem 1.1rem",
    cursor: "pointer",
    transition: "0.3s ease"
  }

  var initialFields = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword:''
}
//get our cookies instance
const cookies = new Cookies();

function SignIn() {
// fields of the sign in/up form saved as a use state to send to the server
    const [fields, setFields] = useState(false);
    const [signIn, setSignIn] = useState(false);
//If we hit the mode change button, we change modes (signin/signup)
    function nextMode(){
        setSignIn(!signIn)
    }
// If we detect that something has changed in one of the inputs, we pass all the previous fields to fields usestate, 
//and then we set the specifc fields of the input that was changed to the new detected value. 
    function detectChange(e){
        setFields({...fields, [e.target.name]: e.target.value })

    }
    // function to submit new users/ sign in info
    // we send front end info into our server which sends it to the stream chat api server
    // we also set our cookies to the users data
    async function handleSubmit(e){
        e.preventDefault();

        const {fullName, username, password} = fields
        const URL ="http://localhost:4000/form";
        const { data: {token, userId, hashedPassword} } = await axios.post(`${URL}/${signIn ? 'signin' : 'register'}`,{
            username, password, fullName
        })
        cookies.set('token', token)
        cookies.set('username', username)
        cookies.set('fullName', fullName)
        cookies.set('userId', userId)
        //sign up needs the hashed pw
        if(!signIn){
            cookies.set('hashedPassword', hashedPassword)   
        }
        //after cookies have been set, we reload the window
        window.location.reload();

    }
    // The various html to lay out the sign in/ sign up page
    return (
        <div style={SignInContainerStyle}>
            <div style={SignInInputs}>
                <p style={SignUpText}> 
                    <h2>{signIn ? 'Sign In Here:' : 'Sign Up Here:'}</h2>
                    <form onSubmit={handleSubmit}>
                        {!signIn && (
                            <div className= "input_field">
                                <label htmlFor="fullName">Full Name </label>
                                <input
                                    name="fullName"
                                    onChange={detectChange}
                                    type="text"
                                    placeholder="Insert Full Name"
                                    required
                                />
                            </div>
                        )}

                            <div className= "input_field">
                                <label htmlFor="username">UserName </label>
                                <input
                                    name="username"
                                    onChange={detectChange}
                                    type="text"
                                    placeholder="Insert username"
                                    required
                                />
                            </div>
                            <div className= "input_field">
                                <label htmlFor="password">Password </label>
                                <input
                                    name="password"
                                    onChange={detectChange}
                                    type="password"
                                    placeholder="Insert password here"
                                    required
                                />
                            </div>
                            {!signIn && (
                            <div className= "input_field">
                                <label htmlFor="confirmPassword">Confirm Password </label>
                                <input
                                    name="confirmPassword"
                                    onChange={detectChange}
                                    type="password"
                                    placeholder="confirm_password"
                                    required
                                />
                            </div>
                        )}
                        <div style = {buttonHolderStyle}>
                            <button style = {buttonStyle}>
                                {!signIn ? "Sign Up!" : "Sign In!"}
                            </button>
                            
                        </div>
                    </form>
                    <div >
                        <p>
                            {signIn ? "Go to Sign Up Page:" : "Go to Sign In Page:"}
                            <div style ={buttonColor}onClick={nextMode}>
                                {signIn ? 'Sign Up' : 'Sign In'}
                            </div>
                        </p>
                    </div>
                </p>
            </div>
        </div>
    )
}

export default SignIn
