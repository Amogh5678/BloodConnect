import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDb from './config/db.js'
import authRoutes from './routes/AuthRoutes.js'
import bloodRequestRoutes from './routes/requestRoutes.js'
import donationRoutes from './routes/donationRoutes.js'
import userProfileRoutes from './routes/userProfile.js'
//import uploadRoutes from './routes/uploadRoutes.js';
import uploadRoutes from "./routes/uploadRoutes.js";




dotenv.config()
connectDb()
const PORT = process.env.PORT || 8000

const app = express()

app.use(express.json())
app.use(cookieParser())

// CORS configuration: allow credentials and set the frontend origin.
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.get('/', (req, res) => {
  res.send("Blood donation running successfully")
})

app.use("/api/auth", authRoutes)
app.use("/api/bloodrequest", bloodRequestRoutes)
app.use("/api/donations", donationRoutes)
app.use("/api/userprofile",userProfileRoutes)
app.use("/uploads", express.static("backend/uploads"));
app.use("/api/upload", uploadRoutes);
// Make sure this path is correct - it should be the absolute path to your uploads folder
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//app.use("/api/upload", uploadRoutes);
// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   try {
//     fs.mkdirSync(uploadsDir, { recursive: true });
//     console.log(`Created uploads directory at ${uploadsDir}`);
//   } catch (err) {
//     console.error(`Failed to create uploads directory: ${err.message}`);
//   }
// }



app.listen(PORT, () => {
  console.log("Server started successfully")
})
