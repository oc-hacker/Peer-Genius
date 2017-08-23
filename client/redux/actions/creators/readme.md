Quick start/reminders:

Redux actions in `Peer Genius` use flux standard actions and `redux-thunk`.

Flux standard actions are actions that follow the structure of
```flow js
type Action = {
	type: string,
	payload: any,
	meta: any,
	error: boolean
}
```

In the case of `Peer Genius`, the structure is slightly loosened in that `error` can be anything.

`thunk`s are functions used as redux actions. Their signature is `async (dispatch, getState) => any`.