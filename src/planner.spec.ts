import { describe, expect, test } from '@rbxts/jest-globals'
import { Action, GoalFacts, planner } from './planner'


describe('planner', () => {
  const prettyPlan = (plan: Action[] | undefined) => plan?.map(({ name }) => name)

  test('going to the store for beer', () => {
    const state = {
      hasDocument: false,
      money: 0,
      beer: 2,
    } satisfies GoalFacts

    const goal = { beer: state.beer + 1 } satisfies GoalFacts

    const a: Action = {
      name: 'GetDocument',
      preconditions: { hasDocument: false },
      effects: { hasDocument: true },
      priority: 1,
    }
    const b: Action = {
      name: 'GetMoney',
      preconditions: { money: 0 },
      effects: { money: +10 },
      priority: 2,
    }
    const c: Action = {
      name: 'BuyBeer',
      preconditions: { hasDocument: true, money: 10 },
      effects: { beer: +1, money: -10 },
    }

    const actions = [a, b, c]
    const plan = planner(state, goal, actions)

    expect(prettyPlan(plan)).toEqual(['GetMoney', 'GetDocument', 'BuyBeer'])
  })

  test('abstract example', () => {
    const initialFacts = {
      hasWeapon: false,
      canSeeEnemy: false,
      isEnemyAlive: true,
    }

    const possibleActions: Action[] = [
      {
        name: 'PickUpWeapon',
        preconditions: { hasWeapon: false },
        effects: { hasWeapon: true },
      },
      {
        name: 'MoveToEnemy',
        preconditions: { canSeeEnemy: false },
        effects: { canSeeEnemy: true },
      },
      {
        name: 'AttackEnemy',
        preconditions: { hasWeapon: true, canSeeEnemy: true, isEnemyAlive: true },
        effects: { isEnemyAlive: false },
      },
    ]

    const a = planner(initialFacts, { hasWeapon: true }, possibleActions)
    const b = planner(initialFacts, { isEnemyAlive: false }, possibleActions)
    const c = planner(initialFacts, { canSeeEnemy: true }, possibleActions)

    expect(prettyPlan(a)).toEqual(['PickUpWeapon'])
    expect(prettyPlan(b)).toEqual(['PickUpWeapon', 'MoveToEnemy', 'AttackEnemy'])
    expect(prettyPlan(c)).toEqual(['MoveToEnemy'])
  })

  test('LandLords resource trade case: uses different possibilities to achieve the goal', () => {
    const initialFacts = {
      ore: 0, // need to trade 3 somehow
      wheat: 1, // only 1 is missing
      wood: 8, // 9 can be exchanged for 3 ore, but 1 is missing
      stone: 3, // 3 can be exchanged for 1 wheat
      cattle: 0,
      settlementBuilt: false,
      playInvention: 1,
    }

    const possibleActions: Action[] = [
      {
        name: 'Get 2 ore for free',
        preconditions: { playInvention: 1 },
        effects: { ore: +2, playInvention: -1 },
      },
      {
        name: 'Trade wood for ore',
        preconditions: { wood: 3 },
        effects: { wood: -3, ore: +1 },
      },
      {
        name: 'Trade stone for wheat',
        preconditions: { stone: 3 },
        effects: { stone: -3, wheat: +1 },
      },
      {
        name: 'Grade settlement',
        preconditions: { ore: 3, wheat: 2, settlementBuilt: false },
        effects: { ore: -3, wheat: -2, settlementBuilt: true },
      },
    ]

    const plan = planner(initialFacts, { settlementBuilt: true }, possibleActions)

    expect(prettyPlan(plan)).toEqual([
      'Get 2 ore for free',
      'Trade wood for ore',
      'Trade stone for wheat',
      'Grade settlement',
    ])
  })

  test('LandLords resource trade case: should figure out to build 2 settlements to achieve victory', () => {
    const initialFacts = {
      winScore: 8, // player's current score
      ore: 3,
      wheat: 2,
      wood: 0, // not enough, but the bot will figure out that it needs to trade it for surplus
      stone: 2,
      cattle: 5,
    }

    const possibleActions: Action[] = [
      {
        name: 'Trade cattle for wood',
        preconditions: { cattle: 3 },
        effects: { cattle: -3, wood: +1 },
      },
      {
        name: 'Trade ore for wood',
        preconditions: { ore: 3 },
        effects: { ore: -3, wood: +1 },
      },
      {
        name: 'Build settle',
        preconditions: { stone: 1, wood: 1, cattle: 1, wheat: 1 },
        effects: {
          winScore: +1,
          stone: -1,
          wood: -1,
          cattle: -1,
          wheat: -1,
        },
      },
    ]

    const plan = planner(initialFacts, { winScore: 10 }, possibleActions)

    expect(prettyPlan(plan)).toEqual([
      'Trade cattle for wood',
      'Trade ore for wood',
      'Build settle',
      'Build settle',
    ])
  })

  test('checks that negative priority is less than zero', () => {
    const initialFacts = { win: false }

    const possibleActions: Action[] = [
      {
        name: 'a',
        preconditions: { win: false },
        effects: { win: true },
        priority: -1,
      },
      {
        name: 'b',
        preconditions: { win: false },
        effects: { win: true },
        priority: 0, // this is more than -1, so it has priority
      },
    ]

    const plan = planner(initialFacts, { win: true }, possibleActions)

    expect(plan?.pop()?.name).toBe('b')
  })
})
