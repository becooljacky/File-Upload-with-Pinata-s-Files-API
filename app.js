require('dotenv').config();
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const {
	PinataSDK
} = require("pinata-web3");

const pinata = new PinataSDK({
	pinataJwt: process.env.PINATA_JWT, // Make sure you have this JWT configured in your .env file
	pinataGateway: process.env.PINATA_GATEWAY // Make sure you have this PINATA_GATEWAY configured in your .env file and Update this with your actual Pinata Gateway
});

// Initialize the app
const app = express();
const upload = multer({
	dest: 'uploads/'
});

// In-memory array to store uploaded files
let uploadedFiles = [];

//Serve the HTML file
app.use(express.static('public'));

// Upload file route
app.post('/upload', upload.single('file'), async (req, res) => {
	try {

		// If no file is uploaded
		if (!req.file) {
			console.log(new Date(),':: No file uploaded');
			return res.status(400).send({
				message: 'No file uploaded'
			});
		}
		// Get the file path and name
		const filePath = path.join(__dirname, req.file.path);
		const fileName = req.file.originalname;

		// Create a File object from the uploaded file
		const file = new File([fs.readFileSync(filePath)], fileName, {
			type: req.file.mimetype
		});

		// Upload file to Pinata using PinataSDK
		const uploadResponse = await pinata.upload.file(file);
		if (!uploadedFiles.some(file => file.ipfsHash === uploadResponse.IpfsHash)) {
			uploadedFiles.push({
				fileName: fileName,
				ipfsHash: uploadResponse.IpfsHash,
				pinataUrl: `https://${process.env.PINATA_GATEWAY}/ipfs/${uploadResponse.IpfsHash}`,
			});
		}
		if (uploadResponse.isDuplicate) {
			// Send back the IPFS hash (CID) of the uploaded file
			console.log(new Date(),fileName,':: File uploaded to Pinata successfully! But It\'s a duplicate on Pinata’s server')
			res.status(200).send({
				message: 'File uploaded to Pinata successfully! But It\'s a duplicate on Pinata’s server'
			});
		} else {
			// Send back the IPFS hash (CID) of the uploaded file
			console.log(new Date(),fileName,':: File uploaded to Pinata successfully!')
			res.status(200).send({
				message: 'File uploaded to Pinata successfully!',
				ipfsHash: uploadResponse.IpfsHash
			});
		}

		// Remove the file from local storage after successful upload
		fs.unlinkSync(filePath);
	} catch (error) {
		console.error(error);
		res.status(500).send({
			message: 'Error uploading file to Pinata',
			error
		});
	}
});

// Endpoint to fetch uploaded files
app.get('/files', (req, res) => {
	res.status(200).json(uploadedFiles); // Return all uploaded files
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
