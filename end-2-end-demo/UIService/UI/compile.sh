#!/bin/bash

echo "******** Compiling and building GRPC protobuf files *********"

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
GRPC_LEARN_PATH=${SCRIPT_DIR%%/end-2-end-demo*}
END_2_END_DEMO_PATH=$GRPC_LEARN_PATH/end-2-end-demo
PROTO_PATH=$END_2_END_DEMO_PATH/Protos
UI_PATH=$END_2_END_DEMO_PATH/UIService/UI/app

protoc -I=$PROTO_PATH $PROTO_PATH/domain.proto \
  --js_out=import_style=commonjs:$UI_PATH/

protoc -I=$PROTO_PATH $PROTO_PATH/domain.proto \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:$UI_PATH/

echo "******** Done *********"
