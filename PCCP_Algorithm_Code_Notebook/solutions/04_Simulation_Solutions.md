# Lời giải — Chapter 04 Simulation

> Mỗi lời giải ghi event order và commit point. [Quay lại Practice](../chapters/04_simulation/03_Practice_Ladder.md).

## Tầng 1 — Nhận diện

### S04-R01 `[SIM-01]`
- **Signal/pattern:** event tuần tự + first invalid. **State:** balance prefix.
- **Check/update:** candidate=balance+delta; withdrawal candidate<0→return index; else commit.
- **Invariant:** balance đúng valid prefix. **Code:** `function firstInvalidBalance(events){let b=0;for(let i=0;i<events.length;i+=1){const next=b+events[i];if(next<0)return i;b=next;}return-1;}`
- **Dry run:** +3,-5→b3, candidate-2 return1. **Complexity:** O(n). **Bẫy/recall:** validate before commit.

### S04-R02 `[SIM-01]`
- **State:** boolean on; invalid index. **Check:** ON when on or OFF when off invalid. **Update:** toggle state.
- **Invariant:** mode đúng command prefix. **Code:** `function invalidToggle(a){let on=false;for(let i=0;i<a.length;i+=1){if((a[i]==='ON'&&on)||(a[i]==='OFF'&&!on))return i;on=a[i]==='ON';}return-1;}`
- **Dry run:** ON,ON→on true then invalid1. **Complexity:** O(n). **Recall:** event validity depends old state.

### S04-R03 `[SIM-02]`
- **State:** row,col,dir index. **Transition:** turn modulo; F candidate/commit.
- **Invariant:** pose after prefix. **Code:** dùng skeleton đầy đủ: `function pose(cmds){let r=0,c=0,d=0;const ds=[[-1,0],[0,1],[1,0],[0,-1]];for(const x of cmds){if(x==='L')d=(d+3)%4;else if(x==='R')d=(d+1)%4;else{r+=ds[d][0];c+=ds[d][1];}}return[r,c,d];}`
- **Dry run:** R,F→(0,1,E). **Complexity:** O(n). **Bẫy:** left modulo.

### S04-R04 `[SIM-02]`
- **Signal:** commands already absolute deltas → no direction state.
- **State/update:** row,col += delta after validation. **Invariant:** position prefix.
- **Code:** `function applyDeltas(start,deltas){let[r,c]=start;for(const[dr,dc]of deltas){r+=dr;c+=dc;}return[r,c];}`
- **Dry run:** [0,0]+[1,2]→[1,2]. **Complexity:** O(n). **Recall:** do not invent direction.

### S04-R05 `[SIM-03]`
- **State:** scalar seconds. **Transition:** ±10 and clamp. **Invariant:** within duration.
- **Code:** `function playback(duration,pos,cmds){let p=pos;for(const c of cmds)p=c==='NEXT'?Math.min(duration,p+10):Math.max(0,p-10);return p;}`
- **Dry run:** 55 next duration60→60. **Complexity:** O(n). **Recall:** parse/format boundary.

### S04-R06 `[SIM-03/SIM-01]`
- **State:** previousAttackTime/currentHealth. **Transition:** quiet=attack-prev-1; aggregate heal; damage; check death.
- **Invariant:** health immediately after previous attack. **Code:** `function quietTimes(attacks){const out=[];let prev=0;for(const[t]of attacks){out.push(t-prev-1);prev=t;}return out;}`
- **Dry run:** attacks2,9→quiet1,6. **Complexity:** O(n). **Bẫy:** minus1/inclusive event.

### S04-R07 `[SIM-04]`
- **State:** occupied; batch events. **Order:** group time; release all then acquire.
- **Invariant:** after batch occupancy correct. **Code:** `function occupancy(events){const used=new Set();let i=0;while(i<events.length){const t=events[i][0],batch=[];while(i<events.length&&events[i][0]===t)batch.push(events[i++]);for(const[,type,id]of batch)if(type==='RELEASE')used.delete(id);for(const[,type,id]of batch)if(type==='ACQUIRE')used.add(id);}return used;}`
- **Dry run:** release/acquire same id→occupied. **Complexity:** O(n). **Bẫy:** input order within batch.

