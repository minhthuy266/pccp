# Layer B — Variant Adapters

Mỗi dòng là một adapter card. Bốn cột giữa là bốn ô bắt buộc; `Delta before → after` chỉ chứa phần code cần sửa.

## C01 Parsing — Variant matrix

| Card | Priority | Variant | BASE SKELETON | ADD STATE | CHANGE TRANSITION | CHANGE BASE/UPDATE | Delta before → after |
|---|---|---|---|---|---|---|---|
| B01 | P1 | `hh:mm:ss` | C01 | thêm `hh` | parse ba token | multiplier đổi | `mm*60+ss` → `hh*3600+mm*60+ss` |
| B02 | P1 | Base 2–9 decode | C01 | `base`, digit validity | fold từng digit | start `value=0` | `Number(token)` → `value=value*base+digit` |
| B03 | P1 | Base 2–9 encode | C01 | `base`, output digits | lấy remainder rồi reverse | special case zero | format time → loop `n%base`, `Math.floor(n/base)` |
| B04 | P0 | Record tokenization | C01 | parsed object fields | split đúng delimiter một lần | parse tại boundary | parse trong loop → `records=input.map(parse)` |

## C02 Run/chunk — Variant matrix

| Card | Priority | Variant | BASE SKELETON | ADD STATE | CHANGE TRANSITION | CHANGE BASE/UPDATE | Delta before → after |
|---|---|---|---|---|---|---|---|
| B05 | P0 | Run counting | C02 | `runs`/Set đã đóng | tăng khi run kết thúc | base empty input | `visit(...)` → update count/set |
| B06 | P1 | Fixed chunks | C02 | `k` | `end=min(start+k,n)` | `start+=k` | equality scan → fixed boundary |
| B07 | P1 | Bỏ phần dư | C02 | không thêm | giữ fixed chunk | loop base đổi | `start<n` → `start+k<=n` |
| B08 | P1 | Cyclic pattern | C02 | pattern length `m` | expected=`pattern[i%m]` | base index 0 | compare neighbor → modulo index |

## C03 Map/Set — Variant matrix

| Card | Priority | Variant | BASE SKELETON | ADD STATE | CHANGE TRANSITION | CHANGE BASE/UPDATE | Delta before → after |
|---|---|---|---|---|---|---|---|
| B09 | P0 | Membership Set | C03 | `Set` | add/has, không count | không delete theo delta | `Map<key,count>` → `Set<key>` |
| B10 | P0 | Grouping Map | C03 | `Map<key,array>` | push item vào group | init `[]` | `count+1` → `groups.get(k).push(item)` |
| B11 | P0 | Inverse index | C03 | `Map<value,index>` | swap phải update hai mapping | build từ order | một lookup → array + inverse Map |
| B12 | P0 | Per-time collision | C03 | Map mới mỗi timestamp | count vị trí; risk khi count≥2 | reset mỗi batch | global freq → `freq=new Map()` mỗi `t` |
| B13 | P1 | Component contribution dedupe | C03 | `Set` cột component chạm | sau component, cộng size mỗi cột một lần | reset Set mỗi component | cộng mỗi cell → cộng mỗi distinct column |

## C04 Comparator — Variant matrix

| Card | Priority | Variant | BASE SKELETON | ADD STATE | CHANGE TRANSITION | CHANGE BASE/UPDATE | Delta before → after |
|---|---|---|---|---|---|---|---|
| B14 | P0 | Max theo khóa chính | C04 | không thêm | đảo hiệu khóa chính | tie giữ contract | `a.x-b.x` → `b.x-a.x` |
| B15 | P0 | Heap object comparator | C04 | fields heap item | cùng comparator contract | truyền vào Heap | `.sort(compare)` → `new Heap(compare)` |
| B16 | P1 | Largest concatenation | C04 | string form | compare `b+a` với `a+b` | normalize all-zero | numeric compare → `(b+a).localeCompare(a+b)` |
| B17 | P1 | Deterministic original order | C04 | `originalIndex` | thêm khóa cuối | decorate trước sort | no final tie → `return a.index-b.index` |

