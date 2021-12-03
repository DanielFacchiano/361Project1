import React from 'react';
// open source svg from https://www.svgrepo.com/svg
// pass the functions to change states and create new channel
// export allows our component to directly interact with the svgs functions
export function CloseCreate({ setNewChannel, setOpenOptions }) {
  return(
  <svg
    cursor = "pointer"
    width='60'
    height='60'
    viewBox='0 0 30 30'
    onClick={() => {
      //if were in the new channel menu, we set it to false and leave that state
      if (setNewChannel){
         setNewChannel(false);
        }
      // if were in the options menu state, we set that to false to leave that state
      if (setOpenOptions){ 
        setOpenOptions(false);
      }
    }}
  >
    <path
    d="M8,19a3,3,0,0,1-3-3V8A3,3,0,0,1,8,5,1,1,0,0,0,8,3,5,5,0,0,0,3,8v8a5,5,0,0,0,5,5,1,1,0,0,0,0-2Zm7.71-3.29a1,1,0,0,0,0-1.42L13.41,12l2.3-2.29a1,1,0,0,0-1.42-1.42L12,10.59,9.71,8.29A1,1,0,0,0,8.29,9.71L10.59,12l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l2.29,2.3a1,1,0,0,0,1.42,0ZM16,3a1,1,0,0,0,0,2,3,3,0,0,1,3,3v8a3,3,0,0,1-3,3,1,1,0,0,0,0,2,5,5,0,0,0,5-5V8A5,5,0,0,0,16,3Z"      
    fill='red'
    />

  </svg>
)};
