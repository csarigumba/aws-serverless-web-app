COMPOSE_RUN_SAM_NODE = docker-compose run --rm serverless_node_api
COMPOSE_RUN_SAM_NODE_FRONT = docker-compose run --rm serverless_node_front
STAGE=local

.env:
	cp .env.example .env

deps:
	docker-compose pull

install:
	$(COMPOSE_RUN_SAM_NODE) npm install
	$(COMPOSE_RUN_SAM_NODE_FRONT) npm install

install-plugin:
	$(COMPOSE_RUN_SAM_NODE) serverless plugin install -n serverless-iam-roles-per-function
	$(COMPOSE_RUN_SAM_NODE) serverless plugin install -n serverless-dynamodb-local
	$(COMPOSE_RUN_SAM_NODE) serverless plugin install -n serverless-offline

deploy-api:
	$(COMPOSE_RUN_SAM_NODE) serverless deploy --verbose --stage $(STAGE)

build-front:
	$(COMPOSE_RUN_SAM_NODE_FRONT) sh scripts/build.sh $(STAGE)

deploy-front: build-front
	$(COMPOSE_RUN_SAM_NODE_FRONT) serverless deploy --verbose --stage $(STAGE)

remove-api:
	$(COMPOSE_RUN_SAM_NODE) serverless remove --verbose

