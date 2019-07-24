// 모든 파일들을 이 파일에서 합침
/* api폴더 안에 아주 많은 graphql 파일들이 추가될거고 같은 위치에 resolvers 파일들이 추가될거임 */
import path from "path";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";

const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql"));
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));
// **는 모든 폴더고, *.graphql은 모든 graphql파일이다.
const schema = makeExecutableSchema({
  typeDefs: mergeTypes(allTypes),
  resolvers: mergeResolvers(allResolvers)
});

export default schema;