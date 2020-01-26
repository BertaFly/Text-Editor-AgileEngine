import React from 'react';
import './Synonyms.css';

const Synonyms = ({ options, onClick }) => {
  if (options.length) {
    return (
      <div className="synonyms-container">
        <ul>
          {options.map(word => <li key={word} onClick={() => onClick(word)}>{word}</li>)}
        </ul>
      </div>
    )
  }
  return null
}

export default Synonyms;
