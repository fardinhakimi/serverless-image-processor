#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import { CloudImageProcessorStack } from '../stacks/cloud-image-processor-stack'


if(!process.env.CDK_DEPLOY_ACCOUNT){
  throw new Error('CDK_DEPLOY_ACCOUNT env var must be set')
}


const env = {
  account: process.env.CDK_DEPLOY_ACCOUNT,
  region: process.env.CDK_DEPLOY_REGION || 'eu-west-1'
}

const stage = process.env.CDK_DEPLOY_STAGE || 'dev'

const app = new cdk.App()

new CloudImageProcessorStack(app, 'CloudImageProcessorStack', {
  env,
  stage
})
