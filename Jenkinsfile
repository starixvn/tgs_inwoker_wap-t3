@Library('global-shared-library') _
def componentArray = [];
def message = "";
pipeline {
	agent any
	environment {
        TAG = sh(script: "echo `date +%Y-%m%d-%H%M`", returnStdout: true).trim()
		GitUrl = "gitlab.com/inwoker/tgs/tgs-web-t13.git"
        Registry = "pgtgs/"
        LobbyName = "lobby-t13"
		ApiKey = "I7nKiimrZQOqnJ6ryjUw74c0Hi64KC6Myunhob4cHh8VOUIuZh4p63czefxyyzbZ"
		Brand = "T13"
		Theme = "wapT13" 
		Template = "13"
		DefaultCurrency = "PHP"
		DefaultLanguage = "en-US"
    }
	
    stages {		    	
        stage('Prepare Env') {
            steps {
                cleanWs()
                checkout scm
                sh "echo 'Branch: ${env.GIT_BRANCH}'";
                script {
                    switch(env.GIT_BRANCH)
                    {
                        case ['master', 'origin/master']:
                            env.kube_ns = "prod";
							env.domain = "t13.srvptt.com";
                            env.k8s_config = 'prod-k8s-config';
                            sh "git config --file=.gitmodules submodule.src/components/Wap.branch master";
                            sh "git config --file=.gitmodules submodule.src/components/App/Account.branch master";
                            sh "git config --file=.gitmodules submodule.src/api-services.branch master";
                            sh "git submodule sync";
                            sh "git submodule update --remote";
                            break;
                        case ['release/current', 'origin/release/current']:
                            env.kube_ns = "staging";
							env.domain = "stg-t13.rpgp.cc";
                            env.k8s_config = 'stag-k8s-config';
                            sh "git config --file=.gitmodules submodule.src/components/Wap.branch release/current";
                            sh "git config --file=.gitmodules submodule.src/components/App/Account.branch release/current";
                            sh "git config --file=.gitmodules submodule.src/api-services.branch develop";
                            sh "git submodule sync";
                            sh "git submodule update --remote";
                            break;
                        default:
                            sh "git config --file=.gitmodules submodule.src/components/Wap.branch develop";
                            sh "git config --file=.gitmodules submodule.src/components/App/Account.branch develop";
                            sh "git config --file=.gitmodules submodule.src/api-services.branch develop";
                            sh "git submodule sync";
                            sh "git submodule update --remote";
                            env.kube_ns = "dev";
							env.domain = "dev-t13.rpgp.cc";
                            env.k8s_config = 'k8s-kube-config' 
                            break;
                    }
                    TAG = env.kube_ns + '-' + TAG
                    message += "\nBranch: ${env.GIT_BRANCH}" 
                    message += "\nTag: ${TAG}"
                    message += "\nEnv: $env.kube_ns"
                    env.commit_url = "${env.GIT_URL}".replace(".git","/-/commit/") + "${env.GIT_COMMIT}"
                    message += "\n Commit: ${env.commit_url}"
                }

                configFileProvider([configFile(fileId: 'tgs.' + env.kube_ns, variable: 'tgsconfig')]) {
                    script {
                        def envItems = readProperties file: "$tgsconfig";
                        envItems.each { key, value -> 
                            env."tgs_${key}" = value;
                        }
                        componentArray = "${env.tgs_lobby_t13_components}".split(",")
                    }
                }

                sh "echo 'env: $env.kube_ns'"
                sh "echo 'tag: ${TAG}'"
            }
        }	
        stage('Docker Build') {   
            steps {	  			    
                sh "docker build -t ${Registry}${LobbyName}:${TAG} ."
            }
        }			
        stage('Docker Push') {   
            steps {	  
                sh "docker push ${Registry}${LobbyName}:${TAG}"
            }
        }
		
		stage('Deploy Template') {
			steps {
				script {
					withKubeConfig([credentialsId: env.k8s_config]) {

						def backendApi= 'operator-api';
			
						message += "name: ${LobbyName} \n" 
						message += "language: ${DefaultLanguage} \n"
						message += "currency: ${DefaultCurrency} \n"
						message += "env: $env.kube_ns \n" 
					   
					
						sh """
							 helm template deployment \
								--set nameOverride=${LobbyName} \
								--set fullnameOverride=${LobbyName} \
								--set .Chart.Name=lobby \
								--set lobbyName=${LobbyName}  \
								--set brand=${Brand}  \
								--set defaultLanguage=${DefaultLanguage}  \
								--set apiKey=${ApiKey}  \
								--set currency=${DefaultCurrency}  \
								--set theme=${Theme} \
								--set template=${Template} \
								--set image.repository=${Registry}${env.LobbyName} \
								--set brandToken=${tgs_gpi_brand_token} \
								--set image.tag=${TAG} \
								--set domain=$env.domain \
								--set namespace=$env.kube_ns --debug
						"""
						
						sh """
							helm template deployment \
								 --set nameOverride=${LobbyName} \
								--set fullnameOverride=${LobbyName} \
								--set .Chart.Name=lobby \
								--set lobbyName=${LobbyName}  \
								--set brand=${Brand}  \
								--set defaultLanguage=${defaultLanguage}  \
								--set apiKey=${ApiKey}   \
								--set currency=${DefaultCurrency}  \
							    --set theme=${Theme} \
								--set template=${Template} \
								--set image.repository=${Registry}${LobbyName} \
								--set brandToken=${tgs_gpi_brand_token} \
								--set image.tag=${TAG} \
								--set domain=$env.domain \
								--set namespace=$env.kube_ns \
								| kubectl -n $env.kube_ns  apply -f - 
						"""
					}				
				}
			}
        }
		
		stage('Deploy') {
            when {
                expression {
                    return env.kube_ns == 'prod';
                }
            }

            steps {
                script {
                    input message: 'Ready to go?', ok: 'yes';
                }
                
                sh "echo start deploy"
            }
        }
        stage('Deployment') {   
            steps {	  
                script {			
                    withKubeConfig([credentialsId: env.k8s_config]) {
                        message += "\nComponent:"

						if (env.tgs_lobby_t13_components!="") {
							for (i = 0;i < componentArray.length; i++) {
								message += "\n    ${componentArray[i]}"
								sh "kubectl set image deployment/${componentArray[i]} ${componentArray[i]}=${Registry}${LobbyName}:${TAG} --record -n $env.kube_ns"
							}
						}
                    }
                }
            }
        }

        // stage('Undo') {
        //     when {
        //         expression {
        //             return env.kube_ns == 'prod';
        //         }
        //     }
        //     steps {
        //         script {
        //             timeout(time: 600, unit: 'SECONDS') {
        //                 input message: 'Ready to Undo?', ok: 'yes';
        //             }
        //         }
                
        //         sh "echo start deploy"
        //     }
        // }
        // stage('Undo Deployment') {   
        //     steps {   
        //         script {            
        //             withKubeConfig([credentialsId: env.k8s_config]) {
        //                 message += "\nComponent:"

        //                 if (env.tgs_lobby_t13_components!="") {
        //                     for (i = 0;i < componentArray.length; i++) {
        //                         message += "\n    ${componentArray[i]}"
        //                         sh "kubectl rollout undo deployment/${componentArray[i]} -n $env.kube_ns"
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }   
    }
    post {
        success {
             sendTelegram("Pipeline: ${currentBuild.fullDisplayName} OK! ${message} \n${currentBuild.getBuildCauses()[0].shortDescription}\n")
        }
        failure {
            sendTelegram("<b>Failed Pipeline:</b> ${currentBuild.fullDisplayName} Something is wrong with ${env.BUILD_URL}/console\n${currentBuild.getBuildCauses()[0].shortDescription}\n")
        }
    }
}
