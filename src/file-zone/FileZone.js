import React from 'react';
import './FileZone.css';

const FileZone = ({ children, onClick, onPaste, updateContent }) => {
  return (
    <div id="file-zone" onClick={onClick}>
      <div id="file" role="textbox" aria-multiline="true" contentEditable="true" className="content-box" suppressContentEditableWarning="true" onClick={onClick} onPaste={() => {
        navigator.clipboard.readText().then(() => onPaste())
      }}
      >
        {children}
      </div>
    </div>
  );
}

export default FileZone;
