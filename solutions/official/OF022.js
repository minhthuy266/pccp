function maximumDungeonCount(initialFatigue, dungeons) {
  const visited = Array(dungeons.length).fill(false);
  let best = 0;

  function dfs(fatigue, cleared) {
    best = Math.max(best, cleared);

    for (let index = 0; index < dungeons.length; index++) {
      const [required, cost] = dungeons[index];
      if (visited[index] || fatigue < required) {
        continue;
      }

      visited[index] = true;
      dfs(fatigue - cost, cleared + 1);
      visited[index] = false;
    }
  }

  dfs(initialFatigue, 0);
  return best;
}

module.exports = { maximumDungeonCount };
