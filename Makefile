# Variables
K8S_DIR = ./ops/k8s

# Docker
build-image:
	docker build -t caleb9083/fictional-giggle-web .

start-container:
	docker run -p 3002:3000 --name web-giggle caleb9083/fictional-giggle-web

stop-container:
	docker rm -f web-giggle

#########  
# K8S
#########

# Generate dockerhub credential secret
gen-dockerhub-creds:
	kubectl create secret docker-registry dockerhub-creds --docker-username=<username> --docker-password=<password> --docker-email=<email> --dry-run=client -o yaml -n fic-gig > $(K8S_DIR)/dockerhub-secrets.yml

# Namespace
ns-create:
	kubectl apply -f $(K8S_DIR)/ns.yml
ns-delete:
	kubectl apply -f $(K8S_DIR)/ns.yml

# dockerhub Secret
dockerhub-cred-create:
	kubectl apply -f $(K8S_DIR)/dockerhub-secrets.yml
dockerhub-cred-delete:
	kubectl delete -f $(K8S_DIR)/dockerhub-secrets.yml
