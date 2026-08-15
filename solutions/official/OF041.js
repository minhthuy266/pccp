function travelItinerary(tickets) {
  const destinationsByAirport = new Map();
  for (const [from, to] of tickets) {
    if (!destinationsByAirport.has(from)) destinationsByAirport.set(from, []);
    destinationsByAirport.get(from).push(to);
  }
  for (const destinations of destinationsByAirport.values()) {
    destinations.sort((a, b) => b.localeCompare(a));
  }

  const routeReversed = [];
  const traversalStack = ["ICN"];
  while (traversalStack.length > 0) {
    const airport = traversalStack[traversalStack.length - 1];
    const destinations = destinationsByAirport.get(airport);
    if (destinations && destinations.length > 0) {
      traversalStack.push(destinations.pop());
    } else {
      routeReversed.push(traversalStack.pop());
    }
  }

  return routeReversed.reverse();
}

module.exports = { travelItinerary };
