const colonFormatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CRC",
    currencyDisplay: "narrowSymbol",
  });

/**
 * Formats a flat number into a currency number.
 * It includes a dot "." on every 3 numbers, it adds the colon sign at the
 * beginning and add two decimal values.
 */
export const formatPriceForCard = (price) => colonFormatter.format(price);