import React, { useState } from 'react';
import { MessageTeam, useMessageContext, useChatContext } from 'stream-chat-react';
// Url to teamates image scraping service
const urlStr = 'https://scrape.quin.fish/';

//message component
const TeamMessage = (Message, i) => {
    //retrieve the message we are building a component for
    const { handleOpenThread, message } = useMessageContext();
    //We need that chat client, to check if the message we are examining is from our own user, if so different style
    const {client} = useChatContext()
    const [imageUrl, setImageUrl] = useState('1111');
   //set image state to new url
    const setImg = (newUrl) => {
        setImageUrl(newUrl);
      } 

    //rudimentary url detection
    var lastFive = message.text.substr(message.text.length - 4);
    var firstFive = message.text.substr(0, 4);
    var isUrl = false
    if((lastFive==".com" ||lastFive=="com/" || lastFive=="edu/") && firstFive == "http"){
        isUrl = true
    }

    var imgUrl = ""
    console.log(message.user.name)

    //if it is a url, we will make a request to my teamates service
    if (isUrl){
        console.log("hello")
		var req = new XMLHttpRequest();
        var payload = {url:null};
        payload.url = message.text
        req.open('POST', urlStr, true);
		req.setRequestHeader('Content-Type', 'application/json');
		req.addEventListener('load', function(){
			if(req.status>= 200 && req.status < 400){
                //we get a response image, we build the image link with the response image
				var response = JSON.parse(req.responseText);	//Creates array of rows, super helpful for front end
				console.log(response.data.images[0]);// log to console what we got back
                imgUrl=response.data.images[0]
                setImg(imgUrl)              

			}
			else{
				console.log("Error (did you put blank input?)"+req.statusText);
			}
		});
        req.send(JSON.stringify(payload));   
    }
    //build message component, with username and message container
    return (
        <div className={`message_container_${client.userID==message.user.id ? "user" :"other"}`}>
            <p className={`message_${client.userID==message.user.id ? "user" :"other"}`}>
            {message.user.name}:
            </p>
            {message.text} 
 
            {isUrl ? <div><a href={message.text}>  <img src={imageUrl} width="150" height="100" ></img></a> </div>: ''}

        </div>
    )
}

export default TeamMessage
