# Variables
K8S_DIR = ./ops/k8s

# Docker
build-image:
	docker build -t caleb9083/fictional-giggle-web .
push-image:
	docker push caleb9083/fictional-giggle-web
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

# web-app
web-create:
	kubectl apply -f $(K8S_DIR)/web.yml
web-delete:
	kubectl delete -f $(K8S_DIR)/web.yml

# Ingress
ingress-create:
	kubectl apply -f $(K8S_DIR)/web-ingress.yml
ingress-delete:
	kubectl delete -f $(K8S_DIR)/web-ingress.yml

# Rollout
rollout:
	kubectl rollout restart deployment/fictional-giggle-web --namespace=fic-gig

# Application
start: ns-create dockerhub-cred-create web-create ingress-create
stop: ingress-delete web-delete dockerhub-cred-delete ns-delete

# Resource Query
pods:
	kubectl get pods
svc:
	kubectl get service
secret:
	kubectl get secret
depl:
	kubectl get deployment
ing:
	kubectl get ingress
all:
	kubectl get all
