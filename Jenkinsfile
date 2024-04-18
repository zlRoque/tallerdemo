pipeline {
    agent any
    
    triggers {
        githubPush()
    }
    
    stages {
        stage('Checkout code') {
            steps {
                git branch: 'main', url: 'https://github.com/anfo270/Aplicaci-n-para-Servicios-de-Desponchadoras-y-Mec-nicos.git'
            }
        }
        
        stage('Set up Node.js') {
            steps {
                script {

                    sh 'nvm install 14'
                    sh 'nvm use 14'
                }
            }
        }
        
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run tests') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Build artifact') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to production') {
            when {
                branch 'main' 
            }
            steps {
                script {

                    
                    sh 'sudo systemctl restart tu-servicio'
                    
                    sh 'npm run migrate'
                }
            }
        }
    }
}

