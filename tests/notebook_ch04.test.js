const test = require("node:test");
const assert = require("node:assert/strict");
const s = require("../solutions/notebook/ch04_simulation.js");

test("SIM-01 — command order quyết định state", () => { assert.equal(s.simulateRegister(2, [["ADD",3],["MULTIPLY",4],["SET",7]]),7); });
test("SIM-02 — candidate invalid không được commit", () => { assert.deepEqual(s.walkGrid(2,3,[0,0],["U","R","D","R"],new Set(["1,2"])),[1,1]); });
test("SIM-03 — scalar time xử lý wrap âm và format", () => { assert.equal(s.shiftClock("00:10",-20),"59:50"); assert.equal(s.shiftClock("59:59",2),"00:01"); });
test("SIM-04 — collect toàn batch trước khi resolve collision", () => { assert.deepEqual(s.commitUniqueTargets([[0,0],[0,2],[2,2]],[[0,1],[0,1],[1,2]]),[[0,0],[0,2],[1,2]]); });
test("SIM-05 — invalid resource event không mutate stock", () => { const result=s.processInventory([["A",2]],[["TAKE","A",3],["PUT","A",1],["TAKE","A",3]]); assert.equal(result.stock.get("A"),0); assert.deepEqual(result.rejected,[0]); });
