pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'todo-app'
        DOCKER_TAG = 'latest'
        MONGODB_URI = 'mongodb://mongodb:27017/todo-app'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker') {
            steps {
                script {
                    // Build the application image
                    sh 'docker-compose build app'
                }
            }
        }

        stage('Test with MongoDB') {
            steps {
                script {
                    // Start MongoDB and the application
                    sh 'docker-compose up -d mongodb'
                    sh 'sleep 10' // Wait for MongoDB to be ready
                    sh 'docker-compose up -d app'
                    sh 'sleep 5' // Wait for the app to be ready

                    // Test the application
                    sh '''
                        curl -f http://localhost:3000/health || exit 1
                        curl -f http://localhost:3000/api/todos || exit 1
                    '''

                    // Stop the containers
                    sh 'docker-compose down'
                }
            }
        }

        stage('Build and Push') {
            when {
                branch 'main'
            }
            steps {
                script {
                    // Tag and push the image
                    sh 'docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:${BUILD_NUMBER}'
                    // Note: You would need to configure Docker registry credentials
                    // sh 'docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}'
                }
            }
        }
    }

    post {
        always {
            sh 'docker-compose down || true'
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
} 