import React, { useState } from 'react';
import {useChatContext} from 'stream-chat-react'
import UserList from './UserList';
import {CloseCreate} from '../Stuff/CloseCreate'

//styling for input with channel name
var titleWrapperContainer= {
    display: "flex",
    flexDirection: "column",
    height: "160px",
    paddingLeft: "25px"
}
//styling for main options page container
var optionsContainer={
    display: "flex",
    flexDirection: "column",
    height: "100%"
}
//styling for the options page Header
var optionsHeader={
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "62px",
    paddingRight: "24px"
}
//Styling for the outer submit button container
var optionsSubmitWrap={
height: "80px",
display: "flex",
alignItems: "center",
justifyContent: "flex-end",
borderBottomRightRadius: "16px"
}
//styling for the leave channel button
var optionsSubmitWrap2={
    height: "80px",
    display: "flex",
    alignItems: "center",
    borderBottomRightRadius: "16px"
    }
// options for both of the buttons inside text
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
//function for the name input field
function ChannelNameInput({channelName = '', setChannelName}){
// If we detect title input field, we change target title state
    function detectChange(e){
        e.preventDefault()
        setChannelName(e.target.value)
    }
// If we detect change in the channel name input, we set the channel name state to the detected input
    return(
        <div style={titleWrapperContainer}>
            <p>Channel Name</p>
            <input value={channelName} onChange={detectChange} placeholder="Channel-Name (No blanks allowed)" />
            <p>Add Members</p>
        </div>
    )
}

// Main channel OPtions component
function ChannelOptions({setOpenOptions}){
    // Need client for current users userID to leave groups
    const {client} = useChatContext()
    // Need to know what channel we are editing
    const {channel} = useChatContext();
    // Detect changing channel name to pass around
    const [channelName, setChannelName] = useState(channel?.data?.name)
    // array of the users that were checked in the userlist options list
    const [checkedUsers, setCheckedUsers] = useState([])
    // Function to handle submission
    async function updateGroup(e){
        e.preventDefault();
        // if we changed the name, we need to detect and pass that
        var detectNewName = false

        if (channelName != (channel.data.name || channel.data.id)){
            detectNewName=true
        }
        //set new name by sending to stream chat component with correct context
        if(detectNewName==true) {
            await channel.update({name: channelName}, {text: 'name changed'})
        }
        //if new users, set new users from checked users array
        if(checkedUsers.length){
            await channel.addMembers(checkedUsers)
        }
        //clean up options fields
        setChannelName(null)
        setOpenOptions(false)
        setCheckedUsers([])
    }
    // function to leave the group
    // Take client user id, and remove from option selected channel
    async function leaveGroup(e){
        e.preventDefault();
        await channel.removeMembers([client.userID]);
        // clean up the states
        setChannelName(null)
        setOpenOptions(false)
        setCheckedUsers([])

    }
    // Return the full options component
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
