import React, {useEffect, useState} from 'react'
import {useChatChannel, useChatContext} from 'stream-chat-react'
import {InviteIcon} from '../Stuff/InviteIcon'

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
    margin: "0px 20px",
    justifyContent: "space-between"
  };

//Justify space here makes sure the name shows up on the left, and the invite icon shows up on the right
  var ListItemUserWrapper={
    display: "flex",
    alignItems: "center",
    margin: "0px 20px",
    justifyContent: "space-between"
  };

  var ListItemUserWrapperName={
    display: "flex",
    alignItems: "center",
    flex: "2",
    textAlign: "left"
  };

  var emptyCheck = {
    height: "28px",
    width: "28px",
    background: "#f7f6f8",
    border: "1px solid #dedddf",
    borderRadius: "14px",
    boxSizing: "border-box",
    marginLeft: "4px",
    cursor:'pointer'
  }



function MasterList({ children }){
    return(
        <div style={channelStyle}>
            <div style={headerStyle}>
                <p>Members</p>
                <p>Group Invite</p>
            </div>
            {children}
        </div>
    )
}


function ListItemUser({ user, setCheckedUsers}){
    const [checked, setChecked] = useState(false)
    function detectCheck(){
        //If we detect a check, we filter out this user from the list of checked users in the createChannel components state
        if(checked == true){
            setCheckedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))
        }
        //else, we keep the previous list and add this user id to it
        else{
            setCheckedUsers((prevUsers) => [...prevUsers, user.id])
        }


        setChecked(!checked)
    }
    return(
        <div style={ListItemUserWrapper} onClick={detectCheck}>
            <div style={ListItemUserWrapperName}>
                <p>
                    {user.name || user.id}
                </p>
            </div>
            {checked ? <InviteIcon /> : <div style={emptyCheck}></div>}
        </div>
    )
}


function UserList({setCheckedUsers}){ 
    const {client} = useChatContext()
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [err, setErr] = useState(false)

    useEffect(()=> {
        const getUsers = async () => {
            if(loading) return //If we are already getting the lost, don't keep trying to get it
            //loading set to true for the try catch block, where we query users from stream chat 
            setLoading(true) 
            
            //Async call to the stream chat client, filter out our own user, set range of users
            try {
                const response = await client.queryUsers(
                    {id: {$ne :client.userID}}, // query users from stream chats current context, exclude the logged in user
                    {id : 1},
                    {limit: 10}
                );
                    //If response has entries, set users array to the response or set empty flag as true
                if(response.users.length) {
                    setUsers(response.users)
                } else {
                    setEmpty(true)
                }
            } catch (error) {
                setErr(true)

            }
            setLoading(false) // We have finished retreiving the user list into the use states 
        }

        if(client) getUsers()

    },[])
    if(err){
        return (<MasterList>
          <div> Issue loading users </div>
        </MasterList>
        )
    }

    if(empty){
        return (<MasterList>
          <div> No members available </div>
        </MasterList>
        )
    }

    return (
    <MasterList>
        {loading ? 
        <p>
            Loading Invitation Page
        </p> : 
            (users?.map((user, i)=>(
                <ListItemUser index={i} key={user.id} user={user} setCheckedUsers={setCheckedUsers}/>
            ))
            )}
    </MasterList>

    )
}

export default UserList
