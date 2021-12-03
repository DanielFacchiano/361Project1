import React, {useEffect, useState} from 'react'
import {useChatChannel, useChatContext} from 'stream-chat-react'

// Column flex box
var channelStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  };
// style for the heade, justify content space between sets paragraphs oppostie
  var headerStyle={
    display: "flex",
    alignItems: "center",
    margin: "0px 22px",
    justifyContent: "space-between"
  };

// Justify space here makes sure the name shows up on the left, and the invite icon shows up on the right
// We soace styff apart with margin
  var ListItemUserWrapper={
    display: "flex",
    alignItems: "center",
    margin: "0px 22px",
    justifyContent: "space-between"
  };
  // style for user list wrapper
  var ListItemUserWrapperName={
    display: "flex",
    alignItems: "center",
    textAlign: "left"
  };

  // style for the  user list invite box
  var emptyCheck = {
    height: "32px",
    width: "32px",
    border: "2px solid black",
    borderRadius: "15px",
    boxSizing: "border-box",
    marginLeft: "6px",
    cursor:'pointer'
  }
  // style for when the circle is checked for users, fill it green basically, swap your class names to do this, why we use
  // app css sometimes
  var Checked = {
    height: "32px",
    width: "32px",
    background: "green",
    border: "2px solid black",
    borderRadius: "16px",
    boxSizing: "border-box",
    marginLeft: "6px",
    cursor:'pointer'
  }

// Wrapper Component for the list, renders wrapped children to render list items in this component
// basically we build the header, then render the children components under it
function MasterList({children} ){
    
    return(
        <div style={channelStyle}>
            <p></p>
            <div style={headerStyle}>
                <span>Members</span>
                <span>Group Invitation</span>
            </div>
             {/* Our wrapped ListItemUser components*/}
            {children}
        </div>
    )
}

// Component to generate items appearing in the user list, we map users to it to build the list
function ListItemUser({ user, setCheckedUsers}){
    const [checked, setChecked] = useState(false)
    function detectCheck(){
        //If we detect a check for this item, we filter out this user from the list of checked users in the createChannel components state
        if(checked == true){
            // Kind of weird, we pass our checked users a callback function, essentially, we just make sure to remove the checked user instead of all of them
            setCheckedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))
        }

        //else, we keep the previous list and add this user id to it (because if checked is false, were turning it on)
        else{
            setCheckedUsers((prevUsers) => [...prevUsers, user.id])
        }

        //When clicking, we set checked to the opposite of what is currently checked
        setChecked(!checked)
    }
    // Return name or ID, render either the empty check or the filled in green box telling us the selection is active
    return(
        <div style={ListItemUserWrapper} onClick={detectCheck}>
            <div style={ListItemUserWrapperName}>
                <p>
                    {user.name || user.id || "User Information Error"}
                </p>
            </div>
            {checked ? <div style={Checked}></div> : <div style={emptyCheck}></div>}
        </div>
    )
}

// userlist component, 
function UserList({setCheckedUsers}){ 
    // get client instance
    const {client} = useChatContext()
    // state for user list held by the client for the list we are generating
    const [users, setUsers] = useState([]);
    // State for loading user list
    const [loadingList, setloadingList] = useState(false);

    // needed for async requests in this instance, render the user list once after users returned
    useEffect(()=> {
        async function getUserList(){
            if(loadingList) return //If we are already getting the list, don't keep trying to get it
            //loading set to true for the try catch block, where we query users from stream chat 
            setloadingList(true) 
            
            //Async call to the stream chat client, filter out our own user, set range of users
            try {
                // Query users from client, info at https://getstream.io/chat/docs/react/query_users/
                // Basically, we don't want client id, and we limit to 10 users
                const response = await client.queryUsers(
                    {id: { $ne :client.userID }}, // query users from stream chats current context, exclude the logged in user
                    {limit: 10}
                );
                    //If response has entries, set users array to the response 
                if(response.users.length) {
                    setUsers(response.users)
                } 
            } catch (error) {
                console.log("error!")

            }
            setloadingList(false) // We have finished retreiving the user list into the use states, so we can 
            // remove the loading message
        }
        getUserList()
    //empty array ensures use effect only runs after the first render is detected. Use effects usually run again when list here changes
    },[])

    //return the master list component wrapping a list item generated for ever user present in the users state array
    return (
    <MasterList>
        {/* We will map every user in the users state into the ListItemUser components so that we can build a list of users*/}
        {loadingList ? 
        <p>
            Loading Invitation Page
        </p> : 
            (users.map((user)=>(
                <ListItemUser user={user} setCheckedUsers={setCheckedUsers}/>
            ))
            )}
    </MasterList>

    )
}

export default UserList