### S04-R08 `[SIM-04 + MAP-03]`
- **State:** countBy time-position key; collisions count after grouping.
- **Update:** increment; count key once if final count≥2.
- **Invariant:** frequency processed states. **Code:** `function collisions(states){const m=new Map();for(const[t,r,c]of states){const k=t+','+r+','+c;m.set(k,(m.get(k)??0)+1);}let n=0;for(const v of m.values())if(v>=2)n+=1;return n;}`
- **Dry run:** same key twice→one collision. **Complexity:** O(n). **Bẫy:** count pairs/robots instead of cell-time.

### S04-R09 `[SIM-05]`
- **Roles:** simulation time/order; queue FIFO; server availability.
- **State:** finish time + waiting queue. **Invariant:** queue arrived unassigned; server state correct.
- **Full code:** `function queuedServerJobs(jobs){let finish=0;const out=[];for(const[arrival,duration]of jobs){const start=Math.max(arrival,finish);finish=start+duration;out.push(finish);}return out;}`
- **Dry run:** arrival while busy waits. **Complexity:** O(n). **Recall:** label roles, not new template.

### S04-R10 `[SIM-05 + MAP-12 + MAT-03]`
- **State:** Map id→coordinate; matrix validates candidate. **Update:** read entity, candidate, bounds/content, commit Map.
- **Invariant:** every entity position valid after events. **Code:** `function moveEntities(g,initial,events){const p=new Map(initial);for(const[id,dr,dc]of events){const[r,c]=p.get(id),nr=r+dr,nc=c+dc;if(nr>=0&&nr<g.length&&nc>=0&&nc<g[0].length&&g[nr][nc]!=='#')p.set(id,[nr,nc]);}return p;}`
- **Dry run:** wall leaves old coordinate. **Complexity:** O(events). **Bẫy:** mutate shared coordinate array.

### S04-R11 `[SIM-05 + SQ-01]`
- **State:** current + history stack. **Update:** normal op push old then apply; UNDO pop.
- **Invariant:** stack contains restorable prior states. **Code:** `function withUndo(start,ops){let state=start;const history=[];for(const op of ops){if(op==='UNDO'){if(history.length)state=history.pop();}else{history.push(state);state+=op;}}return state;}`
- **Dry run:** +2,+3,UNDO→2. **Complexity:** O(n). **Bẫy:** push after apply stores wrong version.

### S04-R12 `[SIM-04]`
- **Signal:** swap same turn → snapshot intents. **State:** positions old + intents. **Update:** resolve whole batch then commit.
- **Invariant:** no event sees partial batch. **Code:** `function applySimultaneous(positionById,intents){const next=new Map(positionById);for(const[id,target]of intents)next.set(id,target);return next;}`
- **Dry run:** A0,B1 intents A1,B0 commits swap. **Complexity:** O(batch). **Bẫy:** occupancy sequential reject.

## Tầng 2 — Điền khuyết

### S04-F01 `[SIM-01]`
- **State/transition:** finish; `Math.max`, `start`, `push`.
- **Full code:** `function completions(reqs){const out=[];let finish=0;for(const[arrival,duration]of reqs){const start=Math.max(arrival,finish);finish=start+duration;out.push(finish);}return out;}`
- **Dry run:** idle request jumps. **Complexity:** O(n). **Recall:** max handles busy/idle.

### S04-F02 `[SIM-02]`
- **Blanks:** `3,0,1`. **State:** dir,row,col.
- **Full code:** `function leftAndForward(row,col,directionIndex,directions){directionIndex=(directionIndex+3)%4;const nextRow=row+directions[directionIndex][0];const nextCol=col+directions[directionIndex][1];return[nextRow,nextCol,directionIndex];}`
- **Dry run:** North left→West. **Complexity:** O(1). **Bẫy:** direction array convention.

### S04-F03 `[SIM-03]`
- **Blanks:** `60,floor,60`. **Invariant:** scalar representation.
- **Full code:** `function splitTime(minutes,seconds){const total=minutes*60+seconds;return[Math.floor(total/60),total%60];}`
- **Dry run:** 1,70→2,10 if input normalization allowed. **Complexity:** O(1).
- **Bẫy:** parse contract may require seconds<60.

