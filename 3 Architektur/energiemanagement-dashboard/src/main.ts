/**
 * main.ts
 * Entry-Point für das Energiemanagement-Dashboard:
 * - Erstellt Devices (Standard + per Formular)
 * - Verknüpft UI-Elemente mit Device-Instanzen via Observer & Strategy
 * - Startet Simulation, globale Analyse & Zusammenfassung
 *
 * @since 1.0
 */

import { Device } from "./core/Device.js";
import { DeviceManager } from "./core/DeviceManager.js";
import { ChartObserver } from "./observer/ChartObserver.js";
import { AverageStrategy } from "./strategy/AverageStrategy.js";
import { PeakStrategy } from "./strategy/PeakStrategy.js";
import { SavingPotentialStrategy } from "./strategy/SavingPotentialStrategy.js";

// Zentrale Verwaltung aller Geräte
const manager = new DeviceManager();

// DOM-Elemente für das Dashboard und das Geräteformular
const dashboard = document.getElementById("dashboard")!;
const form = document.getElementById("add-form") as HTMLFormElement;
const input = document.getElementById("device-input") as HTMLInputElement;
const typeSelect = document.getElementById("energy-type-select") as HTMLSelectElement;

// Beobachter‐Map, um bei globaler Analyse auf Filter und Einheit zuzugreifen
const observerMap: Map<Device, ChartObserver> = new Map();

/**
 * Entry-Point: Legt drei Standard-Devices an und bindet
 * das Formular zum Hinzufügen neuer Geräte.
 */
createDevice("Kühlschrank", "Strom");
createDevice("Heizung", "Strom");
createDevice("Waschmaschine", "Strom");

// EventListener zum Hinzufügen neuer Geräte via Formular
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = input.value.trim();
  const type = "Strom";

  // Nur hinzufügen, wenn Name vergeben und noch nicht vorhanden
  if (name && !manager.getDevice(name)) {
    createDevice(name, type);
    input.value = "";
    typeSelect.selectedIndex = 0;
  }
});

/**
 * Erstellt eine neue Device-Box im Dashboard mit Observer, UI-Elementen
 * und Mess-Simulation.
 *
 * @param name - Anzeigename des Geräts
 * @param energyType - Typ der Energiequelle (z.B. "Strom", "Gas")
 */
function createDevice(name: string, energyType: string) {
  const device = new Device(name, new AverageStrategy(), energyType);
  manager.addDevice(device);

  // UI-Box (Accordion)
  const box = document.createElement("div");
  box.className = "device-box";
  box.innerHTML = `
    <div class="device-header">
      <h2>${name}</h2>
    </div>
    <div class="device-content collapsed">
      <p>Aktuell: <span class="value">0</span> <span class="unit">W</span></p>
      <canvas></canvas>

      <label>Analyse:
        <select class="strategy-select">
          <option disabled selected>⚙️ Analyse wählen</option>
          <option value="avg">Durchschnitt</option>
          <option value="peak">Spitze</option>
          <option value="saving">Einsparung</option>
        </select>
      </label>
      <p><span class="analysis-output">Analyse folgt…</span></p>
    </div>
  `;
  dashboard.appendChild(box);

  // Accordion-Logik: Inhalt auf-/zuklappen
  const header = box.querySelector(".device-header")!;
  const content = box.querySelector(".device-content")!;
  header.addEventListener("click", () => {
    content.classList.toggle("collapsed");
  });

  // Observer-Initialisierung mit zugehörigem Canvas
  const canvas = box.querySelector("canvas") as HTMLCanvasElement;
  const contentElement = content as HTMLElement;
  const observer = new ChartObserver(canvas, contentElement, device);
  device.attach(observer);
  observerMap.set(device, observer);

  // Dropdown für Strategiewechsel (z. B. Durchschnitt, Spitze, Einsparung)
  const strategySelect = box.querySelector(".strategy-select") as HTMLSelectElement;
  const analysisOutput = box.querySelector(".analysis-output") as HTMLSpanElement;
  strategySelect.addEventListener("change", () => {
    switch (strategySelect.value) {
      case "avg":
        device.setStrategy(new AverageStrategy());
        break;
      case "peak":
        device.setStrategy(new PeakStrategy());
        break;
      case "saving":
        device.setStrategy(new SavingPotentialStrategy());
        break;
    }
    updateAnalysis();
  });

  /**
   * Führt Analyse mit aktueller Strategy durch
   * und zeigt das Ergebnis im Gerät an.
   */
  const updateAnalysis = () => {
    if (strategySelect.selectedIndex === 0) {
      analysisOutput.textContent = "Bitte Analyse auswählen";
      return;
    }
    analysisOutput.textContent = `${device.analyze()} ${device.getUnit()}`;
  }

  // Simulation: Alle 3 Sekunden ein zufälliger Messwert zwischen 100–500
  setInterval(() => {
    const simulated = Math.floor(Math.random() * 400 + 100);
    device.addMeasurement(simulated);
    updateAnalysis();
  }, 3000);
}

/**
 * Globale Analyse aller Messwerte aller Geräte mit Durchschnittsstrategie.
 * Wird alle 5 Sekunden automatisch aktualisiert.
 */
const strategy = new AverageStrategy();
const analysisEl = document.querySelector(".analysis span")!;
setInterval(updateGlobalAnalysis, 5000);

/**
 * Berechnet den Gesamtverbrauch aller Geräte
 * anhand des aktiven Filters (z. B. Zeitbereich).
 */
function updateGlobalAnalysis() {
  const allValues: number[] = [];

  for (const device of manager.getAllDevices()) {
    const observer = observerMap.get(device);
    if (!observer) continue;

    const rangeMin = observer.currentFilterMinutes;
    const values =
      rangeMin === Infinity
        ? device.getMeasurements().map((m) => m.value)
        : device.getMeasurementsInRange(rangeMin);

    allValues.push(...values);
  }

  if (allValues.length > 0) {
    analysisEl.textContent = strategy.analyze(allValues);
  }
}

/**
 * Aktualisiert die Übersichtsanzeige in der Sidebar:
 * Anzahl Geräte, Messwerte, aktuelle Summe, Durchschnitt, Höchstwert.
 * Läuft alle 5 Sekunden.
 */
setInterval(updateOverviewBox, 5000);

/**
 * Berechnet Übersichtswerte aller Geräte und schreibt sie in die UI.
 */
function updateOverviewBox() {
  const devices = manager.getAllDevices();
  const firstObserver = observerMap.get(devices[0]);
  const unit = firstObserver ? firstObserver["unit"] : "W";

  const allMeasurements = devices.flatMap((d) => d.getMeasurements());
  const allValues = allMeasurements.map((m) => m.value);

  const currentSum = devices.reduce((acc, d) => {
    const last = d.getMeasurements().at(-1);
    return acc + (last ? last.value : 0);
  }, 0);
  const avg = allValues.length
    ? allValues.reduce((a, b) => a + b, 0) / allValues.length
    : 0;
  const peak = allValues.length ? Math.max(...allValues) : 0;

  document.querySelector(".sum-devices")!.textContent = devices.length.toString();
  document.querySelector(".sum-measurements")!.textContent = allMeasurements.length.toString();
  document.querySelector(".sum-current")!.textContent = currentSum.toFixed(1);
  document.querySelector(".sum-avg")!.textContent = avg.toFixed(1);
  document.querySelector(".sum-peak")!.textContent = peak.toFixed(1);
  document.querySelector(".global-avg")!.textContent = avg.toFixed(1);

  // Einheit überall einfügen
  document.querySelectorAll(".unit-global").forEach((el) => {
    el.textContent = unit;
  });
}

