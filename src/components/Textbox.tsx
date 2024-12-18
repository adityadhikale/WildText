import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Icon } from "@iconify/react";
import '../styles/styles.css';

// Define the types for props
interface TextboxProps {
  heading: string;
  mode: 'light' | 'dark';
}

const Textbox: React.FC<TextboxProps> = ({ heading, mode }) => {
  const [text, setText] = useState<string>('');
  const [textHistory, setTextHistory] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setText(newText);
    setTextHistory([...textHistory, newText]);
  };

  const undo = () => {
    if (textHistory.length > 0) {
      const previousText = textHistory[textHistory.length - 1];
      const newTextHistory = textHistory.slice(0, -1);
      setText(previousText);
      setTextHistory(newTextHistory);
      toast.success('Undo successful');
    } else {
      toast.error('Nothing to undo');
    }
  };

  const upperCase = () => {
    const newText = text.toUpperCase();
    setText(newText);
    toast.success('Converted to Uppercase');
  };

  const lowerCase = () => {
    const newText = text.toLowerCase();
    setText(newText);
    toast.success('Converted to Lowercase');
  };

  const capitalise = () => {
    let newText = text.replace(/(?:^|\.\s|\!\s|\?\s|\,\s|\:\s|\;\s)([a-z])/g, (p1) => p1.toUpperCase());
    newText = newText.charAt(0).toUpperCase() + newText.slice(1);
    setText(newText);
    toast.success('Capitalised');
  };

  const clearText = () => {
    setText('');
    toast.success('Text Cleared');
  };

  const copyText = () => {
    navigator.clipboard.writeText(text);
    toast.success('Text Copied to Clipboard');
  };

  const removeExtraSpaces = () => {
    const newText = text.replace(/ +/g, ' ');
    setText(newText.trim());
    toast.success('Extra Spaces Removed');
  };

  const removePara = () => {
    const newText = text.replace(/\s+/g, ' ').trim();
    setText(newText.trim());
    toast.success('Only one Paragraph Removed');
  };

  const sortTextLines = () => {
    const newText = text.split('\n').sort().join('\n');
    setText(newText.trim());
    toast.success('Text is Sorted');
  };

  return (
    <>
      <div className='container my-1' style={{ color: mode === 'dark' ? 'white' : 'black' }}>
        <div className="mb-3">
          <label className="form-label my-3">{heading}</label>
          <textarea
            className={`form-control ${mode === 'dark' ? 'text-white' : 'text-black'}`}
            id="textBox"
            rows={10}
            placeholder='Type or Paste your text...'
            value={text}
            onChange={handleChange}
            style={{ backgroundColor: mode === 'dark' ? '#74747400' : 'white', color: mode === 'dark' ? 'white' : 'black' }}
          ></textarea>
        </div>
        <h4>Options</h4>
        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={capitalise}>Capitalise</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={upperCase}>Upper Case</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={lowerCase}>Lower Case</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={removeExtraSpaces}>Remove Extra Spaces</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={removePara}>Make one Paragraph</button>
        <button disabled={text.length === 0} className="btn btn-primary mx-1 my-1" onClick={sortTextLines}>Sort Text Line</button>
        <button disabled={text.length === 0} className="btn btn-success mx-1 my-1" onClick={copyText}>
          <Icon icon="solar:copy-linear" style={{ color: 'white', height: '23px', width: '20px' }} /> Copy
        </button>
        <button disabled={text.length === 0} className="btn btn-danger mx-1 my-1" onClick={clearText}>
          <Icon icon="ri:delete-bin-6-line" style={{ color: 'white', height: '25px', width: '20px' }} /> Clear
        </button>
        <button disabled={text.length === 0} className="btn btn-secondary mx-1 my-1" onClick={undo}>
          <Icon icon="ic:round-undo" style={{ color: 'white', height: '20px', width: '21px' }} /> Undo
        </button>
      </div>
      <div className="container" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
        <div>
          <h4 className='my-3'>Your Text Summary</h4>
          <p>
            Words: {text.split(/\s+/).filter((element) => element.length !== 0).length}<br />
            Characters: {text.length}<br />
            Sentences: {text.split(/[.!?]/).filter(Boolean).length}<br />
            Average Word Length: {text.split(/\s+/).filter(Boolean).length ? (text.replace(/\s+/g, '').length / text.split(/\s+/).filter(Boolean).length).toFixed(2) : 0}<br />
            Average Sentence Length: {text.split(/[.!?]/).filter(Boolean).length ? (text.split(/[.!?]/).filter(Boolean).reduce((acc, sentence) => acc + sentence.split(/\s+/).filter(Boolean).length, 0) / text.split(/[.!?]/).filter(Boolean).length).toFixed(2) : 0} words
          </p>
        </div>
        <hr />
        <h4>Preview</h4>
        <div>
          <p>{text.length > 0 ? text : 'Nothing to preview.'}</p>
        </div>
        <hr />
      </div>
    </>
  );
};

export default Textbox;
