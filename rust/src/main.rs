use std::io::prelude::*;
use std::net::TcpStream;
use std::net::TcpListener;
use serde_cbor::value::Value as CBOR;
use serde_json::value::Value as JSON;

fn main() {
    let listener = TcpListener::bind("127.0.0.1:9090").unwrap();

    for stream in listener.incoming() {
        let stream = stream.unwrap();

        handle_connection(stream);
    }
}

fn handle_connection(mut stream: TcpStream) {
    let mut buffer = [0; 4096];

    stream.read(&mut buffer).unwrap();
    let cbor: CBOR = serde_cbor::from_slice(&mut buffer).unwrap();
//    println!("Request: {:?}", String::from_utf8_lossy(&buffer[..]));
    println!("Request: {:?}", cbor);
}
