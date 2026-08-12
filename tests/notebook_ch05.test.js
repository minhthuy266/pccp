const test = require("node:test");
const assert = require("node:assert/strict");
const s = require("../solutions/notebook/ch05_sorting.js");

test("SORT-01 — numeric comparator và không mutate input", () => { const input=[10,2,1]; assert.deepEqual(s.numericSorted(input),[1,2,10]); assert.deepEqual(input,[10,2,1]); assert.deepEqual(s.numericSorted(input,true),[10,2,1]); });
test("SORT-02 — comparator theo score, time rồi id", () => { const input=[{id:"b",score:9,time:2},{id:"c",score:10,time:5},{id:"a",score:9,time:2}]; assert.deepEqual(s.sortRecords(input).map(x=>x.id),["c","a","b"]); });
test("SORT-03 — decoration giữ duplicate original index", () => { assert.deepEqual(s.sortWithOriginalIndex([5,2,5]),[{value:2,index:1},{value:5,index:0},{value:5,index:2}]); });
test("SORT-04 — minimum pair sau sort nằm adjacent", () => { assert.equal(s.minimumAdjacentDifference([8,1,5,3]),2); assert.equal(s.minimumAdjacentDifference([1]),null); });
test("SORT-05 — compression giữ equal rank và relative order", () => { assert.deepEqual(s.compressCoordinates([100,-5,100,7]),[2,0,2,1]); });
