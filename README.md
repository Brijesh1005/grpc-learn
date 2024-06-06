# grpc-learn
[GRPC](https://grpc.io/) is communication framework written on top of [HTTP/2](https://hpbn.co/http2/). It is a cross-platform open source high performance Remote Procedure Call (RPC) framework. 


It uses HTTP/2 for transport, [Protocol Buffers](https://protobuf.dev/) as the interface description language, and provides features such as authentication, bidirectional streaming and flow control, blocking or nonblocking bindings, and cancellation and timeouts. ([1])

[1]: https://en.wikipedia.org/wiki/GRPC "gRPC wikipedia"

More details on gRPC and HTTP/2 can be found [in this presentation](./docs/gRPC%20Basic.pptx)

This repository contains below demos:
1. **_End 2 end demo_**: Contains the demo for grpc unary communication between frontend and grpc backend via [grpc-web](https://github.com/grpc/grpc-web) and [envoy](https://envoy.com/). Demo also contains inter server unary communication.
* [More details here](./end-2-end-demo/README.md)

2. **_All communication demo_**: This shows all types of inter server commmunications:
    * Unary client to unary server communication
    * Unary client to stream server communication
    * Stream client to unary server communication
    * Stream client to stream server communication
* [More details here](./all-communication-demo/README.md)
