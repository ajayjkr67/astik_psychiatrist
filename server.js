// server.js  
import express from 'express';  
import bodyParser from 'body-parser';  
import fetch from 'node-fetch';  
import dotenv from 'dotenv';  
import cors from 'cors';


dotenv.config();  

const app = express();  
const port = process.env.PORT || 3000;  

app.use(bodyParser.json());  

app.use(cors());
// app.use(cors({ origin: 'http://localhost:5500' }));



app.post('/send-email', async (req, res) => {  
  const { first_name, last_name, email, user_phone, message } = req.body;  
  try {  
    const apiKey = process.env.BREVO_API_KEY;  
    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {  
      method: 'POST',  
      headers: {  
        'api-key': apiKey,  
        'Content-Type': 'application/json',  
      },  
      body: JSON.stringify({  
        sender: {  
          name: "Dr. Astik Mane Clinic",  
          email: "ajayjkr66@gmail.com"  
        },  
        to: [  
          {  
            email: "ajayjkr66@gmail.com",  // or clinic's receiving email  
            name: "Clinic Contact"  
          }  
        ],  
        subject: `New Contact from ${first_name} ${last_name}`,  
        htmlContent: `  
          <h1>New message from website</h1>  
          <p><strong>Name:</strong> ${first_name} ${last_name}</p>  
          <p><strong>Email:</strong> ${email}</p>  
          <p><strong>Phone:</strong> +91 ${user_phone}</p>  
          <p><strong>Message:</strong><br/>${message}</p>  
        `  
      })  
    });  

    if (!brevoRes.ok) {  
      const text = await brevoRes.text();  
      console.error("Brevo error:", text);  
      return res.status(500).json({ error: "Failed to send email" });  
    }  

    const data = await brevoRes.json();  
    res.json({ success: true, data });  
  } catch (err) {  
    console.error(err);  
    res.status(500).json({ error: "Server error" });  
  }  
  console.log("BREVO KEY:", process.env.BREVO_API_KEY ? "LOADED" : "MISSING");

});  

app.listen(port, () => {  
  console.log(`Server running on port ${port}`);  
});  