## C05 Two pointers — Variant matrix

| Card | Priority | Variant | BASE SKELETON | ADD STATE | CHANGE TRANSITION | CHANGE BASE/UPDATE | Delta before → after |
|---|---|---|---|---|---|---|---|
| B18 | P1 | Đếm pair | C05 | `count` | match thì update cả hai | answer `0` | return pair → `count++; left++; right--` |
| B19 | P0 | Extreme greedy pairing | C05 | capacity/count | luôn consume right; consume left nếu fit | sort trước | target equality → `sum<=limit` decision |
| B20 | P1 | Merge hai sorted arrays | C05 | `i,j,out` | lấy phần tử nhỏ hơn | base khi một array hết | inward pointers → forward pointers |
| B21 | P1 | Remove duplicates in-place | C05 | write pointer | đọc khác last written thì write | `write=1` | two ends → read/write pointers |

## C06 Sliding window — Variant matrix

| Card | Priority | Variant | BASE SKELETON | ADD STATE | CHANGE TRANSITION | CHANGE BASE/UPDATE | Delta before → after |
|---|---|---|---|---|---|---|---|
| B22 | P0 | Fixed size | C06 | running aggregate | nếu size>k bỏ left đúng một lần | update khi size=k | `while(invalid)` → `if(right-left+1>k)` |
| B23 | P1 | Positive sum target | C06 | `sum` | shrink khi `sum>target` | positive numbers required | `freq.size>k` → `sum>target` |
| B24 | P0 | At most K distinct | C06 | base freq Map | base transition | base update max | chính C06 |
| B25 | P1 | Cover all types | C06 | `need`, `formed` | shrink khi all covered | update minimum before remove | invalid shrink → valid shrink |
| B26 | P1 | Minimum valid length | C06 | `best=Infinity` | trong while(valid), update rồi shrink | no answer→sentinel | max after shrink → min inside shrink |
| B27 | P2 | Count valid windows | C06 | `answer` | sau shrink, cộng số left hợp lệ | answer 0 | `best=max(...)` → `answer += right-left+1` khi property phù hợp |

## C07 Prefix/difference — Variant matrix

| Card | Priority | Variant | BASE SKELETON | ADD STATE | CHANGE TRANSITION | CHANGE BASE/UPDATE | Delta before → after |
|---|---|---|---|---|---|---|---|
| B28 | P1 | 2D prefix | C07 | matrix `(R+1)x(C+1)` | inclusion-exclusion | top/left zero border | `p[i+1]=...` → four-term recurrence |
| B29 | P1 | 1D range updates | C07 | difference array | `diff[l]+=v; diff[r]-=v` | reconstruct prefix | query prefix → update endpoints |
| B30 | P2 | 2D rectangle updates | C07 | 2D diff | update four corners | prefix twice | two endpoints → four corners |

## C08 Stack — Variant matrix

| Card | Priority | Variant | BASE SKELETON | ADD STATE | CHANGE TRANSITION | CHANGE BASE/UPDATE | Delta before → after |
|---|---|---|---|---|---|---|---|
| B31 | P1 | Bracket matching | C08 | mate Map | opening push; closing pop/check | empty stack | monotonic compare → matching relation |
| B32 | P1 | Adjacent reduction | C08 | cancel predicate | match top thì pop, else push | return reduced stack | resolve indices → reduce prefix |
| B33 | P1 | Next smaller | C08 | không thêm | đảo comparison | same unresolved base | `<` → `>` |
| B34 | P1 | Greedy delete K digits | C08 | remaining deletions `k` | pop while top worse and k>0 | cắt tail nếu k còn | resolve answer index → maintain best digits |

## C09 Simulation — Variant matrix

