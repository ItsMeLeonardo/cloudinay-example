import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import { uploadImage } from "./cloudianry-config.js";

const inMemoryStorage = multer.memoryStorage();
const upload = multer({ storage: inMemoryStorage }).single("image");

const PORT = 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.post("/upload", upload, async (req, res) => {
  const { file } = req;
  const [data, error] = await uploadImage(file);
  if (error) {
    return res.status(500).json({ error: "error to upload file" });
  }
  return res.json({ url: data });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
