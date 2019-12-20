import express from "express";
import path from "path";
import config from "./config";
import middleware from "./app/middleware";
import appRoutes from "./app/routes";

const app = express();
app.use(express.static(path.join(__dirname, "public")));

middleware(app);
appRoutes(app);

app.listen(config.app.port);
console.log(`Listening on port ${config.app.port} ...`);

export default app;