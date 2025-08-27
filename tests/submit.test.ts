import { submitOrder } from '../routes/submit';
import type { HttpBinSubmitRequest, HttpBinSubmitResponse } from '../types/submit.types';

describe('Submit API Integration', () => {
  const validForm: HttpBinSubmitRequest = {
    custname: 'Test User',
    custtel: '123-456-7890',
    custemail: 'test@example.com',
    size: 'medium',
    topping: ['cheese', 'bacon'],
    delivery: '12:00',
    comments: 'Leave at the door',
  };

  /** Test Valid Form Data */
  it('should successfully submit form data', async () => {
    const result = await submitOrder(validForm);
    expect(result.form.custname).toBe('Test User');
    expect(result.form.size).toBe('medium');
    expect(Array.isArray(result.form.topping)).toBe(true);
    expect(result.form.topping).toContain('cheese');
    expect(result).toHaveProperty('headers');
    expect(result.url).toContain('httpbin.org');
  });

  /** Test Missing Required Fields */
  it('should handle form submission errors', async () => {
    await expect(
      submitOrder({
        custname: '', // No customer name provided
        custtel: '123-456-7890',
        custemail: 'test@example.com',
        size: 'large',
        delivery: '20:00',
      }),
    ).rejects.toThrow('Missing required field: custname');
  });

  /** Test Response Structure Validation */
  it('should validate response structure matches defined types', async () => {
    const result = await submitOrder(validForm);
    const check: HttpBinSubmitResponse = result;
    expect(check).toHaveProperty('form');
    expect(check.form.custemail).toBe('test@example.com');
  });
});
