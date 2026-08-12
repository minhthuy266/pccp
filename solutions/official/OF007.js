function featureDeploymentBatches(progresses, speeds) {
  const finishDays = progresses.map((progress, index) =>
    Math.ceil((100 - progress) / speeds[index]),
  );
  const batches = [];
  let head = 0;

  while (head < finishDays.length) {
    const releaseDay = finishDays[head];
    let size = 0;
    while (head < finishDays.length && finishDays[head] <= releaseDay) {
      head++;
      size++;
    }
    batches.push(size);
  }

  return batches;
}

module.exports = { featureDeploymentBatches };
