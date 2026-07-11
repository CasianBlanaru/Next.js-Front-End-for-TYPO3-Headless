"use client";

import React, { useEffect, useState } from 'react';
import { siteConfig } from '../lib/config';

export default function FrontendEditor() {
  const [hasBackendSession, setHasBackendSession] = useState(false);
  const [assetHash, setAssetHash] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const typo3BaseUrl = siteConfig.typo3BaseUrl.replace(/\/$/, '');

    // Check backend session via API proxy (works cross-domain)
    fetch('/api/be-session', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setHasBackendSession(data.hasSession === true);
        if (!data.hasSession) return;

        if (data.feEditorToken && data.ajaxUrls) {
          window.TYPO3 = window.TYPO3 || { settings: {}, security: {} };
          window.TYPO3.settings = window.TYPO3.settings || {};
          window.TYPO3.settings.ajaxUrls = { ...window.TYPO3.settings?.ajaxUrls, ...data.ajaxUrls };
          window.TYPO3.security = window.TYPO3.security || {};
          window.TYPO3.security.feEditorToken = data.feEditorToken;
        }

        if (data.assetHash) {
          setAssetHash(data.assetHash);
        } else {
          fetch(`${typo3BaseUrl}/_assets/`, { credentials: 'include' })
            .then(r => r.text())
            .then(html => {
              const match = html.match(/href="([a-f0-9]{32})\//i);
              setAssetHash(match ? match[1] : '118a46030edf2e8932199b42dcc98b96');
            })
            .catch(() => setAssetHash('118a46030edf2e8932199b42dcc98b96'));
        }
      })
      .catch(() => {
        setHasBackendSession(false);
      });
  }, []);

  useEffect(() => {
    if (!assetHash || typeof window === 'undefined') return;

    const typo3BaseUrl = siteConfig.typo3BaseUrl.replace(/\/$/, '');

    // Load editor CSS
    const editorCss = document.createElement('link');
    editorCss.rel = 'stylesheet';
    editorCss.href = `${typo3BaseUrl}/_assets/${assetHash}/editor.css`;
    document.head.appendChild(editorCss);

    // Ensure TYPO3 global is initialized with icon paths
    window.TYPO3 = window.TYPO3 || { settings: {}, security: {} };
    window.TYPO3.settings = window.TYPO3.settings || {};
    window.TYPO3.settings.feEditorPageId = window.TYPO3.settings.feEditorPageId || 0;
    window.TYPO3.settings.feEditorRecords = window.TYPO3.settings.feEditorRecords || [];
    window.TYPO3.settings.feEditorIcons = {
      edit: `${typo3BaseUrl}/_assets/${assetHash}/Icons/edit.svg`,
      ai: `${typo3BaseUrl}/_assets/${assetHash}/Icons/ai.svg`,
      add: `${typo3BaseUrl}/_assets/${assetHash}/Icons/add.svg`,
    };
    window.TYPO3.settings.feEditorAiConfigured = window.TYPO3.settings.feEditorAiConfigured || false;
    window.TYPO3.settings.feEditorAiProvider = window.TYPO3.settings.feEditorAiProvider || '';

    // Load editor JS
    const editorJs = document.createElement('script');
    editorJs.src = `${typo3BaseUrl}/_assets/${assetHash}/editor.js`;
    editorJs.defer = true;
    document.body.appendChild(editorJs);

    return () => {
      editorCss.remove();
      editorJs.remove();
    };
  }, [assetHash]);

  if (!hasBackendSession || !assetHash) return null;

  const typo3BaseUrl = siteConfig.typo3BaseUrl.replace(/\/$/, '');
  const editIconPath = `${typo3BaseUrl}/_assets/${assetHash}/Icons/edit.svg`;
  const aiIconPath = `${typo3BaseUrl}/_assets/${assetHash}/Icons/ai.svg`;
  const addIconPath = `${typo3BaseUrl}/_assets/${assetHash}/Icons/add.svg`;

  return (
    <>
      <div id="pc-fe-toolbar-root" className="pc-fe-toolbar" role="toolbar" aria-label="Frontend Editing">
        <div className="pc-fe-toolbar-actions">
          <button id="pc-edit-toggle" className="pc-fe-button" type="button" aria-label="Frontend Editing aktivieren" aria-pressed="false">
            <img className="pc-fe-icon" src={editIconPath} alt="" onError={(e) => { (e.target as HTMLImageElement).hidden = true; }} />
            <span>Edit</span>
          </button>
          <button id="pc-save" className="pc-fe-button pc-fe-save" type="button" aria-label="Änderungen speichern" disabled>
            <img className="pc-fe-icon" src={editIconPath} alt="" onError={(e) => { (e.target as HTMLImageElement).hidden = true; }} />
            <span>Save</span>
          </button>
          <span className="pc-fe-toolbar-divider" aria-hidden="true"></span>
          <button id="pc-ai" className="pc-fe-button pc-fe-ai" type="button" aria-label="AI-Schreibassistent öffnen">
            <img className="pc-fe-icon" src={aiIconPath} alt="" onError={(e) => { (e.target as HTMLImageElement).hidden = true; }} />
            <span>AI</span>
          </button>
          <button id="pc-add-global" className="pc-fe-button pc-fe-icon-button" type="button" aria-label="Neues Element hinzufügen">
            <img className="pc-fe-icon" src={addIconPath} alt="" onError={(e) => { (e.target as HTMLImageElement).hidden = true; }} />
          </button>
        </div>
        <div className="pc-fe-toolbar-feedback">
          <span id="pc-fe-selection" className="pc-fe-selection">Editieren aktivieren</span>
          <span id="pc-fe-status" className="pc-fe-status" aria-live="polite" aria-atomic="true"></span>
        </div>
      </div>
      <div id="pc-fe-drawer-backdrop" className="pc-fe-drawer-backdrop" hidden />
      <aside id="pc-fe-drawer" className="pc-fe-drawer" role="dialog" aria-modal="true" aria-labelledby="pc-fe-drawer-title" hidden>
        <header className="pc-fe-drawer-header">
          <div>
            <span className="pc-fe-drawer-kicker">Pixelcoda FE Editor</span>
            <h2 id="pc-fe-drawer-title" className="pc-fe-drawer-title">Bearbeiten</h2>
          </div>
          <button id="pc-fe-drawer-close" className="pc-fe-drawer-close" type="button" aria-label="Seitenleiste schliessen" title="Schliessen">×</button>
        </header>
        <div id="pc-fe-image-panel" className="pc-fe-drawer-panel" hidden>
          <p className="pc-fe-drawer-hint">Der TYPO3-Datensatz bleibt auf dieser Seite geöffnet. Nach dem Speichern wird die Vorschau automatisch aktualisiert.</p>
          <iframe id="pc-fe-record-frame" className="pc-fe-record-frame" title="TYPO3 Datensatz bearbeiten" />
        </div>
        <div id="pc-fe-ai-panel" className="pc-fe-drawer-panel pc-fe-ai-panel" hidden>
          <div id="pc-fe-ai-config" className="pc-fe-ai-config" role="status" />
          <p className="pc-fe-drawer-hint">Verbessert nur das aktuell ausgewählte Textfeld.</p>
          <fieldset className="pc-fe-ai-actions">
            <legend>AI-Aktion</legend>
            <button type="button" className="pc-fe-ai-action active" data-pc-ai-action="rewrite" aria-pressed="true">Verbessern</button>
            <button type="button" className="pc-fe-ai-action" data-pc-ai-action="shorten" aria-pressed="false">Kürzen</button>
            <button type="button" className="pc-fe-ai-action" data-pc-ai-action="expand" aria-pressed="false">Erweitern</button>
          </fieldset>
          <div className="pc-fe-ai-field">
            <span>Ausgewähltes Feld</span>
            <strong id="pc-fe-ai-field-name">Kein Feld ausgewählt</strong>
          </div>
          <button id="pc-fe-ai-run" className="pc-fe-drawer-primary" type="button">AI-Vorschlag erstellen</button>
        </div>
      </aside>
    </>
  );
}
