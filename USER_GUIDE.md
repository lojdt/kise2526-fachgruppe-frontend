# 🎯 Pet Store Frontend - Benutzerhandbuch

## 📖 Schnellanleitung

### Anwendung öffnen

1. Öffne deinen Browser
2. Navigiere zu: **http://localhost:5174/** (oder dem Port, den Vite anzeigt)
3. Du siehst die Pet Store Management Oberfläche

---

## 🔍 Pet suchen (Search Pet)

### Schritt-für-Schritt Anleitung

1. **Tab auswählen**
   - Die Anwendung startet bereits im "🔍 Search Pet" Tab
   - Falls nicht, klicke auf den "Search Pet" Button oben

2. **Pet-ID eingeben**
   - Gib eine Zahl in das Eingabefeld ein
   - Vorhandene Test-Pets: **1**, **2**, **3**
   - Beispiel: Gib `1` ein

3. **Suchen**
   - Klicke auf den blauen "Search" Button
   - Warte einen kurzen Moment (simulierte API-Verzögerung)

4. **Ergebnis ansehen**
   - **Bei Erfolg:** Pet Details werden angezeigt
     - Name des Pets
     - Kategorie (z.B. "Dogs", "Cats")
     - Status (farbkodiert: Grün = Available, Orange = Pending, Rot = Sold)
     - Tags als Badges
     - Fotos in einer Galerie
   - **Bei Fehler:** Rote Fehlermeldung wird angezeigt

5. **Neue Suche**
   - Klicke auf "Clear" um das Formular zurückzusetzen
   - Gib eine neue ID ein

### Vorhandene Test-Pets

**Pet ID 1 - Buddy**
- Name: Buddy
- Kategorie: Dogs
- Status: Available
- Tags: friendly, cute

**Pet ID 2 - Whiskers**
- Name: Whiskers
- Kategorie: Cats
- Status: Available
- Tags: playful

**Pet ID 3 - Max**
- Name: Max
- Kategorie: Dogs
- Status: Pending
- Tags: energetic

### Fehlerbehandlung

**Nicht existierende ID (z.B. 999):**
```
❌ Pet with ID 999 not found
```

**Ungültige Eingabe (leer oder negativ):**
```
❌ Please enter a valid pet ID
```

---

## ➕ Pet erstellen (Create Pet)

### Schritt-für-Schritt Anleitung

1. **Tab wechseln**
   - Klicke auf "➕ Create Pet" oben
   - Das Erstellungsformular wird angezeigt

2. **Pflichtfelder ausfüllen**

   **Pet Name*** (Pflichtfeld)
   - Gib einen Namen ein
   - Beispiel: `Luna`

   **Photo URLs*** (Pflichtfeld)
   - Gib eine oder mehrere URLs ein (komma-getrennt)
   - Beispiel: `https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300`
   - Mehrere URLs: `url1.jpg, url2.jpg, url3.jpg`

3. **Optionale Felder ausfüllen**

   **Category Name** (Optional)
   - Gib eine Kategorie ein
   - Beispiel: `Dogs` oder `Cats`

   **Tags** (Optional)
   - Gib Tags ein (komma-getrennt)
   - Beispiel: `friendly, playful, energetic`

   **Status** (Optional, Standard: Available)
   - Wähle aus dem Dropdown:
     - Available (verfügbar)
     - Pending (ausstehend)
     - Sold (verkauft)

4. **Absenden**
   - Klicke auf den grünen "Create Pet" Button
   - Button zeigt "Creating..." während der Verarbeitung

5. **Bestätigung**
   - **Bei Erfolg:** Grüne Erfolgsmeldung wird angezeigt
     ```
     ✅ Pet "Luna" successfully created with ID: 4
     ```
   - **Bei Fehler:** Rote Fehlermeldung wird angezeigt
   - Das Formular wird automatisch zurückgesetzt

6. **Verifizieren**
   - Wechsle zum "Search Pet" Tab
   - Suche nach der neu erstellten ID (z.B. `4`)
   - Das neue Pet sollte angezeigt werden

### Beispiel-Daten zum Testen

**Beispiel 1 - Minimale Eingabe:**
```
Name: Rocky
Photo URLs: https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300
```

**Beispiel 2 - Vollständige Eingabe:**
```
Name: Bella
Photo URLs: https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300
Category: Cats
Tags: fluffy, cute, indoor
Status: Available
```

**Beispiel 3 - Multiple Photos:**
```
Name: Charlie
Photo URLs: url1.jpg, url2.jpg, url3.jpg
Category: Dogs
Tags: active, friendly
Status: Pending
```

### Validierungsregeln

