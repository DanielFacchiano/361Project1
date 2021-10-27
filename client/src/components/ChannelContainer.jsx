import React from 'react'
import { Channel, useChatContext, MessageSimple, MessageTeam} from 'stream-chat-react';

import { ChannelInner, CreateChannel, EditChannel, TeamMessage } from './';


const ChannelContainer = (
    {isCreating, setIsCreating, isEditing, setIsEditing, createType }) => {
    const { channel } = useChatContext();

    if(isCreating) {
        return(
            <div className="channel__container">
                <CreateChannel createType={createType} setIsCreating={setIsCreating} />
            </div>
        )
    }

    if(isEditing) {
        return(
            <div className="channel__container">
                <EditChannel setIsEditing={setIsEditing} />
            </div>
        )
    }

    const EmptyState = () => (
        <div className="channel=empty__container">
            <p className="channel-empty__first">History</p>
            <p className="channel-empty__second">Send messages, links and attachments</p>

        </div>
    )

        //We need to pass specific props to the streamAPI channel for it to function
        //Steam wants some kind of indicator for when a channel is empty
    return (
        <div className="channel__container">
            <Channel
                EmptyStateIndicator={EmptyState}
                Message={(messageProps, i) => <TeamMessage key={i} {...messageProps} />}
            >
                <ChannelInner setIsEditing={setIsEditing} />
            </Channel>
        </div>
    );
}

export default ChannelContainer
