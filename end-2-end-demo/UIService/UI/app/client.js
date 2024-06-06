const { DomainRequest } = require('./domain_pb.js');
const { DomainServiceClient } = require('./domain_grpc_web_pb.js');
const grpc = {};
grpc.web = require('grpc-web');

let domainService = new DomainServiceClient('http://' + window.location.hostname + ':8080', null,
  null);
let selectedIndex = 0;

function getModelPath(id) {
  const modelImages = document.getElementsByClassName("modelImage");
  modelImages[selectedIndex].classList.remove('selected');
  modelImages[id-1].classList.add('selected');
  selectedIndex = id-1;
  const showpiece = document.querySelector("model-viewer#showpiece");
  showpiece.src='';
  
  let unaryDomainRequest = new DomainRequest();
  unaryDomainRequest.setId(id);
  let call = domainService.getDomainUrl(unaryDomainRequest,
    null,
    function (err, response) {
      let modelPath = response.getModelpath();
      const showpiece = document.querySelector("model-viewer#showpiece");
      showpiece.src = modelPath;
    });

  call.on('status', function (status) {
    if (status.metadata) {
      console.log("Received metadata");
      console.log(status.metadata);
    }
  });
};

function getModel(element) {
  const id = parseInt(element.target.name);
  getModelPath(id);
}

function loadModel() {
  const showpiece = document.querySelector("model-viewer#showpiece");
  showpiece.scale = '0.5 0.5 0.5';

  let modelImages = document.getElementsByClassName("modelImage");

  for (let index = 0; index < modelImages.length; index++) {
    modelImages[index].addEventListener('click', getModel);
  }
}

loadModel();