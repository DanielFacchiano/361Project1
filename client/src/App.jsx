import './App.css';
import {StreamChat} from 'stream-chat'
import Cookies from 'universal-cookie'
import { Chat } from 'stream-chat-react' //The Main wrapper for all the stream api Channel shenanigans we are using
import { useState } from 'react';
//THis is what styles the components of Stream Chat. If the styles look professional anywhere its this
import 'stream-chat-react/dist/css/index.css'


//where we import our components into the program
import ChatPage from './components/ChatPage' 
import GroupList from './components/GroupList'
import Groups from './components/Groups';
import SignIn from './components/SignIn';


//Our API key for stream chat, we use the stream chat to get and instance of it to hoist into the chat client
var streamKey='7z6fubsdagca'
//cookies instance
const cookies = new Cookies();
//if were signed in, cookies should gave a authorization token
const userSignedIn = cookies.get("token");

//get our stream chat instace
var instance = StreamChat.getInstance(streamKey)
//if we have an auth token, we can pass its info to the stream instance to get our users stuff
if(userSignedIn) {
  instance.connectUser({
      token : cookies.get('token'),
      name: cookies.get('username'),
      fullName: cookies.get('fullname'),
      id: cookies.get('userId'),
      hashedPassword: cookies.get('hashedPassword')
  }, userSignedIn)
}
console.log(userSignedIn)

// The main componenet we put into the html document
function App() {
  // If were using a Team messanger or a direct message (for when editing/creating channels)
  const [createType, setCreateType] = useState('')
  // If we set this state to true, we want the chat page to show the create channel page
  const [newChannel, setNewChannel] = useState(false)
  //  if we set this to true, we want the channel options to open
  const [openOptions, setOpenOptions] = useState(false)

  // if no users are signed in, we want the sign in component so we can get a user
  if(userSignedIn == null){ return <SignIn /> 
  }
  //Return the main chat application, with the sidebar grouplist and the main chat page
  // we pass them the functions needed to change states to open different windows and options
  return (
    //The most powerful wrapper 
    <div className="eminmen">
{/* chat is a component from stream api that wraps the application. Provides "chat context to childrem including StreamChat client isntance" */}
      <Chat client = {instance} theme='team light'>
            <GroupList
              newChannel={newChannel}
              setCreateType={setCreateType}
              setNewChannel={setNewChannel}
              setOpenOptions={setOpenOptions}
              openOptions={openOptions}
            />

            <ChatPage
              newChannel={newChannel}
              openOptions={openOptions}
              setNewChannel={setNewChannel}
              setOpenOptions={setOpenOptions}
              createType={createType}
            />
      </Chat>
    </div>
  );

}

export default App;
