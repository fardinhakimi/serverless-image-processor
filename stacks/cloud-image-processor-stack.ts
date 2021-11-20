import * as cdk from '@aws-cdk/core'
import { join } from 'path'
import * as S3 from '@aws-cdk/aws-s3'
import * as nodeJsLambda from '@aws-cdk/aws-lambda-nodejs'
import * as lambdaEventSources from '@aws-cdk/aws-lambda-event-sources'
import { RemovalPolicy } from '@aws-cdk/core'
import { Runtime } from '@aws-cdk/aws-lambda'

export class CloudImageProcessorStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps & { stage: string }) {
    super(scope, id, props)

    const { stage } = props

    const functionsPath = join(__dirname, '..', 'functions')

    // Create a S3 bucket

    const imagesBucket = new S3.Bucket(this, `${stage}-imagesBucket`, {
      bucketName: `${stage}-images-bucket`,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    })


    // Create a Lambda function

    const imageProcessorFunction = new nodeJsLambda.NodejsFunction(this, `${stage}-imageProcessorFunction`, {
      runtime: Runtime.NODEJS_14_X,
      entry: join(functionsPath, 'imageProcessor/index.ts'),
      handler: 'imageProcessor',
    })

    imageProcessorFunction.addEventSource(new lambdaEventSources.S3EventSource(imagesBucket, {
      events: [ S3.EventType.OBJECT_CREATED ]
    }))

  }
}
