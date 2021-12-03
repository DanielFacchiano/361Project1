import React from 'react'
import {useState} from 'react'
// Axios lets us make https requests simpler and easier
import axios from 'axios'
// cookies for user data
import Cookies from 'universal-cookie'

// secondary container, contains background
var SignInInputs = {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    background: "lightblue",  
    padding: "100px",
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
    marginTop: "20px",
    display: "flex"
  }
  
  //style for sign in/ sign up buton
  var buttonStyle={
    borderRadius: "4px",
    background: "black",
    color: "white",
    fontWeight: "650",
    padding:" 10px 14px",
    cursor: "pointer",
  }
  var inputStyle={
    paddingBottom: "18px"

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
// and then we set the specifc fields of the input that was changed to the new detected value. 
    function detectChange(event){
        var target=event.target.name
        var newField=event.target.value
        setFields({...fields, [target]: newField })
    }
    // function to submit new users/ sign in info
    // we send front end info into our server which sends it to the stream chat api server
    // we also set our cookies to the users data
    async function submitUser(event){
        event.preventDefault();
        // de-refrence the following from 
        const {fullName, username, password} = fields
        var URL ="http://localhost:4000/form";
        const { 
            data: {token, userId, hashedPassword} } = await axios.post(`${URL}/${signIn ? 'signin':'register'}`,{
            username, password, fullName
        })
        // We need to set our cookies with all of the information returned to us from our axios request to our express server
        cookies.set('userId', userId)
        cookies.set('token', token)
        cookies.set('fullName', fullName)
        cookies.set('username', username)
        // sign up needs the hashed pw we created for our user
        if(!signIn){
            cookies.set('hashedPassword', hashedPassword)   
        }
        //after cookies have been set, we reload the window of our react application, to see the results of the reload
        window.location.reload(this);

    }
    // The various html to lay out the sign in/ sign up page
    return (
        <div style={SignInContainerStyle}>
            <div style={SignInInputs}>
                <p style={SignUpText}> 
                {/* If we are in the signIn page display it, if not tells us that too */}
                    <h2>{signIn ? 'Sign In Here:' : 'Sign Up Here:'}</h2>
                    <form onSubmit={submitUser}>
                    {/* We only show this div if we are not in the signIn page else show nothing*/}           
                        {!signIn ? (
                            <div style= {inputStyle}>
                                <label htmlFor="fullName">Full Name </label>
                                <input

                                    name="fullName"
                                    onChange={detectChange}
                                    type="text"
                                    required
                                    placeholder="Insert Full Name here"
                                />
                            </div>
                        ):""}
                            <div style= {inputStyle}>
                                <label htmlFor="username">UserName </label>
                                <input

                                    name="username"
                                    onChange={detectChange}
                                    type="text"
                                    required
                                    placeholder="Insert username here"
                                />
                            </div>
                            <div style= {inputStyle}>
                                <label htmlFor="password">Password </label>
                                <input

                                    name="password"
                                    onChange={detectChange}
                                    type="password"
                                    required
                                    placeholder="Insert password here"
                                />
                            </div>
                            {/* We only show this div if we are not in the signIn page else show nothing*/}
                            {!signIn ? (
                            <div style= {inputStyle}>
                                <label htmlFor="confirmPassword">Confirm Password </label>
                                <input

                                    name="confirmPassword"
                                    onChange={detectChange}
                                    type="password"
                                    required
                                    placeholder="confirm password here"
                                    
                                />
                            </div>
                        ): ""}
                        {/* We create a button for the form to submit our filled fields */}
                        <div style = {buttonHolderStyle}>
                            <button style = {buttonStyle}>
                                Submit
                            </button>
                            
                        </div>
                    </form>
                    <div >
                        <p>
                      {/* We create a toggle button for the form to swap between the sign in and sign up fields */}
                            Toggle Sign In / Sign Up
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
