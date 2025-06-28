export class AverageStrategy {
    /**
     * Analysiert ein Array von Verbrauchswerten und gibt den Durchschnitt aus.
     * @param data  Array mit Verbrauchswerten (z. B. in Watt)
     * @returns     Formatierten Durchschnitt als String (z. B. "Durchschnitt: 123.4 W")
     *              oder "Keine Daten", falls kein Wert vorliegt.
     */
    analyze(data) {
        if (data.length === 0) {
            return "Keine Daten";
        }
        const sum = data.reduce((acc, v) => acc + v, 0);
        const avg = sum / data.length;
        return `Durchschnitt: ${avg.toFixed(1)} W`;
    }
}
