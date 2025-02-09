import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async ({ params }: { params: { id: string } }) =>{
    try {
        await connectToDB()

        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator')

        if (!prompts || prompts.length === 0) {
            return new Response(JSON.stringify({ error: "No prompts found" }), { status: 404 });
        }
        
        return new Response (JSON.stringify(prompts),{
            status: 200,
            headers: { "Content-Type": "application/json"}
        })
    } catch (error) {
        console.error("Error fetching prompts", error);        ;
        return new Response(JSON.stringify({message:"Error fetching prompts"}),{status:500, headers: { "Content-Type":"application/json"}})
    }

}
