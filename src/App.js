import React, { useState, useEffect, useRef } from "react";
import { useTransition, animated } from "react-spring";
import arrayShuffle from "array-shuffle";
import Header from './components/Header'
import Body from './components/Body'
import SvgContainer from "./SvgContainer";

const App = () => {
  const [cards, setCards] = useState(arrayShuffle(SvgContainer));
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [currentCards, setCurrentCards] = useState([...cards].slice(0, level * 5));

  const transition = useTransition(gameOver, {
    from: {opacity: 0, y: 100},
    enter: { opacity: 1, y: 0},
    leave: { opacity: 0, y: -100 },
  });

  const handleClick = (text) => {
    const index = cards.findIndex(card => card.text === text)
    if (cards[index].clicked !== true) {
      changeStatus(index);
      setScore(score + 1);
      reshuffleArray();
    } else {
      changeGameState()
    }
  }

  const changeStatus = (index) => {
    const newArray = [...cards];
    newArray[index].clicked = true;
    setCards(newArray);
  }

  const reshuffleArray = () => {
    setCurrentCards(arrayShuffle([...currentCards]))
  }

  const resetGameState = () => {
    const newArray = arrayShuffle([...cards]);
    resetClicked(newArray);
    resetScore();
    setCards(newArray);
    changeGameState();
  }

  const resetClicked = (newArray) => {
    for (let i = 0; i < newArray.length; i += 1) {
      newArray[i].clicked = false;
    }
  }

  const levelUp = useRef((level) => {
    const newArray = [...cards];
    resetClicked(newArray);
    setCards(newArray)
    setCurrentCards([...newArray].slice(0, (level * 5)))
  })
  
  useEffect(() => {
    levelUp.current(level)
  }, [level])

  const changeGameState = () => {
    if (gameOver === false) { 
      setGameOver(true)
      resetLevel()
    } else {
      setGameOver(false)
    }
  }

  const resetScore = () => {
    setScore(0);
  }

  const resetLevel = () => {
    setLevel(1)
  }

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
    switch(score) {
      case 5:
        setLevel(2);
        break;
      case 15: 
        setLevel(3);
        break;
      case 30:
        setLevel(4)
        break;
      case 50:
        setLevel(5)
        break;
      case 75:
        console.log('maxed')
        break;
      default:
        break;
    }
  }, [score, highScore])

  return (
    <div className="App">
      <Header currentScore = { score } highScore = { highScore } level = { level }/>
      <Body cardArray = { !gameOver ? currentCards : [] } handleClick = { handleClick } />
      {transition((style, gameOver) => 
        gameOver ? <animated.button className = { 'replay' } style = { style } onClick = {() => resetGameState()}>replay</animated.button> : '')}
      {/* {gameOver ? <button className = { 'replay' } onClick = {() => resetGameState()}>replay</button> : ''} */}
    </div>
    );
  }
export default App;
