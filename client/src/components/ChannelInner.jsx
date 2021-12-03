import React from 'react';
// components from stream chat we require for the inner chat pages construction
import { MessageList, MessageInput, useChannelActionContext, useChannelStateContext, Window} from 'stream-chat-react';
// This component is made up of a bunch of stream chat components
import {ChannelInfo} from '../Stuff/ChannelInfo'

 //quick style to flex stuff
 var quick_flex ={
  display: 'flex'
 }

// Style for the group channel title and header
var channel_header=
{
  fontWeight: "bold",
  fontSize: "18px",
  marginRight: "8px"
}

// Style for the "users in group section"
var right_text = {
  fontFamily:"sans-serif",
  fontSize: "14px",
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
//main component container
var inner_container={
  display: 'flex', 
  width: '100%' 
}

var head_wraps={
  display: "flex",
  alignItems: "center"
}

// Need open options prop for options button at top of page
function ChannelInner({ setOpenOptions }){

  // Function defrencrenced from the useChannelActionContext, which is context provider for the selected channel
  // this function lets us post messages to this active channel.
  const { postMessage } = useChannelActionContext();

  // required handler for the free stream chat messaging component, fields must match streamChat APIs stuff.
  function SubmitHandler (message)  {
    var updatedMessage = {
      mentioned_users: message.mentioned_users,
      text: message.text,
      parent: message.parent,
      parent_id: message.parent?.id,
      attachments: message.attachments,
    };

    // Post message (function from channelAction context) posts the message object to the current channel if there is one to send
    if (postMessage == true) {
      postMessage(updatedMessage);
    }
  };
// https://getstream.io/chat/docs/sdk/react/utility-components/window/
// https://getstream.io/chat/docs/sdk/react/message-input-components/message_input/#basic-usage-17
// https://getstream.io/chat/docs/sdk/react/core-components/message_list
// Get the components that make up our main chat page. We have a header, a message list, and an input for messages. all from the api
// The header is the only component we make, it contains the selected channels group name and the options button for it
// Confusingish- The message list is rendered Here (stream Chat component), but we tell streamchat how to actually render messages
// in chatPage, where we pass our custom message component to the CHannel (stream chat component) as a prop
// THe message input streamchat component takes the handler so that it can proccess the data our users type up.
  return (
      <div style={inner_container}>
        <Window>
          <TeamChannelHeader setOpenOptions={setOpenOptions} />
          <MessageList />
          <MessageInput SubmitHandler={SubmitHandler} />
        </Window>
      </div>
  );
};
// Channel Header component, derefrence components from chat and channel contexts for proper titles and info
function TeamChannelHeader ({ setOpenOptions }) {
    var { channel, watcher_count } = useChannelStateContext(); // we can just grab the amount of people in the channel, the channel itself
    //using the context. These are prexexisting from the stream chat api.
    // Determines header of channel message feed
    function MessagingHeader() {
      // get channel members where they arent the user
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
        <div style={head_wraps}>
          <p style={channel_header}>Group: {channel.data.name} </p>
          {/* Set up our channel Options button, and the corresponding tooltip */}
          <span style={quick_flex} onClick={() => setOpenOptions(true)}>
            <div className ="channelInfoHolder">
            <span className ="channelInfoToolTip">Click here to open the currently open channel's options</span>
            <ChannelInfo />
            </div>
          </span>
        </div>
      );};

    // function to get the users watching the chat, posts this number to header
    function getWatcherText (count) {
      if (!count) return 'Nobody is online';
      else{
      return `${count} users are online in this group`;
    }
    };
    // Return the  Header component w container, print the watcher count from stream chat api
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