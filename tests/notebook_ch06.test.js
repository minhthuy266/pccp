const test = require("node:test");
const assert = require("node:assert/strict");
const t = require("../solutions/notebook/ch06_two_pointers.js");

test("TP-01 — opposite ends không dùng cùng index", () => { assert.deepEqual(t.pairSumSorted([1,2,4,7],6),[1,2]); assert.equal(t.pairSumSorted([3],6),null); });
test("TP-02 — fast/slow compact mutate đúng prefix", () => { const input=[0,1,0,2]; assert.strictEqual(t.compactInPlace(input,v=>v!==0),input); assert.deepEqual(input,[1,2]); });
test("TP-03 — sorted duplicate compact", () => { const input=[1,1,2,2,2,3]; assert.deepEqual(t.dedupeSortedInPlace(input),[1,2,3]); assert.deepEqual(t.dedupeSortedInPlace([]),[]); });
test("TP-04 — merge giữ duplicate multiplicity và tail", () => { assert.deepEqual(t.mergeSorted([1,2,2],[2,3]),[1,2,2,2,3]); });
test("TP-05 — three sum skip duplicate triplet", () => { assert.deepEqual(t.threeSumUnique([-1,0,1,2,-1,-4]),[[-1,-1,2],[-1,0,1]]); });
test("TP-06 — partition boundary chia đúng predicate", () => { const input=[3,2,5,4,1]; const boundary=t.partitionInPlace(input,v=>v%2===0); assert.equal(input.slice(0,boundary).every(v=>v%2===0),true); assert.equal(input.slice(boundary).every(v=>v%2!==0),true); });
