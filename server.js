import express from "express";
import axios from "axios";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.post("/submit", async (req, res) => {
  const formData = req.body;

  try {
    await axios.post(
      "https://n8n.srv875884.hstgr.cloud/webhook-test/n8n-form",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    res.send("Form submitted & webhook triggered!");
  } catch (error) {
    console.error("Webhook error:", error.message);
    res.status(500).send("Webhook failed");
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
