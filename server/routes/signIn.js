
const { connect } = require('getstream');
const bcrypt = require('bcrypt')
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');
 

const express = require('express')
const router = express.Router();

// THis is bad! Don't do this!
const api_key = "7z6fubsdagca"
const api_secret = "b53crzgueyn6jhk5e5kvkgmqyp62xs97e2tthwsffjn2ydnre69kn24ea9q83zy7"
const app_id = "1152586"


router.post('/register', async function(req, res){
    try {
        console.log(req.body)
        var userId = crypto.randomBytes(16).toString('hex');  // assign generated user id
        const { fullName, username, password} = req.body; // get pertinant variables from the from
        const serverClient = connect(api_key, api_secret, app_id); // connect to stream chat with credentials
        const hashedPassword = await bcrypt.hash(password, 10)    // hash the password
        const token = serverClient.createUserToken(userId) //get token
        res.status(200).json({token, fullName, username, userId, hashedPassword})

    } catch (err){
        res.status(500).send(err)
    }
    
})
router.post('/signin', async function(req, res){
    try {
        const {username, password } = req.body; // get username and pw from req body, derfrenced
        console.log(req.body)
        const serverClient = connect(api_key, api_secret, app_id); //connect to stream chat with credentials
        const client = StreamChat.getInstance(api_key, api_secret); // get a client instance with credentials
        const { users } = await client.queryUsers({name: username}) // query users from stream chat where username matches username from body
        if(!users.length) return res.status(400).json({ message : "no User with that ID"}) //if not found, send message saying such
        const hashMatch = await bcrypt.compare(password, users[0].hashedPassword) // compare stored password, to password from front, if they match continue
        const token = serverClient.createUserToken(users[0].id) // get token so we know that we have connected properly
        //if our hashed pws match, then we can continue
        if(hashMatch ){
            res.status(200).json({token, fullName: users[0].fullName, username, userId: users[0].id})
        }else{
            res.status(500).json({message : "incorred pw"})
        }

    } catch (err){
        res.status(500).send(err)
    }
    
})

module.exports = router;