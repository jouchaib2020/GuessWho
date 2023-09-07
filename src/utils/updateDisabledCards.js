export const updateDisabledCards = (remainingItems, selectedProperty, secretItem,disabledCards, setDisabledCards) => {
    const newDisabledCards = remainingItems.map((item, index) => {
      const selectedValue = secretItem.properties[selectedProperty];
      // Check if the item's selected property matches the selected value
      if(disabledCards[index] === true) return true;
      const isMatch = item.properties[selectedProperty] === selectedValue;
      console.log(`item.properties[selectedProperty] = ${JSON.stringify(item.properties[selectedProperty])}, selectedValue = ${selectedValue}, isMatch = ${isMatch}`)
      return !isMatch;
    });
    setDisabledCards(newDisabledCards);
  };