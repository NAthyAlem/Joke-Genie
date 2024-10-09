import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL2 = "https://v2.jokeapi.dev/joke/Any";
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL2);

    const result = response.data;
    var category;
    var content;
    var delivery;
    switch (result.type) {
      case "single":
        content = result.joke;
        delivery = null;
        category = result.category;
        break;
      case "twopart":
        content = result.setup;
        delivery = result.delivery;
        category = result.category;
        break;
      default:
        break;
    }

    res.render("index.ejs", {
      contentt: content,
      categoryy: category,
      deliveryy: delivery,
    });
  } catch (error) {
    console.log("Failed to load the response : " + error.response.data);
    res.status(500);
  }
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
