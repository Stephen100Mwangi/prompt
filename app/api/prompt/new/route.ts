import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";
export const POST = async (req: Request) => {
    const { userId, prompt, tag } = await req.json();

    // Connect to DB
    try {
        await connectToDB();   

        // Check if user exists
        const userExists = await User.findById(userId);
        if (!userExists) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });      
        }
        
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201})
    } catch (error) {
        console.log(error);
        
    }
} 