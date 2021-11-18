import React from 'react'
import {AddChannel} from '../Stuff/AddChannel'


//We pass the props from the api here, as well as type
function Groups ({children, error = false, loading, type, setNewChannel, setCreateType, newChannel, setOpenOptions}) {
    //If we get an error from the API channelList, we display the following
    if(error) {
        if (type === 'team'){
            return (
            <div className="team-channel-list">
                <p>
                    Connection Error! Try again later
                </p>

            </div>)
        }
        else{
            return null
        }
    }
    //If we our currently loading from the Api, we display loading. We display correct channel type
    if(loading){
        return (
            <div className="team-channel-list">
                <p>
                    {type === 'team' ? 'Channels' : 'Messages'} loading ...
                </p>
            </div>
        )
    }
    
    return (
        <div>
            <div>
                <p>
                    {type === 'team' ? 'Channels' : 'Direct Messages'}
                </p>
                <AddChannel
                    setNewChannel={setNewChannel}
                    setCreateType={setCreateType} 
                    newChannel={newChannel}
                    setOpenOptions={setOpenOptions}
                    type ={type === 'team' ? "team" : "messaging"}
                />
            </div>
            {children}
        </div>
    )
}

export default Groups
