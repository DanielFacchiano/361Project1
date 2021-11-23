import React from 'react'
import {useChatContext} from "stream-chat-react"
import {Channel} from "stream-chat-react"
import CreateChannel from './CreateChannel';
import ChannelOptions from './ChannelOptions';
import TeamMessage from './TeamMessage';
import ChannelInner from './ChannelInner';

// style for main chat page container for all states
var channelStyle = {
    height: "100%",
    width: "100%",
  };

  // Chat history style
var EmptyChannelStyle = {
    display: "flex",
    height: "100%",
    flexDirection: "column",
  };
// for previous history messages
  var EmptyChannelParagraphStyle = {
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: "18px",
    marginBottom: "10px"
  };
  //send preview style
  var EmptyChannelParagraphTwoStyle = {
    fontSize: "14px",
    lineHeight: "120%",
    margin: "0",
  };
//CHat page component function, has various state change props
function ChatPage(
    { newChannel, openOptions, setNewChannel, setOpenOptions, createType }
    ) {
        //get channel from context
    const { channel } = useChatContext();
//if new channel, return the createChannel component
    if(newChannel){
        return(
            <div style={channelStyle}>
                <CreateChannel createType={createType} setNewChannel={setNewChannel} />
            </div>
        )
    }
//if the option state is true, open the options component
    if(openOptions){
        return(
            <div style={channelStyle}>
                <ChannelOptions setOpenOptions={setOpenOptions}/>
            </div>
        )
    }
    //needed for stream api channel component
    // something to display when no messsages
    const noState=() => (
        <div style={EmptyChannelStyle}>
            <p style={EmptyChannelParagraphStyle}>Chat History Start: </p>
            <p style={EmptyChannelParagraphTwoStyle}>Send stuff</p>
        </div>
    )
        // Set up chat page, messages for message list provided by message props passed into Built team message
        // component. Pass options to inner for option opening via title button
    return (
        <div style={channelStyle}>
            <Channel
                EmptyStateIndicator={noState}
                Message={(messageProps, i) => <TeamMessage key={i} {...messageProps} />}
            >
                <ChannelInner setOpenOptions={setOpenOptions} />
            </Channel >
        </div>
    )
}

export default ChatPage
