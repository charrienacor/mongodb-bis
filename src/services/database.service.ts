// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { Preliminaries?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase () {
    dotenv.config();
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    await db.command({
        "collMod": process.env.PRELIMS_COLLECTION_NAME,
        "validator": {
            $jsonSchema: {
                bsonType: "object",
                required: ["p_semester", "p_studentnumber", "p_schoolyear", "p_course"],
                additionalProperties: false,
                properties: {
                _id: {},
                p_semester: {
                    bsonType: "string",
                    description: "'p_semester' is required and is a string"
                },
                p_studentnumber: {
                    bsonType: "number",
                    description: "'p_studentnumber' is required and is a number"
                },
                p_schoolyear: {
                    bsonType: "string",
                    description: "'p_schoolyear' is required and is a string"
                },
                p_course: {
                    bsonType: "string",
                    description: "'p_course' is required and is a string"
                }
                }
            }
         }
    });
   
    const prelimsCollection: mongoDB.Collection = db.collection(process.env.PRELIMS_COLLECTION_NAME);
 
    collections.Preliminaries = prelimsCollection;
       
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${prelimsCollection.collectionName}`);
 }