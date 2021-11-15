import React, { useState } from 'react';
import { MessageTeam, useMessageContext } from 'stream-chat-react';
const urlStr = 'https://scrape.quin.fish/';


const TeamMessage = (Message, i) => {
    const { handleOpenThread, message } = useMessageContext();
    const [imageUrl, setImageUrl] = useState('1111');
   
    const setImg = (newUrl) => {
        setImageUrl(newUrl);
      } 


    var lastFive = message.text.substr(message.text.length - 4);
    var firstFive = message.text.substr(0, 4);
    var isUrl = false
    if((lastFive==".com" ||lastFive=="com/" || lastFive=="edu/") && firstFive == "http"){
        isUrl = true
    }

    var imgUrl = ""
    console.log(message.user.name)
    if (isUrl){
        console.log("hello")
		var req = new XMLHttpRequest();
        var payload = {url:null};
        payload.url = message.text
        req.open('POST', urlStr, true);
		req.setRequestHeader('Content-Type', 'application/json');
		req.addEventListener('load', function(){
			if(req.status>= 200 && req.status < 400){
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
    
    return (
        <div className="message_container">
            <p className="userName_message">
            {message.user.name}:
            </p>
            {message.text} 
 
            {isUrl ? <div><a href={message.text}>  <img src={imageUrl} width="150" height="100" ></img></a> </div>: ''}

        </div>
    )
}

export default TeamMessage
