/**
 * Interface für Beobachter, die auf Änderungen eines Device reagieren.
 * Teil des Observer-Patterns: Ein Subject (Device) informiert registrierte Observer,
 * sobald ein neuer Messwert hinzugefügt wurde.
 *
 * @since 1.0
 */
import { Device } from "../core/Device.js";

export interface Observer {
  /**
   * Wird aufgerufen, wenn das beobachtete Device einen neuen Messwert hat.
   *
   * @param device  Das Device, das die Änderung ausgelöst hat.
   * @param value   Der neu hinzugefügte Messwert (roher Watt-Wert).
   */
  update(device: Device, value: number): void;
}
