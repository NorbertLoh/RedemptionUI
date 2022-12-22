import React from "react";

const TextInput = (props) => {
    const onChange = (e) => {
        console.log(e.target.value)
        props.changeFunc(e.target.value)
    }
    return (<>
        <input onChange={onChange} value={props.value} className="textInput"></input>
    </>)
}

export default TextInput;