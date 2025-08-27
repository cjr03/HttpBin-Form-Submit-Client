# HttpBin Pizza Order Form Client

TypeScript + Playwright integration with [httpbin.org forms/post](https://httpbin.org/forms/post).  
Submits a pizza order form to httpbin.org and validates request/response. Simulates a browser user filling and submitting a pizza order form.

This project emphasizes:

- Reverse-engineering undocumented APIs
- Real-world API exploration, analysis, and formalization skills
- Comprehensive type formalization
- Proper integration implementation
- Test-driven validation

---

## Features

- Uses Playwright to launch Chromium and interact with a live form
- Validates required fields before submission
- Extracts and parses JSON response
- Fully typed request/response contracts
- Jest tests for success, error handling, and response structure

---

## Project Structure

.
├── routes/
│ └── submit.ts
├── types/
│ └── submit.types.ts
├── tests/
│ └── submit.test.ts
├── index.ts

### `types/` Directory

- Documents types thoroughly
- Investigated API responses completely
- Formalized all request and response structures
- Comprehensive type definitions

### `routes/` Directory

- Investigated the API shape and response structure
- Implementing proper error handling

### `tests/` Directory

- Validates response data structure
- Tests error scenarios
- Ensures type safety
- Verifies integration functionality

### `index.ts` File

- Validates wiring

---

## Usage

```ts
import { submitOrder } from "./routes/submit";

const order = {
  custname: "Alice",
  custtel: "123-456-7890",
  custemail: "alice@example.com",
  size: "large",
  topping: ["cheese", "bacon"],
  delivery: "18:00",
  comments: "Leave at the door",
};

const response = await submitOrder(order);
console.log(response.form);
```

---

## Run Tests

npm install
npm test

---

## License

MIT
