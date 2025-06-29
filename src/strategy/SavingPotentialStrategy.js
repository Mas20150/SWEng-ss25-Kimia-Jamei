"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavingPotentialStrategy = void 0;
class SavingPotentialStrategy {
    /**
     * Analysiert ein Array von Verbrauchswerten und schätzt ein Einsparpotenzial von 20 % des Durchschnitts.
     *
     * @param data  Array mit Verbrauchswerten (z. B. in Watt)
     * @returns     Formatierten Sparwert als String, z. B. `"Sparpotenzial: ~12.3 W"`,
     *              oder `"Keine Daten"`, falls das Array leer ist.
     */
    analyze(data) {
        if (data.length === 0) {
            return "Keine Daten";
        }
        const sum = data.reduce((acc, v) => acc + v, 0);
        const avg = sum / data.length;
        const potential = avg * 0.2;
        return `Sparpotenzial: ~${potential.toFixed(1)} W`;
    }
}
exports.SavingPotentialStrategy = SavingPotentialStrategy;
