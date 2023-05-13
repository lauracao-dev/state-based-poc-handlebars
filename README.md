# state-based-poc-handlebars

This POC demonstrates separating `state` logic from `rendering` logic on a project that uses handlebars, using Vue's reactivity primitives.

## Benefits

- Allows [Vue](https://vuejs.org/) to update the DOM automatically based on changes in `state`
- Allows us to use [VueUse's](https://vueuse.org/) utility functions (includes over 200+ functions we can use to reduce the amount of lines of code we have to maintain)
- Allows us to separate code into `components` which are self-contained, reusable block of code that encapsulates a specific feature or behaviour.
