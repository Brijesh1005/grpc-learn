let PROTO_PATH = __dirname + '/../Protos/model.proto';

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
let model_proto = grpc.loadPackageDefinition(packageDefinition).model;

let modelMappings = [
  { id: 1, name: "330 America.glb" },
  { id: 2, name: "spitfire.glb" },
  { id: 3, name: "Friman.glb" },
  { id: 4, name: "xbox 360 controller.glb" }
]

function getModelName(call, callback) {
  let modelId = call.request.id;
  let modelDetails = modelMappings.find(model => model.id === modelId);
  console.log("[Model Server]: ", {modelDetails})
  callback(null, modelDetails);
}

function main() {
  let server = new grpc.Server();
  server.addService(model_proto.Model.service, {
    getModelName: getModelName
  });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log("###### Model Server started at: 50051 #########");
  });
}

main();
