import React from 'react';
import './ControlPanel.css';

const ControlPanel = ({ onBold, onUnderline, onItalic, isBoldActive, isUnderlineActive, isItalicActive, onClick, isDisabled }) => {

  return (
    <div id="control-panel" onClick={onClick}>
      <div id="format-actions">
        <button className={`format-action ${isBoldActive ? 'btn-active' : ''}`} type="button" onClick={e => {
          e.stopPropagation()
          onBold()
        }} disabled={isDisabled}><b>B</b></button>
        <button className={`format-action ${isItalicActive ? 'btn-active' : ''}`} type="button" onClick={e => {
          e.stopPropagation()
          onItalic()
        }} disabled={isDisabled}><i>I</i></button>
        <button className={`format-action ${isUnderlineActive ? 'btn-active' : ''}`} type="button" onClick={e => {
          e.stopPropagation()
          onUnderline()
        }} disabled={isDisabled}><u>U</u></button>
      </div>
    </div>
  );
}

export default ControlPanel;
