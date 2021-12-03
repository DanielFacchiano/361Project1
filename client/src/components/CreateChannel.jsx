import React from 'react';
import{useState} from 'react';
import {useChatContext} from 'stream-chat-react'
import {CloseCreate} from '../Stuff/CloseCreate'
import InvitationList from './InvitationList';

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
    color: "white",
    borderRadius: "8px",
    cursor: "pointer"
}
// function to set channel name inpput field
function NameField({groupName = '', setGroupName}){
// function using event to detect changes in input, updates inpute state
    function detectChange(event){
        console.log(event)
        //Prevent page reset
        event.preventDefault()
        // set the groups name state to the target value of event passed
        setGroupName(event.target.value)
    }
// return the component that allows setting title input, it changes the name state when typing is detected
    return(
        <div style={titleWrapperContainer}>
            <p>Group Name</p>
            <input value={groupName} 
            placeholder="New Group-Name: (No blanks allowed!)" 
            onChange={detectChange} 
            />
            <p>Add Users to Group</p>
        </div>
    )
}


// Component to facilitate channel creation
function CreateChannel({createType, setNewChannel}){
    // State for name of the selected channel default is left blank by default
    const [groupName, setGroupName] = useState(null)
    // Retrieve client and set Active channel from chat context via derefrencing
    const {client, setActiveChannel} = useChatContext();
    // State for users to add to group. Includes current user by default
    const [checkedUsers, setCheckedUsers] = useState([client.userID])
    //submit function to stream chat for channel creation.
    async function SubmitChannel (e){
        console.log(e)
        //We must prevent page reset
        e.preventDefault()

        try {

            // Create new group with these fields
            var newGroup = await client.channel(createType, groupName, 
                {
                name: groupName, members: checkedUsers
            })
            // loads initial channel state, watches for changes
            await newGroup.watch();
            // reset states
            setCheckedUsers([])
            setGroupName('')
            setNewChannel(false)
            setCheckedUsers([client.userID])
            // Set the active channel, to the channel we just created
            setActiveChannel(newGroup)
        } 
        catch(e){
            console.log()
        }
    }
    // Layout of components for create channel page. We render the correct title, the correct buttons
    // We render the input if not DM, we render our InvitationList component with the function to set
    // an array of users corresponding to checks(inside InvitationList) FInally we have a submit button
    // to create the new channel
    return (
        <div style={createContainer}>
            <div style={createHeader}>
                <div>
                <h3>
                    {createType == 'team' ? 'Create a new Group' : 'Send a user a messages'}
                </h3>
                </div>
                {/* We want to pass the close creation button to the function to change create states */}
                <CloseCreate 
                createType={createType}
                setNewChannel={setNewChannel}
                />
            </div>
            {/* There is no input for direct messages, so we detect such and render or do not the Name Field */}
            {createType === 'team' && 
            <NameField groupName={groupName} 
            setGroupName={setGroupName}/>}
            <InvitationList setCheckedUsers={setCheckedUsers}  />
                {/* Submit button wrapper, onclick is submission of a new channel (create and render group w fields) */}
            <div style={buttonWrapper} onClick={SubmitChannel}>
                <p style={buttonStyle}>
                    Submit
                </p>
            </div>
        </div>
    )
}

export default CreateChannel
