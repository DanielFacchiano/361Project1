import React from 'react'
import {useChatContext} from "stream-chat-react"
import {Channel} from "stream-chat-react"
import CreateChannel from './CreateChannel';
import ChannelOptions from './ChannelOptions';
import TeamMessage from './TeamMessage';
import ChatInner from './ChatInner';

// style for main chat page container for all states
var channelStyle = {
    height: "100%",
    width: "100%",
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
                <CreateChannel createType={createType} 
                setNewChannel={setNewChannel} />
            </div>
        )
    }
//if the option state is true, open the options component, pass it the function so we can close menu later
    if(openOptions){
        return(
            <div style={channelStyle}>
                <ChannelOptions 
                setOpenOptions={setOpenOptions}/>
            </div>
        )
    }
        // Set up chat page, messages for message list provided by message props passed into our own  team message
        // component. Then render the actual chat page (channel inner) pass the options state function so we can put 
        // an option button in the header for groups (not there in default component, why we need to make it)
    return (
        <div style={channelStyle}>
            <Channel Message={(messageProps) => 
                <TeamMessage  {...messageProps} />} >
            <ChatInner setOpenOptions={setOpenOptions} />
            </Channel >
        </div>
    )
}

export default ChatPage
