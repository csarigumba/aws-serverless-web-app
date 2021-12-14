COMPOSE_RUN_SAM_NODE = docker-compose run --rm serverless_node

.env:
	cp .env.example .env

deps:
	docker-compose pull

install:
	$(COMPOSE_RUN_SAM_NODE) npm install

install-plugin:
	$(COMPOSE_RUN_SAM_NODE) serverless plugin install -n serverless-iam-roles-per-function

deploy:
	$(COMPOSE_RUN_SAM_NODE) serverless deploy --verbose

remove:
	$(COMPOSE_RUN_SAM_NODE) serverless remove --verbose
