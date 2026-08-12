function minimumSpeedCameras(routes) {
  const sorted = [...routes].sort((a, b) => a[1] - b[1]);
  let cameras = 0;
  let lastCamera = -Infinity;

  for (const [entry, exit] of sorted) {
    if (entry <= lastCamera) continue;
    cameras++;
    lastCamera = exit;
  }

  return cameras;
}

module.exports = { minimumSpeedCameras };
