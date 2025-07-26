import express from "express";
import livereload from "livereload";
import connectLivereload from "connect-livereload";
import open from "open";
import path from "path";
import chokidar from "chokidar";
import fs from "fs";
import { processKalenuxer } from "../prepare/main.js";

export async function startDevServer({ projectRoot, port = 3000 }) {
    const outputDir = path.join(projectRoot, "dist", "release");

    // Initial build
    await processKalenuxer({ projectRoot, outputDir });

    // LiveReload
    const liveReloadServer = livereload.createServer();
    liveReloadServer.watch(outputDir);

    // Express app
    const app = express();
    app.use(connectLivereload());

    // 3. **Serve static files**
    app.use(express.static(outputDir, {
        extensions: ['html'],
    }));

    // 4. **DirectoryIndex: /tr/anasayfa.html (default)**
    app.get("/", (req, res) => {
        const homePage = path.join(outputDir, "tr", "anasayfa.html");
        if (fs.existsSync(homePage)) {
            res.sendFile(homePage);
        } else {
            res.status(404).send("Home page not found");
        }
    });

    // 5. **Rewrite: /something -> /something.html if exists**
    app.get(/^\/(.+)$/, (req, res, next) => {
        const reqPath = req.params[0];

        // Try .html first
        const htmlFile = path.join(outputDir, reqPath + ".html");
        if (fs.existsSync(htmlFile)) {
            return res.sendFile(htmlFile);
        }
        // Try .php (for API or dynamic preview)
        const phpFile = path.join(outputDir, reqPath + ".php");
        if (fs.existsSync(phpFile)) {
            return res.sendFile(phpFile);
        }
        next();
    });

    // 6. **Custom 404**
    app.use((req, res, next) => {
        const notFoundPage = path.join(outputDir, "404.html");
        if (fs.existsSync(notFoundPage)) {
            res.status(404).sendFile(notFoundPage);
        } else {
            res.status(404).send("404 Not Found");
        }
    });

    // 7. **Start server**
    app.listen(port, () => {
        console.log(`\n🔗 Dev server running: http://localhost:${port}/`);
        open(`http://localhost:${port}/`);
    });

    // 8. **Watch sources & rebuild**
    const watchDirs = [
        path.join(projectRoot, "site"),
        path.join(projectRoot, "datas"),
    ];

    // Debounce setup
    let rebuildTimeout = null;
    const DEBOUNCE_MS = 300; // Adjust as needed

    chokidar.watch(watchDirs, { ignoreInitial: true }).on("all", async (event, filePath) => {
        console.log(`[DevServer] ${event}: ${filePath}. Scheduling rebuild...`);
        if (rebuildTimeout) clearTimeout(rebuildTimeout);
        rebuildTimeout = setTimeout(async () => {
            console.log("[DevServer] Rebuilding...");
            await processKalenuxer({ projectRoot, outputDir });
            liveReloadServer.refresh("/");
        }, DEBOUNCE_MS);
    });
}
