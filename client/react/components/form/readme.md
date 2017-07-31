### Validator usage:

The built-in validators are to be used as a template string tag. An example using `require`:
```jsx harmony
<Field
	{...fieldProps}
	validate={[required`The ${fieldName} cannot be empty`]}
/>
```
Then, when the field is empty the custom message will display.

It is also possible to put functions in the template string. An example using `email`:
```jsx harmony
<Field
	{...fieldProps}
	validate={[email`${value => value} is not an email!`]}
/>
```

The function should match `redux-form`'s validation function signature: `(value, allValues, props) => any`, and return something that will be inserted into the template string.

Note that a partial signature match, such as the one above, may be all that's necessary.

The default export of `validator` can be used to construct custom validators:
```jsx harmony
<Field
	{...fieldProps}
	validate={[validator(value => value === 'Hello world', 'Hello world!')`Field must be 'Hello world'!`]}
/>
```

`validator` takes up to 2 arguments.

The first is a validation function that returns true if the field value is acceptable and false otherwise. The signature of this function should match the signature of `redux-form`'s validation function.
Again, a partial match may serve just as well.

The (optional) second argument will be the default message.

If a user provides an empty template string for error message, the default message will be used when validation fails.