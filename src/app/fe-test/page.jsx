import { ContentElement, EditableHeadline, EditableBodytext } from '@/components/EditableContent';
import DevTools from '@/components/DevTools';

export const metadata = {
  title: 'Frontend Editing Test - TYPO3 Headless',
  description: 'Test page for TYPO3 Frontend Editing integration',
};

export default function FrontendEditingTest() {
  const testContent = {
    id: '1',
    type: 'text',
    header: 'Frontend Editing Test',
    bodytext: '<p>Dies ist eine Testseite für das TYPO3 Frontend Editing.</p><p>Wenn Sie im TYPO3 Backend eingeloggt sind, sollten Sie rechts unten eine Toolbar sehen.</p>',
  };

  return (
    <main>
      <section className="hero">
        <div>
          <h1>Frontend Editing Integration Test</h1>
          <p className="lead">
            Diese Seite testet die TYPO3 Frontend Editing Integration im Headless-Modus.
          </p>
        </div>
      </section>

      <section className="content-shell">
        <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '8px', marginBottom: '2rem' }}>
          <h2>Status Check</h2>
          <ul style={{ lineHeight: '1.8' }}>
            <li>✅ Frontend Komponenten geladen</li>
            <li>✅ EditableContent Wrapper aktiv</li>
            <li>✅ FrontendEditor Component in Layout</li>
            <li>❓ TYPO3 Backend Login erforderlich</li>
            <li>❓ Extension aktiviert?</li>
          </ul>
        </div>

        <ContentElement uid={testContent.id} type={testContent.type}>
          <article className="content-element">
            <EditableHeadline uid={testContent.id} level="h2">
              {testContent.header}
            </EditableHeadline>
            
            <EditableBodytext uid={testContent.id}>
              <div dangerouslySetInnerHTML={{ __html: testContent.bodytext }} />
            </EditableBodytext>
          </article>
        </ContentElement>

        <div style={{ marginTop: '3rem', padding: '2rem', background: '#fff3cd', borderRadius: '8px', border: '1px solid #ffc107' }}>
          <h3>⚠️ Railway Setup Schritte:</h3>
          <ol style={{ lineHeight: '1.8', paddingLeft: '1.5rem' }}>
            <li>
              <strong>Backend Login</strong>: 
              <br />
              <a href="https://web-production-581b4.up.railway.app/typo3" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc' }}>
                → Backend öffnen
              </a>
            </li>
            <li>
              <strong>Extension aktivieren</strong> (Railway Terminal):
              <pre style={{ background: '#1e1e1e', color: '#fff', padding: '1rem', borderRadius: '4px', marginTop: '0.5rem', overflow: 'auto' }}>
{`php vendor/bin/typo3 extension:setup
php vendor/bin/typo3 cache:flush`}
              </pre>
            </li>
            <li>
              <strong>Environment Variable</strong> setzen:
              <pre style={{ background: '#1e1e1e', color: '#fff', padding: '1rem', borderRadius: '4px', marginTop: '0.5rem' }}>
                TYPO3_FE_EDITING_ENABLED=1
              </pre>
            </li>
          </ol>
        </div>

        <div style={{ marginTop: '2rem', padding: '2rem', background: '#e7f3ff', borderRadius: '8px' }}>
          <h3>🔍 Debug Info</h3>
          <p><strong>Backend:</strong> https://web-production-581b4.up.railway.app</p>
          <p><strong>Content ID:</strong> c{testContent.id}</p>
          <p><strong>Editor Assets:</strong> /typo3conf/ext/pixelcoda_fe_editor/Resources/Public/</p>
        </div>
      </section>

      <DevTools page={{ title: 'Frontend Editing Test', content: testContent }} />
    </main>
  );
}
