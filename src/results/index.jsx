import React from 'react';

const Results = ({runningTime, letterSplits}) => {
  const splits = Object.keys(letterSplits).map(char => <li key={char}><span className="char">{char}:</span> {letterSplits[char]}s</li>)
  return (
    <div className="results">
      <p>Detailed Results <span role="img" aria-label="flag">🏁</span></p>
      <ul>
        { splits }
      </ul>
    </div>
  )
};

export default Results;
