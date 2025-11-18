# 🐾 Pet Store Application

Ein vollständiges Frontend für die Verwaltung von Haustieren mit React und TypeScript.

## 📋 Projektspezifikationen

- **Frontend**: React 19 mit TypeScript
- **Primärfarbe**: #F55500 (Orange)
- **Sekundärfarbe**: #555555 (Grau)
- **API**: Mock-Backend basierend auf OpenAPI Petstore-Spezifikation

## ✨ Features

### 1. **Search Pet (Haustier suchen)**
- Suche nach Haustieren anhand ihrer ID
- Anzeige vollständiger Haustierinformationen:
  - Name, Kategorie, Status
  - Tags
  - Fotogalerie
- Farbkodierte Status-Badges (Available, Pending, Sold)
- Fehlerbehandlung für nicht existierende IDs

### 2. **Create Pet (Haustier erstellen)**
- Formular zum Erstellen neuer Haustiere
- Pflichtfelder: Name, Foto-URLs
- Optionale Felder: Kategorie, Tags, Status
- Erfolgs-/Fehlermeldungen
- Automatische Formular-Zurücksetzung nach Erfolg

## 🚀 Installation & Start

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Produktions-Build erstellen
npm run build

# API-Tests ausführen
node test-api.js
```

## 🌐 Verwendung

Die Anwendung läuft auf: **http://localhost:5173**

### Haustier suchen
1. Öffnen Sie den Tab "Search Pet"
2. Geben Sie eine Haustier-ID ein (1, 2 oder 3 für vorhandene Haustiere)
3. Klicken Sie auf "Search"
4. Die Haustierinformationen werden angezeigt

### Haustier erstellen
1. Öffnen Sie den Tab "Create Pet"
2. Füllen Sie das Formular aus:
   - **Pet Name** (Pflicht): Name des Haustiers
   - **Photo URLs** (Pflicht): Kommagetrennte URLs
   - **Category** (Optional): z.B. "Dogs", "Cats"
   - **Tags** (Optional): Kommagetrennte Tags
   - **Status**: Available, Pending oder Sold
3. Klicken Sie auf "Create Pet"
4. Nach erfolgreicher Erstellung wird die neue ID angezeigt

## 🏗️ Projektstruktur

```
src/
├── api/
│   ├── types.ts           # TypeScript-Typen (Pet, Category, Tag, etc.)
│   └── mockPetStore.ts    # Mock-Backend-Implementierung
├── components/
│   ├── CreatePet.tsx      # Komponente zum Erstellen von Haustieren
│   ├── CreatePet.css      # Styles für CreatePet
│   ├── SearchPet.tsx      # Komponente zum Suchen von Haustieren
│   └── SearchPet.css      # Styles für SearchPet
├── App.tsx                # Hauptkomponente mit Tab-Navigation
├── App.css                # Haupt-Styles
├── index.css              # Globale Styles
└── main.tsx               # Einstiegspunkt
```

## 🎨 Design

Das Design verwendet die vorgegebenen Farben:
- **Primärfarbe (#F55500)**: Header, Buttons, aktive Tabs, Tags
- **Sekundärfarbe (#555555)**: Text, Footer, Labels
- **Status-Badges**: Farbkodiert (Grün=Available, Gelb=Pending, Rot=Sold)

## 🧪 API-Funktionen (Mock-Backend)

Das Mock-Backend implementiert folgende Funktionen basierend auf der OpenAPI-Spezifikation:

### `getPetById(petId: number): Promise<Pet>`
Sucht ein Haustier anhand der ID.

**Beispiel:**
```typescript
const pet = await mockPetStoreAPI.getPetById(1);
```

### `addPet(pet: Omit<Pet, 'id'>): Promise<Pet>`
Erstellt ein neues Haustier.

**Beispiel:**
```typescript
const newPet = await mockPetStoreAPI.addPet({
  name: 'Buddy',
  photoUrls: ['https://example.com/buddy.jpg'],
  category: { name: 'Dogs' },
  tags: [{ name: 'friendly' }],
  status: 'available'
});
```

### Weitere verfügbare Funktionen:
- `updatePet(pet: Pet): Promise<Pet>`
- `deletePet(petId: number): Promise<void>`
- `findPetsByStatus(status: PetStatus[]): Promise<Pet[]>`
- `getAllPets(): Promise<Pet[]>`

## 🗂️ Vorhandene Test-Daten

Das Mock-Backend enthält initial 3 Haustiere:

| ID | Name     | Kategorie | Status    | Tags       |
|----|----------|-----------|-----------|------------|
| 1  | Buddy    | Dogs      | Available | friendly   |
| 2  | Whiskers | Cats      | Available | playful    |
| 3  | Max      | Dogs      | Pending   | energetic  |

## ✅ Verifikation

Die folgenden Funktionen wurden erfolgreich getestet:

### ✓ Search Pet (getPetById)
- Suche nach existierenden Haustieren funktioniert
- Fehlerbehandlung für nicht existierende IDs funktioniert
- Vollständige Anzeige aller Haustierinformationen

### ✓ Create Pet (POST)
- Erstellung neuer Haustiere funktioniert
- Validierung von Pflichtfeldern funktioniert
- Automatische ID-Vergabe funktioniert
- Neu erstellte Haustiere können sofort gesucht werden

### Test ausführen:
```bash
node test-api.js
```

## 🛠️ Technologie-Stack

- **React 19.2.0** - UI-Framework
- **TypeScript 5.9** - Typsicherheit
- **Vite 7.2.2** - Build-Tool & Dev-Server
- **CSS3** - Styling
- **OpenAPI 3.0** - API-Spezifikation

## 📝 Hinweise

- Das Mock-Backend speichert Daten nur im Speicher (nicht persistent)
- Beim Neuladen der Seite werden die Daten zurückgesetzt
- Alle API-Aufrufe simulieren eine Netzwerkverzögerung von 500ms
- Foto-URLs sollten öffentlich zugänglich sein für die Anzeige

## 🔧 Entwicklung

Das Projekt verwendet:
- ESLint für Code-Qualität
- TypeScript strict mode
- Vite HMR für schnelles Entwickeln

---

**Erstellt mit ❤️ für das Pet Store Projekt**

