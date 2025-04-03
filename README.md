# Jenkins Practice Project

A simple Node.js project created for practicing Jenkins CI/CD pipelines.

## Project Structure

- `src/index.js` - Main Express.js server
- `src/index.test.js` - Test files
- `Jenkinsfile` - Jenkins pipeline configuration
- `package.json` - Project dependencies and scripts
- `Dockerfile` - Docker configuration

## Features

- Simple Express.js server with two endpoints:
  - `/health` - Health check endpoint
  - `/hello` - Greeting endpoint
- Jest testing setup
- ESLint for code quality
- Jenkins pipeline with multiple stages
- Docker containerization

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the server:
```bash
npm start
```

3. Run tests:
```bash
npm test
```

4. Run linting:
```bash
npm run lint
```

5. Build Docker image:
```bash
docker build -t jenkins-practice:latest .
```

6. Run Docker container:
```bash
docker run -p 3000:3000 jenkins-practice:latest
```

