import React, { useState } from 'react';
import {useChatContext} from 'stream-chat-react'
import {CloseCreate} from '../Stuff/CloseCreate'
import UserList from './UserList';


var createContainer = {
    display: "flex",
    flexDirection: "column",
    height: "100%"
}

var titleWrapperContainer= {
    display: "flex",
    flexDirection: "column",
    height: "160px",
    paddingLeft: "25px"
}

var createHeader= {
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "22px",
    color: "#2c2c30",
    marginLeft: "20px"
}

var buttonWrapper={
    height: "82px",
    background: "#f7f6f8",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    borderBottomRightRadius: "16px",
    padding: "0px 10px"
}

var buttonStyle={
    background:"salmon",
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: "18px",
    padding: "10px 20px",
    color: "#ffffff",
    borderRadius: "8px",
    cursor: "pointer"
}

function ChannelNameInput({channelName = '', setChannelName}){

    function detectChange(e){
        e.preventDefault()
        setChannelName(e.target.value)
    }

    return(
        <div style={titleWrapperContainer}>
            <p>Channel Name</p>
            <input value={channelName} onChange={detectChange} placeholder="Channel-Name (No blanks allowed)" />
            <p>Add Members</p>
        </div>
    )
}

function CreateChannel({createType, setNewChannel}){
    const [channelName, setChannelName] = useState('')
    const {client, setActiveChannel} = useChatContext();
    const [checkedUsers, setCheckedUsers] = useState([client.userID || ''])

    async function SubmitChannel (e){
        e.preventDefault()

        try {

            var newGroup = await client.channel(createType, channelName, {
                name: channelName, members: checkedUsers
            })

            await newGroup.watch();

            setChannelName('')
            setNewChannel(false)
            setCheckedUsers([client.userID])
            setActiveChannel(newGroup)
        } catch(error){
            console.log()
        }
    }

    return (
        <div style={createContainer}>
            <div style={createHeader}>
                <p>
                    {createType === 'team' ? 'Create a new Group' : 'send direct message'}
                </p>
                <CloseCreate setNewChannel={setNewChannel}/>
            </div>
            {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>}
            <UserList setCheckedUsers={setCheckedUsers}  />
            <div style={buttonWrapper} onClick={SubmitChannel}>
                <p style={buttonStyle}>
                    {createType=== 'team' ? 'Create Channel' : 'Create Message'}

                </p>
            </div>
        </div>
    )
}

export default CreateChannel
