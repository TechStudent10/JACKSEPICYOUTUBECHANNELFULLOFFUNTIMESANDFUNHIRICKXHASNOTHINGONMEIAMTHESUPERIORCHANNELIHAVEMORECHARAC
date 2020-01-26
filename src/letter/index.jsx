import React from 'react';

const Letter = ({currentLetter}) => (
  <p className="next-letter">{currentLetter.toUpperCase()}</p>
);

export default Letter;
