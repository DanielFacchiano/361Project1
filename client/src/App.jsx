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
import GroupFinder from './components/GroupFinder';
import Groups from './components/Groups';
import SignIn from './components/SignIn';


//Our API key for stream chat, we use the stream chat to get and instance of it to hoist into the chat client
var streamKey='7z6fubsdagca'
const cookies = new Cookies();
const userSignedIn = cookies.get("token");
var instance = StreamChat.getInstance(streamKey)

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
  const [createType, setCreateType] = useState('')
  const [newChannel, setNewChannel] = useState(false)
  const [openOptions, setOpenOptions] = useState(false)


  if(userSignedIn == null){ return <SignIn /> 


  }
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
