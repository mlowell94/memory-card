import React, { useEffect, useState } from "react";
import { useTransition, animated } from "react-spring";
import Image from './Image'
import Text from './Text'

const Body = (props) => {
    const [items, setItems] = useState(props.cardArray)
    useEffect(() => {
        setItems(props.cardArray);
    }, [props.cardArray])

    const transition = useTransition(items, {
        from: {opacity: 0, x: 100},
        enter: { opacity: 1, x: 0},
        leave: { opacity: 0, x: -100 },
        trail: 100,
        items: items,
    });
    return(
        <div className="container">
            {transition((style, item) => 
                <animated.div className="card" style = { style } id = { null } onClick = { () => props.handleClick(item.text) }>
                    <Image url = { item.url } text = { item.text }/>
                    <Text text = { item.text } />
                </animated.div>
            )}
        </div>
    )
}

export default Body