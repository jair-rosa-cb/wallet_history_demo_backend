import "dotenv/config";
import middlewares from "./middlewares";
import router from "./routes";
import express from "express";

async function gracefulShutdown() {
    try {
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

let app = express();

app = middlewares(app);
app.use(router);

app.listen(process.env.PORT || 5000, async () => {
    try {
        console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
    } catch (error) {
        await gracefulShutdown();
    }
});

export default app;
