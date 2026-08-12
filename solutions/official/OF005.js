function bestAlbumSongIndices(genres, plays) {
  const totalByGenre = new Map();
  const songsByGenre = new Map();

  for (let index = 0; index < genres.length; index++) {
    const genre = genres[index];
    totalByGenre.set(genre, (totalByGenre.get(genre) ?? 0) + plays[index]);
    if (!songsByGenre.has(genre)) songsByGenre.set(genre, []);
    songsByGenre.get(genre).push({ index, plays: plays[index] });
  }

  const orderedGenres = [...totalByGenre.keys()].sort(
    (first, second) => totalByGenre.get(second) - totalByGenre.get(first),
  );
  const answer = [];

  for (const genre of orderedGenres) {
    songsByGenre.get(genre).sort(
      (first, second) => second.plays - first.plays || first.index - second.index,
    );
    for (const song of songsByGenre.get(genre).slice(0, 2)) answer.push(song.index);
  }

  return answer;
}

module.exports = { bestAlbumSongIndices };
