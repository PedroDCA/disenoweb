const monthList = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "setiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

export const formatToSpanishFullDate = (dateString) => {
  const dateInformation = new Date(dateString);
  const spanishFullDateString = `${dateInformation.getDate()} ${
    monthList[dateInformation.getMonth()]
  } ${dateInformation.getFullYear()}`;

  return spanishFullDateString;
};
