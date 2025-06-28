import { Device } from '../src/core/Device';
import { AnalysisStrategy } from '../src/strategy/AnalysisStrategy';

// Eine einfache Dummy-Strategie zum Testen
const mockStrategy: AnalysisStrategy = {
  analyze: (values: number[]) => `MockAnalysis: ${values.length} Werte`
};

describe('Device', () => {
  it('sollte korrekt initialisiert werden', () => {
    const device = new Device('TestDevice', mockStrategy);
    expect(device.getName()).toBe('TestDevice');
    expect(device.getMeasurements()).toEqual([]);
  });

  it('sollte Messwerte hinzufügen', () => {
    const device = new Device('TestDevice', mockStrategy);
    device.addMeasurement(100);
    const values = device.getMeasurements().map(m => m.value);
    expect(values).toEqual([100]);
  });
});