| Card | Priority | Variant | BASE SKELETON | ADD STATE | CHANGE TRANSITION | CHANGE BASE/UPDATE | Delta before → after |
|---|---|---|---|---|---|---|---|
| B35 | P0 | Command/direction | C09 | `(x,y,dir)` | R/L đổi dir; G/B đổi coordinate | dir initial | generic transition → command switch |
| B36 | P0 | Timeline gaps | C09 | `time`, previous event | apply whole gap before event | start at first time | one command → jump `gap` |
| B37 | P1 | Interval normalization | C09 | scalar endpoints | convert time/string once | closed/half-open contract | compare strings → compare canonical numbers |
| B38 | P0 | Same-time event ties | C09 | event type/order | process types in contract order | sort tie key | no tie → explicit type rank |
| B39 | P0 | Rollback candidate | C09 | candidate copy | validate all microsteps | commit once | mutate state → mutate candidate |
| B40 | P0 | Collision by time | C09 | per-time frequency Map | move all, then aggregate same timestamp | remove finished agents | sequential agents → time batches |
| B41 | P1 | Periodic clock/math event | C09 | absolute seconds/phase | count crossings or formula prefix | endpoints inclusive | command transition → periodic event count |

## C10 Backtracking — Variant matrix

| Card | Priority | Variant | BASE SKELETON | ADD STATE | CHANGE TRANSITION | CHANGE BASE/UPDATE | Delta before → after |
|---|---|---|---|---|---|---|---|
| B42 | P0 | Plus/minus | C10 | `(index,sum)` | two recursive calls ±value | base `index===n` | loop candidates → two branches |
| B43 | P0 | Take/skip | C10 | index, accumulated choice | skip and take | base end/index/target | used array → binary decision |
| B44 | P0 | Combination | C10 | `start`, path | loop `i=start..`; recurse `i+1` | base path size | used array → monotonic start |
| B45 | P0 | Permutation | C10 | used/path | choose any unused; restore | base path size | chính C10 shape |
| B46 | P0 | Assignment | C10 | depth/used/sum/best | candidate per column/depth | maximize at full depth | chính C10 application |
| B47 | P1 | Path search | C10 | position + visited path | choose valid neighbor; restore | goal/no path | candidate list → graph neighbors |
| B48 | P1 | Pruning | C10 | optimistic bound | return nếu không thể hơn best | proof required | before loop → `if(bound<=best)return` |
| B49 | P1 | Multi-agent moves | C10 | positions + visited riêng | enumerate move pairs; reject collision/swap | both at goals | one choice → Cartesian product moves |
| B50 | P1 | Mathematical recursion | C10 | `(level,index)` | đi đúng parent/child duy nhất | pure state stops early | enumerate branches → deterministic descent |
| B51 | P1 | Bounded candidate bases | C10 | candidates 2..9 | filter candidates by all known equations | aggregate unknown outputs | recursive tree → tiny candidate loop |

## C11 BFS — Variant matrix

| Card | Priority | Variant | BASE SKELETON | ADD STATE | CHANGE TRANSITION | CHANGE BASE/UPDATE | Delta before → after |
|---|---|---|---|---|---|---|---|
| B52 | P0 | Shortest path | C11 | base distance | base neighbor enqueue | target return | chính C11 |
| B53 | P0 | Component | C11 | size/id/columns | flood until queue empty | start each unseen cell | target return → component aggregate |
| B54 | P1 | Multi-source | C11 | nhiều starts | enqueue tất cả source distance 0 | base frontier | one start → loop sources |
| B55 | P0 | Expanded state | C11 | extra dimension `mode/resource` | neighbor may change extra state | visited by full state | `dist[r][c]` → `dist[r][c][state]` |
| B56 | P0 | Special power once | C11 | `used∈{0,1}` | normal edge keeps used; special sets 1 | start used=0 | 2D → 3D visited |
| B57 | P1 | Multiple agents | C11 | tuple positions + constraints | generate joint transitions | visited joint state | single coordinate → encoded tuple |
| B58 | P2 | Weighted graph | C11 → Dijkstra lookup | distance + min-heap | relax edge by weight | `Infinity`, stale skip | FIFO enqueue → heap pop minimum distance |

## C12 Binary search — Variant matrix

