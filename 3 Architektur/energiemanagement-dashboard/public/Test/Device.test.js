"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Device_1 = require("../src/core/Device");
// Eine einfache Dummy-Strategie zum Testen
const mockStrategy = {
    analyze: (values) => `MockAnalysis: ${values.length} Werte`
};
describe('Device', () => {
    it('sollte korrekt initialisiert werden', () => {
        const device = new Device_1.Device('TestDevice', mockStrategy);
        expect(device.getName()).toBe('TestDevice');
        expect(device.getMeasurements()).toEqual([]);
    });
    it('sollte Messwerte hinzufügen', () => {
        const device = new Device_1.Device('TestDevice', mockStrategy);
        device.addMeasurement(100);
        const values = device.getMeasurements().map(m => m.value);
        expect(values).toEqual([100]);
    });
});
