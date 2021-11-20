
import { S3Event } from 'aws-lambda'
import { analyzeImage, saveImageStats } from './lib'

export const imageProcessor = async (event: S3Event ) => {

    console.log('Event received.')
    console.log(event)

    try {

        for( const item of event.Records) {
            const result = await analyzeImage(item)
            await saveImageStats(result)
        }
        
    } catch (error) {
        console.error(error)
    }

}