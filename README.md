# 🐾 Pet Store Frontend Application

Ein vollständiges React/TypeScript Frontend für die Verwaltung von Haustieren, basierend auf der OpenAPI Petstore Spezifikation.

## ✅ Projektübersicht

Dieses Projekt implementiert:
- ✅ **React Frontend** mit TypeScript
- ✅ **Mock Backend** basierend auf OpenAPI-Spezifikation
- ✅ **Create Pet Funktion** (POST /pet)
- ✅ **Search Pet Funktion** (GET /pet/{petId})
- ✅ **Vollständige Typsicherheit** mit TypeScript
- ✅ **Moderne UI** mit React Komponenten

## 🚀 Schnellstart

### Installation

```bash
npm install
```

### Development Server starten

```bash
npm run dev
```

Die Anwendung läuft dann auf: **http://localhost:5173/** (oder einem anderen Port, falls 5173 belegt ist)

### Verification Tests ausführen

```bash
npx tsx src/verification-tests.ts
```

## 📁 Projektstruktur

```
src/
├── types/
│   └── pet.types.ts          # TypeScript Interfaces basierend auf OpenAPI
├── services/
│   └── petApi.service.ts     # Mock Backend API Service
├── components/
│   ├── CreatePet.tsx         # Komponente zum Erstellen von Pets
│   ├── CreatePet.css
│   ├── SearchPet.tsx         # Komponente zum Suchen von Pets
│   └── SearchPet.css
├── App.tsx                   # Haupt-App-Komponente mit Tab-Navigation
├── App.css                   # App-Styling
├── verification-tests.ts     # Automatisierte Verifikationstests
└── main.tsx                  # React Entry Point
```

## 🧪 Verifikation

### Test-Ergebnisse

Alle Verifikationstests wurden erfolgreich bestanden:

```
📊 VERIFICATION TEST SUMMARY
=================================
✅ Tests Passed: 6
❌ Tests Failed: 0
📈 Total Tests: 6
🎯 Success Rate: 100.0%
=================================

🎉 All verification tests passed!
✨ The "Search Pet" (getById) and "Create Pet" (POST) functions are working correctly.
```

### Getestete Funktionen

1. ✅ **Search Pet by ID** - Erfolgreich vorhandene Pets finden
2. ✅ **Error Handling** - Korrekte Fehlerbehandlung für nicht existierende Pets
3. ✅ **Create New Pet** - Neue Pets erfolgreich erstellen
4. ✅ **Verify Created Pet** - Erstellte Pets können gefunden werden
5. ✅ **Validation** - Ungültige Daten werden korrekt abgelehnt
6. ✅ **Get All Pets** - Alle Pets können abgerufen werden

## 🎨 Features

### Search Pet (GET /pet/{petId})
- Suche nach Pets über ID
- Anzeige aller Pet-Details (Name, Kategorie, Status, Tags, Fotos)
- Fehlerbehandlung für nicht existierende Pets
- Visuelle Status-Anzeige (Available, Pending, Sold)

### Create Pet (POST /pet)
- Formular zum Erstellen neuer Pets
- Pflichtfelder: Name, Photo URLs
- Optional: Kategorie, Tags, Status
- Validation mit Fehlermeldungen
- Erfolgsbestätigung nach Erstellung

### UI/UX
- Tab-Navigation zwischen Search und Create
- Responsive Design
- Moderne, übersichtliche Benutzeroberfläche
- Farbkodierte Status-Anzeigen
- Bildergalerie für Pet-Fotos

## 🔧 Technologie-Stack

- **Frontend Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.2
- **Sprache:** TypeScript 5.9.3
- **Styling:** Vanilla CSS mit modernem Design
- **API Spezifikation:** OpenAPI 3.0.0

## 📝 API Implementation

Das Mock Backend implementiert folgende OpenAPI Endpoints:

- `GET /pet/{petId}` - Find pet by ID
- `POST /pet` - Add a new pet to the store
- `PUT /pet` - Update an existing pet
- `DELETE /pet/{petId}` - Delete a pet
- `GET /pet/findByStatus` - Find pets by status
- `GET /pet` - Get all pets (Helper für UI)

## 🎯 Mock Backend

Der Mock Backend Service simuliert:
- ✅ API Delays (300ms) für realistische Netzwerk-Bedingungen
- ✅ Datenpersistenz im Memory während der Session
- ✅ Vollständige Validierung gemäß OpenAPI Spec
- ✅ Fehlerbehandlung und Error Messages
- ✅ Auto-incrementing IDs

### Vordefinierte Test-Daten

Das System startet mit 3 vordefinierten Pets:
1. **Buddy** (ID: 1) - Dog, Available
2. **Whiskers** (ID: 2) - Cat, Available
3. **Max** (ID: 3) - Dog, Pending

## 🌟 Verwendung

### Pet suchen
1. Wechsle zum "🔍 Search Pet" Tab
2. Gib eine Pet-ID ein (z.B. 1, 2, oder 3)
3. Klicke auf "Search"
4. Die Pet-Details werden angezeigt

### Pet erstellen
1. Wechsle zum "➕ Create Pet" Tab
2. Fülle das Formular aus:
   - **Name** (Pflicht)
   - **Photo URLs** (Pflicht, komma-getrennt)
   - **Category Name** (Optional)
   - **Tags** (Optional, komma-getrennt)
   - **Status** (Available, Pending, oder Sold)
3. Klicke auf "Create Pet"
4. Die Erfolgsbestätigung zeigt die neue Pet-ID

## 📦 Build

Produktions-Build erstellen:

```bash
npm run build
```

Build-Vorschau:

```bash
npm run preview
```

## 👨‍💻 Entwicklung

### Linting

```bash
npm run lint
```

### Type Checking

```bash
tsc --noEmit
```

## 📄 Lizenz

Dieses Projekt basiert auf der OpenAPI Petstore Spezifikation (Apache-2.0 License).

---

**Entwickelt mit ❤️ für das KISE2526 Fachgruppe Frontend Projekt**

