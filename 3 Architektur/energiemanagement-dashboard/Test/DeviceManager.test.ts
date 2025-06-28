import { Device } from '../src/core/Device';
import { DeviceManager } from '../src/core/DeviceManager';

describe('DeviceManager', () => {
  it('sollte ein Gerät registrieren', () => {
    const manager = new DeviceManager();
    const device = new Device('TestDevice');
    manager.registerDevice(device);
    expect(manager.getDevices().length).toBe(1);
  });

  it('sollte ein Gerät entfernen', () => {
    const manager = new DeviceManager();
    const device = new Device('TestDevice');
    manager.registerDevice(device);
    manager.removeDevice('TestDevice');
    expect(manager.getDevices().length).toBe(0);
  });
});
