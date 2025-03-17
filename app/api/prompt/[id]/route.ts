import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { NextRequest } from "@node_modules/next/server";

// GET (read)
export const GET = async (request, { params }) => {
  try {
    
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    } else {
      return new Response(JSON.stringify(prompt), { status: 200 });
    }
  } catch (error) {
    return new Response(`Error fetching prompt ${error}`, { status: 500 });
  }
};

// PATCH (update)
export const PATCH = async (request: NextRequest, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    existingPrompt.save();

    return new Response("Prompt updated successfully", { status: 200 });
  } catch (error) {
    return new Response(`Failed to update prompt ${error}`, { status: 500 });
  }
};

// DELETE (delete)
export const DELETE = async (request: NextRequest, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response(`Failed to delete prompt ${error}`, { status: 500 });
  }
};
