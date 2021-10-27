import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const Auth = () => {

// Initial state when we enter this page has all saved fields as nothing, as changes in inputs are detected
// the state is changed to reflect changes
    const initialState = {
        fullName: '',
        username: '',
        password: '',
        confirmPassword:''
    }

    const [form, setForm] = useState(initialState)
    const [isSignup, setIsSignup] = useState(true)


    // Set our form state to the previous form state, but change the detected e.target name field to
    // its corresponding value that has been changed
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fullName, username, password} = form;

        const URL ='http://localhost:5000/auth';

        //Backticks let us derefrence variables if isignup is true, post to signup else post to login
        // we await the axios post to our server route of choice, and store the results in data
        const { data :{token, userId, hashedPassword} } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`,
            {username, password, fullName});

        cookies.set('token', token)
        cookies.set('username', username)
        cookies.set('fullname', fullName)
        cookies.set('userId', userId)

        if(isSignup) {
            cookies.set('hashedPassword', hashedPassword)
        }

        //reload browser after setting cookies
        window.location.reload();

        

    }

    const switchMode = () => {setIsSignup(!isSignup)}

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <h3>{isSignup? 'Create Chat Account so you can Sign in again later' : 'Chat Sign In, set cookies to user information to save sessions'}</h3>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName"> Full Name </label>
                                <input 
                                    name="fullName" 
                                    type="text" 
                                    placeholder="Name"
                                    onChange = {handleChange}
                                    required
                                />
                            </div>
                        )}
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="username"> User Name </label>
                                <input 
                                    name="username" 
                                    type="text" 
                                    placeholder="username"
                                    onChange = {handleChange}
                                    required
                                />
                            </div>
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password"> Password </label>
                                <input 
                                    name="password" 
                                    type="password" 
                                    placeholder="password"
                                    onChange = {handleChange}
                                    required
                                />
                            </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword"> Confirm Password </label>
                                <input 
                                    name="confirmPassword" 
                                    type="password" 
                                    placeholder="password again"
                                    onChange = {handleChange}
                                />
                            </div>
                        )}
                    <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Sign Up" :"Sign In"}</button>
                            </div>



                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                           {isSignup 
                           ? "Already have an account?  "
                           : "Don't Have an Account?  "
                           }
                           <span onClick={switchMode}>
                            {isSignup ? 'Switch to Sign in Page' : 'Switch to Sign Up Page'}
                            </span> 
                        </p>

                    </div>
                </div>

            </div>  
        </div>
    )
}

export default Auth
