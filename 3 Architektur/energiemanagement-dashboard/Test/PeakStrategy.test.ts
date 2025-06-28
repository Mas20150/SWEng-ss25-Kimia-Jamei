import { PeakStrategy } from "../src/strategy/PeakStrategy";

/**
 * Testet die PeakStrategy, die den höchsten Verbrauchswert aus einer Liste ermittelt.
 */
describe("PeakStrategy", () => {
  /**
   * Testet korrekte Ermittlung des Spitzenwerts.
   */
  it("sollte höchsten Wert korrekt finden", () => {
    const strategy = new PeakStrategy();
    const result = strategy.analyze([100, 250, 400, 180]);
    expect(result).toBe("Spitzenwert: 400 W");
  });

  /**
   * Testet Verhalten bei leerem Array.
   */
  it("sollte 'Keine Daten' zurückgeben bei leerem Array", () => {
    const strategy = new PeakStrategy();
    const result = strategy.analyze([]);
    expect(result).toBe("Keine Daten");
  });

  /**
   * Testet korrektes Verhalten bei negativen Werten.
   */
  it("sollte mit negativen Werten korrekt umgehen", () => {
    const strategy = new PeakStrategy();
    const result = strategy.analyze([-10, -5, -20]);
    expect(result).toBe("Spitzenwert: -5 W");
  });

  /**
   * Testet Verhalten bei nur einem Wert.
   */
  it("sollte bei einem Wert diesen korrekt zurückgeben", () => {
    const strategy = new PeakStrategy();
    const result = strategy.analyze([123]);
    expect(result).toBe("Spitzenwert: 123 W");
  });
});
