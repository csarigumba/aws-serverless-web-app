COMPOSE_RUN_SAM_NODE = docker-compose run --rm serverless_node
STAGE=local

.env:
	cp .env.example .env

deps:
	docker-compose pull

installxx:
	$(COMPOSE_RUN_SAM_NODE) npm install

install-plugin:
	$(COMPOSE_RUN_SAM_NODE) serverless plugin install -n serverless-iam-roles-per-function
	$(COMPOSE_RUN_SAM_NODE) serverless plugin install -n serverless-dynamodb-local
	$(COMPOSE_RUN_SAM_NODE) serverless plugin install -n serverless-offline

deploy-api:
	$(COMPOSE_RUN_SAM_NODE) serverless deploy --verbose --stage $(STAGE)

remove-api:
	$(COMPOSE_RUN_SAM_NODE) serverless remove --verbose

