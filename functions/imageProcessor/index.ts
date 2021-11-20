
import { S3Event } from 'aws-lambda'

export const imageProcessor = async (event: S3Event ) => {

    console.log('Event received.')
    console.log(event)

    for( const item of event.Records) {
        console.log(item)
    }

}