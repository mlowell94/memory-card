import React from "react";
import Text from "./Text"

const Header = (props) => {
    return(
        <div className="header">
            <div>memory card</div>
            <div className="score">
                <Text text = {'Score: ' + props.currentScore}/>
                <Text text = {'High Score: ' + props.highScore }/>
                <Text text = {'Level: ' + props.level}/>
            </div>
        </div>
    )
}

export default Header