const test = require("node:test");
const assert = require("node:assert/strict");
const m = require("../solutions/notebook/ch03_map_set.js");

test("MAP-01 — membership nhận duplicate kể cả falsy value", () => { assert.equal(m.hasDuplicate([0,1,0]),true); assert.equal(m.hasDuplicate([1,2]),false); });
test("MAP-02 — unique giữ first input order", () => { assert.deepEqual(m.uniquePreserveOrder([3,1,3,2,1]),[3,1,2]); });
test("MAP-03 — frequency giữ multiplicity", () => { assert.deepEqual([...m.frequencyMap(["a","b","a"])],[ ["a",2],["b",1] ]); });
test("MAP-04 — first index không bị overwrite", () => { assert.equal(m.firstIndices(["x","y","x"]).get("x"),0); });
test("MAP-05 — previous index đọc trước update", () => { assert.deepEqual(m.previousIndices(["a","b","a","a"]),[-1,-1,0,2]); });
test("MAP-06 — distance dùng latest occurrence", () => { assert.deepEqual(m.distancesToPrevious(["a","b","a","a"]),[-1,-1,2,1]); });
test("MAP-07 — complement check trước set cấm dùng cùng index", () => { assert.deepEqual(m.twoSumIndices([3,3],6),[0,1]); assert.equal(m.twoSumIndices([3],6),null); });
test("MAP-08 — multiset so multiplicity và xóa zero", () => { assert.equal(m.sameMultiset([1,1,2],[2,1,1]),true); assert.equal(m.sameMultiset([1,2],[1,1]),false); });
test("MAP-09 — group tạo bucket độc lập", () => { const groups=m.groupBy([{g:"a",v:1},{g:"b",v:2},{g:"a",v:3}],x=>x.g); assert.deepEqual(groups.get("a").map(x=>x.v),[1,3]); assert.deepEqual(groups.get("b").map(x=>x.v),[2]); });
test("MAP-10 — key to Set loại duplicate relation", () => { assert.deepEqual([...m.relationMap([["a",1],["a",1],["a",2]]).get("a")],[1,2]); });
test("MAP-11 — argmax áp dụng lexical tie", () => { assert.equal(m.keyWithMaximumValue([["b",4],["a",4],["c",3]]),"a"); });
test("MAP-12 — entity state sống qua event", () => { assert.deepEqual([...m.simulateBalances([["a",5],["b",2],["a",-3]])],[ ["a",2],["b",2] ]); });
test("MAP-13 — window xóa key khi count zero", () => { assert.equal(m.longestAtMostKDistinct([1,2,1,3,4],2),3); assert.equal(m.longestAtMostKDistinct([1],0),0); });
test("MAP-14 — hai Map giữ hai nghĩa state", () => { const state=m.buildStateIndexes([{id:1,group:"x"},{id:2,group:"x"}]); assert.equal(state.byId.get(2).group,"x"); assert.deepEqual([...state.idsByGroup.get("x")],[1,2]); });
