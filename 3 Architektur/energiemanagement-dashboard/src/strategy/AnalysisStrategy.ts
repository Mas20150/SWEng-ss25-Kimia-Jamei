/**
 * Beschreibt das Strategy-Pattern für die Analyse von Energieverbrauchsdaten.
 * Eine konkrete Strategie implementiert die Methode {@link analyze},
 * um z. B. Durchschnitt, Spitzenwert oder Einsparpotenzial zu berechnen.
 *
 * @since 1.0
 */
export interface AnalysisStrategy {
  /**
   * Analysiert ein Array numerischer Messwerte und gibt ein formatiertes Ergebnis zurück.
   *
   * @param data  Array mit Verbrauchswerten (z. B. in Watt)
   * @returns     Eine lesbare Beschreibung des Analyseergebnisses,
   *              z. B. `"Durchschnitt: 123.4 W"` oder `"Spitze: 456 W"`
   */
  analyze(data: number[]): string;
}
