/**
 * ## httpbin.org Form Post API Types inferred from API exploration.
 * See: https://httpbin.org/forms/post
 * Example response (after submitting): https://httpbin.org/post
 */

/** Request type for the pizza order form */
export interface HttpBinSubmitRequest {
  /** Customer name (required) */
  custname: string;
  /** Telephone (required) */
  custtel: string;
  /** Email (required) */
  custemail: string;
  /** Pizza size: small, medium, or large (required) */
  size: 'small' | 'medium' | 'large';
  /** Pizza toppings (optional, any subset) */
  topping?: Array<'bacon' | 'cheese' | 'onion' | 'mushroom'>;
  /** Preferred delivery time, e.g. "12:00" (required) */
  delivery: string;
  /** Delivery instructions/comments (optional) */
  comments?: string;
}

/** The returned 'form' field in httpbin's POST response */
export interface HttpBinFormData {
  custname: string;
  custtel: string;
  custemail: string;
  size: string;
  topping?: string[];
  delivery: string;
  comments?: string;
  [key: string]: unknown; // Incorporated for any extra fields
}

/** Full response from httpbin.org POST */
export interface HttpBinSubmitResponse {
  args: Record<string, string | unknown>;
  data: string;
  files: Record<string, string>;
  form: HttpBinFormData;
  headers: Record<string, string>;
  json: null | Record<string, unknown>;
  origin: string;
  url: string;
}