| Card | Priority | Variant | BASE SKELETON | ADD STATE | CHANGE TRANSITION | CHANGE BASE/UPDATE | Delta before → after |
|---|---|---|---|---|---|---|---|
| B59 | P0 | First true | C12 | none | true→right=mid | return left | chính C12 |
| B60 | P1 | Last true | C12 | upper-mid | true→left=mid | return left | floor-mid → `ceil((l+r)/2)`; false→`r=mid-1` |
| B61 | P0 | Minimum feasible answer | C12 | answer bounds | predicate computes resource/time | high must feasible | first true semantic |
| B62 | P1 | Maximum feasible answer | C12 | bounds | predicate true for small values | low feasible | last true semantic |
| B63 | P0 | Simulation predicate | C12 | local simulation state | reset and simulate for each mid | early stop at limit | `feasible(mid)` lookup → `O(n)` scan |

## C13 Heap — Variant matrix

| Card | Priority | Variant | BASE SKELETON | ADD STATE | CHANGE TRANSITION | CHANGE BASE/UPDATE | Delta before → after |
|---|---|---|---|---|---|---|---|
| B64 | P0 | Min heap | C13 | none | base | base compare | `(a,b)=>a-b` |
| B65 | P0 | Max heap | C13 | none | unchanged push/pop | reverse comparator | `(a,b)=>a-b` → `(a,b)=>b-a` |
| B66 | P0 | Object comparator | C13+C04 | object fields | unchanged heap mechanics | compare keys | numeric compare → multi-key compare |
| B67 | P0 | Repeated pop-transform-push | C13 | iteration/result | pop required items, transform, push outputs | stop/empty contract | one pop → application loop |
| B68 | P1 | Streaming Top K | C13 | heap size K | push; if size>K pop worst | comparator keeps boundary item at root | all items → bounded heap |
| B69 | P0 | Event scheduling | C13+C09 | sorted arrivals, cursor,time | enqueue all arrival≤time; pop priority | idle jump | static heap → event+heap loop |
| B70 | P1 | Multiple resources | C13 | heap of resource available times | pop earliest resource, assign, push new finish | initialize all resources | job heap → resource heap |
| B71 | P2 | Lazy deletion | C13 | authoritative Map/version | discard stale top before use | validate peek/pop | direct pop → `while(stale) pop()` |

## C14 Greedy — Variant matrix

| Card | Priority | Variant | BASE SKELETON | ADD STATE | CHANGE TRANSITION | CHANGE BASE/UPDATE | Delta before → after |
|---|---|---|---|---|---|---|---|
| B72 | P1 | Interval scheduling | C14 | base lastEnd | choose compatible | initial `-Infinity` | chính C14 |
| B73 | P1 | Interval stabbing | C14 | last chosen point | if interval not hit, choose its end | endpoint open/closed | count interval → place point |
| B74 | P0 | Extreme pairing | C14+C05 | left/right/count | heavy always consumed; pair light if fits | sorted weights | interval order → two ends |
| B75 | P1 | Greedy + Top K | C14+C13 | bounded heap | reconsider chosen items | answer aggregate | irrevocable choice → replace worst |
| B76 | P2 | Reconsider past decision | C14+C13 | chosen heap | when violation, remove worst prior choice | proof by exchange | simple scan → scan+heap |

## C15 DP — Variant matrix

| Card | Priority | Variant | BASE SKELETON | ADD STATE | CHANGE TRANSITION | CHANGE BASE/UPDATE | Delta before → after |
|---|---|---|---|---|---|---|---|
| B77 | P1 | 1D DP | C15 | `dp[i]` | depend on prior indices | explicit base states | grid state → one index |
| B78 | P1 | 2D/grid DP | C15 | base table | base transition | base iteration order | chính C15 |
| B79 | P1 | Memoization | C15 | memo key | recurse then cache | base before memo/transition | bottom-up loop → top-down function |
| B80 | P2 | Rolling memory | C15 | previous/current row | overwrite only after dependencies consumed | initialize first row | full table → two rows/one array |
| B81 | P2 | Bitmask DP | C15 | `(mask,last)` | add unused item/edge | base empty mask | coordinate state → subset state |
