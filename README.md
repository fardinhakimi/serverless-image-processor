
<!-- ABOUT THE PROJECT -->
## Serverless architecture for cloud image processing.

The purpose of this application is to experiment with serverless on AWS using AWS CDK. The focus is not on the correctness of business logic.

### Developed With

This program is developed on top of:

* [NodeJs](https://nodejs.org/en/)
* [Typescript](https://www.typescriptlang.org/)
* [AWS CDK](https://aws.amazon.com/cdk/)
* AWS services ( Lambda, S3, Dynamodb, Rekognition)

### Installation
1. Install [aws cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) on your machine
2. Run aws configure to set up your account
3. Update cdk.json's context with your own account, stage, secretArn and verifiedSender
4. Install dependencies
   ```sh
   npm install
   ```
5. Export below env variables with your information.
   ```JS
   export CDK_DEPLOY_ACCOUNT= '<YOUR_AWS_ACCOUNT>'
   export CDK_DEPLOY_REGION= 'eu-west-1'
   export CDK_DEPLOY_STAGE= 'dev'
   ```
6. Validate if everything works by running
   ```sh
   cdk ls
   ```
7. If this is your first deployment of a cdk stack on your given account run
   ```sh
   cdk bootstrap
   ```
8. To deploy the stack run
   ```sh
   cdk deploy
   ```
9. To destroy the stack on aws run
   ```sh
    npm run destroy
   ```

## Usage

Upload an image from the AWS console to the S3 bucket and find the results written to the Dynamodb table.

## Contact

Fardin Hakimi - fardinhakimi@gmail.com
