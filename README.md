## AWS Serverless Web Application

TODO

## Architecture

<p align="center">
  <img width=50% src="diagram/diagram.drawio.png">
</p>

1. The client access the website which is hosted by CloudFront which act as a content delivery network (CDN) to provide high performance and quick delivery of assets (HTML pages, JavaScript files, CSS, images, and etc.)
2. The static website is hosted in an S3 bucket. The website can display items dynamically via the JavaScript. In this example, we will be using React framework.
3. The client access the API which is hosted in [API Gateway](https://aws.amazon.com/api-gateway/), technically, the client will not directly access the APIs but only the front-end application. The API Gateway will be protected via an API Key to ensure only the whitelisted parties can access the APIs.
4. The business logic is stored in the Lambda function. We are using Lambda to take advantage of the auto scaling capabilities as well as the convenience of serverless. _I really love Lambda, all you have to do is to take care of the business logics and whatnot!_ 😻
5. For the data store, we will use DynamoDb as our table schema will be simple.

## Prerequitesite

- [Docker](https://docs.docker.com/engine/installation/)
- [Docker-Compose](https://docs.docker.com/compose/install/)
- [Make](https://sourceforge.net/projects/gnuwin32/files/make/3.81/make-3.81-src.zip/download?use_mirror=nchc&download=)

Create `.env` for environment variables and pull the docker image.

```sh
$ make .env deps
```

Provide your AWS credentials in the `.env` file.

```text
AWS_ACCESS_KEY_ID={AWS_ACCESS_KEY_ID}
AWS_SECRET_ACCESS_KEY={AWS_SECRET_ACCESS_KEY}
AWS_DEFAULT_REGION={AWS_DEFAULT_REGION}
```

Pull dependencies

```sh
$ make install install-plugin
```

## Deployment

Run the following command.

API Server

```sh
$ make deploy-api STAGE={STAGE}
```

Stage value can be `local`, `dev`, `stg`, and `prd`.

Frontend

```sh
$ make deploy-front
```

## Testing

### Local Environment Testing (Backend)

**Optional:** Install the following dependency for local testing.

```sh
$ npm i -g serverless serverless-dynamodb-local serverless-offline
```

Install DynamoDb local to the current directory

```sh
$ serverless dynamodb install
```

Start local API

```sh
$ serverless offline start
```

### Frontend

```sh
$ serverless plugin install -n serverless-s3-sync
```

## Cleanup

```sh
$ serverless remove --aws-profile {PROFILE} -r {AWS_REGION} -v
```
