# Heap và Greedy canonical — `HG-01..05`

[← Chương 11](../../11_Heap_Greedy.md) · [PF06](../../../docs/pccp-700-roadmap/pattern-families/PF06_HEAP_SELECTION_SCHEDULING.md) · [PF09](../../../docs/pccp-700-roadmap/pattern-families/PF09_LINE_GREEDY_PAIRING.md) · [PF10](../../../docs/pccp-700-roadmap/pattern-families/PF10_INTERVAL_GREEDY.md)

## `[HG-01]` — Heap lấy min/max động

### Core, dấu hiệu nhận dạng và brute force bottleneck

Tập candidate thay đổi, mỗi bước cần min/max hiện tại. Brute force sort lại hoặc scan minimum mỗi lần tốn `O(n²)`; heap giữ root tốt nhất và update `O(log n)`. Nếu dữ liệu static chỉ sort một lần, heap không bắt buộc.

### State, invariant và transition

State array heap + comparator. Min-heap invariant: parent không lớn hơn children. Push đặt cuối rồi bubble-up; pop thay root bằng last rồi bubble-down. Mỗi transition chỉ sửa một đường root–leaf.

### Template

```js
class Heap {
  constructor(compare=(a,b)=>a-b){ this.data=[]; this.compare=compare; }
  size(){ return this.data.length; }
  push(value){ this.data.push(value); for(let i=this.data.length-1;i>0;){const p=Math.floor((i-1)/2);if(this.compare(this.data[p],this.data[i])<=0)break;[this.data[p],this.data[i]]=[this.data[i],this.data[p]];i=p;} }
  pop(){ if(!this.data.length)return undefined; const root=this.data[0],last=this.data.pop(); if(this.data.length){this.data[0]=last;for(let i=0;;){let b=i,l=i*2+1,r=l+1;if(l<this.data.length&&this.compare(this.data[l],this.data[b])<0)b=l;if(r<this.data.length&&this.compare(this.data[r],this.data[b])<0)b=r;if(b===i)break;[this.data[i],this.data[b]]=[this.data[b],this.data[i]];i=b;}}return root; }
}
```

### Dry run, complexity, biến thể và transfer

Push 3,1,2 làm 1 bubble lên root; pop 1 đưa 3 lên rồi swap với 2. Mỗi push/pop `O(log n)`, peek `O(1)`, space `O(n)`. Biến thể max-heap đảo comparator; duplicate cần unique id nếu lazy deletion. Transfer OF012/OF014. Counterexample comparator trả boolean.

## `[HG-02]` — Top-k bằng bounded heap

### Core, dấu hiệu nhận dạng và brute force bottleneck

Chỉ cần k phần tử tốt nhất từ stream lớn. Full sort `O(n log n)` làm thừa full order; giữ heap size k tốn `O(n log k)`. Với k largest, dùng min-heap để root là phần tử yếu nhất trong nhóm đang giữ.

### State, invariant và transition

Invariant sau prefix: heap chứa k largest của prefix (hoặc toàn prefix nếu chưa đủ k). Push current; nếu size>k pop min. Phần bị pop không thể quay lại top-k vì đã có k phần tử không nhỏ hơn nó.

### Template

```js
function topKLargest(values,k,HeapClass){
  if(k<=0)return [];
  const heap=new HeapClass((a,b)=>a-b);
  for(const value of values){heap.push(value);if(heap.size()>k)heap.pop();}
  const result=[];while(heap.size())result.push(heap.pop());
  return result.reverse();
}
```

### Dry run, complexity, biến thể và transfer

`[5,1,4,9],k=2`: heap cuối `{5,9}`. `O(n log k)` time, `O(k)` space. Biến thể k smallest dùng max-heap; top-k record cần comparator tie. Counterexample dùng max-heap cho k largest rồi pop khi quá size sẽ loại chính phần tử lớn nhất.

## `[HG-03]` — Scheduling: event sort + ready heap

### Core, dấu hiệu nhận dạng và brute force bottleneck

