import QRCode from 'qrcode'
import { useState } from 'react'
import InputColor from "./components/InputColor"


function App() {

	const [url, setUrl] = useState('')
	const [qr, setQr] = useState('')


	//color 
	const [inputValue, setInputValue] = useState({
		url: '',
		color: ''
	  });


	const GenerateQRCode = () => {
		QRCode.toDataURL(url, {
			width: 800,
			margin: 2,
			/* color: {
				dark: '#2bcb4b',
				light: '#EEEEEEFF'
			} */
			color: inputValue.color
		}, (err, url) => {
			if (err) return console.error(err)

			console.log(url)
			setQr(url)
		})
	}

	return (
		<div className="app">
			<h1>QR Generator</h1>
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
		</div>
	)
}

export default App