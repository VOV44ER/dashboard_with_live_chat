pipeline {

    environment {
        serviceName = "frontend-react"
        registry = "registry.digitalocean.com/k8s-talkbe-cr/"
        registryCredential = 'dockerhub'

        image = ""
    }

    agent any

    stages {
        stage('Build Docker image') {
            steps {
                script {
                    String branchName = sh(
                            script: 'git rev-parse --abbrev-ref HEAD',
                            returnStdout: true).trim()
                    image = serviceName + ":" + branchName
                    sh (script: "docker build -t " + image + " .")
                }
            }
        }
        stage('Publish image to registry') {
            steps {
                script {
                    docker.withRegistry("https://$registry",registryCredential) {
                        sh("docker tag $image $registry$image")
                        sh("docker push $registry$image")
                    }
                }
            }
        }
    }

}