Job chỉ được chọn sau arrival nhưng trong tập ready phải lấy priority tốt nhất. Queue phá priority; heap chứa job tương lai phá eligibility. Brute force mỗi lần scan mọi job chưa chạy là `O(n²)`.

### State, invariant và transition

State jobs sort arrival, pointer, currentTime, ready heap. Invariant trước selection: heap chứa mọi và chỉ job arrival≤time chưa chạy. Add eligible; nếu heap rỗng jump time tới arrival kế; pop priority rồi advance time.

### Template

```js
function schedulingSkeleton(jobs,heap){
  const ordered=[...jobs].sort((a,b)=>a.arrival-b.arrival);let i=0,time=0;const order=[];
  while(i<ordered.length||heap.size()){
    if(!heap.size()&&time<ordered[i].arrival)time=ordered[i].arrival;
    while(i<ordered.length&&ordered[i].arrival<=time)heap.push(ordered[i++]);
    const job=heap.pop();time+=job.duration;order.push(job.id);
  }
  return order;
}
```

### Dry run, complexity, biến thể và transfer

Job A arrival0/duration5, B arrival1/duration1: A đang chạy non-preemptive; B chỉ vào ready khi time5. Sort + heap `O(n log n)`, space `O(n)`. Biến thể comparator shortest/deadline/tie id; proof objective phải riêng. Transfer OF013. Counterexample tăng time từng tick khi idle.

## `[HG-04]` — Greedy sau sort và interval endpoint

### Core, dấu hiệu nhận dạng và brute force bottleneck

Cần ít điểm chạm mọi interval hoặc nhiều interval compatible nhất. Brute force thử subsets exponential; sort endpoint làm interval kết thúc sớm nhất tạo lựa chọn exchange-safe.

### State, invariant và transition

State sorted intervals, last endpoint, answer. Invariant: intervals đã scan được cover/chọn tối ưu với last endpoint muộn nhất cần thiết. Interval chưa cover có end sớm nhất buộc mọi nghiệm đặt một point trong nó; dời point tới end không làm xấu interval tương lai.

### Template

```js
function minimumClosedStabbingPoints(intervals){
  const sorted=[...intervals].sort((a,b)=>a[1]-b[1]);let point=-Infinity,count=0;
  for(const [start,end] of sorted)if(point<start){point=end;count++;}
  return count;
}
```

### Dry run, complexity, biến thể và transfer

`[1,3],[2,4],[5,6]`: point3 cover hai đầu, point6 cover cuối. `O(n log n)`, space tùy copy. Biến thể half-open đổi equality; weighted interval cần DP. Transfer OF030/OF057. Counterexample `[1,2)` và `[2,3)` không share shot.

## `[HG-05]` — Greedy proof và counter-pattern

### Core, dấu hiệu nhận dạng và brute force bottleneck

Greedy commit local choice không quay lại. Brute force/backtracking giữ mọi khả năng; chỉ bỏ được khi có exchange/cut/stays-ahead proof. “Có vẻ tốt nhất” không phải invariant.

### State, invariant và transition

Quy trình: xác định extreme/boundary bắt buộc → chọn local → giả sử optimum chọn khác → exchange về greedy choice không tăng cost → invariant prefix giữ optimum extension. Nếu không exchange được, chuyển DP/search/heap tùy bottleneck.

### Template decision

```js
function chooseEngine({dynamicPriority,overlappingSubproblems,exchangeProof}){
  if(dynamicPriority)return "HEAP";
  if(exchangeProof)return "GREEDY";
  if(overlappingSubproblems)return "DP";
  return "SEARCH_OR_MORE_PROOF";
}
```

### Dry run, complexity, biến thể và transfer

Boat tối đa hai người: heaviest không fit lightest thì buộc đi một mình; fit thì ghép lightest không làm tương lai xấu hơn. Sort `O(n log n)`, scan `O(n)`. Biến thể capacity ba người phá proof. Transfer OF025/OF028. Counterexample weighted reward phá cardinality greedy.
