import React, { useState } from 'react';
import {useChatContext} from 'stream-chat-react'
import {CloseCreate} from '../Stuff/CloseCreate'
import UserList from './UserList';

// Style for main wrapper
var createContainer = {
    display: "flex",
    flexDirection: "column",
    height: "100%"
}
// style for the title input div
var titleWrapperContainer= {
    display: "flex",
    flexDirection: "column",
    height: "160px",
    paddingLeft: "25px"
}
// style for page title text
var createHeader= {
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: "18px",
    marginLeft: "20px"
}
// Style for the container of the create channel button
var buttonWrapper={
    height: "82px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0px 10px"
}
// Style for the button text
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
// function to set channel name inpput field
function ChannelNameInput({channelName = '', setChannelName}){
// function using event to detect changes in input, updates inpute state
    function detectChange(e){
        e.preventDefault()
        setChannelName(e.target.value)
    }
// return the component that allows setting title input
    return(
        <div style={titleWrapperContainer}>
            <p>Channel Name</p>
            <input value={channelName} onChange={detectChange} placeholder="Channel-Name (No blanks allowed)" />
            <p>Add Members</p>
        </div>
    )
}


// Function to facilitate channel creation
function CreateChannel({createType, setNewChannel}){
    // State for name of the selected channel
    const [channelName, setChannelName] = useState('')
    // Retrieve client and set Active channel from chat context via derefrencing
    const {client, setActiveChannel} = useChatContext();
    // State for users to add to group. Includes current user by default
    const [checkedUsers, setCheckedUsers] = useState([client.userID || ''])
    //submit function to stream chat for channel creation.
    async function SubmitChannel (e){
        e.preventDefault()

        try {
            // Create new group with these fields
            var newGroup = await client.channel(createType, channelName, {
                name: channelName, members: checkedUsers
            })
            // loads initial channel state, watches for changes
            await newGroup.watch();
            // reset states
            setChannelName('')
            setNewChannel(false)
            setCheckedUsers([client.userID])
            setActiveChannel(newGroup)
        } catch(error){
            console.log()
        }
    }
    // Layout of components for create channel page.
    // button to close channel, 
    // if team creation, have field for team name
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
