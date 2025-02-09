import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
        // One to Many relationship `One user can have many prompts`
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required'],
    }
})

// Fetch model that exists on the db or create it if it does not exist

const Prompt = models.Prompt || model('Prompt', PromptSchema);
export default Prompt;