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

## Jenkins Pipeline

The project includes a Jenkinsfile that defines a basic CI/CD pipeline with the following stages:
1. Install Dependencies
2. Lint
3. Test
4. Build
5. Docker Build

## Getting Started with Jenkins

1. Make sure you have Jenkins installed and running
2. Create a new pipeline project in Jenkins
3. Configure the pipeline to use the Jenkinsfile from this repository
4. Make sure Docker is installed and configured in your Jenkins environment
5. Run the pipeline to see the CI/CD process in action 