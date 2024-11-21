# TensorFlow.js NLP to React Elements Service

This service uses TensorFlow.js and the Universal Sentence Encoder to process natural language input and generate React element specifications.

## Features

- Natural language processing using TensorFlow.js
- Universal Sentence Encoder for text embeddings
- REST API endpoints for processing requests
- Generates React element specifications that can be used with React.createElement
- Containerized service using Docker

## Getting Started

### Prerequisites

- Node.js 18+
- Docker (optional)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the service:
```bash
npm start
```

### Using Docker

1. Build the container:
```bash
docker build -t tf-nlp-service .
```

2. Run the container:
```bash
docker run -p 3000:3000 tf-nlp-service
```

## API Usage

### Process Text to React Element

```bash
POST /process
Content-Type: application/json

{
    "text": "create a blue button with text \"Click me\""
}
```

Response:
```json
{
    "embedding": [...],
    "reactElement": {
        "type": "button",
        "props": {
            "className": "btn",
            "children": "Click me"
        }
    }
}
```

### Health Check

```bash
GET /health
```

Response:
```json
{
    "status": "healthy",
    "modelLoaded": true
}
```

## Example Usage with React

```javascript
const response = await fetch('http://localhost:3000/process', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        text: 'create a blue button with text "Click me"'
    })
});

const data = await response.json();
const element = React.createElement(
    data.reactElement.type,
    data.reactElement.props,
    data.reactElement.props.children
);
```
