pipeline {
    agent any
    
    stages {
        stage('Run tests in release environment') {
            steps {
                script {
                    sh 'npm run test-release' // Ejecutar pruebas específicas para el entorno de liberación
                }
            }
        }
    }
}
