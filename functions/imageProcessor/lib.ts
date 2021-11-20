
import * as AWS from 'aws-sdk'
import { S3EventRecord } from 'aws-lambda'

const documentClient = new AWS.DynamoDB.DocumentClient()
const rekognitionClient = new AWS.Rekognition({
    region: process.env.REGION
})

type AnalyzedObjectResult = {
    object: string
    facesCount: number
    male: number
    female: number
}


export const analyzeImage = async (s3EventRecord: S3EventRecord): Promise<AnalyzedObjectResult>  => {


    console.log(' Analyzing object ', s3EventRecord.s3.object.key)


    const response = await rekognitionClient.detectFaces({
        Image: {
            S3Object: {
                Bucket: s3EventRecord.s3.bucket.name,
                Name: s3EventRecord.s3.object.key
            }
        }
    }).promise()

    console.log(' Rekognition response ')
    console.log(JSON.stringify(response, null, 4))

    const faces = response.FaceDetails?.map( item => item.Gender) ?? []

    return {
        object: s3EventRecord.s3.object.key,
        facesCount: faces.length,
        male: faces.filter( item => item?.Value === 'Male').length,
        female: faces.filter ( item => item?.Value === 'Female').length
    }

}


export const saveImageStats = async (analyzedObjectResult: AnalyzedObjectResult) => {

    if(!process.env.IMAGE_STATS_TABLE) {
        throw new Error('IMAGE_STATS_TABLE env var must be defined')
    }

    const { object, ...rest } = analyzedObjectResult

    console.log('Saving stats to stats-table')
    console.log(analyzedObjectResult)

    return await documentClient.put({
        TableName: process.env.IMAGE_STATS_TABLE,
        Item: {
            id: object,
            data: rest
        }
    }).promise()
}