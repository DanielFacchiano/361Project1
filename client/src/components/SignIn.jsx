import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'

var SignInInputs = {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    background: "lightblue",  
    padding: "6rem",
    justifyContent: "center"
  }

var SignInContainerStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "row"
  };

  var SignUpText = {
    display: "flex",
    padding: "24px",
    borderRadius: "10px",
    background: "white",
    flexDirection: "column"

  }
  var switchStyle = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "0.2rem"
  }

  var buttonColor = {
      color : "blue",
      cursor: "pointer"
  }

  var buttonHolderStyle= {
    marginTop: "2rem",
    display: "flex",
    justifyContent: "flex-start"
  }
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

        if(!signIn){
            cookies.set('hashedPassword', hashedPassword)   
        }
        //after cookies have been set, we reload the window
        window.location.reload();

    }

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
                    <div style={switchStyle}>
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
