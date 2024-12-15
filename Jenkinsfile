pipeline {
    agent any

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Branch to build')
    }

  environment {
    NODEJS_HOME = tool name: 'NodeJS 18.15.0', type: 'NodeJS'
    PATH = "${NODEJS_HOME}/bin:${env.PATH}"
}


    stages {
        stage('Checkout') {
            steps {
                git branch: "${params.BRANCH_NAME}", url: 'https://github.com/divineDuckk/electronic-mechanical-watches.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    bat 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    bat 'npm test'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    bat 'npm run build'
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline successfully completed"
        }

        failure {
            echo "Pipeline failed"
        }
    }
}
