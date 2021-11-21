import React, { useState } from 'react';
import { MessageList, MessageInput, Thread,  useChannelActionContext, useChannelStateContext, useChatContext, Window} from 'stream-chat-react';
// This component is made up of a bunch of stream chat components
import {ChannelInfo} from '../Stuff/ChannelInfo'
// component from stream chat api
export const Contexto = React.createContext({});
// .team-channel-header__name-wrapper {
 // Style for the header,


// Style for the group channel title and header
var channel_header=
{
  fontFamily: "sans-serif",
  fontWeight: "bold",
  fontSize: "18px",
  color: "#2c2c30",
  marginRight: "8px"
}

// Style for the "users in group section"
var right_text = {
  fontFamily:"sans-serif",
  fontSize: "14px",
  color: "#858688"
}

// Style for above inside
var right_text_inner= {
  display: "flex",
  paddingLeft: "12px"
}
// container height for header
var header_container=
{
  height: "72px"
}

// Need open options prop for options button at top of page
function ChannelInner({ setOpenOptions }){

  // State to determine if 
  const [messageState, setMessageState] = useState(false);

  const { postMessage } = useChannelActionContext();
  // required handler for the stream chat message component
  const SubmitHandler = (message) => {
    var updatedMessage = {
      mentioned_users: message.mentioned_users,
      text: message.text,
      parent: message.parent,
      parent_id: message.parent?.id,
      attachments: message.attachments,
    };

    
    if (postMessage == true) {
      postMessage(updatedMessage);
      setMessageState(false);
    }
  };
// Get the components that make up our main chat page. We have a header, a message list, and an input for messages. all from the api
  return (
    <Contexto.Provider value={{ messageState, setMessageState }}>
      <div style={{ display: 'flex', width: '100%' }}>
        <Window>
          <TeamChannelHeader setOpenOptions={setOpenOptions} />
          <MessageList />
          <MessageInput SubmitHandler={SubmitHandler} />
        </Window>
        <Thread />
      </div>
    </Contexto.Provider>
  );
};
// Channel Header component, derefrence components from chat and channel contexts for proper titles and info
const TeamChannelHeader = ({ setOpenOptions }) => {
    var { channel, watcher_count } = useChannelStateContext();
    var { client } = useChatContext();
  
    // Determines header of channel message feed
    const MessagingHeader = () => {
      // get channel members where they arent the user
      var members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
      // if were in the DMs just say DMs
      if(channel.type === 'messaging') {
        return (
          <div style = {channel_header}>
              Direct Messaging
          </div>
        );
      }
      // else we will return the channel name header for the channel
      // We add the options icon to set channel options manually
      return (
        <div className='channel-inner-header-wrap2'>
          <p style={channel_header}>Group: {channel.data.name} </p>
          <span style={{ display: 'flex' }} onClick={() => setOpenOptions(true)}>
            <ChannelInfo />
          </span>
        </div>
      );
    };
    // function to get the users watching the chat, posts this number to header
    const getWatcherText = (watchers) => {
      if (!watchers) return 'Nobody is online';
      else{
      return `${watchers} users online in group`;
    }
    };
    // Return the  Header component w container
    return (
      <div style={header_container}>
        <MessagingHeader />
        <div style={right_text_inner}>
          <p style={right_text}>{getWatcherText(watcher_count)}</p>
        </div>
      </div>
    );
  };

  export default ChannelInner;