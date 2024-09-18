import { useState, useEffect } from 'react';
import Button from './Button';

function GameController() {
  const [sequence, setSequence] = useState([]);
  const [actualSequence, setActualSequence] = useState([]);
  const [score, setScore] = useState(0);
  const [activeButton, setActiveButton] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [inSequence, setInSequence] = useState(false);

  const colours = ['violet', 'CornflowerBlue', 'LightSeaGreen', 'mediumpurple'];

  
  useEffect(() => {
    if (sequence.length > 0 && gameStarted && !gameOver) { //si la secuencia tiene colores y el juego está iniciado y no terminó
      let index = 0;
        setInSequence(true); //la secuencia se está mostrando
      //recorre la secuencia de colores mediante el index
      const interval = setInterval(() => {
        setActiveButton(sequence[index]); //activa el botón de la secuencia por 0,5 segundos
        setTimeout(() => setActiveButton(null), 500);
        index++;
        if (index >= sequence.length) {
          clearInterval(interval); //si terminó de recorrer la secuencia, se limpia el intervalo
          setInSequence(false);
        }
      }, 1000);
    }
  }, [sequence, gameStarted, gameOver]);

    //Funcion para cuando el jugador hace click en un botón
  const handlePlayerClick = (colour) => {
    if (gameOver || inSequence || !gameStarted) return; //si el juego terminó, la secuencia se está mostrando o no se inició, no hace nada
    
    //cuando presiona uno de los botones, este se activa por 0,5 segundos
    setActiveButton(colour);
    setTimeout(() => setActiveButton(null), 500);

    //el color presionado se agrega a la secuencia actual
    setActualSequence([...actualSequence, colour]);

    //verifica si el color presionado es el coincide con el de la secuencia
    if (sequence[actualSequence.length] !== colour) {
      setGameOver(true); //si no coincide, el juego termina
    } else if (actualSequence.length + 1 === sequence.length) {
      setScore(score + 1); //si coincide, se le suma un punto
      setTimeout(() => {
        setSequence([...sequence, colours[Math.floor(Math.random() * 4)]]); //se agrega un nuevo color a la secuencia
        setActualSequence([]); //se reinicia la secuencia actual
        setGameOver(false); //se reinicia el estado de gameOver
      }, 1000);
    }
  };

  //Reinicia los valores
  const resetGame = () => {
    setSequence([]);
    setActualSequence([]);
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
  };

     //Inicia el juego
  const startGame = () => {
    setSequence([colours[Math.floor(Math.random() * 4)]]);
    setActualSequence([]);
    setGameOver(false);
    setGameStarted(true);
  };

  //renderiza los botones
  return (
    <div className="controllers">
      <div className="buttons-container">
        <div className="score">
          <span>Puntuación</span>
          <br />
          <span>{score}</span>
        </div>
        
        {colours.map(colour => ( /* crea un botón para cada color*/
          <Button 
            key={colour} 
            color={colour} 
            onClick={() => handlePlayerClick(colour)} 
            isActive={activeButton === colour}
          />
        ))}
      </div>
        
      {gameOver && ( /*cuando el jugador pierde se muestra su puntuacion y un boton para reintentarlo*/
        <div className="game-over">
          <h2>Has perdido!</h2>
          <h3>Tu puntuación fue</h3>
          <p>{score}</p>
          <button className="reset-button" onClick={resetGame}>Reintentar</button>
        </div>
      )}
      
      {!gameStarted && (
        <button className="start-button" onClick={startGame}>
          Iniciar juego
        </button>
      )}
    </div>    
  );
}
  export default GameController;