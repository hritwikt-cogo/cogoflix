import React from "react";

function Navbar() {
  
    let textInput = React.createRef();
    
    function handleClick() {
        window.alert(`Hello ${textInput.current.value}!`);
      }
    return (

    <>
        <div>
        <wired-input placeholder="your name" ref={textInput}  type="text" />
        <wired-button elevation="4" onClick={handleClick}>Search</wired-button>
        </div>
        
    </>
  )
}

export default Navbar;
