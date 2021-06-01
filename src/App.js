import {useState, useRef, useEffect} from 'react'
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState("");
  const formInput = useRef(null);

  const [theme,setTheme] = useState('theme-1');
  const app = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  }

  const addCharacter = (e) =>{
    setInputValue(oldValue => {
      return oldValue + e.target.textContent
    })
  }

  const deleteAll = () => {
    setInputValue("");
    formInput.current.setAttribute('placeholder','0')
  }

  const deleteLast = () =>{
    setInputValue(inputValue.slice(0,inputValue.length - 1))
  }

  const calculate = () => {
    /* eslint-disable no-eval */
    try {
      const output = eval(inputValue.replace('x','*'));
      if(output !== inputValue){
        setInputValue((Math.round(output * 100) / 100)+'');
      }
    } catch (error) {
      setInputValue("");
      formInput.current.setAttribute('placeholder','incorrect input')
    }
  }

  const changeTheme = () => {
    if(theme === 'theme-1'){
      setTheme('theme-2');
    }
    if(theme === 'theme-2'){
      setTheme('theme-3')
    }
    if(theme === 'theme-3'){
      setTheme('theme-1')
    }
  }

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if(theme){
      setTheme(theme);
    }
  },[])

  useEffect(() => {
    localStorage.setItem('theme',theme);
  },[theme])


  return (
    <div className={`App ${theme}`} ref={app}>
      <div className="app-wrapper">
        <div className="header">
          <h2>calc</h2>
          <div className="header-right">
            <p>THEME</p>
            <div className="toggle-wrapper">
              <div className="numbers">
                <p>1</p>
                <p>2</p>
                <p>3</p>
              </div>
              <div className="toggle-background" onClick={changeTheme}>
                <div className="toggle-circle position-1" ></div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleFormSubmit}>
          <input type="text" value={`${inputValue}`} placeholder="0" ref={formInput} readOnly/>
          <div className="keys-wraper">
            <button className="key" onClick={addCharacter}>7</button>
            <button className="key" onClick={addCharacter}>8</button>
            <button className="key" onClick={addCharacter}>9</button>
            <button className='del-btn' onClick={deleteLast}>DEL</button>
            <button className="key" onClick={addCharacter}>4</button>
            <button className="key" onClick={addCharacter}>5</button>
            <button className="key" onClick={addCharacter}>6</button>
            <button className="key" onClick={addCharacter}>+</button>
            <button className="key" onClick={addCharacter}>1</button>
            <button className="key" onClick={addCharacter}>2</button>
            <button className="key" onClick={addCharacter}>3</button>
            <button className="key" onClick={addCharacter}>-</button>
            <button className="key" onClick={addCharacter}>.</button>
            <button className="key" onClick={addCharacter}>0</button>
            <button className="key" onClick={addCharacter}>/</button>
            <button className="key" onClick={addCharacter}>x</button>
            <button className='reset-btn' onClick={deleteAll}>RESET</button>
            <button className='equals-btn' onClick={calculate}>=</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
