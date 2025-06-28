import { Device } from "./Device.js"; // bei TS ggf. ohne .js

/**
 * Verwaltet eine Sammlung von Geräten, ermöglicht Suche und Auflistung.
 *
 * @since 1.0
 */
export class DeviceManager {
  /** Interner Speicher aller Geräte, Schlüssel ist der Geräte-Name */
  private devices = new Map<string, Device>();

  /**
   * Fügt ein neues Gerät hinzu.
   * @param device  Zu registrierendes Gerät
   * @throws Error, falls bereits ein Gerät mit gleichem Namen existiert
   */
  addDevice(device: Device): void {
    const name = device.name;
    if (this.devices.has(name)) {
      throw new Error(`Gerät mit Name "${name}" existiert bereits.`);
    }
    this.devices.set(name, device);
  }

  /**
   * Sucht ein Gerät nach Name.
   * @param name  Eindeutiger Name des Geräts
   * @returns Das Gerät oder `undefined`, falls nicht gefunden
   */
  getDevice(name: string): Device | undefined {
    return this.devices.get(name);
  }

  /**
   * Liefert eine Liste aller registrierten Geräte.
   * @returns Kopie des internen Device-Arrays
   */
  getAllDevices(): Device[] {
    return Array.from(this.devices.values());
  }

  /**
   * Entfernt ein Gerät aus dem Manager.
   * @param name  Name des zu entfernenden Geräts
   * @returns `true`, wenn das Gerät existierte und entfernt wurde, sonst `false`
   */
  removeDevice(name: string): boolean {
    return this.devices.delete(name);
  }

  /**
   * Löscht alle Geräte aus dem Manager.
   */
  clear(): void {
    this.devices.clear();
  }
}
