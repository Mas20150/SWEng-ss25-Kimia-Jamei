import { Device } from '../src/core/Device';

describe('Device', () => {
  it('sollte korrekt initialisiert werden', () => {
    const device = new Device('TestDevice');
    expect(device.name).toBe('TestDevice');
    expect(device.measurements).toEqual([]);
  });

  it('sollte Messwerte hinzufügen', () => {
    const device = new Device('TestDevice');
    device.addMeasurement(100);
    expect(device.measurements).toEqual([100]);
  });
});
