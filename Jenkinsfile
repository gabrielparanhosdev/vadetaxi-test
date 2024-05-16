pipeline {
    agent any
    
    environment {
        CONTAINER_NAME = 'vadetaxi-container'
    }
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'ssh-id', url: 'https://github.com/gabrielparanhosdev/vadetaxi-test'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("teste-tecnico:latest", ".")
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    sh """
                    if [ \$(docker ps -a -q -f name=${CONTAINER_NAME}) ]; then
                        docker stop ${CONTAINER_NAME} || true
                        docker rm ${CONTAINER_NAME} || true
                    fi
                    """
                    def dockerImage = docker.image("teste-tecnico:latest")
                    dockerImage.run("-d -p 3000:3000 --name ${CONTAINER_NAME}")
                }
            }
        }
    }
}