## Tầng 3 — Dựng logic

### S04-L01 `[SIM-01]`
- **State:** stock; invalidIndices. **Candidate/check:** next=stock+delta; next<0→log/no commit; else commit.
- **Invariant:** stock after valid prefix events, log exactly invalid processed.
- **Full code:** `function inventory(initial,events){let stock=initial;const invalid=[];for(let i=0;i<events.length;i+=1){const next=stock+events[i];if(next<0)invalid.push(i);else stock=next;}return{invalidIndices:invalid,stock};}`
- **Dry run:** stock2,[-3,+1]→invalid0, stock3. **Complexity:** O(n). **Bẫy:** invalid must not mutate.

### S04-L02 `[SIM-04]`
- **State:** available resources; grouped batch. **Order:** release phase then acquire phase.
- **Invariant:** acquire sees all same-time releases, no later time.
- **Full code:** `function processResourceEvents(events){const free=new Set();let i=0;while(i<events.length){const t=events[i][0],batch=[];while(i<events.length&&events[i][0]===t)batch.push(events[i++]);for(const[,type,id]of batch)if(type==='RELEASE')free.add(id);for(const[,type,id]of batch)if(type==='ACQUIRE')free.delete(id);}return free;}`
- **Dry run:** release room1 then acquire room1 same time→not free. **Complexity:** O(n). **Bẫy:** semantics of Set must be named.

### S04-L03 `[SIM-05]`
- **State:** availableAt[2], completion output. **Select:** min availability, tie printer id. **Transition:** start max arrival; finish; update selected/output.
- **Invariant:** availabilities and outputs correct job prefix.
- **Full code:** `function twoPrinters(jobs){const a=[0,0],out=[];for(const[arrive,duration]of jobs){const p=a[0]<=a[1]?0:1;const start=Math.max(arrive,a[p]);a[p]=start+duration;out.push([p,a[p]]);}return out;}`
- **Dry run:** both0 tie printer0. **Complexity:** O(n). **Bẫy:** selection by finish after assigning is too late.

## Tầng 4 — Pseudocode

### S04-P01 `[SIM-02]`
- **State:** current position; per command step loop. **Transition:** candidate each step; invalid break inner; valid commit immediately.
- **Invariant:** position includes every valid step before first invalid of current command.
- **Full code:** `function moveSteps(g,start,commands){let[r,c]=start;const d={U:[-1,0],D:[1,0],L:[0,-1],R:[0,1]};for(const[dir,k]of commands)for(let s=0;s<k;s+=1){const nr=r+d[dir][0],nc=c+d[dir][1];if(nr<0||nr>=g.length||nc<0||nc>=g[0].length||g[nr][nc]==='#')break;r=nr;c=nc;}return[r,c];}`
- **Dry run:** step1 valid/step2 wall keeps step1. **Complexity:** attempted steps. **Bẫy:** transaction variant differs.

### S04-P02 `[SIM-03]`
- **State:** seconds; opening bounds. **Rule order:** normalize opening before first command; apply command/clamp; normalize again.
- **Invariant:** after each normalization current outside opening (or at end).
- **Full code:** `function player(duration,pos,openStart,openEnd,cmds){const skip=x=>x>=openStart&&x<=openEnd?openEnd:x;let p=skip(pos);for(const c of cmds){p=c==='NEXT'?Math.min(duration,p+10):Math.max(0,p-10);p=skip(p);}return p;}`
- **Dry run:** start inside jumps before first cmd. **Complexity:** O(n). **Bẫy:** inclusive endpoints.

### S04-P03 `[SIM-04 + MAP-03]`
- **State:** count Map key `time,row,col`; answer after build or threshold crossing 1→2.
- **Invariant:** each key count robots at state; answer counts keys with≥2 once.
- **Full code:** `function collisionCount(paths){const counts=new Map();for(const path of paths)for(const[t,r,c]of path){const key=t+'|'+r+'|'+c;counts.set(key,(counts.get(key)??0)+1);}let answer=0;for(const count of counts.values())if(count>=2)answer+=1;return answer;}`
- **Dry run:** three robots same key still answer+1. **Complexity:** total path states. **Bẫy:** duplicate same robot state contract.

