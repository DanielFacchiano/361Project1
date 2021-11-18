import React from 'react'
import {useChatContext} from "stream-chat-react"
import {Channel} from "stream-chat-react"
import CreateChannel from './CreateChannel';
import ChannelOptions from './ChannelOptions';
import TeamMessage from './TeamMessage';
import ChannelInner from './ChannelInner';


var channelStyle = {
    height: "100%",
    width: "100%",
  };

var EmptyChannelStyle = {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
    marginLeft: "20px",
    marginRight: "20px",
    paddingBottom: "20px"
  };

  var EmptyChannelParagraphStyle = {
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "120%",
    color: "#2c2c30",
    marginBottom: "10px"
  };
  var EmptyChannelParagraphTwoStyle = {
    fontSize: "14px",
    lineHeight: "120%",
    margin: "0",
    color: "#858688"
  };

function ChatPage(
    { newChannel, openOptions, setNewChannel, setOpenOptions, createType }
    ) {
    const { channel } = useChatContext();

    if(newChannel){
        return(
            <div style={channelStyle}>
                <CreateChannel createType={createType} setNewChannel={setNewChannel} />
            </div>
        )
    }

    if(openOptions){
        return(
            <div style={channelStyle}>
                <ChannelOptions setOpenOptions={setOpenOptions}/>
            </div>
        )
    }

    const noState=() => (
        <div style={EmptyChannelStyle}>
            <p style={EmptyChannelParagraphStyle}>Chat History Start: </p>
            <p style={EmptyChannelParagraphTwoStyle}>Send stuff</p>
        </div>
    )

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
