import React from 'react';

import {
    ClientResponse,
    ServerRequest, ServerResponse,
} from './optimization';

type RawProps = {
    ServerReq: ServerRequest,
    ServerRes: ServerResponse,
    ClientRes: ClientResponse
};

const Raw = ({ ServerReq, ServerRes, ClientRes }: RawProps) => {

    return (
        <div style={{ paddingTop: 20 }}>
            <div className="container">
                <div>1.) Server Sends Current State of the System:</div>
                <textarea rows={10} cols={150} value={JSON.stringify(ServerReq, undefined, 2)} />
                <div>2.) Client Sends Solution to the Optimization:</div>
                <textarea rows={10} cols={150} value={JSON.stringify(ClientRes, undefined, 2)} />
                <div>3.) Server Sends Result:</div>
                <textarea rows={10} cols={150} value={JSON.stringify(ServerRes, undefined, 2)} />
            </div>
        </div>
    );
}

export default Raw;
