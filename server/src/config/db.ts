import { MongoClient, ServerApiVersion } from 'mongodb'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

// Validate required environment variables
const validateEnvVariables = (): void => {
    const requiredVars = ['MONGODB_URI', 'JWT_SECRET', 'PORT']
    const missingVars = requiredVars.filter((varName) => !process.env[varName])

    if (missingVars.length > 0) {
        console.error(`Error: Missing required environment variables: ${missingVars.join(', ')}`)
        console.error('Please check your .env file and ensure all required variables are defined.')
        process.exit(1)
    }
}

// MongoDB Atlas connection string
const uri =
    process.env.MONGODB_URI ||
    'mongodb+srv://alibekniyaz01:EbKzLOQF8PmuXkIw@cluster0.ysa0va2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})

// This function connects to MongoDB Atlas and sets up mongoose to use the connection
const connectDB = async (): Promise<void> => {
    // Validate environment variables before attempting to connect
    validateEnvVariables()

    const maxRetries = parseInt(process.env.MONGODB_RETRY_COUNT || '5', 10)
    const connectionTimeout = parseInt(process.env.MONGODB_CONNECTION_TIMEOUT || '10000', 10)
    const enableLogging = process.env.NODE_ENV !== 'production' || process.env.MONGODB_LOGGING === 'true'

    // Configure mongoose options
    mongoose.set('strictQuery', true)
    if (enableLogging) {
        mongoose.set('debug', true)
        console.log('MongoDB query logging enabled')
    }

    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            // Connect the client to the server
            await client.connect()

            // Send a ping to confirm a successful connection
            await client.db('admin').command({ ping: 1 })
            console.log('Pinged your deployment. You successfully connected to MongoDB Atlas!')

            // Set up mongoose to use the MongoDB Atlas connection
            const mongoURI = process.env.MONGODB_URI as string
            await mongoose.connect(mongoURI, {
                serverSelectionTimeoutMS: connectionTimeout,
                connectTimeoutMS: connectionTimeout,
                socketTimeoutMS: connectionTimeout * 2,
            })

            // Set up mongoose connection event listeners
            mongoose.connection.on('error', (err) => {
                console.error(`MongoDB connection error: ${err}`)
            })

            mongoose.connection.on('disconnected', () => {
                console.warn('MongoDB disconnected. Attempting to reconnect...')
            })

            console.log(`MongoDB Connected to ${mongoURI.split('@').pop()}`)
            return
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Unknown MongoDB connection error'
            console.error(`MongoDB connection attempt ${attempt} failed: ${msg}`)
            if (attempt < maxRetries) {
                console.log(`Retrying connection in ${attempt} seconds...`)
                await delay(1000 * attempt)
            }
        }
    }

    console.error(`Unable to connect to MongoDB after ${maxRetries} attempts. Exiting.`)
    process.exit(1)
}

// Export the MongoDB client and connectDB function
export { client }
export default connectDB
