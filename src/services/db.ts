import {MongoClient} from "mongodb"

export const connectToDatabase = async (): Promise<MongoClient> => {
    return await MongoClient.connect("mongodb+srv://rade:raderade@mern.sfbppfv.mongodb.net/destinations?retryWrites=true&w=majority");
}