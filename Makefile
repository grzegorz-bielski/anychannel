dev-dockerfile = -f docker-compose.staging.yml -f docker-compose.dev.yml
staging-dockerfile = -f docker-compose.staging.yml

.PHONY: k8
k8:
	kubectl create secret generic pgpassword --from-literal PGPASSWORD=$(PGPASSWORD)
	kubectl apply -f kubernetes

.PHONY: dev
dev: 
	skaffold dev --skip-tests