dev-dockerfile = -f docker-compose.staging.yml -f docker-compose.dev.yml
staging-dockerfile = -f docker-compose.staging.yml

.PHONY: build-dev
build-dev:
	docker-compose $(dev-dockerfile) build
	$(MAKE) install-local-dependencies

.PHONY: build-staging
build-staging:
	docker-compose $(staging-dockerfile) build

.PHONY: dev
dev:
	docker-compose $(dev-dockerfile) down
	docker-compose $(dev-dockerfile) up 

.PHONY: staging
staging:
	docker-compose $(staging-dockerfile) down
	docker-compose $(staging-dockerfile) up --force-recreate

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