✅ **Name ist Pflicht** - Muss ausgefüllt sein  
✅ **Photo URLs ist Pflicht** - Mindestens eine URL  
✅ **Komma-getrennte Listen** - Für URLs und Tags  
✅ **Status-Auswahl** - Nur vordefinierte Werte  

### Fehlerbehandlung

**Leerer Name:**
```
❌ Pet name is required
```

**Keine Photo URLs:**
```
❌ At least one photo URL is required
```

**Ungültige Daten:**
```
❌ Invalid input: name and photoUrls are required
```

---

## 🎨 UI-Elemente verstehen

### Header
- **Gradient-Hintergrund** (Lila bis Pink)
- **Titel:** "🐾 Pet Store Management"
- **Untertitel:** "Create and Search for Pets"

### Tab-Navigation
- **Zwei Tabs:** Search und Create
- **Aktiver Tab:** Weiß mit farbigem Unterstrich
- **Inaktiver Tab:** Grau

### Buttons
- **Blau:** Search-Funktion
- **Grün:** Create/Submit-Funktion
- **Orange:** Clear/Reset-Funktion
- **Disabled-Zustand:** Grau, während Verarbeitung läuft

### Status-Farben
- 🟢 **Grün:** Available (verfügbar)
- 🟠 **Orange:** Pending (ausstehend)
- 🔴 **Rot:** Sold (verkauft)

### Meldungen
- 🟢 **Grüner Hintergrund:** Erfolgsmeldung
- 🔴 **Roter Hintergrund:** Fehlermeldung

### Pet Details
- **ID:** Eindeutige Nummer
- **Name:** Pet-Name
- **Category:** Kategorie in Badge
- **Status:** Farbkodiert
- **Tags:** Blaue Badges
- **Photos:** Bildergalerie mit Hover-Effekt

---

## 💡 Tipps & Tricks

### Für Search
1. **Schnellsuche:** Nutze die vorhandenen IDs 1, 2, 3
2. **Clear nach Suche:** Nutze Clear-Button für neue Suche
3. **Fotos anschauen:** Hover über Bilder für Zoom-Effekt

### Für Create
1. **Tab-Taste:** Nutze Tab zum schnellen Durchgehen der Felder
2. **Bild-URLs:** Unsplash URLs funktionieren gut für Tests
3. **Kommas wichtig:** Bei mehreren URLs und Tags
4. **Status wählen:** Dropdown zeigt alle Optionen

### Workflow
1. **Erstellen → Suchen:** Nach dem Erstellen direkt suchen
2. **ID merken:** Notiere die ID des erstellten Pets
3. **Mehrere Pets:** Erstelle mehrere zum Testen

---

## 🐛 Problemlösung

### "Pet not found"
- ✅ Prüfe ob die ID existiert (1, 2, 3 sind immer da)
- ✅ Nach Pet-Erstellung: Notiere die neue ID

### "Invalid input"
- ✅ Name muss ausgefüllt sein
- ✅ Mindestens eine Photo URL eingeben
- ✅ Keine leeren Felder für Pflichtdaten

### Foto wird nicht angezeigt
- ✅ URL muss gültig sein
- ✅ Platzhalter-Bild wird automatisch geladen bei Fehler

### Button ist grau
- ⏳ Warte kurz - API-Call läuft
- ⏳ Button wird nach Abschluss wieder aktiv

---

## ⌨️ Tastatur-Shortcuts

| Shortcut | Funktion |
|----------|----------|
| Tab | Nächstes Feld |
| Shift + Tab | Vorheriges Feld |
| Enter | Formular absenden |
| Esc | (Zukünftig) Formular zurücksetzen |

---

## 📱 Mobile Nutzung

Die Anwendung ist responsive und funktioniert auch auf mobilen Geräten:

- **Tablets:** Vollständige Funktionalität
- **Smartphones:** Optimiertes Layout
- **Touch:** Alle Buttons sind touch-optimiert

---

## 🎓 Lern-Ressourcen

### Was du hier siehst
- **React Komponenten:** CreatePet, SearchPet
- **State Management:** useState Hooks
- **Form Handling:** Controlled Components
- **Async/Await:** API Calls
- **Error Handling:** Try/Catch
- **TypeScript:** Type Safety

### Code-Beispiele finden
- `src/components/CreatePet.tsx` - Form mit Validation
- `src/components/SearchPet.tsx` - Daten-Anzeige
- `src/services/petApi.service.ts` - API Implementierung

---

## 🆘 Hilfe & Support

Bei Problemen:
1. Prüfe die Browser-Konsole (F12)
2. Schaue in die README.md
3. Führe Verification Tests aus: `npx tsx src/verification-tests.ts`
4. Prüfe ob Dev-Server läuft: `npm run dev`

---

**Viel Erfolg beim Testen! 🚀**

