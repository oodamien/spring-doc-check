const fs = require("fs");
const cheerio = require("cheerio");
const got = require("got");

async function getMetas(url) {
  return new Promise((resolve) => {
    const arr = [];
    got(url)
      .then((response) => {
        const $ = cheerio.load(response.body);
        const version = $("meta[name='version']").attr("content");
        resolve({
          version,
        });
      })
      .catch((err) => {
        console.log(err);
        resolve(arr);
      });
  });
}

async function run(documentations) {
  console.log(`Run script`);
  const keys = Object.keys(documentations)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const doc = documentations[key];
    const metas = await getMetas(doc);
    console.log(key, metas);
  }
  console.log(`End script`);
}

run({
  boot: "https://docs.spring.io/spring-boot/",
  security: "https://docs.spring.io/spring-security/reference/",
  dataJpa: "https://docs.spring.io/spring-data/jpa/reference/",
  data: "https://docs.spring.io/spring-data/commons/reference/",
  dataMongodb: "https://docs.spring.io/spring-data/mongodb/reference/",
  dataRedis: "https://docs.spring.io/spring-data/redis/reference/",
  dataLdap: "https://docs.spring.io/spring-data/ldap/reference/",
  dataJdbc: "https://docs.spring.io/spring-data/relational/reference/",
  dataR2dbc: "https://docs.spring.io/spring-data/relational/reference/",
  dataRest: "https://docs.spring.io/spring-data/rest/reference/",
  cloud: "https://docs.spring.io/spring-cloud-release/reference/index.html",
  dataApacheCassandra: "https://docs.spring.io/spring-data/cassandra/reference/",
  authorizationServer: "https://docs.spring.io/spring-authorization-server/reference/",
  session: "https://docs.spring.io/spring-session/reference/",
  graphql: "https://docs.spring.io/spring-graphql/reference/",
  integration: "https://docs.spring.io/spring-integration/reference/",
  modulith: "https://docs.spring.io/spring-modulith/reference/",
  dataCouchbase: "https://docs.spring.io/spring-data/couchbase/reference/",
  dataElastic: "https://docs.spring.io/spring-data/elasticsearch/reference/",
  ai: "https://docs.spring.io/spring-ai/reference/",
  batch: "https://docs.spring.io/spring-batch/reference/",
  cli: "https://docs.spring.io/spring-cli/reference/",
  dataNeo4j: "https://docs.spring.io/spring-data/neo4j/reference/",
  cloudContact: "https://docs.spring.io/spring-cloud-contract/reference/",
  cloudNetflix: "https://docs.spring.io/spring-cloud-netflix/reference/",
  cloudTask: "https://docs.spring.io/spring-cloud-task/reference/",
  cloudStream: "https://docs.spring.io/spring-cloud-stream/reference/",
  cloudFunction: "https://docs.spring.io/spring-cloud-function/reference/",
  shell: "https://docs.spring.io/spring-shell/reference/",
  amqp: "https://docs.spring.io/spring-amqp/reference/",
  apacheKafka: "https://docs.spring.io/spring-kafka/reference/",
  apachePulsar: "https://docs.spring.io/spring-pulsar/reference/",
  vault: "https://docs.spring.io/spring-vault/reference/",
  kerberos: "https://docs.spring.io/spring-security-kerberos/reference/index.html",
  ldap: "https://docs.spring.io/spring-ldap/reference/",
  cloudVault: "https://docs.spring.io/spring-cloud-vault/reference/",
  cloudOpenfeign: "https://docs.spring.io/spring-cloud-openfeign/reference/",
  cloudCommons: "https://docs.spring.io/spring-cloud-commons/reference/",
  cloudZookeeper: "https://docs.spring.io/spring-cloud-zookeeper/reference/",
  cloudConsul: "https://docs.spring.io/spring-cloud-consul/reference/",
  cloudBus: "https://docs.spring.io/spring-cloud-bus/reference/",
  cloudConfig: "https://docs.spring.io/spring-cloud-config/reference/",
  cloudCircuitBreaker: "https://docs.spring.io/spring-cloud-circuitbreaker/reference/",
  cloudKubernetes: "https://docs.spring.io/spring-cloud-kubernetes/reference/",
  cloudGateway: "https://docs.spring.io/spring-cloud-gateway/reference/"
});
