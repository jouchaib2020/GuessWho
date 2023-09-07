import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Paper, Dialog, DialogContent } from '@mui/material';

import GuessForm from '../components/GuessForm';
import GameGrid from '../components/GameGrid';
import Result from '../components/Result';
import Sidebar from '../components/SideBar';
import { updateDisabledCards } from '../utils/updateDisabledCards';
import Header from '../components/Header';

import { startGame, addMatch} from '../api/api.js'
import { AuthContext } from '../utils/AuthContext';

import styles from './GamePage.module.css';


const GamePage = ({ }) => {
  const { authenticatedUser, updateAuthentication } = useContext(AuthContext);
  const [secretItem, setSecretItem] = useState({id:'', name:'', image:'', properties:{}});
  const [remainingItems, setRemainingItems] = useState([]);
  const [guessCounter, setGuessCounter] = useState(0)
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [guessedProperties, setGuessedProperties] = useState([]);
  const [disabledCards, setDisabledCards] = useState([]);


  const { difficulty, domain } = useParams();
  const maxGuesses = difficulty === 'easy' ? 12 : difficulty === 'medium' ? 24 : 36;
  

  const handleGuess = () => {
    // Make an API call to validate the guess
    const newGuessedProperty = `${selectedProperty}: ${selectedValue}: ${secretItem.properties[selectedProperty]}`;
    setGuessedProperties((prevGuessedProperties) => [
      ...prevGuessedProperties,
      newGuessedProperty,
    ]);
    console.log(`homePage: selectedProperty: ${selectedProperty},
     selectedValue: ${selectedValue} 
     secretItem value: ${secretItem.properties[selectedProperty]}
     ?: ${selectedValue === secretItem.properties[selectedProperty]}
     `)

    updateDisabledCards(remainingItems, selectedProperty, secretItem, disabledCards, setDisabledCards);

    // Increment guess counter
    setGuessCounter((prevGuessCounter) => prevGuessCounter + 1);

    // Check if guess counter reached max guesses for game over
    if (guessCounter + 1 >= maxGuesses) {
      setIsGameOver(true);
    }
    
  };

  const handleItemSelection = async (selectedItem) => {
    const isCorrectGuess = selectedItem.id === secretItem.id;

  // Update game state based on the result
  setIsGameWon(isCorrectGuess);
  setIsGameOver(true);

  // Calculate the final score
  const trueItems = disabledCards.filter((item) => item === false);
  const currentScore = Math.max(0, (remainingItems.length- trueItems.length) - score);
  setScore(currentScore);

  // add the game record to the database 
  if (authenticatedUser.id !== '') {
    await addMatch(authenticatedUser.id, difficulty, score, secretItem.id, isCorrectGuess);
  }
  };



  useEffect(() =>  {
    const fetchItems = async() =>{
      try {  const data = await startGame(difficulty, domain);
        setRemainingItems(data["randomItems"]);
        setSecretItem(data["secretItem"]);
      }
      catch (error) {
        console.error(`Error fetching items: ${error}`);
      }
    }
    fetchItems();
  }, []);

  return (
    <div className={styles.container}>
    <Header />
    <Grid container spacing={2} style={{paddingTop:'20px', width:"99%"}}>
      <Grid item xs={difficulty==='easy'? 8:difficulty==='medium'? 9: 10}>
        <Paper>
          <GameGrid items={remainingItems} difficulty={difficulty} onSelect={handleItemSelection} disabledCards={disabledCards}/>
        </Paper>
      </Grid>
      <Grid className={styles.sideBar} item xs={difficulty==='easy'? 4:difficulty==='medium'? 3:2}>
        <Paper>
          <Sidebar guessedProperties={guessedProperties} difficulty={difficulty} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper>
            <GuessForm
              properties={secretItem.properties}
              guessedProperties={guessedProperties}
              selectedProperty={selectedProperty}
              selectedValue={selectedValue}
              onPropertyChange={(event) => setSelectedProperty(event.target.value)}
              onValueChange={(event) => setSelectedValue(event.target.value)}
              onGuess={handleGuess}
            />
        </Paper>
      </Grid>
    </Grid>
    <Dialog
        open={isGameOver}
        fullWidth={true}
        maxWidth='sm'
      >
        <DialogContent className={styles.dialogContainer}>
          <Result isGameWon={isGameWon} score={score} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GamePage;
