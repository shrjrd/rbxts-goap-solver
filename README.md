# GOAP Solver

A lightweight, pure functional GOAP solver in TypeScript for creating complex AI agent behavior in games and simulations.


### Features

- ✨ Pure functional
- 🔢 Boolean and Numeric facts
- 📜 Declarative
- ✅ Written in TypeScript
- 🗜️ Zero dependencies


### References

- [Building a Game Bot with GOAP](https://tezee.art/articles/building-game-bot-goap?lang=en)


## Installation

```zsh
npm i goap-solver
```


## Usage

```ts
import { planner, Action, GoalFacts } from 'goap-solver'


// define world state
const state = {
  hasDocument: false,
  money: 0,
  beer: 2,
} satisfies GoalFacts

// define what we want to achieve
const goal = { beer: state.beer + 1 } satisfies GoalFacts

// define available actions
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

const actions = [c, b, a]
const plan = planner(state, goal, actions)
const result = plan?.map(({ name }) => name)

expect(result).toEqual(['GetMoney', 'GetDocument', 'BuyBeer'])
```


### License

[MIT](https://opensource.org/licenses/MIT) © 2025-present, [@13luck](https://github.com/13luck)
