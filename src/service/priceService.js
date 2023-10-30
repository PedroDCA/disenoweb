const colonFormatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CRC",
    currencyDisplay: "narrowSymbol",
  });

export const formatPriceForCard = (price) => colonFormatter.format(price);