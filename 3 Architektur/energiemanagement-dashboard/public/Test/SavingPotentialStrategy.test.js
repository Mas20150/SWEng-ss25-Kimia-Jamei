"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SavingPotentialStrategy_1 = require("../src/strategy/SavingPotentialStrategy");
/**
 * Testet die Sparpotenzial-Berechnung bei typischen Verbrauchsdaten.
 */
describe("SavingPotentialStrategy", () => {
    it("sollte korrektes Sparpotenzial berechnen", () => {
        const strategy = new SavingPotentialStrategy_1.SavingPotentialStrategy();
        const result = strategy.analyze([100, 200, 300]); // Durchschnitt = 200
        expect(result).toBe("Sparpotenzial: ~40.0 W");
    });
    /**
     * Testet, ob bei leeren Daten korrekt 'Keine Daten' zurückgegeben wird.
     */
    it("sollte 'Keine Daten' zurückgeben bei leerem Array", () => {
        const strategy = new SavingPotentialStrategy_1.SavingPotentialStrategy();
        const result = strategy.analyze([]);
        expect(result).toBe("Keine Daten");
    });
    /**
     * Testet Formatierung bei gebrochenen Durchschnittswerten.
     */
    it("sollte korrekt auf eine Nachkommastelle runden", () => {
        const strategy = new SavingPotentialStrategy_1.SavingPotentialStrategy();
        const result = strategy.analyze([10, 15]); // Durchschnitt = 12.5 → Spar = 2.5
        expect(result).toBe("Sparpotenzial: ~2.5 W");
    });
});
