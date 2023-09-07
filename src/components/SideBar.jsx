import React from 'react';
import { List, ListItem, ListItemText, Divider, Typography, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import styles from './Sidebar.module.css';


const Sidebar = ({ guessedProperties, difficulty }) => {
  return (
    <div className={styles.container}>
      <Typography variant={difficulty==="hard"?'h6':'h5'} className={styles.typography}>Guessed Properties:</Typography>
        <List style={{backgroundColor : '#e0e0e0', paddingTop:'20px'}}>
          {guessedProperties.map((guessedProperty, index) => {
            const [property, value, correctValue] = guessedProperty.split(': ');
            return (
              <div key={index}>
                <ListItem className={styles.listItem}>
                  <ListItemText primary={`${property}: ${correctValue}`} />
                  {value.toUpperCase() === correctValue.toUpperCase() ? (
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
    </div>
  );
};

export default Sidebar;
