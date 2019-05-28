dev-dockerfile = -f docker-compose.staging.yml -f docker-compose.dev.yml
staging-dockerfile = -f docker-compose.staging.yml

.PHONY: build-dev
build-dev:
	docker-compose $(dev-dockerfile) build --parallel

.PHONY: build-staging
build-staging:
	docker-compose $(staging-dockerfile) build --parallel

.PHONY: rebuild-dev
rebuild-dev:
	docker-compose $(dev-dockerfile) build --no-cache --parallel

.PHONY: dev
dev:
	docker-compose $(dev-dockerfile) down
	docker-compose $(dev-dockerfile) up --remove-orphans

.PHONY: staging
staging:
	docker-compose $(staging-dockerfile) down
	docker-compose $(staging-dockerfile) up --remove-orphans --renew-anon-volumes

.PHONY: push
push:
	docker-compose $(staging-dockerfile) build --pull
	docker-compose $(staging-dockerfile) push

.PHONY: reset
reset:
	$(MAKE) stop

.PHONY: stop
stop: 
	docker stop $$(docker ps -aq)

.PHONY: rm
rm: 
	docker rm $$(docker ps -aq)


.PHONY: install-local-dependencies
install-local-dependencies:
	npm --prefix ./backend/ install
	npm --prefix ./frontend/ install