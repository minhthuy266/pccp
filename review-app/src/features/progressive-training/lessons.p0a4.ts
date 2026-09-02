import { defineSixLevelLesson } from "./lessonFactory";
import type { ProgressiveLesson, TransferChallenge } from "./types";

const solution = `function farthestNodeCount(n, edges) {
  const graph = Array.from({length:n+1},()=>[]);
  for (const [a,b] of edges) { graph[a].push(b); graph[b].push(a); }
  const distance = Array(n+1).fill(-1), queue=[1];
  let head=0; distance[1]=0;
  while (head < queue.length) {
    const node=queue[head++];
    for (const next of graph[node]) {
      if (distance[next] !== -1) continue;
      distance[next]=distance[node]+1;
      queue.push(next);
    }
  }
  let maximum=0, count=0;
  for (let node=1; node<=n; node++) {
    if (distance[node] > maximum) { maximum=distance[node]; count=1; }
    else if (distance[node] === maximum) count++;
  }
  return count;
}`;
const tests=[
  {label:"official sample",expression:"farthestNodeCount(6,[[3,6],[4,3],[3,2],[1,3],[1,2],[2,4],[5,2]])",expected:"3"},
  {label:"star tie",expression:"farthestNodeCount(4,[[1,2],[1,3],[1,4]])",expected:"3"},
  {label:"chain",expression:"farthestNodeCount(4,[[1,2],[2,3],[3,4]])",expected:"1"},
  {label:"single",expression:"farthestNodeCount(1,[])",expected:"1"},
];
const multi=`function multiSourceGraphDistances(n, edges, sources) {
  const graph=Array.from({length:n+1},()=>[]);
  for (const [a,b] of edges) { graph[a].push(b); graph[b].push(a); }
  const distance=Array(n+1).fill(-1), queue=[];
  for (const source of sources) if (distance[source]===-1) { distance[source]=0; queue.push(source); }
  for (let head=0; head<queue.length; head++) for (const next of graph[queue[head]]) {
    if (distance[next]!==-1) continue;
    distance[next]=distance[queue[head]]+1; queue.push(next);
  }
  return distance.slice(1);
}`;
const shortest=`function shortestGraphDistance(n, edges, start, target) {
  const graph=Array.from({length:n+1},()=>[]);
  for (const [a,b] of edges) { graph[a].push(b); graph[b].push(a); }
  const distance=Array(n+1).fill(-1), queue=[start]; distance[start]=0;
  for (let head=0; head<queue.length; head++) {
    const node=queue[head]; if (node===target) return distance[node];
    for (const next of graph[node]) if (distance[next]===-1) { distance[next]=distance[node]+1; queue.push(next); }
  }
  return -1;
}`;
const challenges:TransferChallenge[]=[
  {kind:"DEBUG",id:"debug-directed-build",title:"Debug chỉ build một hướng",change:"Edge vô hướng phải được thêm vào cả hai adjacency lists.",functionSignature:"farthestNodeCount(n, edges)",starterCode:solution.replace(" graph[b].push(a);"," // missing reverse edge"),solution,tests},
  {kind:"DEBUG",id:"debug-tie-reset",title:"Debug không reset count khi có layer xa hơn",change:"Khi maximum tăng, count của layer cũ phải bị thay bằng 1.",functionSignature:"farthestNodeCount(n, edges)",starterCode:solution.replace("maximum=distance[node]; count=1;","maximum=distance[node]; count++;"),solution,tests},
  {kind:"VARIANT",id:"variant-target-distance",title:"Farthest layer → một target",change:"Dừng khi dequeue target; unreachable trả -1.",functionSignature:"shortestGraphDistance(n, edges, start, target)",starterCode:"function shortestGraphDistance(n, edges, start, target) {\n  // BFS shortest unweighted\n}",solution:shortest,tests:[{label:"shortest",expression:"shortestGraphDistance(4,[[1,2],[2,3],[1,4],[4,3]],1,3)",expected:"2"},{label:"unreachable",expression:"shortestGraphDistance(3,[[1,2]],1,3)",expected:"-1"},{label:"same",expression:"shortestGraphDistance(1,[],1,1)",expected:"0"}]},
  {kind:"VARIANT",id:"variant-multi-source",title:"Một source → nhiều source",change:"Seed và mark mọi source ở distance 0 trong cùng queue.",functionSignature:"multiSourceGraphDistances(n, edges, sources)",starterCode:"function multiSourceGraphDistances(n, edges, sources) {\n  // one queue, dedupe sources\n}",solution:multi,tests:[{label:"nearest source",expression:"multiSourceGraphDistances(5,[[1,2],[2,3],[3,4],[4,5]],[1,5])",expected:"[0,1,2,1,0]"},{label:"dedupe",expression:"multiSourceGraphDistances(2,[[1,2]],[1,1])",expected:"[0,1]"},{label:"isolated",expression:"multiSourceGraphDistances(3,[[1,2]],[1])",expected:"[0,1,-1]"}]},
];

