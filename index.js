import { fileURLToPath } from "url";
import path from "path";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = `${__dirname}/public`;
const app = express();
const port = 3000;

async function delay({ fileName, _for, _if }) {
  const [_, extension] = fileName.split(".");
  if (extension === _if)
    await new Promise((resolve) => setTimeout(resolve, _for));
}

async function serveFile(req, res) {
  let [_, routeSegment, fileName] = req.path.split("/");

  const isPage = routeSegment !== "images";
  fileName ??= "index.html";

  // await delay({ fileName, _for: 1000, _if: "css" });

  const filePath = isPage
    ? `/pages/${routeSegment}/${fileName}`
    : `/images/${fileName}`;

  res.sendFile(publicPath + filePath);
}

app.get("*", serveFile);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
