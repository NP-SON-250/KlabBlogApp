import ContactTable from "../modules/contactCorrect";

export const sendContactusMessage = async (req, res) =>{
    try {
        const {Name, Email, Message} = req.body;
        const sendUsermessage =await ContactTable.create({
            Name,
            Email,
            Message,
        });
        return res.status(200).json({
            status:"200",
            message: "Your Message Has Sent",
            data: sendUsermessage,
        });
    } catch (error) {
        return res.status(500).json({
            status: "500",
            message: "Failrd to send message",
            error: error.message,
        });
        
    }
};

// Reading All Messages By admin

export const readAllMessages = async (req, res) =>{
    try {
        const allMessages = await ContactTable.find();
        return res.status(200).json({
            status: "200",
            message: "Here is all Messages",
            data: allMessages,
        });
    } catch (error) {
        return res.status(500).json({
            status:"500",
            message: "Failed to read data",
            error: error.message,
        });
        
    }
};

// Deleting message

export const deleteMessage = async (req, res) =>{
    try {
      const {id} = req.params;
      const findid = await ContactTable.findById(id);
      if(!findid)
      return res.status(404).json({
        statusbar: "404",
        message: "Message Id Not Found",
  });
  const deletefoundid = await ContactTable.findByIdAndDelete(id);
  return res.status(200).json({
    statusbar: "200",
    message: "Message Deleted Successfully",
    data: deletefoundid,
  });
    } catch (error) {
      return res.status(500).json({
        statusbar: "500",
        message: "Error Occured",
        error: error.message,
    
      });
      
    }
  };