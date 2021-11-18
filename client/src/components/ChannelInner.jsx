import React, { useState } from 'react';
import { MessageList, MessageInput, Thread,  useChannelActionContext, useChannelStateContext, useChatContext, Window} from 'stream-chat-react';
// This component is made up of a bunch of stream chat components
import {ChannelInfo} from '../Stuff/ChannelInfo'

export const Contexto = React.createContext({});
//.team-channel-header__name-wrapper {
 
var ListHeaderStyle = {
  flex: "3",
  display: "flex",
  alignItems: "center",
  overflowX: "auto",
  maxWidth: "520px",
  whiteSpace: "nowrap",
  scrollbarWidth: "none",

};

var multi_header ={
  display: "flex",
  alignItems: "center",
  marginRight: "9px"
}

var channel_header=
{
  fontFamily: "sans-serif",
  fontWeight: "bold",
  fontSize: "18px",
  color: "#2c2c30",
  marginRight: "8px"
}

var right_text = {
  fontFamily:"sans-serif",
  fontSize: "14px",
  color: "#858688"
}


var right_text_inner= {
  display: "flex",
  paddingLeft: "12px"
}

var header_container=
{
  height: "72px"
}


function ChannelInner({ setOpenOptions }){

  const [messageState, setMessageState] = useState(false);

  const { postMessage } = useChannelActionContext();
  
  const SubmitHandler = (message) => {
    var updatedMessage = {
      mentioned_users: message.mentioned_users,
      text: message.text,
      parent: message.parent,
      parent_id: message.parent?.id,
      attachments: message.attachments,
    };
    
    if (messageState == true) {
      updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
    }
    
    if (postMessage == true) {
      postMessage(updatedMessage);
      setMessageState(false);
    }
  };

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

const TeamChannelHeader = ({ setOpenOptions }) => {
    var { channel, watcher_count } = useChannelStateContext();
    var { client } = useChatContext();
  
    const MessagingHeader = () => {
      const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
  
      if(channel.type === 'messaging') {
        return (
          <div style={ListHeaderStyle}>
            {members.map(({ user }, i) => (
              <div key={i} style={multi_header}>
                <p>{user.fullName}</p>
              </div>
            ))}
          </div>
        );
      }
  
      return (
        <div className='channel-inner-header-wrap2'>
          <p style={channel_header}>Group: {channel.data.name} || Code: </p>
          <span style={{ display: 'flex' }} onClick={() => setOpenOptions(true)}>
            <ChannelInfo />
          </span>
        </div>
      );
    };
  
    const getWatcherText = (watchers) => {
      if (!watchers) return 'Nobody is online';
      else{
      return `${watchers} users online in group`;
    }
    };
  
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