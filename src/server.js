require("dotenv").config();
import {GraphQLServer} from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";

const PORT = process.env.PORT || 4000;      //.env 의 PORT를 가져온다 만약 없다면 4000번으로 설정

const server = new GraphQLServer({ schema });

// server.express 라고 하면 express 서버에 접근할 수 있다.
// 미들웨어 추가
server.express.use(logger("dev"));

server.start({ port: PORT }, () =>
    console.log(`✅ Server running on http://localhost:${PORT}`)
);

