pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'todo-app'
        DOCKER_TAG = 'latest'
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

        stage('Test Application') {
            steps {
                script {
                    // Start the application
                    sh 'docker-compose up -d app'
                    
                    // Wait for the application to be ready
                    sh '''
                        until curl -s http://localhost:3000/health > /dev/null; do
                            echo "Waiting for application to be ready..."
                            sleep 5
                        done
                    '''
                    
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
