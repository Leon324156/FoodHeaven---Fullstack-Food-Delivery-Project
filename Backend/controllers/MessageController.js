import Message from "../models/MessageModel.js";

const sendMessage = async (req, res) => {
    try {
      const newMessage = new Message({
        senderId: req.body.userId, 
        content: req.body.content,
        title : req.body.title,
        email : req.body.email
      });
      await newMessage.save();
      res.status(200).send({ message: "Message sent successfully" });
    } catch (error) {
      res.status(500).send({ message: "Error sending message", error });
    }
  };

  const ListMessages = async (req, res) => {
    try {
     const Messages = await Message.find({})
     res.json({success:true,data:Messages})
     
    } catch (error) {
     console.log(error);
     res.json({success:false,message:"Error"})
    }
   };

   const Removemessage = async (req, res) => {
    try {
      await Message.findByIdAndDelete(req.body.id)
      res.json({success:true,message:"Message removed successfully"})
    } catch (error) {
      console.log(error)
      res.json({success:false,message:"Error"})
    }
  }


  export { ListMessages, Removemessage, sendMessage };

