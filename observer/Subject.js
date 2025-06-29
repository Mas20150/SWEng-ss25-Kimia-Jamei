/**
 * Das Subject ist das beobachtbare Objekt im Observer-Pattern.
 * Es verwaltet eine Liste von Observern und benachrichtigt sie bei Änderungen.
 */
export class Subject {
    constructor() {
        /** Liste aller registrierten Beobachter (Observer) */
        this.observers = [];
    }
    /**
     * Registriert einen neuen Observer, der benachrichtigt werden soll.
     *
     * @param observer - Das Observer-Objekt, das hinzugefügt wird
     */
    attach(observer) {
        this.observers.push(observer);
    }
    /**
     * Entfernt einen Observer aus der Liste, sodass er nicht mehr benachrichtigt wird.
     *
     * @param observer - Das Observer-Objekt, das entfernt wird
     */
    detach(observer) {
        this.observers = this.observers.filter(o => o !== observer);
    }
    /**
     * Benachrichtigt alle registrierten Observer über eine Änderung.
     * Der aktuelle Wert wird dabei übergeben.
     *
     * @param value - Der neue Wert, der an die Observer weitergegeben wird
     */
    notifyObservers(value) {
        for (const observer of this.observers) {
            observer.update(this, value);
        }
    }
}
