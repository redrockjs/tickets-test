import {priceConvertor} from './priceConvertor.ts'
import {describe, expect, it} from "vitest";
import {CurrencyEnum} from "@/constants/types/currency.ts";

describe("priceConvertor tests", () => {
  //setup
  const price = 11000;

  //tests
  it("Should convert something", () => {
    expect(priceConvertor(price, CurrencyEnum.RUB)).toBeTruthy()
  })

  it("Should correct calculation", () => {
    const result = priceConvertor(price, CurrencyEnum.RUB)

    expect(parseInt(result)).toBe(11000)
    expect(parseInt(result)).toBeGreaterThan(10999)
    expect(parseInt(result)).toBeLessThan(11001)
    expect(() => parseInt(priceConvertor(-1, CurrencyEnum.RUB))).toThrow()
    expect(() => parseInt(priceConvertor(10e10, CurrencyEnum.RUB))).toThrow()
    expectTypeOf(result).toBeString()
    expectTypeOf(result).toEqualTypeOf<string>()
  })

  it("Should convert price to Rubles", () => {
    const result = priceConvertor(price, CurrencyEnum.RUB)

    expect(result).toBe("11000 ₽")
    expect(result).toMatch('₽')
    expect(result).not.toMatch('$')
    expect(result).not.toMatch('€')
  })

  it("Should convert price to US Dollars", () => {
    const result = priceConvertor(price, CurrencyEnum.USD)

    expect(result).toBe("110 $")
    expect(result).toMatch('$')
    expect(result).not.toMatch('₽')
    expect(result).not.toMatch('€')
  })

  it("Should convert price to Euro", () => {
    const result = priceConvertor(price, CurrencyEnum.EUR)

    expect(result).toBe("100 €")
    expect(result).toMatch('€')
    expect(result).not.toMatch('₽')
    expect(result).not.toMatch('$')
  })

})