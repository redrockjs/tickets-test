import {CurrencyEnum} from "@/constants/types/currency.ts";

const RUBUSD = 100
const RUBEUR = 110

export const priceConvertor = (price: number, currency: CurrencyEnum) => {
  switch (currency) {
    case CurrencyEnum.USD:
      return `${(price / RUBUSD).toFixed(0)} $`
    case CurrencyEnum.EUR:
      return `${(price / RUBEUR).toFixed(0)} €`
    default:
      return `${price} ₽`
  }
}