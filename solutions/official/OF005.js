function bestAlbumSongIndices(genres, plays) {
  const totalByGenre = new Map();
  const songsByGenre = new Map();

  for (let index = 0; index < genres.length; index++) {
    const genre = genres[index];
    const currentPlays = plays[index];
    const previousTotal = totalByGenre.get(genre) ?? 0;
    totalByGenre.set(genre, previousTotal + currentPlays);

    if (!songsByGenre.has(genre)) {
      songsByGenre.set(genre, []);
    }

    const genreSongs = songsByGenre.get(genre);
    genreSongs.push({ index, plays: currentPlays });
  }

  const orderedGenres = [...totalByGenre.keys()].sort(
    (first, second) => totalByGenre.get(second) - totalByGenre.get(first),
  );
  const answer = [];

  for (const genre of orderedGenres) {
    const genreSongs = songsByGenre.get(genre);
    genreSongs.sort((first, second) => {
      if (first.plays !== second.plays) {
        return second.plays - first.plays;
      }

      return first.index - second.index;
    });

    const selectedCount = Math.min(2, genreSongs.length);
    for (let rank = 0; rank < selectedCount; rank++) {
      answer.push(genreSongs[rank].index);
    }
  }

  return answer;
}

module.exports = { bestAlbumSongIndices };
