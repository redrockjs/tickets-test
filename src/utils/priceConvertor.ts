import {CurrencyEnum} from "@/constants/types/currency.ts";

const RUBUSD = 100
const RUBEUR = 110

export const priceConvertor = (price: number, currency: CurrencyEnum) => {

  if (price < 0) throw new Error("Price must be positive number");
  if (price > 100_000) throw new Error("Price must be less then 100000");

  switch (currency) {
    case CurrencyEnum.USD:
      return `${(price / RUBUSD).toFixed(0)} $`
    case CurrencyEnum.EUR:
      return `${(price / RUBEUR).toFixed(0)} €`
    default:
      return `${price} ₽`
  }
}