import QRCode from 'qrcode'
import { createContext, useState } from "react";
import InputColor from "./components/InputColor"

export const InputContext = createContext();

function App() {

	const [url, setUrl] = useState('')
 	const [qr, setQr] = useState('')

	 const [message, setMessage] = useState("")

	//one state
	/* const [url, setUrl] = useState({
		url: '',
		color: '#fff'
	  }); */

	//color 
	const [inputValue, setInputValue] = useState({
		url: '',
		color: '#fff'
	  }); 

	  //console.log(inputValue.color);
	const GenerateQRCode = () => {
		if(updateMessage(url)){
			if( url.length > 0){
				QRCode.toDataURL(url, {
					width: 800,
					margin: 2,
					color: {
						
						dark: inputValue.color,
						light: '#EEEEEEFF'
					} 
					
				}, (err, url) => {
					if (err) return console.error(err)
		
					
					setQr(url)
				})
			}
		}
		
		
	}

	function updateMessage(input) {
		let passed = false;
		let text = input.trim();
		if(text == "") {
		  setMessage("Input can not be empty")
		}else if( text.length < 3)
				setMessage("Input needs to be at least 3 characters long")
			  else{
				passed = true;
				setMessage("")
			  }
		return passed;
	  }

	const value = {
		inputValue,
		setInputValue,
		
	  }

	return (
		<div className="app">
			<h1>QR Generator</h1>

			<InputContext.Provider value={value}>
			<span className="message" value={message}> {message} </span>
				<InputColor />
				<input 
					type="text"
					placeholder="e.g. https://google.com"
					value={url}
					onChange={e => setUrl(e.target.value)} />
					<button onClick={GenerateQRCode}>Generate</button>
					{qr && <>
						<img src={qr} />
						<a href={qr} download="qrcode.png">Download</a>
				</>}
			</InputContext.Provider>
			
		</div>
	)
}

export default App