## Tầng 5 — Tự code

### S04-C01 `[SIM-01]`
- **State:** temperature; snapshots. **Candidate/check:** temp+delta within range commit else keep; always push current.
- **Invariant:** temp valid after prefix; output state after each command.
- **Full code:** `function thermostat(start,min,max,deltas){let t=start;const out=[];for(const d of deltas){const next=t+d;if(next>=min&&next<=max)t=next;out.push(t);}return out;}`
- **Dry run:** 5 bounds0..10 deltas+8,-2→5 invalid then3. **Complexity:** O(n). **Bẫy:** omit repeated state on invalid.

### S04-C02 `[SIM-03]`
- **State:** seconds modulo 86400. **Transition:** normalized modulo handles negative `((x%day)+day)%day`.
- **Invariant:** state 0..86399.
- **Full code:**
```js
function clockAfterDeltas(timeText, deltas) {
  const [h, m, s] = timeText.split(":").map(Number);
  const day = 24 * 60 * 60;
  let current = h * 3600 + m * 60 + s;
  for (const delta of deltas) current = ((current + delta) % day + day) % day;
  const hh = String(Math.floor(current / 3600)).padStart(2, "0");
  const mm = String(Math.floor((current % 3600) / 60)).padStart(2, "0");
  const ss = String(current % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}
```
- **Dry run:** 00:00:05 delta-10→23:59:55. **Complexity:** O(n). **Bẫy:** JS negative remainder.

### S04-C03 `[SIM-04]`
- **State:** currentPrice; winners; batch best candidate.
- **Resolve:** compare bid desc,user asc within batch; commit only if bid>price.
- **Invariant:** after batch price/winners correct through time.
- **Full code:**
```js
function auctionWinners(events, initialPrice = 0) {
  let currentPrice = initialPrice;
  const winners = [];
  let index = 0;
  while (index < events.length) {
    const time = events[index][0];
    let bestUser = null, bestBid = -Infinity;
    while (index < events.length && events[index][0] === time) {
      const [, user, bid] = events[index++];
      if (bid > bestBid || (bid === bestBid && user < bestUser)) { bestBid = bid; bestUser = user; }
    }
    if (bestBid > currentPrice) { currentPrice = bestBid; winners.push([time, bestUser, bestBid]); }
  }
  return winners;
}
```
- **Dry run:** t1 B10,A10→A wins lexicographic; commits if price<10. **Complexity:** O(n). **Bẫy:** `bestUser=null` tie only after first bid; finite bids assumed.

## Tầng 6 — Biến thể

### S04-V01 `[SIM-01]`
- **Change:** stop removed; invalidIndices output added; commit still skipped.
- **Full code:** `function skipInvalid(start,events){let state=start;const invalid=[];for(let i=0;i<events.length;i+=1){const next=state+events[i];if(next<0)invalid.push(i);else state=next;}return{state,invalid};}`
- **Dry run:** invalid then later valid continues. **Complexity:** O(n). **Recall:** check unchanged, stop/return changed.

### S04-V02 `[SIM-03]`
- **Change:** clamp `min/max` → normalized modulo; state domain circular.
- **Full code:** `function wrap(value,delta,size){return((value+delta)%size+size)%size;}`
- **Dry run:** wrap(2,-5,10)=7. **Complexity:** O(1). **Bẫy:** one `%` negative.

### S04-V03 `[SIM-04]`
- **Keep:** collect batch snapshot. **Change resolve:** choose highest priority instead of cancel; commit winner only.
- **Full code:** `function batchPriority(events){const out=[];let i=0;while(i<events.length){const t=events[i][0];let best=events[i];while(i<events.length&&events[i][0]===t){const e=events[i++];if(e[2]>best[2])best=e;}out.push(best);}return out;}`
- **Dry run:** same time priority2/5→5. **Complexity:** O(n). **Bẫy:** tie rule must be explicit.

## Transfer Tests

