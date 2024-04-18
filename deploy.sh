pipeline {
    agent any
    
    stages {
        stage('Deploy to production') {
            steps {
                script {
                    sh 'git clone https://github.com/anfo270/Aplicaci-n-para-Servicios-de-Desponchadoras-y-Mec-nicos /ruta/de/destino'

                    // Luego de clonar el repositorio, puedes ejecutar cualquier otro comando necesario
                    // para iniciar la aplicación, instalar dependencias, etc.
                    // Por ejemplo:
                    sh 'cd C:\Users\andre\OneDrive\Escritorio\Escuela ing\IDSM41\integradora\ && npm install' 
                    sh 'cd C:\Users\andre\OneDrive\Escritorio\Escuela ing\IDSM41\integradora\ && npm run start'
                }
            }
        }
    }
}
