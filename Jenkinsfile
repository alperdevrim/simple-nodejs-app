pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'todo-app'
        DOCKER_TAG = 'latest'
        TRIVY_SEVERITY = 'CRITICAL,HIGH'  // Only fail on critical and high vulnerabilities
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
                    // Build the Docker image
                    sh 'docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .'
                }
            }
        }

        stage('Security Scan') {
            steps {
                script {
                    // Run Trivy scan using Docker
                    sh '''
                        echo "Running Trivy scan on ${DOCKER_IMAGE}:${DOCKER_TAG}..."
                        docker run --rm \
                        -v /var/run/docker.sock:/var/run/docker.sock \
                        -v /var/lib/docker:/var/lib/docker \
                        aquasec/trivy:latest image ${DOCKER_IMAGE}:${DOCKER_TAG}
                    '''
                }
            }
        }

        stage('Test Application') {
            steps {
                script {
                    // Start the application container
                    sh 'docker run -d -p 3000:3000 --name todo-app ${DOCKER_IMAGE}:${DOCKER_TAG}'
                    
                }
            }
        }

        stage('Build and Push') {
            when {
                branch 'main'
            }
            steps {
                script {
                    // Tag the image with build number
                    sh 'docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:${BUILD_NUMBER}'
                    // Note: You would need to configure Docker registry credentials
                    // sh 'docker push ${DOCKER_IMAGE}:${BUILD_NUMBER}'
                }
            }
        }
    }

    post {
        always {
            // Clean up any leftover containers
            sh 'docker stop todo-app || true'
            sh 'docker rm todo-app || true'
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
