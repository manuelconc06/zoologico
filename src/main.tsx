import React from 'react'
import ReactDOM from 'react-dom/client'
import { ZooContextProvider } from "./context/zoo-context";
import App from './App.tsx'
import './index.css'
import { CssBaseline } from "@material-ui/core";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ZooContextProvider>
    <CssBaseline />
  <App />
</ZooContextProvider>
)
