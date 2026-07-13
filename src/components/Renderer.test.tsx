import { render, screen } from '@testing-library/react';
import Renderer from './Renderer';
import { Typo3Page } from '../types/typo3';

jest.mock('@pixelcoda/headless-nextjs', () => ({
  T3Frame: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DevToolsWrapper: () => <div>DevTools</div>,
}));

jest.mock('./GsapAnimatedContent', () => ({
  GsapAnimatedContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('Renderer Component', () => {
  it('renders empty state when no elements', () => {
    const page: Typo3Page = { content: {} };
    render(<Renderer page={page} />);
    expect(screen.getByText(/No TYPO3 content returned/i)).toBeInTheDocument();
  });

  it('renders content elements', () => {
    const page: Typo3Page = {
      content: {
        '0': [
          {
            id: 1,
            type: 'text',
            content: { header: 'Test Header', bodytext: 'Test Body' },
          },
        ],
      },
    };
    render(<Renderer page={page} />);
    expect(screen.getByText('Test Header')).toBeInTheDocument();
    expect(screen.getByText('Test Body')).toBeInTheDocument();
  });

  it('renders TYPO3 error box', () => {
    const page: Typo3Page = {
      content: {
        '0': [
          {
            id: 1,
            type: 'text',
            content: { bodytext: 'Oops, an error occurred!' },
          },
        ],
      },
    };
    render(<Renderer page={page} />);
    expect(screen.getByText(/TYPO3 Headless Fehler/i)).toBeInTheDocument();
  });
});
