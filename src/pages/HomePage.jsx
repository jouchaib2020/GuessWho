import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import styled from '@emotion/styled';
import styles from './HomePage.module.css';
import Header from '../components/Header.jsx';
import StyledButton from '../components/StyledButton';

const DOMAIN_OPTIONS = ['Animals', 'Cartoons', 'Countries', 'Celebrities'];


const HomePage = () => {
  const navigateTo = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedDomain, setSelectedDomain] = useState("");

  const handleDifficultyChange = (event) => {
    setSelectedDifficulty(event.target.value);
  };

  const handleDomainChange = (event) => {
    setSelectedDomain(event.target.value);
  };

  const handleStartGame = () => {
    console.log(`HomePage: handleStartGame: selectedDifficulty: ${selectedDifficulty}, selectedDomain: ${selectedDomain}`);
    navigateTo(`/game/${selectedDifficulty}/${selectedDomain}`);
  };

  return (
    <>
    <Header />
    <div className={styles.root}>
      <div className={styles.content}>
        <FormControl className={styles.formControl}>
          <InputLabel>Difficulty</InputLabel>
          <Select value={selectedDifficulty} onChange={handleDifficultyChange}>
            <MenuItem key={1} value="easy">Easy</MenuItem>
            <MenuItem key={2} value="medium">Medium</MenuItem>
            <MenuItem key={3} value="hard">Hard</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={styles.formControl}>
          <InputLabel>Domain</InputLabel>
          <Select value={selectedDomain} onChange={handleDomainChange}>
            {DOMAIN_OPTIONS.map((domain, index) => (
            <MenuItem key={index} value={domain} > {domain} </MenuItem>
            ))}
          </Select>
        </FormControl>
        <StyledButton value={'Start Game'} size={'easy'} handleClick={handleStartGame} />
      </div>
      </div>
    </>
  );
};

export default HomePage;
