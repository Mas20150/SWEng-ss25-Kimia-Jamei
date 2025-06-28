/**
 * Strategy zur Berechnung des Energie­einsparpotenzials.
 * Teil des Strategy-Patterns über das Interface {@link AnalysisStrategy}.
 *
 * @since 1.0
 */
import { AnalysisStrategy } from "./AnalysisStrategy.js";

export class SavingPotentialStrategy implements AnalysisStrategy {
  /**
   * Analysiert ein Array von Verbrauchswerten und schätzt ein Einsparpotenzial von 20 % des Durchschnitts.
   *
   * @param data  Array mit Verbrauchswerten (z. B. in Watt)
   * @returns     Formatierten Sparwert als String, z. B. `"Sparpotenzial: ~12.3 W"`,
   *              oder `"Keine Daten"`, falls das Array leer ist.
   */
  analyze(data: number[]): string {
    if (data.length === 0) {
      return "Keine Daten";
    }
    const sum = data.reduce((acc, v) => acc + v, 0);
    const avg = sum / data.length;
    const potential = avg * 0.2;
    return `Sparpotenzial: ~${potential.toFixed(1)} W`;
  }
}
