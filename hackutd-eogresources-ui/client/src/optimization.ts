import heap from 'heap';

export interface Point {
  flowPerDay: number,
  dollarsPerDay: number,
}
interface WaterOperation {
  name: string,
  id: string,
  revenueStructure: Point[],
}

export interface ServerRequest {
  flowRateIn: number;
  operations: WaterOperation[];
  type: "CURRENT_STATE";
};

export interface ServerResponse {
  incrementalRevenue: number,
  revenuePerDay: number,
  flowRateIn: number,
  flowRateToOperations: number,
  type: "OPTIMATION_RESULT",
  currentPitVolume?: number,
  maximumPitVolume?: number,
}

export type ClientResponse = {
  operationId: string,
  flowRate: number,
}[];

interface FindMaxStore {
  id: string,
  maxDollarList: number[],
  maxVolList: number[],
}

// loops through the operations list and only pick those pairs of Points
// that will contribute to a positive revenue. 
const buildSearchRange = (operations: WaterOperation[]) => {
  let store = new Map<string, FindMaxStore>();
  operations.forEach(operation => {
    let maxDollarArr: number[] = [];
    let maxFlowArr: number[] = [];

    operation.revenueStructure.forEach(point => {
      if (point.dollarsPerDay > 0) {
        maxDollarArr.push(point.dollarsPerDay);
        maxFlowArr.push(point.flowPerDay);
      }
    });

    let maxStore: FindMaxStore = {
      id: operation.id,
      maxDollarList: maxDollarArr,
      maxVolList: maxFlowArr,
    };

    store.set(operation.id, maxStore);
  });

  return store;
};

interface HeapType {
  id: string,
  dollarVal: number,
  waterVol: number,
}

const buildHeapAndGetMax = (store: Map<string, FindMaxStore>, currLimit: number, visited: Set<string>) => {
  let heapStore = new heap<HeapType>((a, b) => b.dollarVal - a.dollarVal);

  //TODO: currLimit should be used here!!!
  store.forEach((value: FindMaxStore, key: string) => {
    let len = value.maxVolList.length;
    if (!visited.has(key)) {
      while (value.maxVolList[len - 1] > currLimit) {
        value.maxVolList.pop();
        value.maxDollarList.pop();
        len = value.maxVolList.length;
      }
      let newHeapStore: HeapType = {
        id: key,
        dollarVal: value.maxDollarList[len - 1],
        waterVol: value.maxVolList[len - 1],
      };
      heapStore.push(newHeapStore);
    }
  });
  return heapStore.pop();
};

// You should do better!
export function processRequest(request: ServerRequest, currentPitVolume: number): ClientResponse {

  let store = buildSearchRange(request.operations);
  let currLimit = request.flowRateIn + currentPitVolume;
  console.log(request);
  let visited = new Set<string>();
  let clientResList: ClientResponse = [];

  while (currLimit > 10000) {
    let selection: HeapType = buildHeapAndGetMax(store, currLimit, visited);
    if (selection === undefined) {
      continue;
    }
    let clientRes = {
      operationId: selection.id,
      flowRate: selection.waterVol,
    }
    clientResList.push(clientRes);

    console.log(selection);
    visited.add(selection.id);
    currLimit -= selection.waterVol;
  }

  let remaining = new Set<string>();
  request.operations.forEach(operation => {
    if (!visited.has(operation.id)) {
      remaining.add(operation.id);
    }
  });

  const evenDist = currLimit / remaining.keys.length;
  remaining.forEach((val) => {
    let clientRes = {
      operationId: val,
      flowRate: evenDist,
    }
    clientResList.push(clientRes);
  });

  return clientResList;
}