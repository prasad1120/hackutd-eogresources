import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import React from 'react';
import {
  ClientResponse, processRequest,
  ServerRequest, ServerResponse,
} from './optimization';
import Nav from "./Nav";
import Graph from "./Graphs";
import Raw from "./Raw";

function App() {

  const [request, setRequest] = React.useState<null | ServerRequest>(null);
  const [result, setResult] = React.useState<null | ServerResponse>(null);
  const [response, setResponse] = React.useState<null | ClientResponse>(null);
  const [resultList, setResultList] = React.useState<ServerResponse[]>([]);
  const [currPitVol, setCurrPitVol] = React.useState<number>(0);

  React.useEffect(() => {
    // either connect to our local websocket for the nonlinear optimization version
    // or use their server to demo the greedy approach
    const ws = new WebSocket('ws://localhost:7890');
    // const ws = new WebSocket(`wss://2021-utd-hackathon.azurewebsites.net`);

    ws.addEventListener('open', () => {
      ws.send(JSON.stringify({ setPitCapacity: 100000 }));
    })

    // When the server sends new data, we send how to optimally allocate the water
    ws.addEventListener('message', (message) => {
      if (message.data.startsWith('Error')) {
        window.alert(message.data);
        throw Error(message.data)
      }
      const data = JSON.parse(message.data);
      console.log(data);
      if (data.type === "CURRENT_STATE") {
        const request: ServerRequest = JSON.parse(message.data);
        setRequest(request);
        const response: ClientResponse = processRequest(request, currPitVol);
        setResponse(response);
        ws.send(JSON.stringify(response));
      } else if (data.type === "OPTIMATION_RESULT") {
        const response: ServerResponse = JSON.parse(message.data);
        setResult(response);
        setResultList(oldList => [...oldList, response]);
        setCurrPitVol(response.currentPitVolume === undefined ? 0 : response.currentPitVolume);
      }
    });

    // Oh no! Something unexpected happened.
    ws.addEventListener('error', (event) => {
      throw Error(JSON.stringify(event));
    })

    // cleanup function
    return () => {
      ws.close();
    }
  }, [])

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path="/raw">
            <Raw ServerReq={request!} ServerRes={result!} ClientRes={response!} />
          </Route>
          <Route path="*">
            <Graph resultList={resultList} />
          </Route>
        </Switch>
      </div>
    </Router >
  );
}

export default App;
