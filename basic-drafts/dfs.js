const tree = {
  A: ["B", "C"],
  B: ["D", "E"],
  C: ["F"],
  D: [],
  E: [],
  F: [],
};

function dfs(node) {
  console.log(node);

  for (const child of tree[node]) {
    dfs(child);
  }
}

dfs("A");

function generate() {
  function dfs(step, path) {
    if (step === 2) {
      console.log(path);
      return;
    }

    dfs(step + 1, path + "A");
    dfs(step + 1, path + "B");
  }

  dfs(0, "");
}

generate();