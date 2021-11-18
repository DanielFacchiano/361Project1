import React from 'react'
import {useChat, useChatContext} from 'stream-chat-react'

//somethings wrong here, group preface and preview list should get got
function PreList({ channel, type }) {
    var {channel: activeChannel, client } =useChatContext();

    function DirectPreview(){
        return(
            <p>
                # {channel?.data?.name || channel?.data?.id}
            </p>

    )};
    function ChannelPreview(){
        return(
        <p className="channel-preview__item">
            # {channel?.data?.name || channel?.data.id}

        </p>
    )};

    function previewList(){
        var mems = Object.values(channel.state.members).filter(({user})=> user.id != client.userID);
        return (
            <div>
                <p>{mems[0]?.user?.fullName}</p>
            </div>
        )
    };

    return (
        <div className={
            channel?.id === activeChannel?.id
                ? 'selected_preview' : 'deselected_preview'
        }
        onClick={() =>{
            console.log(channel)
        }}
        >

             {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
        </div>
    )
}

export default PreList
