import React from 'react';

const Results = ({runningTime, letterSplits}) => {
  const splits = Object.keys(letterSplits).map(char => <li key={char}>{char}: {letterSplits[char]}s</li>)
  return (
    <div className="results">
      <p>Results:</p>
      <ul>
        { splits }
      </ul>
    </div>
  )
};

export default Results;
