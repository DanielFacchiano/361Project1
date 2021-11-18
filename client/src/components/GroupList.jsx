import React, { useState, useEffect} from 'react'
import Cookies from 'universal-cookie';
import { useChatContext, ChannelList } from 'stream-chat-react'
import icon1 from '../Stuff/icon1.png'
import icon2 from '../Stuff/icon2.png'
import icon3 from '../Stuff/icon3.png'

import GroupFinder from './GroupFinder';
import Groups from './Groups';
import PreList from './PreList';
const cookies = new Cookies();


//channel-list__container
var listStyle = {
    display: "flex",
    height: "100%"
}

var ListHeaderStyle = {
    color: 'red',
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"

  };
//We can use inline styles by creating a json of styles and setting style attribute to them inline
var titleStyle = {
    fontFamily: "sans-serif",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "28px",
}

function ListHeader(){ 
    return (
    <div style={ListHeaderStyle}>
        <p style={titleStyle} >Groups:</p>

    </div>
    )
}

function IconsHolder({logout, opts}) {
    return (
    <div className="icon_side_container">
        <div className="icon1">
            <img className ='iconimg1' src={icon1} alt="appIcon" width="30"/>
        </div>
        <div className="icon2" onClick={opts}>
            <img className='options' src={icon3} alt="OptionsIcon" width="30"/>
        </div>
        <div className="icon2" onClick={logout}>
            <img className='iconimg2' src={icon2} alt="LogoutIcon" width="30"/>
        </div>
    </div>
    )
}

function channelFilter(channels){
    return channels.filter((channel) => channel.type === 'team' ) // Return channels where the type is team
}

function messageFilter(channels){
    return channels.filter((channel) => channel.type === 'messaging' ) // Return channels where the type is team
}

//We have our icon bar that we render, we then place the group container header and holder. We use the stream API
// ChannelList component to display channels, but we create our own group list component of which we pass to the 
// api's channel component as a function of the listProp prop
// Preview and Group list are optional, if not provided, stream chat provides its own channel list
// First preview shows groups, the second shows direct messaging
function GroupListContent({setNewChannel, setCreateType, newChannel, setOpenOptions, openOptions }){
    const { client} = useChatContext();

    function opts() {
        setOpenOptions(!openOptions)
    }

    function logout(){
        cookies.remove('token');
        cookies.remove('username');
        cookies.remove('fullname');
        cookies.remove('userId');
        cookies.remove('hashedPassword');
        window.location.reload();
    }

    const filters = { members:{$in: [client.userID]}} //Get all channels where our current user is in it


    return (
        <>
           <IconsHolder logout={logout} opts={opts} />
            <div className ="group-list-wrapper"> 
               <ListHeader />
               <GroupFinder /> 
               <ChannelList
                    filters={filters}
                    GroupList   channelRenderFilterFn={channelFilter}
                    List={(listProps) => (
                        <Groups 
                            {...listProps}
                            type="team"
                            setNewChannel={setNewChannel}
                            setCreateType={setCreateType} 
                            newChannel={newChannel}
                            setOpenOptions={setOpenOptions}
                        />
                    )}

               />
               <ChannelList
                    filters={filters}
                    channelRenderFilterFn={messageFilter}
                    List={(listProps) => (
                        <Groups 
                            {...listProps}
                            type="messaging"
                            setNewChannel={setNewChannel}
                            setCreateType={setCreateType} 
                            newChannel={newChannel}
                            setOpenOptions={setOpenOptions}
                        />
                    )}
                    /*
                    Preview={(previewProps) => (
                        <PreList
                            {... previewProps}
                            type="messaging"
                        />
                    )}
                    */
               />
            </div>
        </>
    )
}

function GroupList({setNewChannel, setCreateType, newChannel, setOpenOptions, openOptions }){
    const[toggleContainer, setToggleContainer] = useState(false)
    return(
        <>
            <div style={listStyle}>
                <GroupListContent
                    setNewChannel={setNewChannel} 
                    setCreateType={setCreateType} 
                    newChannel={newChannel} 
                    setOpenOptions={setOpenOptions}
                    openOptions={openOptions}
                />
            </div>
        </>
    )

}

export default GroupList
