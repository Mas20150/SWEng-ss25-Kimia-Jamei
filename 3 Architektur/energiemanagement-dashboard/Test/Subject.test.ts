import { Subject } from "../src/observer/Subject";
import { Device } from "../src/core/Device";

/**
 * Dummy Observer für Tests – speichert das letzte empfangene Value.
 */
class TestObserver {
  public lastValue: number | null = null;
  public lastDevice: Device | null = null;

  update(device: Device, value: number): void {
    this.lastValue = value;
    this.lastDevice = device;
  }
}

describe("Subject", () => {
  let subject: Subject;
  let observer1: TestObserver;
  let observer2: TestObserver;

  beforeEach(() => {
    subject = new Subject();
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
