const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
require('dotenv').config()

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const httpsOptions = {
    key: fs.readFileSync(process.env.KEY_PATH, 'utf-8'),
    cert: fs.readFileSync(process.env.CERT_PATH, 'utf-8'),
};
app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(process.env.PORT, (err) => {
    if (err) throw err;
    console.log(`> Server started on ${process.env.NEXT_PUBLIC_BASE_URL}`);
  });
});
