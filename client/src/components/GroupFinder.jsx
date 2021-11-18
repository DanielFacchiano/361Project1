import React, { useState, useEffect} from 'react'
import {useChatContext} from 'stream-chat-react'
import {SearchIcon} from '../Stuff/SearchIcon'



function GroupFinder() {
    const [parsing, setParsing] = useState(false);
    const [searchValue, setSearchValue] = useState('');


    const getGroups = async(text)=>{
        try{
            //get the channels

        } catch (error) {
            setSearchValue('')
        }
    }

    const newText = (e) =>{
        e.preventDefault();
        setParsing(true);
        //Event holds the text under its target value
        setSearchValue(e.target.value)
        // get groups with this value
        getGroups(e.target.value)
    }

    return (
        <div className="group_finder_container">
            <p>
                    <SearchIcon />
            </p>
            <input
                className="search_input"
                type="text"
                value = {searchValue}
                onChange = {newText}
                placeholder="Group Finder"

            />
        </div>
    )
}

export default GroupFinder
