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
  function visit(airport) {
    const destinations = destinationsByAirport.get(airport);
    while (destinations && destinations.length > 0) visit(destinations.pop());
    routeReversed.push(airport);
  }

  visit("ICN");
  return routeReversed.reverse();
}

module.exports = { travelItinerary };
