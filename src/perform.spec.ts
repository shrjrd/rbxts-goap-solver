import { expect, test } from '@rbxts/jest-globals'
import { perform } from './perform'


test('perform', () => {
  const result = perform({
    truthy: true,
    falsy: false,
    value: 1,
    minus: 4,
  }, {
    truthy: false,
    falsy: true,
    newBoolean: true,
    newNumber: 0,
    value: 2,
    minus: -5,
  })

  expect(result).toEqual({
    truthy: false, // replaces true with false
    falsy: true, // replaces false with true
    newBoolean: true, // added new
    newNumber: 0, // added new
    value: 3, // 1 + 2 = 3
    minus: -1, // 4 + (-5) = -1
  })
})
