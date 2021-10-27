import React from 'react'
//components we import from our packages
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

//components we will make for the application, imports components from components folder using index file
import {ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import ChatIcon from '../assets/chat.png'
import LogoutIcon from '../assets/logout.png'
import OptionsIcon from '../assets/options.png'



const cookies = new Cookies();

const IconSideBar = ({ logout, opts }) => (
    <div className="channel_list_main_bar">
        <div className="channel_list_icon1">
            <div className ="icon1__inner">
                <img src={ChatIcon} alt="Chat_Icon" width ="30"/>
            </div>
        </div>
        <div className="channel_list_icon2">
            <div className ="icon1__inner" onClick={opts}>
                <img src={OptionsIcon} alt="Logout_Icon" width ="30"/>

            </div>
        </div>
        <div className="channel_list_icon2">
            <div className ="icon1__inner" onClick={logout}>
                <img src={LogoutIcon} alt="Options_Icon" width ="30"/>

            </div>
        </div>
    </div>
);

const CompanyHeader = () => (
    <div className="sidebar_head">
        <p className ="sidebar_main" >Chat Application</p>

    </div>

)
//to logout, we must clear the cookies and reload the page
const ChannelListContainer = ({isCreating, setIsCreating, isEditing, setIsEditing, createType }) => {

    const opts = () =>{
        setIsEditing(!isEditing)
    }

    const logout = () => {
        cookies.remove('token');
        cookies.remove('username');
        cookies.remove('fullname');
        cookies.remove('userId');
        cookies.remove('hashedPassword');
        window.location.reload();
    }

    return (
        <>
            <IconSideBar logout={logout} opts={opts} />
            <div className="sideListWrapper">
                <CompanyHeader />
                <ChannelSearch/>
                <ChannelList
                    filters={{}}
                    channelRenderFilterFn={() => {}}
                    List={(listProps) => (
                        <TeamChannelList
                            {... listProps}
                            type="team"
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview 
                            {... previewProps}
                            type="team"
                        />
                    )}
                />
                <ChannelList
                    filters={{}}
                    channelRenderFilterFn={() => {}}
                    List={(listProps) => (
                        <TeamChannelList
                            {... listProps}
                            type="messaging"
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview 
                            {... previewProps}
                            type="messaging"
                        />
                    )}
                />

            </div>
        </>
    );
}

export default ChannelListContainer
