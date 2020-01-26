import React, { useState, useEffect } from 'react';

import './App.css';
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";
import Synonyms from "./synonyms/Synonyms";
import getMockText from './text.service';
import { getSynonyms } from './operations';

const App = () => {
  const [content, setContent] = useState('')
  const [selectedTxt, setSelectedTxt] = useState('')
  const [boldWords, setBoldWords] = useState([])
  const [underlineWords, setUnderlineWords] = useState([])
  const [italicWords, setItalicWords] = useState([])

  const [options, setOptions] = useState([])
  const [isBoldActive, toggleBoldActive] = useState(false)
  const [isUnderlineActive, toggleUnderlineActive] = useState(false)
  const [isItalicActive, toggleItalicActive] = useState(false)


  const getText = () => {
    getMockText().then(function (result) {
      setContent(result);
    });
  }

  useEffect(() => {
    getText()
  }, [])


  const getSelectionText = () => {
    if (window.getSelection) {
      setSelectedTxt(window.getSelection().toString())
    }
  }

  const getNewWordsArray = words =>
    words.includes(selectedTxt) ? words.filter(word => word !== selectedTxt) : [...words, selectedTxt]


  const onBold = () => {
    setBoldWords(prevWords => {
      const newWords = getNewWordsArray(prevWords)
      toggleBoldActive(() => newWords.includes(selectedTxt))
      return newWords
    })
  }

  const onUnderline = () => {
    setUnderlineWords(prevWords => {
      const newWords = getNewWordsArray(prevWords)
      toggleUnderlineActive(() => newWords.includes(selectedTxt))
      return newWords
    })
  }

  const onItalic = () => {
    setItalicWords(prevWords => {
      const newWords = getNewWordsArray(prevWords)
      toggleItalicActive(() => newWords.includes(selectedTxt))
      return newWords
    })
  }

  const removeActiveControls = () => {
    toggleBoldActive(false)
    toggleItalicActive(false)
    toggleUnderlineActive(false)
    setSelectedTxt('')
  }

  const getOptions = wordToFind => {
    setOptions([])
    getSynonyms(wordToFind).then(res => setOptions(res));
  }

  const replaceWord = wordToReplace => {
    setContent(prevWords => {
      const newContent = prevWords.split(' ')
      newContent[selectedTxt] = wordToReplace
      setOptions([])
      removeActiveControls()
      return newContent.join(' ')
    })
  }

  const updateContent = () => {
    setContent(prevContent => {
      const myNode = document.getElementById('file')
      const newText = myNode.innerText
      if (prevContent !== newText) {
        myNode.removeChild(myNode.childNodes[myNode.children.length - 1])
        return newText
      }
      return prevContent
    })
  }

  return (
    <div className="App">
      <header>
        <span>Simple Text Editor</span>
      </header>
      <main>
        <ControlPanel onBold={onBold} onUnderline={onUnderline} onItalic={onItalic} isBoldActive={isBoldActive} isUnderlineActive={isUnderlineActive} isItalicActive={isItalicActive} onClick={removeActiveControls} isDisabled={!Boolean(selectedTxt)} />
        <FileZone content={content} setSelection={getSelectionText} onClick={removeActiveControls
        } onPaste={updateContent} updateContent={updateContent}>
          {content.split(' ').map((word, i) =>
            (<span
              key={`${word}-${i}`}
              onDoubleClick={() => {
                setSelectedTxt(i)
                toggleBoldActive(() => boldWords.includes(i))
                toggleItalicActive(() => italicWords.includes(i))
                toggleUnderlineActive(() => underlineWords.includes(i))
                getOptions(word)
              }}
              className={`${boldWords.includes(i) ? 'text-bold ' : ''}${underlineWords.includes(i) ? 'text-underline ' : ''}${italicWords.includes(i) ? 'text-italic ' : ''}`}>{word} </span>
            ))}
        </FileZone>
        <Synonyms options={options} onClick={replaceWord} />
      </main>
    </div>
  );
}

export default App;
