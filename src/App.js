import './App.css';
import React, { useState, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const inputTextAreaRef = useRef(null);
   const [promptText, setPromptText] = useState('');
  
   const adjustTextAreaHeight = () => {
    if (inputTextAreaRef.current) {
      inputTextAreaRef.current.style.height = "auto";
      inputTextAreaRef.current.style.height = inputTextAreaRef.current.scrollHeight + "px";
    }
   };
  

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
    const handlePromptChange = (event) => {
    setPromptText(event.target.value);
  };

 const handleProcessClick = async () => {
    const response = await fetch('http://localhost:5000/process-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input_text: inputText, prompt_text: promptText })
    });

    const data = await response.json();
    setOutputText(data.output);
 };
  
  


  
  
  

  return (
    <div className="App">

      
     <div className="split-container">
       
        <div className="left-side">Left Content (20%)</div>

        <div className="right-side">
  <div className="container resizable-container">
    <div className="container-content">
      <div className='class1' style={{ paddingBottom: '10px' }}>
        <TextareaAutosize
          className="resizable-input"
          style={{ width: '100%' }} // Maintain the width
          minRows={1} // Adjust the minimum number of rows
          maxRows={5} // Adjust the maximum number of rows
          value={promptText}
          onChange={handlePromptChange}
          placeholder="Enter Prompt"
        />
      </div>
          
     
    </div>
          </div>
          <div className="container resizable-container">
    <div className="container-content">
      <div className='class1' style={{ paddingBottom: '10px' }}>
        <TextareaAutosize
          className="resizable-input"
          style={{ width: '100%' }} // Maintain the width
          minRows={1} // Adjust the minimum number of rows
          maxRows={5} // Adjust the maximum number of rows
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter Posts manually"
        />
      </div>
          
     
    </div>
  </div>

  <div className="container resizable-container">
    <div className="container-content">
      <h2>Scenarios</h2>
      
      <div style={{ padding: '10px 0' }}>
                <textarea value={outputText} readOnly />
                 <button onClick={handleProcessClick}>generate</button>
      </div>
    </div>
  </div>
</div>



       </div>
       
      
      </div>
 
  );
}

export default App;


