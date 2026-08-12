function minimumWalletArea(sizes) {
  let maximumLongSide = 0;
  let maximumShortSide = 0;

  for (const [width, height] of sizes) {
    maximumLongSide = Math.max(maximumLongSide, Math.max(width, height));
    maximumShortSide = Math.max(maximumShortSide, Math.min(width, height));
  }

  return maximumLongSide * maximumShortSide;
}

module.exports = { minimumWalletArea };
