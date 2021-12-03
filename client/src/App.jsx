import './App.css';
import {StreamChat} from 'stream-chat'
import Cookies from 'universal-cookie'
import { Chat } from 'stream-chat-react' //The Main wrapper for all the stream api Channel shenanigans we are using
import { useState } from 'react';
//THis is what styles the components of Stream Chat. If the styles look professional anywhere its this
import 'stream-chat-react/dist/css/index.css'


//where we import our components into the program
import ChatPage from './components/ChatPage' 
import ChatInner from './components/ChatInner';
import GroupList from './components/GroupList'
import Groups from './components/Groups';
import SignIn from './components/SignIn';


//Our API key for stream chat, we use the stream chat to get and instance of it to hoist into the chat client
var streamKey='7z6fubsdagca'
//cookies instance
var cookies = new Cookies();
//if were signed in, cookies should gave a authorization token
var userSignedIn = cookies.get("token");

//get our stream chat instance by passing stream chat our api key
var instance = StreamChat.getInstance(streamKey)
//if we have an auth token, we can our cookie info info to the stream instance to get our users pertinent stuff


if(userSignedIn) {
  var curToken = cookies.get('token')
  var curUsername = cookies.get('username')
  var currFullName = cookies.get('fullname')
  var curId = cookies.get('userId')
  var currHashPw = cookies.get('hashedPassword')
  instance.connectUser({
      token : curToken,
      name: curUsername,
      fullName: currFullName,
      id: curId,
      hashedPassword: currHashPw
  }, userSignedIn)
}
console.log(userSignedIn)

var mainWrapper = {
  display: "flex",
  height: "100%",

};


// The main componenet we put into the html document
function App() {
  // If we set this state to true, we want the chat page to show the create channel page
  const [newChannel, setNewChannel] = useState(false)
  //  if we set this to true, we want the channel options to open
  const [openOptions, setOpenOptions] = useState(false)
  // If were using a Team messanger or a direct message (for when editing/creating channels)
  const [createType, setCreateType] = useState('')
  

  // if no users are signed in, we want the sign in component so we can get a users information
  if(userSignedIn == null)
  { 
    return <SignIn /> 
  }
  //Return the main chat application, with the sidebar grouplist and the main chat page
  // we pass them the functions needed to change states to open different windows and options
  return (
    // our main app page consists of two components. The sidebar on the left, and the chat page on the right. These different
    // components need different usestate props to open and close different menus pertinenet to them. We render them bellow
    // wrapped in the chat client instance so that we can grab contexts in the future.
    <div style={mainWrapper}> 
{/* chat is a component from stream api that wraps the application. Provides "chat context to childrem including StreamChat client isntance" 
    https://getstream.io/chat/docs/sdk/react/core-components/chat/ */}
      <Chat 
      theme 
      client = {instance} 
      >
            {/* Render the sidebar, pass it the icons required to change states via side buttons */}
            <GroupList
              newChannel={newChannel}
              openOptions={openOptions}
              setCreateType={setCreateType}
              setNewChannel={setNewChannel}
              setOpenOptions={setOpenOptions}
              createType={createType}
            />
            {/* Render the main chat container, also has options to state changing options  */}
            <ChatPage
              newChannel={newChannel}
              openOptions={openOptions}
              setCreateType={setCreateType}
              setNewChannel={setNewChannel}
              setOpenOptions={setOpenOptions}
              createType={createType}
            />
      </Chat>
    </div>
  );

}

export default App;
