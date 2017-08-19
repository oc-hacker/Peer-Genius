The Peer Genius react client uses `redux-thunk` and flux standard actions.

`redux-thunk` allows async functions to be dispatched as actions. These `thunk`s use `dispatch` as their first argument.

Flux standard actions dictate that an action should only have 4 fields: `type`, `payload`, `meta`, and `error`. This unifies actions and simplifies reducer implementations.