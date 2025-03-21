import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async () => {
    try {
        // Connect to DB
        await connectToDB()
        const prompts = await Prompt.find({}).populate({path: 'creator', select: 'username'});

        return new Response(JSON.stringify(prompts),{ status: 200 })
    } catch (error) {
        console.log("Error fetching prompts", error);
        return new Response(JSON.stringify({error:"Error fetching prompts"}),{ status: 500 })
    }
    
}