import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import { createProxyMiddleware } from "http-proxy-middleware";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

polka()
  .use(
    `/api`,
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  ) // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware({})
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
