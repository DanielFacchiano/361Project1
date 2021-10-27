const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');

require('dotenv').config();


const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;


const signup = async (req, res) => {
    try {
        const { fullName, username, password} = req.body;

        const userId = crypto.randomBytes(16).toString('hex');

        const serverClient = connect(api_key, api_secret, app_id);

        const hashedPassword = await bcrypt.hash(password, 10);

        const token = serverClient.createUserToken(userId);

        res.status(200).json({token, fullName, username, userId, hashedPassword})

    } catch (error) {
        console.log(error);
        res.status(500).json({message : error});
    }
};

const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        const serverClient = connect(api_key, api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);

        //query client for users, return the user object with the name matching the passed one
        const { users } = await client.queryUsers({name : username});

        //If the users object has nothing in it, no usernames were returned, user not in server. not found error
        if(!users.length) return res.status(400).json({message : 'User not found' });
        
        // if the user exists, and his stored hashed password decrypted matches the passed pw, then we have success for log in
        const success = await bcrypt.compare(password, users[0].hashedPassword);

        //Set the token to the detected username
        const token = serverClient.createUserToken(users[0].id)
        //if the passwords matched, then we return user info and instance to the client
        //else the passwords must have not matched, so we return invalid pw error. 
        if(success){
            res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id});
        }
        else{
            res.status(500).json({ message : 'Incorrect Password' })
        }



    } catch (error) {
        console.log(error);
        res.status(500).json({message : error});
    }
};

module.exports = {signup, login}