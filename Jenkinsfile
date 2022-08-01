pipeline {
    agent any
    environment {
        TODO_BUCKET_NAME='dev-s3-bucket-frontend-rishabh2299'
        TODO_CLOUD_DISTRIBUTION ='E331PDGKXGL0TN'
        TODO_URL='http://18.209.95.92:8000'
    }
    stages {
        stage('build') {
            steps {
                git credentialsId: 'rishabh2200', url: 'git@code.jtg.tools:rishabh.bansal/todo-webapp.git'
            }
        }
        stage('Test') {
            steps {
                dir("${env.WORKSPACE}/frontend"){
                    sh"""
                    rm -rf node_modules/
                    npm install
                    npm run test -- --coverage --ci --reporters=default  --coverageReporters=cobertura
                    """
                }
            }
        }
        stage('deploy') {
            steps {
                dir("${env.WORKSPACE}/frontend"){
                     withCredentials([[
                        $class: 'AmazonWebServicesCredentialsBinding', 
                        accessKeyVariable: 'AWS_ACCESS_KEY_ID', 
                        secretKeyVariable: 'AWS_SECRET_ACCESS_KEY',
                        credentialsId: 'aws_cred'
                        ]]) {
                                sh """ ./script.sh """
                            }
                }
            }
        }
    }
    post {
       // only triggered when blue or green sign
       success {
          cobertura coberturaReportFile: 'frontend/coverage/cobertura-coverage.xml'
          slackSend message: 'demo_frontend success'
       }
       // triggered when red sign
       failure {
           slackSend message: 'demo_frontend failure failure'
       }
    }
}
