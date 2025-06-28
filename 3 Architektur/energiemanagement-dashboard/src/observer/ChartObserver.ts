import { Observer } from "./Observer.js";
import { Device } from "../core/Device.js";

// Chart.js wird über CDN eingebunden
declare const Chart: any;

/**
 * Der ChartObserver ist ein konkreter Observer, der ein Diagramm
 * für ein bestimmtes Device rendert und aktualisiert.
 * Er reagiert auf neue Messwerte und Benutzerinteraktionen wie Filter,
 * Einheit oder Diagrammtyp.
 */
export class ChartObserver implements Observer {
  private chart: any;
  private valueEl: HTMLSpanElement;
  private avgEl: HTMLSpanElement;
  private peakEl: HTMLSpanElement;
  private selectEl: HTMLSelectElement;
  private chartTypeEl: HTMLSelectElement;
  private energyTypeEl: HTMLParagraphElement;
  private unitEl: HTMLSelectElement;
  private unit: string = "W";
  private box: HTMLElement;
  private device!: Device;

  /** Aktuell gewählter Zeitfilter in Minuten (z. B. 1, 5, 15, 60 oder Infinity) */
  public currentFilterMinutes = 1;

  /**
   * Erstellt einen neuen ChartObserver für ein Gerät
   * und initialisiert UI-Elemente wie Zeitfilter, Einheit und Diagrammtyp.
   *
   * @param canvas - Die Zeichenfläche für das Chart
   * @param box - Die UI-Box, in die alle Elemente eingefügt werden
   * @param device - Das zu beobachtende Gerät
   */
  constructor(canvas: HTMLCanvasElement, box: HTMLElement, device: Device) {
    this.box = box;
    this.device = device;

    // Referenz auf aktuelle Verbrauchsanzeige
    this.valueEl = box.querySelector(".value")!;
    this.avgEl = document.createElement("span");
    this.peakEl = document.createElement("span");

    // Energie-Typ anzeigen
    this.energyTypeEl = document.createElement("p");
    this.energyTypeEl.className = "energy-type";
    this.box.insertBefore(this.energyTypeEl, canvas);

    // Einheit-Dropdown (gerätsspezifisch)
    this.unitEl = document.createElement("select");
    this.unitEl.className = "unit-select";

    // HTML-Optionen einfügen
    this.unitEl.innerHTML = `
      <option disabled selected>📐 Einheit wählen</option>
      <option value="W">Watt (W)</option>
      <option value="kWh">Kilowattstunde (kWh)</option>
      <option value="J">Joule (J)</option>
    `;

    this.box.insertBefore(this.unitEl, canvas);

    // Gespeicherte Einheit vom Gerät prüfen & setzen
    const savedUnit = this.device.getUnit();
    if (["W", "kWh", "J"].includes(savedUnit)) {
      this.unit = savedUnit;
      this.unitEl.value = savedUnit;
    } else {
      this.unit = ""; // lässt Platzhalter aktiv
    }

    // Nur EINZIGER Event Listener hier – das reicht
    this.unitEl.addEventListener("change", () => {
      const selected = this.unitEl.value;
      this.unit = selected;
      this.device.setUnit(selected);
      this.refreshChart();
    });

    // Zeitfilter-Dropdown
    this.selectEl = document.createElement("select");
    this.selectEl.className = "range-select";
    this.selectEl.innerHTML = `
      <option disabled selected>⏱️ Zeitraum wählen</option>
      <option value="1">Letzte 1 Min</option>
      <option value="5">Letzte 5 Min</option>
      <option value="15">Letzte 15 Min</option>
      <option value="60">Letzte 60 Min</option>
      <option value="all">Alle</option>
    `;
    this.box.insertBefore(this.selectEl, canvas);

    this.selectEl.addEventListener("change", () => {
      const val = this.selectEl.value;
      this.currentFilterMinutes = val === "all" ? Infinity : parseInt(val);
      this.refreshChart();
    });

    // Diagrammtyp-Dropdown
    this.chartTypeEl = document.createElement("select");
    this.chartTypeEl.className = "chart-type-select";
    this.chartTypeEl.innerHTML = `
      <option disabled selected>📊 Diagramm wählen</option>
      <option value="line">Linie</option>
      <option value="bar">Balken</option>
      <option value="scatter">Punkte</option>
    `;
    this.box.insertBefore(this.chartTypeEl, canvas);

    this.chartTypeEl.addEventListener("change", () => {
      const type = this.chartTypeEl.value;
      this.setChartType(type);
    });

    // Initiales Chart erstellen
    this.chart = new Chart(canvas, {
      type: "line",
      data: {
        labels: [],
        datasets: [{
          label: `Verbrauch (${this.unit})`,
          data: [],
          borderColor: "blue",
          backgroundColor: "lightblue",
          tension: 0.2,
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { display: false },
          y: { beginAtZero: true }
        }
      }
    });
 
    this.refreshChart();
  }

  /**
   * Ändert den Typ des Diagramms (z. B. Linie, Balken, Scatter).
   *
   * @param type - Typ des Charts
   */
  public setChartType(type: string) {
    this.chart.config.type = type;
    this.chart.update();
  }

  /**
   * Update-Funktion gemäß Observer-Schnittstelle:
   * Wird aufgerufen, wenn das Device neue Daten liefert.
   *
   * @param device - Das beobachtete Gerät
   * @param value - Der neue Messwert
   */
  update(device: Device, value: number): void {
    this.device = device;
    this.unit = device.getUnit(); // Aktuelle Einheit übernehmen
    if (["W", "kWh", "J"].includes(this.unit)) {
      this.unitEl.value = this.unit;
    } else {
      this.unitEl.selectedIndex = 0; // zurück auf Platzhalter
    }

    this.refreshChart();
  }

  /**
   * Aktualisiert das Diagramm sowie die statistischen Werte
   * wie aktuellen, durchschnittlichen und höchsten Verbrauch.
   */
  private refreshChart() {
    const values = this.currentFilterMinutes === Infinity
      ? this.device.getMeasurements().map(m => m.value)
      : this.device.getMeasurementsInRange(this.currentFilterMinutes);

    // Umrechnungsfaktor je nach gewählter Einheit
    const factor = this.unit === "kWh" ? 0.001 : this.unit === "J" ? 3600 : 1;
    const converted = values.map(v => v * factor);

    // Berechnung der Analysewerte
    const latest = converted.length > 0 ? converted[converted.length - 1] : 0;
    const avg = converted.length ? converted.reduce((a, b) => a + b, 0) / converted.length : 0;
    const peak = converted.length ? Math.max(...converted) : 0;

    // Chart-Daten aktualisieren
    this.chart.data.labels = values.map((_, i) => i.toString());
    this.chart.data.datasets[0].data = converted;
    this.chart.data.datasets[0].label = `Verbrauch (${this.unit})`;
    this.chart.update();

    // Statistiken in die UI schreiben
    this.valueEl.textContent = latest.toFixed(1);
    this.avgEl.textContent = avg.toFixed(1);
    this.peakEl.textContent = peak.toFixed(1);
    this.energyTypeEl.textContent = `Typ: ${this.device.getEnergyType()}`;

    // Einheit im Text "Aktuell: ..." aktualisieren
    this.box.querySelector(".unit")!.textContent = this.unit;
    this.updateAnalysis();
  }

  /**
 * Führt die Analyse mit aktueller Strategy aus
 * und schreibt das Ergebnis mit Einheit in die UI.
 */
private updateAnalysis() {
  const analysisOutput = this.box.querySelector(".analysis-output") as HTMLSpanElement;
  if (this.selectEl.selectedIndex === 0) {
    analysisOutput.textContent = "Bitte Analyse auswählen";
    return;
  }
  analysisOutput.textContent = `${this.device.analyze()} ${this.unit}`;
  }
}
