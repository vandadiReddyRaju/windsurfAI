# AI Response Analyzer

A full-stack web application for analyzing AI-generated coding responses using OpenRouter's AI model. The application allows users to upload CSV files containing student questions and bot responses, then provides AI-powered evaluation of the responses.

## Features

- CSV file upload with drag-and-drop functionality
- AI-powered analysis of bot responses
- Modern, responsive UI
- RESTful API endpoints
- Python-based AI evaluation using OpenRouter

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express
- **AI Processing**: Python, OpenRouter AI
- **Other Tools**: Axios, React Dropzone

## Local Setup

### Prerequisites

1. Node.js (v14 or higher)
2. Python (v3.8 or higher)
3. OpenRouter API key (get it from [OpenRouter](https://openrouter.ai/))

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/vandadiReddyRaju/windsurfAI.git
cd windsurfAI
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
```

4. Install Python dependencies:
```bash
cd python
pip install -r requirements.txt
```

5. Create a `.env` file in the root directory:
```env
OPENROUTER_API_KEY="your-api-key-here"
PORT=4005
```

### Running the Application

1. Start the backend server:
```bash
# In the root directory
node server.js
```

2. Start the frontend development server:
```bash
# In the client directory
npm start
```

The application will be available at:
- Frontend: http://localhost:3006
- Backend: http://localhost:4005

## API Documentation

### Analyze Bot Responses

Endpoint for analyzing bot responses from a CSV file.

- **URL**: `/api/analyze`
- **Method**: POST
- **Content-Type**: multipart/form-data

#### Using Postman

1. Open Postman
2. Create a new POST request to `http://localhost:4005/api/analyze`
3. In the request body:
   - Select "form-data"
   - Add a key "file" of type "File"
   - Upload your CSV file

#### CSV File Format

The CSV file should have the following columns:
- Question Details
- Student Code
- Bot Response

Example CSV content:
\`\`\`csv
Question Details,Student Code,Bot Response
"How to write a function?","def hello(): print('Hello')","{detailed bot response}"
\`\`\`

#### Response Format

\`\`\`json
[
  {
    "original_data": {
      "Question Details": "string",
      "Student Code": "string",
      "Bot Response": "string"
    },
    "evaluation": "string with AI evaluation remarks"
  }
]
\`\`\`

### Testing with cURL

```bash
curl -X POST -F "file=@/path/to/your/file.csv" http://localhost:4005/api/analyze
```

## AI Evaluation Criteria

The AI evaluates bot responses based on:
1. Out-of-scope concept usage
2. Unnecessary advanced concept usage
3. Explanation accuracy
4. Code correctness
5. Response relevance

## Environment Variables

- `OPENROUTER_API_KEY`: Your OpenRouter API key
- `PORT`: Backend server port (default: 4005)

## Troubleshooting

1. **Port Already in Use**
   - Change the port in `.env` file
   - Update the proxy in `client/package.json`
   - Update the API endpoint in `client/src/App.js`

2. **Python Dependencies**
   - Make sure to use Python 3.8 or higher
   - Install dependencies using: `pip install -r requirements.txt`

3. **API Key Issues**
   - Ensure your OpenRouter API key is valid
   - Check if the key is correctly set in `.env`

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License
