let PROTO_PATH = __dirname + '/../Protos/model.proto';
let DOMAIN_PROTO_PATH = __dirname + '/../Protos/domain.proto';

let grpc = require('@grpc/grpc-js');
let protoLoader = require('@grpc/proto-loader');
let packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
let modelProto = grpc.loadPackageDefinition(packageDefinition).model;

let domainPackageDefinition = protoLoader.loadSync(
  DOMAIN_PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
let domainProto = grpc.loadPackageDefinition(domainPackageDefinition).domain;

const domainUrlMapping = [
  { id: 1, path: "./asset/source/"},
  { id: 2, path: "./asset/triumph-spitfire-mkiii/source/"},
  { id: 3, path: "./asset/friman-robot/source/"},
  { id: 4, path: "./asset/xbox-360-controller-improvised-game-asset/source/"}
]

function getDomainUrl(call, domainCallback) {
  let modelId = call.request.id;
  console.log("[Domain Server] call.request: ", call.request);
  let target = 'localhost:50051';
  let modelClient = new modelProto.Model(target,
                                       grpc.credentials.createInsecure());

  modelClient.getModelName(
    {id: modelId},
    function (err, response) {
      let domainDetails = domainUrlMapping.find(domain => domain.id === modelId);
      console.log("[Domain Server] response: ", { modelPath: `${domainDetails.path}${response.name}`});
      domainCallback(null, { modelPath: `${domainDetails.path}${response.name}`});
    });
}

function main() {
  let server = new grpc.Server();
  server.addService(domainProto.DomainService.service, {
    getDomainUrl: getDomainUrl
  });
  server.bindAsync('localhost:9091', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log("###### Domain Server started at: 9091 #########");
    testDomainModelConnection();
  });
}

function testDomainModelConnection() {
  let target = 'localhost:50051';
  let modelClient = new modelProto.Model(target,
                                       grpc.credentials.createInsecure());
  const modelId = 1;
  modelClient.getModelName(
    {id: modelId},
    function (err, response) {
      let domainDetails = domainUrlMapping.find(domain => domain.id === modelId);
      console.log("[Domain Server]: ", { modelPath: `${domainDetails.path}${response.name}`});
    });
}

main();
