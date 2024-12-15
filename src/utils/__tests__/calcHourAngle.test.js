import { calcHourAngle } from "../calcHourAngle";

describe('calcHourAngle', () => {
  it('should calculate correctly', () => {
    const res = calcHourAngle(12);
    const expectedRes = 360;
    expect(res).toBe(expectedRes);
  });
});
