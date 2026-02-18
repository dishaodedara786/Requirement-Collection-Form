import express from "express";
import axios from "axios";
import multer from "multer";

const app = express();

// Multer config (memory storage)
const upload = multer({ storage: multer.memoryStorage() });

app.use(express.static("public"));

// IMPORTANT: remove express.urlencoded/json for this route
// because multer handles multipart

import FormData from "form-data";

app.post("/submit", upload.single("sow_document"), async (req, res) => {
  const form = new FormData();

  // Append all text fields
  Object.keys(req.body).forEach((key) => {
    form.append(key, req.body[key]);
  });

  // Append file
  if (req.file) {
    form.append("sow_document", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });
  }

  try {
    await axios.post(
      "https://n8n.srv875884.hstgr.cloud/webhook-test/quotation-form",
      form,
      {
        headers: form.getHeaders(),
      },
    );

    res.send("Form submitted & webhook triggered!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Webhook failed");
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server running on http://localhost:5000");
});
