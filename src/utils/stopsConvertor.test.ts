import {stopsConvertor} from './stopsConvertor.ts'
import {describe, expect, it} from "vitest";

describe('stopsConvertor test', () => {
  //setup
  const result = stopsConvertor(0)

  //tests
  it('Should return string', () => {
    expectTypeOf(stopsConvertor(0)).toBeString()
    expectTypeOf(stopsConvertor(1)).toBeString()
    expectTypeOf(stopsConvertor(2)).toBeString()
  })

  it('Should correct value', () => {
    expect(stopsConvertor(0)).toMatch('пересадок')
    expect(stopsConvertor(1)).toMatch('пересадка')
    expect(stopsConvertor(2)).toMatch('пересадки')
    expect(stopsConvertor(3)).toMatch('пересадки')
    expect(stopsConvertor(4)).toMatch('пересадки')
    expect(stopsConvertor(5)).toMatch('пересадок')
    expect(stopsConvertor(10)).toMatch('пересадок')
    expect(stopsConvertor(99)).toMatch('пересадок')
  })
})