export function isCheaper (candidateDeal, currentCheapestDeal) {
    const candidatePrice = parseFloat(candidateDeal.salePrice);
    const currentPrice = parseFloat(currentCheapestDeal.salePrice);

    return candidatePrice < currentPrice;
}

export function selectCheapestDealPerGameID (deals) {
    const cheapestByGameID = new Map();

    for (let i = 0; i < deals.length; i++) {
        const current = deals[i];
        const gameId = current.gameID;

        if (!(cheapestByGameID.has(gameId))) {
            cheapestByGameID.set(gameId, current);
        };

        if (isCheaper(current, cheapestByGameID.get(gameId))) {
            cheapestByGameID.set(gameId, current);
        }
    }

    const cheapestDeals = Array.from(cheapestByGameID.values());

    return cheapestDeals;
}