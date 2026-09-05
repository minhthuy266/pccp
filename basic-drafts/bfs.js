const edges = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
];

const shortestConnection = (n, edges, start, target) => {
  // 1. Tạo danh sách hàng xóm
  const graph = Array.from({ length: n }, () => []);

  console.log("Trước:", graph);

  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }

  console.log("Sau:", graph);

  // 2. Tạo queue và distance
  const queue = [start]
  let head = 0
  const distance = Array(n).fill(-1)

  // 3. Đưa start vào trạng thái ban đầu
  distance[start] = 0

  // 4. Trong khi còn node chờ xử lý

  while (head < queue.length) {
    const node = queue[head++]

    if (node === target) {
        return distance[node]
    }

    for (const next of graph[node]) {
        if (distance[next] !== -1) continue;

        distance[next] = distance[node] + 1
        queue.push(next)
    }
  }

  return -1

  // Lấy node

  // Nếu node là target thì trả khoảng cách

  // Xét từng hàng xóm next

  // Đã phát hiện thì bỏ qua

  // Gán khoảng cách cho next

  // Đưa next vào queue

  // 5. Không tới được target
};

console.log(shortestConnection(5, edges, 2, 4));
