const test = require("node:test");
const assert = require("node:assert/strict");
const h = require("../solutions/notebook/ch11_heap_greedy.js");

test("HG-01 — heap duplicate/min comparator", () => { const q=new h.Heap();[3,1,2,1].forEach(v=>q.push(v));assert.deepEqual([q.pop(),q.pop(),q.pop(),q.pop()],[1,1,2,3]); });
test("HG-02 — bounded heap giữ k largest", () => { assert.deepEqual(h.topKLargest([5,1,4,9,2],2),[9,5]);assert.deepEqual(h.topKLargest([1],0),[]); });
test("HG-03 — chỉ job arrived vào ready heap và jump idle", () => { assert.deepEqual(h.shortestJobOrder([["a",0,5],["b",1,1],["c",10,1]]),["a","b","c"]); });
test("HG-04 — closed touching endpoint vẫn covered", () => { assert.equal(h.minimumClosedStabbingPoints([[1,3],[2,4],[5,6]]),2);assert.equal(h.minimumClosedStabbingPoints([[1,2],[2,3]]),1); });
test("HG-05 — extreme pairing và engine contrast", () => { assert.equal(h.minimumBoats([70,50,80,50],100),3);assert.equal(h.chooseEngine({dynamicPriority:true}),"HEAP");assert.equal(h.chooseEngine({exchangeProof:true}),"GREEDY"); });
