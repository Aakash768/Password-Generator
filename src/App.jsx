import React, { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [length, setLength] = useState(8);
  const [numAllowed, setNum] = useState(false);
  const [charsAllowed, setChars] = useState(false)
  const [password, setPassword] = useState("");
  const password_Ref = useRef(null);


  const password_generator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) {
      str = str + "0123456789"
    }

    if (charsAllowed) {
      str = str + "!\"#$%&'()*+,-./:;<=>?@[\$$^_{|}~`"
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);

      setPassword(pass);
    }
  }, [length, numAllowed, charsAllowed, setPassword])


  const copy_clip = useCallback(() => {
    password_Ref.current?.select();
    const notify = toast("Copied to Clipboard")
    window.navigator.clipboard.writeText(password);
  }, [password])
  useEffect(() => {
    password_generator()
  }, [password_generator, length, charsAllowed, numAllowed])
  return (
    <div className="main-section">
      <div className="card">
        <h1> Password Generator</h1>
        <div className="input-container">
          <input type="text"
            id="input-field" ref={password_Ref} value={password} placeholder='Generate your password' readOnly />
          <button id="cpy-btn" onClick={copy_clip}> Copy </button>
        </div>
        <div className='bar'>
          <input type="range" min={8} max={100} value={length} onChange={(e) => { setLength(e.target.value) }} />
          <label >Length : {length}</label>

          <input type="checkbox"
            defaultChecked={numAllowed}
            onChange={() => {
              setNum((prev) => !prev);
            }} />
          <label>Numbers</label>

          <input type="checkbox"
            defaultChecked={charsAllowed}
            onChange={() => {
              setChars((prev) => !prev);
            }} />
          <label>Characters</label>
        </div>


      </div>
      <ToastContainer
        position="top-right"
        autoClose={1999}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />
    </div>
  )
}

export default App