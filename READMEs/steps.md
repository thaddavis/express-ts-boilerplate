# STEP

-$ npm init -y
-$ npm i express body-parser express express-winston cors
-$ npm i -D @types/express @types/node @types/jest @types/cors nodemon ts-node ts-jest jest

# STEP

-$ npx tsc --init

# STEP

test with `console.log("Hello World");` and add npm scripts

```
    "test": "jest --config ./jest.config.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "nodemon --watch '**/*' --ignore 'node_modules/' -e 'ts' --exec 'ts-node' index.ts"
```

# STEP

-$ touch jest.config.ts

```
module.exports = {
  preset: 'ts-jest',
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  testEnvironment: 'node',
};
```

# STEP

-$ npm build
-$ npm start
-$ npm dev
-$ npm test

# STEP

-$ touch index.ts

```
    import app from "./server";

    const PORT = 4000;

    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    });
```

# STEP

-$ touch server.ts

```
    import express from "express";
    import cors from "cors";
    import winston from "winston";
    import expressWinston from "express-winston";
    import jsonBodyParser from "./middleware/jsonBodyParser";
    import apiRouter from "./api/router";

    const app = express();

    app.use(
        cors({
            origin: "*",
        })
    );

    app.use(express.static("public"));

    app.use(
        expressWinston.logger({
            transports: [new winston.transports.Console()],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.json()
            ),
            meta: false, // optional: control whether you want to log the meta data about the request (default to true)
            msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
            expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
            colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
            ignoreRoute: function (req, res) {
            return false;
            }, // optional: allows to skip some log messages based on request and/or response
        })
    );

    app.use(jsonBodyParser);
    app.use("/api", apiRouter);

    export default app;
```

# STEP

create API routes

1. Health Check
1. Message

# STEP

-$ touch middleware/jsonBodyParser.ts

```
import { json } from 'body-parser';
import * as http from 'http'

export default json({
  inflate: true,
  limit: '100kb',
  type: 'application/json',
  verify: (req: http.IncomingMessage, res: http.ServerResponse, buf: Buffer, encoding: string) => {
    return true;
  },
})
```

# push to git

-$ touch .gitignore
-$ echo /node_modules >> .gitignore
-$ echo /dist >> .gitignore
-$ echo /logs >> .gitignore
