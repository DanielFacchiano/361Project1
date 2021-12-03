
const { connect } = require('getstream');
// bcrypt for password operations, lets us encrypt a password
const bcrypt = require('bcrypt')
const StreamChat = require('stream-chat').StreamChat;
// Can use this to generate our user ids
const crypto = require('crypto');
 

const express = require('express')
const router = express.Router();

// THis is bad! Don't do this!
const api_key = "7z6fubsdagca"
const api_secret = "b53crzgueyn6jhk5e5kvkgmqyp62xs97e2tthwsffjn2ydnre69kn24ea9q83zy7"
const app_id = "1152586"

// Route to handle registration requests
router.post('/register', async function(req, res){
    try {
        console.log(req.body)
        var userId = crypto.randomBytes(16).toString('hex');  // assign generated user id
        const { fullName, username, password} = req.body; // get pertinant variables from the from body of the request
        var hashedPassword = await bcrypt.hash(password, 10)    // hash that password baby!
        var serverClient = connect(api_key, api_secret, app_id); // connect to stream chat with credentials
        var token = serverClient.createUserToken(userId) //get token from streamchat api after passing it credential
        res.status(200).json({token, fullName, username, userId, hashedPassword}) //Send this stuff back to the front end

    } catch (err){
        console.log("Something went wrong")
    }
    
})
// route to handle users signing in and retrieving their information from the server properly.
router.post('/signin', async function(req, res){
    try {
        const {username, password } = req.body; // get username and pw from req body, derfrenced
        const serverClient = connect(api_key, api_secret, app_id); //connect to stream chat with credentials
        console.log(req.body)

        const client = StreamChat.getInstance(api_key, api_secret); // get a client instance with credentials
        const { users } = await client.queryUsers({name: username}) // query users from stream chat where username matches username from body
        if(users.length < 0){ 
            return res.status(400).json({ message : "no User with that ID"})
        } 
        //if not found, send message saying such
        var hashMatch = await bcrypt.compare(password, users[0].hashedPassword) // compare stored password, to password from front, if they match continue
        var token = serverClient.createUserToken(users[0].id) // get token so we know that we have connected properly
        //if our hashed pws match, then we can continue and send the front end the correct data else we send incorrect pw message
        if(hashMatch ){
            res.status(200).json({token, fullName: users[0].fullName, username, userId: users[0].id}) // send front end data
        }
        else{
            res.status(500).json({message : "incorred pw!"}) // incorrect detection messaging
        }

    } catch (err){
        console.log("Something went wrong")
    }
    
})

module.exports = router;