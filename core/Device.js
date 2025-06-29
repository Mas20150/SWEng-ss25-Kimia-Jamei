import { Subject } from "../observer/Subject.js";
/**
 * Repräsentiert ein Gerät, das Messwerte aufnimmt und analysiert.
 * Es erbt vom Subject, sodass es Observer über neue Messwerte informieren kann.
 */
export class Device extends Subject {
    /**
     * Erstellt ein neues Device.
     *
     * @param name - Der sichtbare Name des Geräts
     * @param defaultStrategy - Die Standard-Analysemethode
     * @param energyType - Der Typ der Energiequelle (z. B. "Strom", "Gas")
     */
    constructor(name, defaultStrategy, energyType = "Allgemein") {
        super();
        this.name = name;
        this.energyType = energyType;
        this.measurements = [];
        this.unit = "";
        this.strategy = defaultStrategy;
    }
    /**
     * Gibt den Namen des Geräts zurück.
     */
    getName() {
        return this.name;
    }
    /**
     * Fügt eine neue Messung hinzu und benachrichtigt alle Observer.
     *
     * @param value - Der gemessene Verbrauchswert
     */
    addMeasurement(value) {
        const m = {
            value,
            timestamp: Date.now()
        };
        this.measurements.push(m);
        this.notifyObservers(value);
    }
    /**
     * Gibt alle gespeicherten Messungen zurück.
     */
    getMeasurements() {
        return this.measurements;
    }
    /**
     * Gibt alle Messwerte innerhalb eines bestimmten Zeitfensters zurück.
     *
     * @param minutes - Zeitfenster in Minuten
     * @returns Array mit Messwerten im angegebenen Zeitraum
     */
    getMeasurementsInRange(minutes) {
        const cutoff = Date.now() - minutes * 60 * 1000;
        return this.measurements
            .filter((m) => m.timestamp >= cutoff)
            .map((m) => m.value);
    }
    /**
     * Setzt die Analyse-Strategie für dieses Gerät.
     *
     * @param strategy - Neue Analyse-Strategie (z. B. Durchschnitt, Spitze)
     */
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    /**
     * Führt die Analyse über alle Messwerte mit der aktuellen Strategie aus.
     *
     * @returns Analyseergebnis als Text
     */
    analyze() {
        return this.strategy.analyze(this.measurements.map(m => m.value));
    }
    /**
     * Gibt den Energie-Typ des Geräts zurück.
     */
    getEnergyType() {
        return this.energyType;
    }
    /**
     * Setzt den Energie-Typ des Geräts.
     *
     * @param type - Neuer Energie-Typ (z. B. "Strom")
     */
    setEnergyType(type) {
        this.energyType = type;
    }
    /**
     * Gibt die aktuell eingestellte Einheit zurück.
     */
    getUnit() {
        return this.unit;
    }
    /**
     * Setzt die verwendete Einheit (z. B. "W", "kWh", "J").
     *
     * @param unit - Neue Einheit
     */
    setUnit(unit) {
        this.unit = unit;
    }
}
