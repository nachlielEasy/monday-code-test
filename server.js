const express = require("express");
const next = require("next");
const cors = require("cors");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

(async () => {
  try {
    await app.prepare();
    const server = express();

    // Enable CORS
    server.use(
      cors({
        origin: "https://monday.com",
        credentials: true,
      })
    );

    // Handle Monday.com specific headers
    server.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "https://monday.com");
      res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
      next();
    });

    // Health check endpoint
    server.get("/health", (req, res) => {
      res.status(200).json({ status: "ok" });
    });

    // Monday.com specific endpoints
    server.get("/monday-app", (req, res) => {
      return app.render(req, res, "/monday-app", req.query);
    });

    // API routes
    server.use("/api", (req, res, next) => {
      // Add Monday.com authentication check here if needed
      next();
    });

    // Fallback to default handler
    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
})();
