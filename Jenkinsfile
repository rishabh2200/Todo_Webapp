pipeline {
    agent any
    environment {
        TODO_CLOUD_DISTRIBUTION='EYCSK08XSZETG'
        TODO_BUCKET_NAME='dev-s3-bucket-frontend-rishabh2200'
        TODO_URL='dev-loadbalancer-1509350563.us-east-1.elb.amazonaws.com:8000'

    }
    stages {
        stage('test') {
            steps {
                git credentialsId: 'cff5313b-2c9f-4d48-9be4-5b51400e4338', url: 'git@code.jtg.tools:rishabh.bansal/todo-webapp.git'
                sh '''#!/bin/bash
                cd frontend
                npm test -- --watchAll=false
                '''
            }
        }
        stage('Build') {
            steps {
                sh '''#!/bin/bash
                cd frontend
                ./script.sh
                '''
            }
        }
    }
    post {
       // only triggered when blue or green sign
       success {
          slackSend message: 'demo_frontend success'
       }
       // triggered when red sign
       failure {
           slackSend message: 'demo_frontend failure failure'
       }
    }
}
