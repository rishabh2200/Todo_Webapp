pipeline {
    agent any
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
