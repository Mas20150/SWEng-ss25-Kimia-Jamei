/**
 * Strategy zur Ermittlung des Spitzenverbrauchs.
 * Teil des Strategy-Patterns über das Interface {@link AnalysisStrategy}.
 *
 * @since 1.0
 */
import { AnalysisStrategy } from "./AnalysisStrategy.js";

export class PeakStrategy implements AnalysisStrategy {
  /**
   * Analysiert ein Array von Verbrauchswerten und gibt den höchsten Wert zurück.
   *
   * @param data  Array mit Verbrauchswerten (z. B. in Watt)
   * @returns     Formatierten Spitzenwert als String, z. B. `"Spitzenwert: 456 W"`,
   *              oder `"Keine Daten"`, falls das Array leer ist.
   */
  analyze(data: number[]): string {
    if (data.length === 0) {
      return "Keine Daten";
    }
    const peak = Math.max(...data);
    return `Spitzenwert: ${peak} W`;
  }
}
