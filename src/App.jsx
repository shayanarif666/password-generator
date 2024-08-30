import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css';

function App() {

  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  // Reference
  const passwordRef = useRef();

  // Password Generator
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) alphabets += "0123456789";
    if (charAllowed) alphabets += "!@#$%^&*()_-+=`~';:";

    for (let index = 0; index < length; index++) {
      const char = Math.floor(Math.random() * alphabets.length);
      pass += alphabets.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed])

  // Copy Password

  const handleCopyPassword = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  }

  return (
    <>
      <div className="password-generator bg-secondary">
        <h2 className='text-center'>Password Generators</h2>
        <div className="d-flex align-items-center mb-4">
          <input type="text" className='form-control' ref={passwordRef} value={password} /> <br />
          <button className='btn btn-primary ms-3' onClick={handleCopyPassword}>Copy</button>
        </div>
        <div className="password-selectors d-flex align-items-center justify-content-between">
          <input type="range" className='input-range form-range' min={8} max={100} onChange={(e) => setLength(e.target.value)} />
          <span className='text-white'>Length : {length}</span>
          <div className="number-selector">
            <input type="checkbox" onChange={() => setNumberAllowed((prev) => !prev)} />
            <label htmlFor="" className='text-white ms-1' >Numbers</label>
          </div>
          <div className="char-selector">
            <input type="checkbox" onChange={() => setCharAllowed((prev) => !prev)} />
            <label htmlFor="" className='text-white ms-1'>Characters</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
