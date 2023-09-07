import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import {getHistory, getItem} from '../api/api.js';
import { AuthContext } from '../utils/AuthContext.jsx';

import { List, ListItem, ListItemText, Divider, Typography, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ReplayIcon from '@mui/icons-material/Replay';
import StyledButton from '../components/StyledButton.jsx';


import styles from './HistoryPage.module.css';




const HistoryPage = ({}) => {
  const navigateTo = useNavigate();
  const [matches, setMacthes] = useState([]);
  const { authenticatedUser, updateAuthentication } = useContext(AuthContext);
const mockUser = {id:'2'}

const handleClick = () => {
  navigateTo(-1)
};
useEffect(() => {
  const fetchMatches = async () => {
    const data = await getHistory(authenticatedUser.id);
    console.log(`HistoryPage: fetchedMatches: ${data}`);
    setMacthes(data);
  };
  fetchMatches();
}, []);
  return (
    <>
    <Header />
    <div className={styles.container}>
      <Typography variant="h4" className={styles.typography}>History</Typography>
        <List style={{backgroundColor : '#e0e0e0', paddingTop:'20px', }}>
          {matches.map((match, index) => {
            const date = new Date(match.date);
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'short' });
            const hour = date.getHours();
            const minute = date.getMinutes();

            // Create the formatted date string
            const formattedDate = `${day} ${month} ${hour}:${minute}`;
            return (
              <div key={index} style={{width:'80vw', padding:'5px'}}>
                <ListItem className={styles.listItem} style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                  <Typography variant="h6" >{`Score: ${match.score}`}</Typography>
                  <Typography variant="h6" >{match.difficulty}</Typography>
                  <Typography variant="h6" >{formattedDate}</Typography>
                  <Typography variant="h6" >{`Secret Item : ${match.secretItemId}`}</Typography>
                    {match.isWon ? (
                      <CheckCircleIcon className={styles.correctIcon} />
                    ) : (
                      <CancelIcon className={styles.wrongIcon} />
                    )}
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
        <div  className='button-container' style={{width:'10%', alignSelf:'center'}}>
        <StyledButton value={'Go Back'} size={'easy'} handleClick={handleClick}  />
        </div>
    </div>
    </>
  );
};

export default HistoryPage;
