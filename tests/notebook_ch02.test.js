const test = require("node:test");
const assert = require("node:assert/strict");
const m = require("../solutions/notebook/ch02_matrix.js");

test("MAT-01 — rectangular row/column totals", () => { assert.deepEqual(m.matrixTotals([[1,2,3],[4,5,6]]), { total:21, rowTotals:[6,15], columnTotals:[5,7,9] }); });
test("MAT-02 — two diagonals giữ center theo từng diagonal", () => { assert.deepEqual(m.diagonalSums([[1,2,3],[4,5,6],[7,8,9]]), { main:15, secondary:15 }); assert.throws(() => m.diagonalSums([[1,2]]), RangeError); });
test("MAT-03 — bounds trước read tại corner", () => { assert.deepEqual(m.orthogonalNeighbors([[0,0,0],[0,0,0]],0,0), [[1,0],[0,1]]); });
test("MAT-04 — rotate 2x3 đổi shape thành 3x2 và không shared row", () => { const out=m.rotateClockwise([[1,2,3],[4,5,6]]); assert.deepEqual(out,[[4,1],[5,2],[6,3]]); out[0][0]=99; assert.equal(out[1][0],5); });
test("MAT-05 — flood fill chỉ vào cùng component bốn hướng", () => { assert.equal(m.componentSize([[1,1,0],[0,1,0],[1,0,0]],0,0),3); });
