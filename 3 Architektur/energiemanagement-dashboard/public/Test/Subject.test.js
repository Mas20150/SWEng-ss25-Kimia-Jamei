"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subject_1 = require("../src/observer/Subject");
/**
 * Dummy Observer für Tests – speichert das letzte empfangene Value.
 */
class TestObserver {
    lastValue = null;
    lastDevice = null;
    update(device, value) {
        this.lastValue = value;
        this.lastDevice = device;
    }
}
describe("Subject", () => {
    let subject;
    let observer1;
    let observer2;
    beforeEach(() => {
        subject = new Subject_1.Subject();
        observer1 = new TestObserver();
        observer2 = new TestObserver();
    });
    /**
     * Testet, ob attach() korrekt Observer registriert.
     */
    it("sollte Observer benachrichtigen", () => {
        subject.attach(observer1);
        subject.notifyObservers(42);
        expect(observer1.lastValue).toBe(42);
    });
    /**
     * Testet, ob detach() korrekt funktioniert.
     */
    it("sollte entfernte Observer nicht mehr benachrichtigen", () => {
        subject.attach(observer1);
        subject.attach(observer2);
        subject.detach(observer1);
        subject.notifyObservers(99);
        expect(observer1.lastValue).toBeNull();
        expect(observer2.lastValue).toBe(99);
    });
    /**
     * Testet notifyObservers() ohne Observer (sollte keine Fehler werfen).
     */
    it("sollte ohne Observer keine Fehler werfen", () => {
        expect(() => subject.notifyObservers(10)).not.toThrow();
    });
});
