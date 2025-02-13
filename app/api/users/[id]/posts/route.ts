import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
    params: { id: string };
}

// First argument should be a request object
export const GET = async (request: NextRequest, context: RouteContext) =>{
    try {
        await connectToDB();

        const prompts = await Prompt.find({
            creator: context.params.id
        }).populate('creator')

        if (!prompts || prompts.length === 0) {
            return NextResponse.json({ error: "No prompts found" }, { status: 404 });
        }
        
        return NextResponse.json(prompts, { status: 200 });
    } catch (error) {
        console.error("Error fetching prompts", error);        ;
        return NextResponse.json({ message: "Error fetching prompts" }, { status: 500 });
    }

}
