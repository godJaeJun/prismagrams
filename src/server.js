require("dotenv").config();
import {GraphQLServer} from "graphql-yoga";

const PORT = process.env.PORT || 4000;      //.env 의 PORT를 가져온다 만약 없다면 4000번으로 설정
const typeDefs = `
    type Query{
        hello: String!
    }
`;
// graphql 서버 생성 type정의와 resolver들이 필요함
const resolvers = {
    Query:{
        hello : () => "Hi"
    }
}
const server = new GraphQLServer({typeDefs,resolvers});

server.start({port : PORT},()=>console.log(`Server running on port http://localhost:${PORT}`));