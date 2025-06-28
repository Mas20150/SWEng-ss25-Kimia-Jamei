import { ChartObserver } from "../src/observer/ChartObserver";
import { Device } from "../src/core/Device";
import { AnalysisStrategy } from "../src/strategy/AnalysisStrategy";

/**
 * Dummy-Strategie zur Verwendung mit Test-Devices.
 */
const mockStrategy: AnalysisStrategy = {
  analyze: (values: number[]) => `Mock: ${values.length} Werte`
};

/**
 * Erstellt eine simulierte HTML-Umgebung mit benötigten Elementen.
 * @returns canvas und container-Element
 */
function createDOM(): { canvas: HTMLCanvasElement; box: HTMLElement } {
  document.body.innerHTML = `
    <div id="box">
      <span class="value"></span>
      <span class="unit"></span>
      <span class="analysis-output"></span>
      <canvas></canvas>
    </div>
  `;
  const box = document.getElementById("box")!;
  const canvas = box.querySelector("canvas")!;
  return { canvas, box };
}

// Chart.js-Mock: verhindert echten Aufruf (weil via CDN eingebunden)
(globalThis as any).Chart = class {
  config = { type: "" };
  data = {
    labels: [],
    datasets: [{ data: [], label: "", borderColor: "", backgroundColor: "" }]
  };
  update() {}
};

describe("ChartObserver", () => {
  let device: Device;
  let observer: ChartObserver;

  beforeEach(() => {
    device = new Device("Testgerät", mockStrategy);
    const { canvas, box } = createDOM();
    observer = new ChartObserver(canvas, box, device);
  });

  /**
   * Testet, ob Diagrammtyp korrekt gesetzt wird.
   */
  it("sollte Diagrammtyp setzen", () => {
    observer.setChartType("bar");
    expect(observer["chart"].config.type).toBe("bar");
  });

  /**
   * Testet, ob Messwerte nach Update übernommen werden.
   */
  it("sollte Diagramm und Einheit beim Update aktualisieren", () => {
    device.setUnit("kWh");
    device.addMeasurement(1000);
    observer.update(device, 1000);

    expect(observer["unit"]).toBe("kWh");
    expect(observer["chart"].data.datasets[0].data.length).toBeGreaterThan(0);
  });

  /**
   * Testet, ob Analyse-Ausgabe korrekt gerendert wird.
   */
  it("sollte Analyse-Ausgabe anzeigen", () => {
    // Manuelle Auswahl simulieren
    const selectEl = document.querySelector(".range-select") as HTMLSelectElement;
    selectEl.selectedIndex = 1; // z. B. 1 Min

    device.addMeasurement(100);
    observer["updateAnalysis"]();

    const analysisText = document.querySelector(".analysis-output")!.textContent;
    expect(analysisText).toContain("Mock:"); // Strategie-Ergebnis sichtbar
  });
});