### S04-T01 `[SIM-01]` — Thang máy
- **Tín hiệu thật:** one server with travel duration dependent on current floor; timestamp is arrival.
- **State:** availableTime,currentFloor. **Transition:** start=max(timestamp,available); finish=start+abs(floor-current); update both; push.
- **Invariant:** state là elevator after request prefix.
- **Full code:** `function elevatorTimes(requests){let time=0,floor=0;const out=[];for(const[arrival,target]of requests){const start=Math.max(arrival,time);time=start+Math.abs(target-floor);floor=target;out.push(time);}return out;}`
- **Dry run:** [0,3] finish3; [1,1] starts3 travel2 finish5. **Complexity:** O(n). **Bẫy:** arrival not duration; current floor update after finish.

### S04-T02 `[SIM-05 + MAP-12]` — Cổng sạc
- **Roles:** simulation bookings; array resources; Map lastCompletionByCar/output.
- **Check:** car previous completion>arrival→invalid no resource mutation. Else select min gate/tie id; start=max(arrival,available); commit gate and car completion.
- **Invariant:** gate times reflect valid sessions; car completion prevents overlap; output valid IDs.
- **Full code:**
```js
function scheduleChargers(gateCount, sessions) {
  const availableAt = Array(gateCount).fill(0);
  const completionByCar = new Map();
  const invalidCarIds = [];
  for (const [arrival, duration, carId] of sessions) {
    if ((completionByCar.get(carId) ?? -Infinity) > arrival) { invalidCarIds.push(carId); continue; }
    let gate = 0;
    for (let g = 1; g < gateCount; g += 1) if (availableAt[g] < availableAt[gate]) gate = g;
    const finish = Math.max(arrival, availableAt[gate]) + duration;
    availableAt[gate] = finish;
    completionByCar.set(carId, finish);
  }
  return { invalidCarIds, completionByCar };
}
```
- **Dry run:** same car arrival before completion invalid and gate unchanged. **Complexity:** O(sessions*gates). **Bẫy:** whether waiting session counts overlap must follow contract; here session interval begins arrival.

## Mini-test S04-M01

### S04-M01.1 `[SIM-01]`
- **State:** counter; statesBeforeReset. **Transition:** ADD/MULTIPLY; RESET logs old then zero.
- **Full code:** `function counterOps(start,ops){let x=start;const before=[];for(const[type,value]of ops){if(type==='ADD')x+=value;else if(type==='MULTIPLY')x*=value;else{before.push(x);x=0;}}return{state:x,beforeReset:before};}`
- **Dry run:** add2/reset logs old. **Complexity:** O(n). **Bẫy:** log before commit reset.

### S04-M01.2 `[SIM-02]`
- **State:** row,col,dir; F wraps with normalized modulo.
- **Full code:** `function torus(rows,cols,start,cmds){let[r,c,d]=start;const ds=[[-1,0],[0,1],[1,0],[0,-1]];for(const x of cmds){if(x==='L')d=(d+3)%4;else if(x==='R')d=(d+1)%4;else{r=(r+ds[d][0]+rows)%rows;c=(c+ds[d][1]+cols)%cols;}}return[r,c,d];}`
- **Dry run:** row0 north wraps rows-1. **Complexity:** O(n). **Bẫy:** add dimension before `%`.

### S04-M01.3 `[SIM-04 + MAP-12]`
- **State:** Map id→value; batch deltaById. **Transition:** collect sums, then for each id clamp old+batchDelta.
- **Invariant:** after time batch state includes all deltas simultaneously grouped per id.
- **Full code:** `function batchedClamp(initial,events){const state=new Map(initial);let i=0;while(i<events.length){const time=events[i][0],deltas=new Map();while(i<events.length&&events[i][0]===time){const[,id,d]=events[i++];deltas.set(id,(deltas.get(id)??0)+d);}for(const[id,d]of deltas)state.set(id,Math.max(0,Math.min(100,(state.get(id)??0)+d)));}return state;}`
- **Dry run:** id old50 deltas+80,-40 same time→net+40 clamp90, not sequential clamp100→60. **Complexity:** O(n). **Bẫy:** clamp each event breaks batch semantics.

## Cách recall

Viết event order bằng lời. Mọi transition có ba pha: read old, compute/resolve candidate, commit. Với time tie, thêm collect batch. Với integration, ghi một trách nhiệm và invariant cho từng cấu trúc.
