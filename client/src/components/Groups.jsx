import React from 'react'
import {AddChannel} from '../Stuff/AddChannel'


// We get the props from the api here, as well as type and state functions
function Groups ({children, error = false, loading, type, setNewChannel, setCreateType, newChannel, openOptions, setOpenOptions}) {
    // If we get an error from the API channelList, we display the following
    if(error == true) {
        if (type === 'team'){
            return (
            <div>
                    Connection Error! Try again later
            </div>)
        }
        else{
            return 
        }
    }
    // If we our currently loading our group list, we tell the user
    if(loading == true){
        return (
            <div>
                    loading, please wait...
            </div>
        )
    }
    // We return the correct title and add button for the channel list we are generating with this component
    // We add the tooltip code as well. We pass the correct props to the new channel button we embed into the header
    // finally, we render the preview components that go with this list.
    return (
        <div>
            <div>
                <p>
                    {type == 'team' ? 'Channels' : 'Direct Messages'}
                </p>
                Add New:
                <div  className={`addButtonHolder_${type === 'team' ? 'Channels' : 'DirectMessages'}`}> 
                <span className={`addToolTip_${type === 'team' ? 'Channels' : 'DirectMessages'}`}> Click here to create a group with members </span>
               
                {/* Svg to add channel, takes options functions and manipulates them based on attributes (onlclick) works for both
                dms and channels. This is accomplished by setting type based upon type passed to groups component */}
                <AddChannel
                    type ={
                            type == "team" ? "team" : "messaging"
                        }
                    setNewChannel={setNewChannel}
                    newChannel={newChannel}
                    setOpenOptions={setOpenOptions}
                    openOptions={openOptions}
                    setCreateType={setCreateType} 
                />
                </div>
            </div>
            {/* Renders the actual channels in our groups component, the components are passed for us by stream-chat in GroupList*/}
            {children}
            </div>
    )
}

export default Groups
