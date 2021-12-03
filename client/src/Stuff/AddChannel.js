import React from 'react';
//We need to pass the state functions to this button so that can we can set the channel create type, and change the states
// Open source svg data from svgrepo.com export allows our component to directly interact with the svgs
export function AddChannel({
   setCreateType, setNewChannel, setOpenOptions, type 
  }) { return (
  <svg

    cursor='pointer'
    viewBox='0 0 50 60'
    width='20'
    height='20'
    
    onClick={() => {
      setCreateType(type);
      setNewChannel((prevState) => !prevState);
      setOpenOptions(false);
      }}>
    <path
    d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M38.5,28H28v11c0,1.104-0.896,2-2,2
    s-2-0.896-2-2V28H13.5c-1.104,0-2-0.896-2-2s0.896-2,2-2H24V14c0-1.104,0.896-2,2-2s2,0.896,2,2v10h10.5c1.104,0,2,0.896,2,2
    S39.604,28,38.5,28z"      fill='black'
    fillOpacity='0.60'
    />

  </svg>
)};
