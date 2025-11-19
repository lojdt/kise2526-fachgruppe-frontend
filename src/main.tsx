import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initializeMockBackend } from './api/mockBackend';

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element not found");

// Initialize mock backend before rendering the app
initializeMockBackend();

createRoot(rootEl).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
