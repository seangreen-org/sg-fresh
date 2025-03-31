# Copilot Instructions

This project is a personal fun project web application. It uses Deno and Fresh
to display a dynamically rendered heart SVG which when pressed calls an API
causing the colour of a Hue light to change.

Refer to [README.md](../README.md) for more details.

### Your Responses

- If your response is only going to change a small amount of code (1-5 lines per
  file), then just provide the code that is changing.
- Avoid excessive use of comments in your code responses.

## Coding Standards

- Refer to:
  - [deno fmt](https://docs.deno.com/runtime/reference/cli/fmt/) defaults
  - [deno lint](https://docs.deno.com/runtime/reference/cli/lint/) defaults with
    `fresh` and `recommended` tags.
- Use US English spelling in code that is not a comment.
- Use 2 spaces for indentation. Do not use tabs.
- Keep lines of code under 80 characters long where practical. Break longer
  lines logically.
- Use double quotes (`"`) for string literals.
- Use semicolons (`;`) at the end of statements.
- Include trailing commas in multi-line array literals, object literals, and
  function parameter lists.
- When `import`ing modules make use the import path specified in
  [deno.json](../deno.json)
- When `import`ing types use the `type` keyword.
- Prefer # over private keyword for private fields in classes.
- Ensure consistent spacing:
  - Around operators (`=`, `+`, `-`, `-`, `/`, `===`, etc.). Example:
    `let sum = a + b;`
  - After commas in lists, arguments, etc. Example: `myFunction(arg1, arg2)`
  - After colons in object properties. Example: `{ name: "value" }`
  - Before opening braces (`{`) for blocks (functions, if/else, loops). Example:
    `if (condition) { ... }`

#### Code Quality & Correctness

- Do not declare variables or imports that are not used. Remove unused code.
- Prefer one liner functional syntax.
- Exported functions: max 2 args, put the rest into an options object.
- Avoid code that is unreachable (e.g., code after `return`, `throw`, `break`,
  or `continue` statements within the same block scope).
- Remove `debugger;` statements from production code.
- Always use strict equality (`===`) and strict inequality (`!==`) operators
  instead of abstract equality (`==`) and inequality (`!=`).
- Do not use the `eval()` function.
- Do not use the `with` statement.
- Avoid empty code blocks (e.g., `if (condition) {}`). If intentional, add a
  comment explaining why.
- Avoid assignments within conditional expressions (e.g.,
  `if (user = getUser())`). If intentional, wrap the assignment in extra
  parentheses.
- Ensure `typeof` comparisons are made against valid string literals (e.g.,
  `"string"`, `"number"`, `"undefined"`).
- Avoid duplicate keys in object literals.
- When iterating over objects with `for...in`, use `hasOwnProperty` checks to
  avoid iterating over inherited properties, unless inheritance is explicitly
  desired.

#### Framework Specific (Fresh):

- Adhere to the expected file naming conventions and directory structures (e.g.,
  for `routes/`, `islands/`, `components/`).
- Use Fresh framework APIs and patterns according to their documented usage.
- Follow best practices specific to the Islands Architecture and server-side
  rendering as implemented by Fresh.
- Ensure handlers, components, and islands interact as expected by the
  framework.

## Testing

This project uses the Deno test runner and Playwright for in browser testing up
to the service boundary where requests are intercepted/mocked.
