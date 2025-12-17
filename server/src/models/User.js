import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema ({
    email: { type: String, unique: true, index: true },
    passwordHash: String,
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;