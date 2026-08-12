const { dijkstra, eulerTrailDirected, kruskalMST } = require("./ch13_advanced_graph.js");

function liveLeaderboard(events) {
  const score = new Map();
  for (const [name, delta] of events) score.set(name, (score.get(name) ?? 0) + delta);
  return [...score].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([name]) => name);
}

function countTargetSubarrays(values, target) {
  const frequency = new Map([[0, 1]]);
  let prefix = 0, answer = 0;
  for (const value of values) {
    prefix += value;
    answer += frequency.get(prefix - target) ?? 0;
    frequency.set(prefix, (frequency.get(prefix) ?? 0) + 1);
  }
  return answer;
}

function minimumProductionTime(times, goal) {
  const machines = times.map(BigInt), required = BigInt(goal);
  if (required <= 0n) return 0n;
  if (!machines.length || machines.some((time) => time <= 0n)) throw new RangeError("Machine times must be positive");
  let low = 0n, high = machines.reduce((best, time) => time < best ? time : best) * required;
  while (low < high) {
    const middle = (low + high) / 2n;
    let produced = 0n;
    for (const time of machines) { produced += middle / time; if (produced >= required) break; }
    if (produced >= required) high = middle; else low = middle + 1n;
  }
  return low;
}

function shortestDeliveryCosts(n, edges, source) {
  const adjacency = Array.from({ length: n }, () => []);
  for (const [from, to, cost] of edges) adjacency[from].push([to, cost]);
  return dijkstra(adjacency, source);
}

function minimumCableCost(n, cables) { return kruskalMST(n, cables); }

function minimumClosedCheckpoints(intervals) {
  const sorted = [...intervals].sort((a, b) => a[1] - b[1]);
  let point = -Infinity, count = 0;
  for (const [start, end] of sorted) if (point < start) { point = end; count++; }
  return count;
}

function maximumNonAdjacentReward(rewards) {
  let skip = 0, take = -Infinity;
  for (const reward of rewards) [skip, take] = [Math.max(skip, take), skip + reward];
  return Math.max(skip, take);
}

function lexicalTicketTrail(tickets, start) { return eulerTrailDirected(tickets, start); }

module.exports = { countTargetSubarrays, lexicalTicketTrail, liveLeaderboard, maximumNonAdjacentReward, minimumCableCost, minimumClosedCheckpoints, minimumProductionTime, shortestDeliveryCosts };
