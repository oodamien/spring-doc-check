const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const cheerio = require("cheerio");

const DELAY = 800;
const SITES = {
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
  dataApacheCassandra:
    "https://docs.spring.io/spring-data/cassandra/reference/",
  authorizationServer:
    "https://docs.spring.io/spring-authorization-server/reference/",
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
  kerberos:
    "https://docs.spring.io/spring-security-kerberos/reference/index.html",
  ldap: "https://docs.spring.io/spring-ldap/reference/",
  cloudVault: "https://docs.spring.io/spring-cloud-vault/reference/",
  cloudOpenfeign: "https://docs.spring.io/spring-cloud-openfeign/reference/",
  cloudCommons: "https://docs.spring.io/spring-cloud-commons/reference/",
  cloudZookeeper: "https://docs.spring.io/spring-cloud-zookeeper/reference/",
  cloudConsul: "https://docs.spring.io/spring-cloud-consul/reference/",
  cloudBus: "https://docs.spring.io/spring-cloud-bus/reference/",
  cloudConfig: "https://docs.spring.io/spring-cloud-config/reference/",
  cloudCircuitBreaker:
    "https://docs.spring.io/spring-cloud-circuitbreaker/reference/",
  cloudKubernetes: "https://docs.spring.io/spring-cloud-kubernetes/reference/",
  cloudGateway: "https://docs.spring.io/spring-cloud-gateway/reference/",
};

async function getMetas(url) {
  return new Promise((resolve) => {
    const arr = [];
    fetch(url)
      .then((response) => {
        return response.text();
      })
      .then((response) => {
        const $ = cheerio.load(response);
        const version = $("meta[name='antora-ui-version']").attr("content");
        const label = $(".nav-panel-menu .context .title").text();
        const versionsCount = $(
          "#modal-versions .nav-versions .component.is-current .version"
        ).length;
        const currentVersion = $(".nav-panel-menu .context .version").text();
        const github = $(
          '.sidebar-links a[title~="GitHub"], .sidebar-links a[title~="Github"]'
        ).attr("href");
        // [title~="GitHub"]
        resolve({
          version,
          label,
          versionsCount,
          currentVersion,
          github,
        });
      })
      .catch((err) => {
        console.log(err);
        resolve(arr);
      });
  });
}

async function getLatestRelease(url) {
  return new Promise((resolve) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response[0].tag_name === "latest") {
          resolve(response[1].tag_name);
        }
        resolve(response[0].tag_name);
      })
      .catch((err) => {
        resolve(null);
      });
  });
}

module.exports = {
  entry: "./src/index.tsx",
  output: { path: path.join(__dirname, "build"), filename: "index.bundle.js" },
  mode: process.env.NODE_ENV || "development",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    contentBase: path.join(__dirname, "src"),
    historyApiFallback: true,
    before: function (app, server, compiler) {
      app.get("/api/list", async function (req, res) {
        const keys = Object.keys(SITES);
        const result = [];
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          const doc = SITES[key];
          const metas = await getMetas(doc);
          result.push({ key, url: doc, metas });
        }
        res.json(result);
      });
      app.get("/api/releases", async function (req, res) {
        const result = await getLatestRelease(
          "https://api.github.com/repos/spring-io/antora-ui-spring/releases"
        );
        res.json(result);
      });
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[hash].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
  ],
};
