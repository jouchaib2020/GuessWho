import React from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReplayIcon from '@mui/icons-material/Replay';


const styles = {
  resultContainer: {
    textAlign: 'center',
    padding: 8,
    backgroundColor: '#e0e0e0', 
    border: '1px solid #bdbdbd',
    borderRadius: '4px',
    background: 'linear-gradient(145deg, #cacaca, #f0f0f0)',
    boxShadow:  '16px 16px 32px #a1a1a1, -16px -16px 32px #ffffff'
  },
  winText: {
    color: '#4caf50',
  },
  loseText: {
    color: '#f44336',
  },
};

const Result = ({ isGameWon, score }) => {
    const navigate = useNavigate();

  return (
    <>
      <Typography variant="h4" >
        {isGameWon ? (
          <span style={styles.winText}>Congratulations! You won!</span>
        ) : (
          <span style={styles.loseText}>Sorry! You lost.</span>
        )}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Your score: {score}
      </Typography>
      <Button variant="outlined" color="success" endIcon={<ReplayIcon />} onClick={() =>navigate('/home')}>
        Play Again
      </Button>
    </>
  );
};

export default Result;
