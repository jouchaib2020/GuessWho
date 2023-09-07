import React, {useState, useEffect} from 'react';
import { FormControl, InputLabel, Select, MenuItem, Input, Button, Alert } from '@mui/material';
import styles from './GuessForm.module.css'



const GuessForm = ({ properties, selectedProperty, selectedValue, onPropertyChange, onValueChange, onGuess }) => {
  const [availableProperties, setAvailableProperties] = useState(Object.keys(properties));
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);
  const [isIncorrectGuess, setIsIncorrectGuess] = useState(false);

  // const handlePropertyChange = (event) => {
  //   onPropertyChange(event); 
  //   const selectedProp = event.target.value;
  //   setAvailableProperties(prevProperties =>
  //     prevProperties.filter(prop => prop !== selectedProp)
  //   );
  // };

  const handleGuess = (event) => {
    if(!selectedProperty || !selectedValue) return;
    onGuess(event);
    console.log(`GuessForm : properties: ${properties}`);
    // console.log(`GuessForm : property: ${property}, value: ${value}, correctValue: ${correctValue}`);
    if (selectedValue.toUpperCase() === properties[selectedProperty].toUpperCase()) {
      setIsCorrectGuess(true);
      console.log("Correct Guess");
      setTimeout(() => {
        setIsCorrectGuess(false);
      }, 4000); 
    } else {
      setIsIncorrectGuess(true);
      console.log("Incorrect Guess");
      setTimeout(() => {
        setIsIncorrectGuess(false);
      }, 4000);
    }
  };
  
  useEffect(() => {
    setAvailableProperties(Object.keys(properties));
}, [properties]);


  return (
    <form className={styles.form}>
      <FormControl >
        <InputLabel>Property</InputLabel>
        <Select 
        label="Property"
        value={selectedProperty} 
        onChange={onPropertyChange}
        style={{ minWidth: 120 }}
        >
          {availableProperties.map(property => (
            <MenuItem key={property} value={property}>{property}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Input
        className={styles.input}
        placeholder="Value"
        value={selectedValue}
        onChange={onValueChange}
      />
      <Button className={styles.button} variant="outlined" color="secondary" onClick={handleGuess}>
        Guess
      </Button>
      {isCorrectGuess && <Alert severity="success" >This is a Correct Guess !</Alert>}
      {isIncorrectGuess && <Alert severity="error">This is an incorrect Guess !</Alert>}
    </form>
  );
};

export default GuessForm;
