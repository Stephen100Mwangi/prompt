import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required']

    },
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required'],
        match: [/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/,"Please enter a valid email address (e.g., example@gmail.com)."]
    },
    // password: {
    //     type: String,
    //     required: [true,"Password is required"],
    //     match: [/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must be at least 8 characters long and include at least one letter, one number, and one special character."]
    // },
    image: {
        type: String
    }

})

// To prevent redefining models, first check if a model exists.
// If it exists reuse it.
// If it does not then create it
const User = models.User || model("User",UserSchema);

export default User;