function bridgeCrossingTime(bridgeLength, weightLimit, truckWeights) {
  const onBridge = [];
  let head = 0;
  let nextTruck = 0;
  let currentWeight = 0;
  let time = 0;

  while (nextTruck < truckWeights.length || head < onBridge.length) {
    time++;

    if (head < onBridge.length && onBridge[head].exitTime === time) {
      currentWeight -= onBridge[head].weight;
      head++;
    }

    if (
      nextTruck < truckWeights.length &&
      currentWeight + truckWeights[nextTruck] <= weightLimit
    ) {
      const weight = truckWeights[nextTruck++];
      currentWeight += weight;
      onBridge.push({ weight, exitTime: time + bridgeLength });
    }
  }

  return time;
}

module.exports = { bridgeCrossingTime };
