import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { NextRequest } from "@node_modules/next/server";
interface Param {
    id: string
}
export const GET = async (request:NextRequest, { params }) => {
    try {
        // Connect to DB
        await connectToDB()
        const prompts = await Prompt.find({creator:params.id}).populate({path: 'creator', select: 'username'});

        return new Response(JSON.stringify(prompts),{ status: 200 })
    } catch (error) {
        console.log("Error fetching prompts", error);
        return new Response(JSON.stringify({error:"Error fetching prompts"}),{ status: 500 })
    }
    
}