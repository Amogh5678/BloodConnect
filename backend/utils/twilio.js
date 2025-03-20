import twilio from "twilio"
import dotenv from "dotenv"


dotenv.config()

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
)

export const sendSMS = async(to,message)=>{
    try{
        const response = await client.messages.create({
            body : message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to : to,
        })

        console.log("SMS sent successfully:", response.sid);
        return response;
    }
    catch(err)
    {
        console.error("Error sending SMS:", error);
        throw err;
    }

    
}