export const p0a4Lessons:ProgressiveLesson[]=[defineSixLevelLesson({
  id:"PT-F12-GRAPH-BFS",familyId:"F12",slug:"unweighted-graph-bfs-layers",title:"BFS graph — layer xa nhất",priority:"P0",basePattern:"Adjacency + queue head + mark on enqueue",description:"Tính shortest distance từ node 1 trên graph vô hướng rồi đếm toàn bộ node ở layer xa nhất.",constraints:["node 1..n","edge vô hướng, unweighted","không dùng Array.shift"],functionSignature:"farthestNodeCount(n, edges)",officialSources:["OF045 — Node xa nhất","PCCP Thinking Curriculum Ch.10"],status:"ACTIVE",version:1,
  pattern:{prompt:"Graph unweighted cần shortest distance từ một source. Engine?",options:[{id:"bfs",label:"BFS theo layer",explanation:"Lần enqueue đầu là shortest distance."},{id:"dfs",label:"DFS",explanation:"Depth đầu tiên không đảm bảo shortest."},{id:"dijkstra",label:"Dijkstra",explanation:"Đúng nhưng thừa heap khi mọi edge cost 1."},{id:"sort",label:"Sort edges",explanation:"Không tạo shortest layers."}],correctOptionId:"bfs"},
  blueprint:[{id:"STATE",label:"STATE",prompt:"State?",canonical:"adjacency, distance[], queue và head",acceptedKeywords:[["adjacency","distance","queue"],["graph","head"]]},{id:"SEED",label:"SEED",prompt:"Seed?",canonical:"distance[1]=0 và enqueue node 1",acceptedKeywords:[["distance","0","1"],["enqueue","1"]]},{id:"GUARD",label:"GUARD",prompt:"Neighbor mới?",canonical:"chỉ khi distance[next] === -1",acceptedKeywords:[["distance","-1"],["unvisited"]]},{id:"TRANSITION",label:"TRANSITION",prompt:"Discover?",canonical:"mark distance trước enqueue bằng distance[node]+1",acceptedKeywords:[["trước","enqueue"],["distance","+1"]]},{id:"INVARIANT",label:"INVARIANT",prompt:"Queue invariant?",canonical:"mọi node enqueue đã có shortest distance cố định",acceptedKeywords:[["enqueue","shortest"],["queue","distance"]]},{id:"COMPLEXITY",label:"COMPLEXITY",prompt:"Complexity?",canonical:"O(n+edges) time và O(n+edges) space",acceptedKeywords:[["n+edges"],["v+e"]]}],
  logic:[{id:"build",text:"Build adjacency hai chiều"},{id:"seed",text:"Seed node 1 và distance 0"},{id:"dequeue",text:"Dequeue bằng head"},{id:"expand",text:"Mark neighbor trước enqueue"},{id:"scan",text:"Scan distance tìm maximum và tie count"},{id:"return",text:"Trả count layer xa nhất"}],
  blocks:[{id:"build",subgoal:"Build graph",code:`function farthestNodeCount(n,edges) {\n const graph=Array.from({length:n+1},()=>[]);\n for (const [a,b] of edges) { graph[a].push(b); graph[b].push(a); }`},{id:"seed",subgoal:"Seed BFS",code:`const distance=Array(n+1).fill(-1), queue=[1];\n let head=0; distance[1]=0;`},{id:"bfs",subgoal:"BFS layers",code:`while (head<queue.length) {\n const node=queue[head++];\n for (const next of graph[node]) {\n  if (distance[next]!==-1) continue;\n  distance[next]=distance[node]+1; queue.push(next);\n }\n}`},{id:"answer",subgoal:"Count farthest",code:`let maximum=0,count=0;\nfor (let node=1;node<=n;node++) {\n if (distance[node]>maximum) { maximum=distance[node]; count=1; }\n else if (distance[node]===maximum) count++;\n}`},{id:"return",subgoal:"Return",code:`return count;\n}`}],solution,tests,challenges
})];
