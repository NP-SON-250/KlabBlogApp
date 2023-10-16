import ContactTable from "../modules/contactModel";
import { sendMail } from "../helper/sendEmail"; 

export const createMessage = async (req,res) =>{
    try {
        const { Name, Email, Subject, Message } = req.body;

        const sendMessage = await ContactTable.create({
            Name,
            Email,
            Subject,
            Message,
        });

        const emailTemplate = {
            emailTo: Email,
            subject: Subject,
            message: `<h2>Dear ${Name},</h2> <br/> This is to inform you that we have received your feedback about our service.
            <h4>Thank you so much!!</h4>
            <p>Good luck</p>
            <p>Alexis HAKIZIMANA<p>
            <h5>Trainee at Klab C4</h5><br/>`,
        };

        await sendMail(emailTemplate); // Use await here

        return res.status(200).json({
            status: "200",
            message: "Message Sent",
            data: sendMessage,
        });
    } catch (error) {
        return res.status(500).json({
            status: "500",
            message: "Email Sending Failed",
            error: error.message,
        });
    }
};



// reading all messages

export const readAllMessage = async (req, res) =>{
    try {
        
        const readMessage = await ContactTable.find();
        return res.status(200).json({
            status: "200",
            message: "This is all messages",
            data: readMessage,
        })
    } catch (error) {
        return res.status(500).json({
            status: "500",
            message: "Failed to retreive Message",
            error: error.message,
        });
        
    }
};

// reading message by its id


export const readSingleMessage = async (req, res) =>{
    try {
        const { id } = req.params;
        const readSingle = await ContactTable.findById(id);
        if(!readSingle){
            return res.status(404).json({
                status: "404",
                message: "Message ID Not Found",

            });
        }
        return res.status(200).json({
            status: "200",
            message: "This Is Message Related to Entered ID:",
            data: readSingle,
        });
        
    } catch (error) {
        return res.status(500).json({
            status: "500",
            message: "Failed to Read Message With Entered ID",
            error: error.message,
        });
        
    }
};

// deleting message by only Admin


export const deleteMessage = async (req, res) =>{
    try {
        const { id} = req.params;
    const readid = await ContactTable.findById(id);
    if(!readid){
        return res.status(404).json({
            status: "404",
            message: "Message ID Not Found",
        });

    }
    const deleteDat = await ContactTable.findByIdAndDelete(id);
    return res.status(200).json({
        status: "200",
        message: "Message Deleted Successfully",
        data: deleteDat,
    });
    } catch (error) {
        return res.status(500).json({
            status: "500",
            message: "Failed to delete message",
            error: error.message,
        });
    }

};