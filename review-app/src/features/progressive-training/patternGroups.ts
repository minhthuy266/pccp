import type { ProgressiveLesson } from "./types";

export type ProgressivePatternGroup = {
  id: string;
  order: number;
  title: string;
  pattern: string;
  recognition: string;
  invariant: string;
  prerequisite: string;
  lessonIds: string[];
};

export const progressivePatternGroups: ProgressivePatternGroup[] = [
  {
    id: "representation",
    order: 1,
    title: "Contract và representation",
    pattern: "Parse once → canonical state → ordered transitions",
    recognition: "Input có format riêng, boundary hoặc thứ tự event dễ làm code sai dù thuật toán không khó.",
    invariant: "Sau mỗi transition, state dùng một representation duy nhất và vẫn nằm trong contract.",
    prerequisite: "Bắt đầu ở đây",
    lessonIds: ["PT-F01-TIME-NORMALIZATION"],
  },
  {
    id: "linear-map-sort",
    order: 2,
    title: "Map/Set, sorting và linear scan",
    pattern: "Scan prefix → semantic Map/Set state → explicit output order",
    recognition: "Cần đếm/group/lookup theo key hoặc output có nhiều khóa ordering; duplicate và tie đều mang ý nghĩa.",
    invariant: "Map value luôn có một nghĩa duy nhất; comparator trả số theo đủ tie-break; prefix cuối phải được flush.",
    prerequisite: "Sau Module 1",
    lessonIds: ["PT-F02-RUN-SCAN", "PT-F04-FREQUENCY-MULTISET", "PT-F05-MULTIKEY-SORT"],
  },
  {
    id: "grid-atomic-simulation",
    order: 3,
    title: "Grid và atomic simulation",
    pattern: "Represent coordinates → derive candidate → validate → commit",
    recognition: "State có row/col/direction hoặc command tuần tự; thứ tự event, bounds và dấu vector quyết định correctness.",
    invariant: "Sau mỗi command, state là kết quả đúng của toàn prefix; transition invalid không được commit một phần.",
    prerequisite: "Sau representation và linear scan",
    lessonIds: ["PT-F03-GRID-NEIGHBORS", "PT-F06-ATOMIC-ROBOT"],
  },
  {
    id: "queue-timeline",
    order: 4,
    title: "Queue và timeline simulation",
    pattern: "Logical queue head → event time batches → resolve same-time state",
    recognition: "Item có arrival/finish, front có thể re-enqueue, hoặc nhiều agent phải được so tại cùng một tick.",
    invariant: "Queue[head..] là pending FIFO thật; mỗi time batch chứa đúng agent còn active và tie được xử lý theo contract.",
    prerequisite: "Sau Map grouping và atomic simulation",
    lessonIds: ["PT-F09-QUEUE-HEAD", "PT-F07-COLLISION-TIMELINE"],
  },
  {
    id: "decision-tree-backtracking",
    order: 5,
    title: "Cây quyết định và backtracking",
    pattern: "State → choices → choose → explore → unchoose",
    recognition: "Bound nhỏ, cần thử nhiều tổ hợp/thứ tự và lựa chọn hiện tại làm thay đổi các lựa chọn còn lại.",
    invariant: "State tại mỗi depth mô tả đúng path hiện tại; mutable state phải được restore trước sibling tiếp theo.",
    prerequisite: "Biết recursion và complexity 2^n / n!",
    lessonIds: ["PT-DFS-TAKE-SKIP", "PT-OF036-TARGET-NUMBER", "PT-F11-COMBINATION", "PT-BT-ASSIGNMENT", "PT-OF022-FATIGUE"],
  },
  {
    id: "tree-traversal",
    order: 6,
    title: "BFS grid, graph và component traversal",
    pattern: "Define full state → seed queue → mark before enqueue → expand neighbors",
    recognition: "Cần shortest path trên graph/grid, chia component, hoặc cùng vị trí nhưng quyền/resource khác nhau tạo tương lai khác nhau.",
    invariant: "Mỗi state đầy đủ được enqueue tối đa một lần với shortest distance; expanded state không bị collapse theo riêng tọa độ.",
    prerequisite: "Sau grid neighborhood và decision-tree recursion",
    lessonIds: ["PT-F12-GRID-BFS", "PT-F12-GRAPH-BFS", "PT-F12-EXPANDED-STATE-BFS", "PT-F13-NETWORK-COMPONENTS", "PT-F13-ROOTED-TREE-PROFILE", "PT-OF023-POWER-GRID"],
  },
  {
    id: "heap-selection-scheduling",
    order: 7,
    title: "Heap selection, Top K và scheduling",
    pattern: "Define comparator → maintain heap invariant → pop decision → reinsert updated state",
    recognition: "Liên tục cần min/max khi tập thay đổi, giữ K phần tử tốt nhất, hoặc arrival order khác selection priority.",
    invariant: "Root luôn là candidate có priority cao nhất theo comparator; bounded heap giữ đúng K best; ready heap chỉ chứa event đã tới.",
    prerequisite: "Sau comparator, queue-head và timeline simulation",
    lessonIds: ["PT-F15-SCOVILLE-HEAP", "PT-F15-BOUNDED-TOP-K", "PT-F15-EVENT-HEAP-SCHEDULING"],
  },
  {
    id: "interval-greedy",
    order: 8,
    title: "Greedy interval có chứng minh",
    pattern: "Sort by earliest finish → scan → exchange argument",
    recognition: "Bài chọn ít điểm nhất hoặc nhiều interval tương thích nhất; endpoint quyết định khả năng dành chỗ cho phần sau.",
    invariant: "Sau prefix đã sort, lựa chọn hiện tại là tối ưu cho prefix và không kém bất kỳ lựa chọn đầu khác.",
    prerequisite: "Vững comparator và boundary đóng/mở",
    lessonIds: ["PT-OF057-INTERCEPTION"],
  },
  {
    id: "binary-search-answer",
    order: 9,
    title: "Binary search on answer",
    pattern: "Answer axis → monotone predicate → first/last feasible",
    recognition: "Đề hỏi minimum/maximum số nguyên, không dựng đáp án trực tiếp nhưng kiểm một candidate đủ nhanh.",
    invariant: "Đáp án luôn nằm trong [low,high]; mỗi update loại đúng một miền false hoặc giữ boundary true cần tìm.",
    prerequisite: "Sau comparator/bounds; phân biệt first true và last true",
    lessonIds: ["PT-OF043-IMMIGRATION-BIGINT"],
  },
];

export function groupProgressiveLessons(lessons: ProgressiveLesson[]) {
  const byId = new Map(lessons.map((lesson) => [lesson.id, lesson]));
  const groupedIds = progressivePatternGroups.flatMap((group) => group.lessonIds);
  if (new Set(groupedIds).size !== groupedIds.length) throw new Error("Pattern roadmap contains a lesson more than once");
  const missing = lessons.filter((lesson) => !groupedIds.includes(lesson.id));
  const unknown = groupedIds.filter((id) => !byId.has(id));
  if (missing.length || unknown.length) throw new Error(`Pattern roadmap mismatch: missing=${missing.map((item) => item.id)} unknown=${unknown}`);
  return progressivePatternGroups.map((group) => ({ ...group, lessons: group.lessonIds.map((id) => byId.get(id)!) }));
}
