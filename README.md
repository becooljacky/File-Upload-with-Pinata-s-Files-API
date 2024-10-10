# Pinata File Upload Application

This application allows users to upload files to Pinata. The backend is built with Node.js, and the frontend is a simple HTML form for file uploads.

Pinata is the biggest IPFS provider and has mastered the art of making, uploading, and retrieving files. Their new Files API provides high performance private and public file uploads, along with other features like their global CDN, built in image optimizations, and a first class SDK. Pinata makes uploads easy so you can spend more time building your app!

## Features

- Upload any file type (images, videos, documents, etc.) to Pinata's Server using their API.
- Simple and clean user interface for file uploads.
- Displays a link to the uploaded file on Pinata's CDN for easy access.
- Uses Pinata's CDN to optimize performance for serving files.

## Technologies Used

- **Frontend**: HTML, JavaScript
- **Backend**: Node.js, Express
- **File Handling**: `express-fileupload`
- **IPFS Integration**: Pinata SDK
- **Environment Configuration**: `dotenv`


## Getting Started

Follow the steps below to get the project up and running on your local machine.

### Prerequisites

Make sure you have Node.js v20.12.2 installed on your machine.

- [Download Node.js](https://nodejs.org/)

### Running the Application

1. Clone the repository:

    ```bash
    git clone https://github.com/becooljacky/File-Upload-with-Pinata-s-Files-API.git
    cd pinata-file-upload
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your Pinata API credentials:

    ```bash
    PINATA_JWT=pinata_jwt_token
    PINATA_GATEWAY=pinata_gateway
    ```

4. Run the application:

    ```bash
    node app.js
    ```

5. Open your browser and visit `http://localhost:3000`.

### Usage

- Choose a file to upload using the file input.
- Once the file is uploaded, you'll see a file name, CID and link to view your file on Pinata's CDN.



## Screenshots

![App Screenshot](https://coral-changing-horse-68.mypinata.cloud/ipfs/bafkreigsjcowj3ykctizkrixjii2grn6axwbkyyj4n5eyiiv6cczcnw3ly?text=App+Screenshot+Here)


## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
