import React from 'react'
import styles from './StyledButton.module.css'

function StyledButton({value, size,  handleClick}) {
  const fontSize = size === 'easy' ? 'small' : size === 'medium'? 'x-small': 'xx-small';
  return (
    <button className={styles.button} onClick={handleClick} style={{fontSize:fontSize}}>
        {value}
    </button>
  )
}

export default StyledButton