"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeakStrategy = void 0;
class PeakStrategy {
    /**
     * Analysiert ein Array von Verbrauchswerten und gibt den höchsten Wert zurück.
     *
     * @param data  Array mit Verbrauchswerten (z. B. in Watt)
     * @returns     Formatierten Spitzenwert als String, z. B. `"Spitzenwert: 456 W"`,
     *              oder `"Keine Daten"`, falls das Array leer ist.
     */
    analyze(data) {
        if (data.length === 0) {
            return "Keine Daten";
        }
        const peak = Math.max(...data);
        return `Spitzenwert: ${peak} W`;
    }
}
exports.PeakStrategy = PeakStrategy;
