pipeline {
    agent any
    
    environment {
        RELEASE_ENV = 'production'
    }
    
    stages {
        stage('Generate Release Environment') {
            steps {
                script {
                    sh 'export RELEASE_ENV=production'
                }
            }
        }
    }
}

