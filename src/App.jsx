import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";

function App() {

  const [password, setPassword] = useState("")
  const [length, setLength] = useState(7)
  const [isNumberInclude, setIsNumbersInclude] = useState(false)
  const [isCharInclude, setIsCharInclude] = useState(false)
  const selected = useRef(null)
  const noatify = ()=> toast.success("Copied successfully")

  function lengthChange(event){
    setLength(event.target.value)
  }

  //here we are using callback only for optimization so that we can stop re-rendering
  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let char = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz"
    const nums = "1234567890";
    const specialChar = "!@#$%^&*()_+{}|:<>?-=[];',./"
    if(isNumberInclude) char+=nums;
    if(isCharInclude) char+=specialChar;
    for (let index = 1; index < length; index++) {
      const randomIndex = Math.round(Math.random() * char.length + 1);
      pass += char.charAt(randomIndex)
     
    }
    setPassword(pass)
  },[length, isNumberInclude, isCharInclude])

  useEffect(()=>{
    //this is the password generator function and one more thing can't run this directly 
    passwordGenerator()
    //if any of the dependancy change passwordGenerator will run again
  }, [length, isNumberInclude, isCharInclude, passwordGenerator])
  
  function copyPassword(){
    //shoing selected part
    selected.current?.select()
    //selecting with range
    selected.current?.setSelectionRange(0, length)
    //copying password to clipboard
    window.navigator.clipboard.writeText(password)
    noatify();
  }

  return (
    <div className="w-screen h-screen bg-black font-sans text-white flex justify-center py-12 p-4">
      <div className="passwordContainer bg-gray-600 h-fit p-5 rounded-xl min-h-[50vh] w-full md:w-3/6 text-lg flex flex-col gap-4 justify-center">
      <h1  className="text-center font-medium md:text-3xl text-2xl mb-4">🔐 Password Generator</h1>
        <div className="textArea flex items-center justify-start">
          <input
            type="text"
            placeholder="Password" 
            ref={selected}
            readOnly
            value={password}
            className="p-3 rounded-l-lg outline-none text-[#ec7505] w-5/6"
          />
          <button className="bg-blue-600 py-3 px-4 rounded-r-lg"
          onClick={copyPassword}
          >Copy</button>
          <ToastContainer/>
        </div>
        <div className="functions flex md:flex-row flex-col items-start md:items-center flex-wrap gap-3">
          <div className="flex items-center justify- gap-1 text-[#ec7505]">
          <input min={7} max={100} value={length} onChange={lengthChange} type="range" />
          <label>Length({length})</label>
          </div>
          <div className="flex items-center justify-center gap-1 text-[#ec7505]">
          <input id="number" type="checkBox" 
          onChange={()=>{
            setIsNumbersInclude((prevValue)=>!prevValue)
          }}
          />
          <label htmlFor="number">Numbers</label>
          </div>
          <div className="flex items-center justify-center gap-1 text-[#ec7505]">
          <input id="char" type="checkBox" 
          onChange={()=>{
            setIsCharInclude((prevValue)=>!prevValue)
          }}
          />
          <label htmlFor="char"> Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
