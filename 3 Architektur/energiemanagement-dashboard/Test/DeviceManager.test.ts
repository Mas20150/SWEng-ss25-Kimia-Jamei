import { DeviceManager } from "../src/core/DeviceManager";
import { Device } from "../src/core/Device";
import { AnalysisStrategy } from "../src/strategy/AnalysisStrategy";

/**
 * Dummy-Strategie zur Verwendung mit Test-Devices.
 * Diese Strategie wird im Test selbst nicht ausgewertet.
 */
const mockStrategy: AnalysisStrategy = {
  analyze: (values: number[]) => `Mock: ${values.length} Werte`
};

describe("DeviceManager", () => {
  let manager: DeviceManager;

  // Vor jedem Test: neuen Manager erstellen
  beforeEach(() => {
    manager = new DeviceManager();
  });

  /**
   * Testet, ob ein Gerät korrekt hinzugefügt und anschließend gefunden werden kann.
   */
  it("sollte Gerät hinzufügen und finden", () => {
    const device = new Device("Kühlschrank", mockStrategy);
    manager.addDevice(device);

    const found = manager.getDevice("Kühlschrank");
    expect(found).toBeDefined();
    expect(found?.getName()).toBe("Kühlschrank");
  });

  /**
   * Testet, ob ein Fehler geworfen wird, wenn zwei Geräte mit gleichem Namen hinzugefügt werden.
   */
  it("sollte Fehler werfen bei Duplikat", () => {
    const d1 = new Device("Heizung", mockStrategy);
    const d2 = new Device("Heizung", mockStrategy);
    manager.addDevice(d1);

    expect(() => manager.addDevice(d2)).toThrow('Gerät mit Name "Heizung" existiert bereits.');
  });

  /**
   * Testet, ob alle hinzugefügten Geräte korrekt in einer Liste zurückgegeben werden.
   */
  it("sollte alle Geräte zurückgeben", () => {
    const d1 = new Device("Lampe", mockStrategy);
    const d2 = new Device("TV", mockStrategy);

    manager.addDevice(d1);
    manager.addDevice(d2);

    const allDevices = manager.getAllDevices().map(d => d.getName());
    expect(allDevices).toEqual(expect.arrayContaining(["Lampe", "TV"]));
  });

  /**
   * Testet das Entfernen eines existierenden Geräts.
   */
  it("sollte Gerät entfernen", () => {
    const device = new Device("Toaster", mockStrategy);
    manager.addDevice(device);

    const result = manager.removeDevice("Toaster");
    expect(result).toBe(true);
    expect(manager.getDevice("Toaster")).toBeUndefined();
  });

  /**
   * Testet, ob `removeDevice` `false` zurückgibt, wenn Gerät nicht existiert.
   */
  it("sollte false zurückgeben bei unbekanntem Gerät", () => {
    const result = manager.removeDevice("Nonexistent");
    expect(result).toBe(false);
  });

  /**
   * Testet das vollständige Zurücksetzen aller Geräte.
   */
  it("sollte alle Geräte löschen", () => {
    manager.addDevice(new Device("A", mockStrategy));
    manager.addDevice(new Device("B", mockStrategy));
    manager.clear();

    expect(manager.getAllDevices()).toHaveLength(0);
  });
});
