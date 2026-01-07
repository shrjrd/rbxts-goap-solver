import { expect, test } from '@rbxts/jest-globals'
import { fastHash } from './fastHash'


test('fastHash', () => {
  expect(fastHash({ a: 1, b: 2, c: true, e: false })).toEqual('a1b2ctrueefalse')

  // In a real plan, the property names will be meaningful (hasKey, doorOpen, energy) and such coincidences are unlikely
  expect(fastHash({ a: 12, b: 3 })).toEqual('a12b3')
  expect(fastHash({ a1: 2, b: 3 })).toEqual('a12b3')
})
