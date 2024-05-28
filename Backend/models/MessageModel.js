import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    senderId: { type: String, required: true },
    content: { type: String, required: true },
    title : { type: String, required: true},
    email: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now }
});

const Message = mongoose.models.message || mongoose.model("message", MessageSchema);

export default Message;
