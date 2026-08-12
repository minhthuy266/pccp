const test = require("node:test");
const assert = require("node:assert/strict");
const x = require("../solutions/notebook/ch90_mixed.js");

test("MX01 — event state rồi ranking tie", () => { const input=[["an",5],["binh",7],["an",2],["chi",7]]; assert.deepEqual(x.liveLeaderboard(input),["an","binh","chi"]); assert.deepEqual(input[0],["an",5]); });
test("MX02 — prefix frequency xử lý số âm và zero target", () => { assert.equal(x.countTargetSubarrays([1,-1,1],1),3); assert.equal(x.countTargetSubarrays([0,0],0),3); });
test("MX03 — first feasible BigInt và goal zero", () => { assert.equal(x.minimumProductionTime([7,10],6),28n); assert.equal(x.minimumProductionTime([9],0),0n); assert.equal(x.minimumProductionTime([9007199254740993n],2n),18014398509481986n); });
test("MX04 — Dijkstra contrast và negative rejection", () => { assert.deepEqual(x.shortestDeliveryCosts(4,[[0,1,10],[0,2,1],[2,1,1]],0),[0,2,1,Infinity]); assert.throws(()=>x.shortestDeliveryCosts(2,[[0,1,-1]],0),RangeError); });
test("MX05 — MST cycle/disconnected", () => { assert.equal(x.minimumCableCost(3,[[0,1,1],[1,2,2],[0,2,10]]),3); assert.equal(x.minimumCableCost(3,[[0,1,1]]),null); });
test("MX06 — closed endpoint và input không mutate", () => { const intervals=[[1,3],[2,4],[5,6]]; assert.equal(x.minimumClosedCheckpoints(intervals),2); assert.equal(x.minimumClosedCheckpoints([[1,2],[2,3]]),1); assert.deepEqual(intervals,[[1,3],[2,4],[5,6]]); });
test("MX07 — DP chống greedy local", () => { assert.equal(x.maximumNonAdjacentReward([2,7,9,3,1]),12); assert.equal(x.maximumNonAdjacentReward([4,5,4]),8); assert.equal(x.maximumNonAdjacentReward([]),0); });
test("MX08 — Euler parallel/lexical/impossible", () => { assert.deepEqual(x.lexicalTicketTrail([["A","B"],["A","B"],["B","A"]],"A"),["A","B","A","B"]); assert.equal(x.lexicalTicketTrail([["A","B"],["X","Y"]],"A"),null); });
