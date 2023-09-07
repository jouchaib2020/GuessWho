import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import StyledButton from './StyledButton';
import styles from './GameGrid.module.css';

const GameGrid = ({ items,difficulty, onSelect, disabledCards }) => {
  let columns, rows, width, height, spacing;

  if (difficulty === 'easy') {
    columns = 4;
    rows = 3;
    spacing = 2;
    width = 40;
    height = 100;
  } else if (difficulty === 'medium') {
    columns = 6;
    rows = 4;
    spacing = 1;
    width = 30;
    height = 90;
  } else {
    columns = 6;
    rows = 6;
    spacing = 0.5;
    width = 20;
    height = 55
  }

  return (
    <Grid container spacing={spacing} style={{backgroundColor: '#e0e0e0'}}>
      {items.lenght !==0 &&( items.map((item, index) => (
        <Grid  key={item.id} item xs={12/ columns}>
          <Card className={styles.gridItem} style={{backgroundColor:'#e0e0e0'}}>
            <CardMedia
              component="img"
              alt={item.name}
              height={height}
              width={width}
              image={item.image}
            />
            <CardContent style={{ display: 'flex', justifyContent:'space-between', alignItems:'center', padding:"0px 10px"}}>
            <Typography variant="subtitle1" >
                {item.name}
              </Typography>
                <StyledButton value='select' size={difficulty} handleClick={() => onSelect(item)} />
              {disabledCards[index] && (
              <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
            )}
            </CardContent>
          </Card>
        </Grid>
      )))}
    </Grid>
  );
};

export default GameGrid;
