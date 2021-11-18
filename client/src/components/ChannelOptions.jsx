import React, { useState } from 'react';
import {useChatContext} from 'stream-chat-react'
import UserList from './UserList';
import {CloseCreate} from '../Stuff/CloseCreate'

var titleWrapperContainer= {
    display: "flex",
    flexDirection: "column",
    height: "160px",
    paddingLeft: "25px"
}

var optionsContainer={
    display: "flex",
    flexDirection: "column",
    height: "100%"
}

var optionsHeader={
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "62px",
    paddingRight: "24px"
}

var optionsSubmitWrap={
height: "80px",
background:" #f7f6f8",
display: "flex",
alignItems: "center",
justifyContent: "flex-end",
borderBottomRightRadius: "16px"
}

var optionsSubmitWrap2={
    height: "80px",
    background:" #f7f6f8",
    display: "flex",
    alignItems: "center",
    borderBottomRightRadius: "16px"
    }

var optionsSubmit={
    background: "salmon",
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: "18px",
    padding: "10px 20px",
    color: "#ffffff",
    marginRight: "30px",
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

function LeaveGroup(){
    return(
        <div style={titleWrapperContainer}>
            <p>Leave the Group</p>
        </div>
    )
}



function ChannelOptions({setOpenOptions}){
    const {client} = useChatContext()
    const {channel} = useChatContext();
    const [channelName, setChannelName] = useState(channel?.data?.name)
    const [checkedUsers, setCheckedUsers] = useState([])

    async function updateGroup(e){
        e.preventDefault();
        var detectNewName = false

        if (channelName != (channel.data.name || channel.data.id)){
            detectNewName=true
        }
        if(detectNewName==true) {
            await channel.update({name: channelName}, {text: 'name changed'})
        }
        if(checkedUsers.length){
            await channel.addMembers(checkedUsers)
        }

        setChannelName(null)
        setOpenOptions(false)
        setCheckedUsers([])
    }

    async function leaveGroup(e){
        e.preventDefault();
        await channel.removeMembers([client.userID]);

        setChannelName(null)
        setOpenOptions(false)
        setCheckedUsers([])

    }



    return (
        <div style={optionsContainer}>
            <div style={optionsHeader}>
                <p>
                    Channel Options
                </p>
                <CloseCreate setOpenOptions={setOpenOptions}/>
            </div>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
            <UserList setCheckedUsers={setCheckedUsers} />
            <div style={optionsSubmitWrap} onClick={updateGroup}>
                <p style={optionsSubmit}>
                    Update
                </p>
            </div>
            <div>
                <h2>Leave {channelName}:  </h2>
                <p>Warning: Re-invitation required to Rejoin!</p>
                <div style={optionsSubmitWrap2} onClick={leaveGroup}>
                <p style={optionsSubmit}>
                    Leave
                </p>
            </div>
            </div>

        </div>
    )
}

export default ChannelOptions
