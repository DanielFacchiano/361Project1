import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

//Direct import of components
//import ChannelListContainer from './components/ChannelListContainer' 
//import ChannelContainer from './components/ChannelContainer'

import { ChannelListContainer, ChannelContainer, Auth } from './components';

import 'stream-chat-react/dist/css/index.css';
import './App.css';

const cookies = new Cookies();

const apiKey = '9b66ferxg34b';
//if our cookies have a token stored, we know we are signed in 
const authToken = cookies.get("token");
//we need a connection to our chat api, we use our api key to connect to it
const client = StreamChat.getInstance(apiKey);

//if we are signed in, we can get all of the user information from our cookies.
// we immedietly pass it all down to the client
if(authToken) {
    client.connectUser({
        token : cookies.get('token'),
        name: cookies.get('username'),
        fullName: cookies.get('fullname'),
        id: cookies.get('userId'),
        hashedPassword: cookies.get('hashedPassword')
    }, authToken)
}

const App = () => {
    const [createType, setCreateType] = useState('')
    const [isCreating, setIsCreating] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    
    //If were not logged in, our sign in token is false. Return the Sign in Component for authization before accesing application
    if(!authToken){return <Auth />}

    return (
        <div className = 'app__wrapper'>
            <Chat client={client} theme="team light">
                <ChannelListContainer
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateType={setCreateType}
                    setIsEditing={setIsEditing}
                    isEditing={isEditing}
                />
                <ChannelContainer
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    createType= {createType}
                />
            </Chat>
        </div>
    );
}

export default App
