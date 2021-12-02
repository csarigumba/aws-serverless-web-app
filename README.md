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

## Deployment

TODO

## Testing

TODO

## Cleanup
