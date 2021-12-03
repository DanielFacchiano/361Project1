import React from 'react'
import Cookies from 'universal-cookie';
import { useChatContext } from 'stream-chat-react'
import { ChannelList } from 'stream-chat-react'

import icon1 from '../Stuff/icon1.png'
import icon2 from '../Stuff/icon2.png'
import icon3 from '../Stuff/icon3.png'
import Groups from './Groups';
const cookies = new Cookies();

// component container style

//Style for the header at the top of groupList
var ListHeaderStyle = {
    color: 'red',
    padding: "0 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"

  };

// Function returns the header of the groups side bar 
function ListHeader(){ 
    return (
    <div style={ListHeaderStyle}>
        <h2>Groups:</h2>
    </div>
    )
}
// function holds the image icons in the sidebars buttonbar. Buttons are chat icon, options Cog, and logout symbol
function IconsHolder({logout, opts}) {
    return (
    <div className="icon_side_container">
        <div className="icon1">
            <img className ='iconimg1' 
            src={icon1} 
            width="32"/>
        </div>
        <div className="icon2" onClick={opts}>
            <span className="optionsTooltip"> Click here to open options for currently open channel</span>
            <img className='options' 
            src={icon3}  
            width="32"/>
        </div>
        <div className="icon3" onClick={logout}>
            <span className="optionsTooltip2"> Click here to logout and return to the sign in screen</span>
            <img className='iconimg2' 
            src={icon2} 
            width="32"/>
        </div>
    </div>
    )
}
//custom filters for the stream chat ChannelList object, returns channels where type is eam
function channelFilter(channels){
    return channels.filter((channel) => channel.type === 'team' ) // Return channels where the type is team
}
//custom filters for the stream chat ChannelList object, returns channels where type is messaging
function messageFilter(channels){
    return channels.filter((channel) => channel.type === 'messaging' ) // Return channels where the type is team
}

// We have our icon bar that we render, we then place the group container header and holder. We use the stream API
// ChannelList component to display channels, but we create our own group list component of which we pass to the 
// api's channel component as a function of the listProp prop
// Preview and Group list are optional, if not provided, stream chat provides its own channel list (we use a custom group list(groups))
// because the built in stream chat component looks very bad and doesnt have add buttons in it.
// First preview shows groups, the second shows direct messaging
function GroupList({setNewChannel, setCreateType, newChannel, setOpenOptions, openOptions }){
    const { client} = useChatContext();
// toggle options state on off with the cog symbol
    function opts() {
        setOpenOptions(!openOptions)
    }
//to logout, we simply clear the cookies. The login page in app.jsx will now trigger, reinitiating sign in
    function logout(){
        cookies.remove('username');
        cookies.remove('fullname');
        cookies.remove('token');
        cookies.remove('userId');
        cookies.remove('hashedPassword');

        //reload Dr.Freeman
        window.location.reload();
    }
// Filter out channels that don't have the user as a member (get users channels)
    const filters = { 
        members:{$in: [client.userID]} //Get all channels where our current user is in it
    } 

// return the components and there props to form our main grouplist sidebar component
// Use stream chats channel list to render channels based upon user membership and team/DM, custom props for filters and display
// format Use our own Groups(header) list component for buttons, use stream chats preview components (works great)
// Pass render icon buttons, and functions required to change the chatpage state
    return (
        <>
        {/* Render iconholder with the pertinenet state functions */}
           <IconsHolder logout={logout} opts={opts} />
            <div className ="group-list-wrapper"> 
               <ListHeader />
                {/* API info at https://getstream.io/chat/docs/sdk/reactnative/core-components/channel-list/
                Channel list Component from streamchat, we tell it what channels we want, 
                first filter gets us channels with the user in it, render filter gets us the team/message channels
                of such channels. Setting the list prop to something overides default stream-Chat list from appearing 
                List prop takes a function that takes the default list props from stream chat component and passes it to our custom
                groups component. The children are the list items generated for us by stream chat, we also pass other state functions
                so we can manipulate various option states.
                */}
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
                            openOptions={openOptions}
                        />
                    )}
               />
                {/* Same as above, but the filter is for DMS instead of groups */}
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
                            openOptions={openOptions}
                        />
                    )}
               />
            </div>
        </>
    )
}
export default GroupList
