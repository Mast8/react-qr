import QRCode from 'qrcode'
import { createContext, useState } from "react";
import InputColor from "./components/InputColor"

export const InputContext = createContext();

function App() {

	const [url, setUrl] = useState('')
 	const [qr, setQr] = useState('')

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

	const value = {
		inputValue,
		setInputValue,
		
	  }

	return (
		<div className="app">
			<h1>QR Generator</h1>
			
			<InputContext.Provider value={value}>
			
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