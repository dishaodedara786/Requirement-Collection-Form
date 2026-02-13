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
      process.env.WEB_HOOK_URL,
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

const port = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
