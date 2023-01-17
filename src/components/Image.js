import React from "react"


const Image = (props) => {
    return (
        <img src = { props.url } alt = { props.text }/>
    )
}

export default Image;