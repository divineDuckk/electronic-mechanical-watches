pipeline {
    agent any

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Branch to build')
    }

    environment {
        NODEJS_HOME = tool name: 'NodeJS 18', type: 'NodeJS'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
        VERSEL_API_TOKEN = credentials('YVvIclyGAbSpuOG56vAQ9P4C')
        VERSEL_PROJECT_ID = 'prj_V6dX8VrWHndqrvRlobQONFlCcRgt'
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

        stage('Deploy to Vercel') {
            when {
                anyOf {
                    branch 'main'
                    branch 'dev'
                    branch 'qa'
                }
            }
            steps {
                script {
                    def targetEnv
                    if (params.BRANCH_NAME == 'main') {
                        targetEnv = 'production'
                    } else if (params.BRANCH_NAME == 'dev') {
                        targetEnv = 'staging'
                    } else if (params.BRANCH_NAME == 'qa') {
                        targetEnv = 'qa'
                    }

                    echo "Deploying to ${targetEnv} on Vercel"
                    bat """
                        curl -X POST https://api.vercel.com/v12/now/deployments ^
                        -H "Authorization: Bearer ${VERSEL_API_TOKEN}" ^
                        -F "files=@./build" ^
                        -F "name=${VERSEL_PROJECT_ID}" ^
                        -F "target=${targetEnv}"
                    """
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
