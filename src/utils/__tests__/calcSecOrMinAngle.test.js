import { calcSecOrMinAngle } from "../calcSecOrMinAngle";

describe('calcSecOrMinAngle', () => {
  it('should calculate correctly', () => {
    const res = calcSecOrMinAngle(60);
    const expectedRes = 360;
    expect(res).toBe(expectedRes);
  });
});
