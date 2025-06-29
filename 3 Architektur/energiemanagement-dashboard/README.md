# Energieverbrauchs-Dashboard – Software Engineering SS25

Dieses Projekt wurde im Rahmen der Lehrveranstaltung **Software Engineering** im Sommersemester 2025 entwickelt. Es handelt sich um ein webbasiertes Dashboard zur Verwaltung, Visualisierung und Analyse von Energieverbrauchsdaten für Haushalte oder kleine Unternehmen.

---

## 📦 Projektübersicht

- Visualisierung des Energieverbrauchs in Diagrammen (Chart.js)
- Analyse mit Hilfe von Strategiemustern (z. B. Durchschnitt, Sparpotenzial, Spitzenwerte)
- Dynamisches Hinzufügen und Verwalten von Geräten
- Implementierung von Observer- und Strategy-Designpatterns
- Deployment via **GitHub Pages**
- Modulare und erweiterbare Architektur mit TypeScript

### 🔧 Warum enthält das Projekt auch JavaScript-Dateien?

Obwohl das Projekt hauptsächlich in TypeScript entwickelt wurde, befinden sich einige JavaScript-Dateien im Repository. Diese stammen aus folgenden Gründen:

- Build-Prozess: Die JavaScript-Dateien sind das kompilierte Ergebnis aus TypeScript (.ts ➝ .js) und werden zur Laufzeit benötigt (z. B. bei - Deployment mit GitHub Pages).

- Kompatibilität: Manche Build-Tools oder Testumgebungen greifen direkt auf .js-Dateien zurück.

- CI/CD: Zur Unterstützung des automatisierten Deployments mussten auch fertige JS-Dateien in das Repository aufgenommen werden, um sicherzustellen, dass alles ohne lokale TypeScript-Kompilierung funktioniert.

Diese Dateien sind also notwendig für die Ausführung und das Deployment, nicht manuell geschrieben

---

## 📂 Hinweise zur Abgabe & GitLab-Störung

Aufgrund technischer Probleme mit der **GitLab-Instanz der Hochschule** war es mir nicht möglich, die vollständige Test- und Deployment-Konfiguration direkt in GitLab bereitzustellen.

**Lösung**:  
Ich habe das gesamte Repository inklusive aller notwendigen Konfigurationsdateien und Testfälle zusätzlich auf GitHub verfügbar gemacht:

👉 GitHub-Link zum vollständigen Repository:  
**https://github.com/Mas20150/SWEng-ss25-Kimia-Jamei.git**

👉 Live-Demo (Deployment via GitHub Pages):  
**https://mas20150.github.io/SWEng-ss25-Kimia-Jamei/**

---

## 🚀 Lokale Ausführung

- Repository klonen
```bash
git clone https://github.com/Mas20150/SWEng-ss25-Kimia-Jamei.git
```

- Abhängigkeiten installieren
```bash
npm install
```

- TypeScript kompilieren
```bash
npx tsc
```

- Projekt starten
```bash
npm start
```

- Tests ausführen
```bash
npm test
```
---

## 👩‍💻 Autorin

**Kimia Jamei**  
- Mas201
- Matrikelnummer: 949738
- Hochschule Mainz  
- Software Engineering – Sommersemester 2025