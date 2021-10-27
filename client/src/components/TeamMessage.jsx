import React from 'react'
import { MessageTeam, useMessageContext } from 'stream-chat-react';

const TeamMessage = (Message, i) => {
    const { handleOpenThread, message } = useMessageContext();
    var lastFive = message.text.substr(message.text.length - 4);
    console.log(lastFive)
    var isUrl = false
    if(lastFive==".com"){
        isUrl = true
    }

    

    return (
        <div>
            {message.text} {isUrl ? '-> Scraped Image Goes Here (fake data)' : ''}
        </div>
    )
}

export default TeamMessage
