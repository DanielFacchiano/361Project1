import React, { useState } from 'react';
import {useChatContext} from 'stream-chat-react'
import InvitationList from './InvitationList';
import { ChannelList } from 'stream-chat-react'


//opensource svg, pass it a function to change edit state to false
import {CloseCreate} from '../Stuff/CloseCreate'

//styling for input with our channel name
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
// options for both of the buttons inside text for our icons sidebar
var optionsSubmit={
    background: "salmon",
    fontWeight: "bold",
    fontSize: "20px",
    padding: "12px 22px",
    color: "white",
    marginRight: "30px",
    borderRadius: "8px",
    cursor: "pointer"
    }

//function for the name input field
function ChannelNameInput({channelName = null, setChannelName}){
// If we detect title input field changes, we change our target title state for submitting eventually
    function detectChange(e){
        e.preventDefault()
        var newName = e.target.value
        setChannelName(newName)
    }
// If we detect change in the channel name input, we set the channel name state to the detected input
    return(
        <div style={titleWrapperContainer}>
            <p>Channel Name</p>
            <input value={channelName} placeholder="Channel-Name (No blanks allowed)" onChange={detectChange}  />
            <p></p>
            <span>Add New Members</span>
        </div>
    )
}

// Main channel OPtions component  states to record selected users, and current names. contexts for operations gathered
function ChannelOptions({setOpenOptions}){
    // Need client for current users userID to leave groups
    const {client} = useChatContext()
    // Need to know what channel we are editing
    const {channel} = useChatContext();
    // Detect changing channel name to pass around
    const [channelName, setChannelName] = useState(channel.data.name)
    // array of the users that were checked in the InvitationList options list
    const [checkedUsers, setCheckedUsers] = useState([])
    // Function to handle submission
    async function updateGroup(e){
        e.preventDefault();
        // if we changed the name, we need to detect and pass that
        var detectNewName = false
        // if we have a different name...
        var cName =channel.data.name
        var cId =channel.data.id

        if (channelName != (cName || cId)){
            detectNewName=true
        }
        //set new name by sending to stream chat component with correct context
        if(detectNewName==true) {
            await channel.update({name: channelName}, {text: 'name changed'})
        }
        //if new users, set new users from checked users array
        if(checkedUsers.length > 0){
            await channel.addMembers(checkedUsers)
        }
        //clean up options fields
        setChannelName(null)
        setOpenOptions(false)
        setCheckedUsers([])
    }
    // function to leave the group
    // Take client user id, and remove from the currently selected channel, open in the options
    async function leaveGroup(e){
        e.preventDefault();
        await channel.removeMembers([client.userID]);
        // clean up the states
        setChannelName(null)
        setOpenOptions(false)
        setCheckedUsers([])

    }
    // Return the full options component, we have a header, an exit button which changes state onclick
    // We have an input component so users can change channel name
    // We have the list of registered users rendered on the screen
    // and we have the buttons to leave and update the group
    return (
        <div style={optionsContainer}>
            <div style={optionsHeader}>
                <p>
                    Channel Options
                </p>
                <CloseCreate setOpenOptions={setOpenOptions}/>
            </div>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
            <InvitationList channelName={channelName} setCheckedUsers={setCheckedUsers} />
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
                    Leave Group
                </p>
            </div>
            </div>

        </div>
    )
}

export default ChannelOptions
