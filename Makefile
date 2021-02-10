build-all: 
	@make build-frontend
	@make build-backend

build-frontend:
	@docker build -t vrlins001/frontend-notes-app -f Dockerfile.frontend .

build-backend:
	@docker build -t vrlins001/backend-notes-app -f Dockerfile.backend .

push-backend:
	@docker push vrlins001/frontend-notes-app:latest

push-frontend:
	@docker push vrlins001/frontend-notes-app:latest

setup-minikube:
	@minikube start
	@minikube addons enable ingress

setup-webapp:
	@kubectl apply -f k8s/backend-notes-app.deployment.yaml
	@kubectl apply -f k8s/backend-notes-app.service.yaml
	@kubectl apply -f k8s/frontend-notes-app.deployment.yaml
	@kubectl apply -f k8s/frontend-notes-app.service.yaml
	@kubectl apply -f k8s/notes-app.ingress.yaml
	@minikube service frontend

delete-webapp:
	@kubectl delete deploy backend-notes-app
	@kubectl delete service backend
	@kubectl delete deploy frontend-notes-app
	@kubectl delete service frontend
	@kubectl delete ingress notes-app-ingress