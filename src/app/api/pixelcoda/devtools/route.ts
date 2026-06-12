import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: 'PixelCoda Headless DevTools',
    purpose: 'Frontend companion endpoint for EXT:pixelcoda_headless metadata inspection.',
    expectedMetadata: {
      layout: { identifier: 'two-column', title: 'Two Column Layout' },
      container: {
        identifier: 'three-column',
        columns: [
          { name: 'left', colPos: 200 },
          { name: 'center', colPos: 201 },
          { name: 'right', colPos: 202 },
        ],
      },
      responsive: {
        desktop: { grid: '4-4-4' },
        tablet: { grid: '6-6' },
        mobile: { grid: '12' },
      },
      order: {
        desktop: ['left', 'center', 'right'],
        mobile: ['center', 'left', 'right'],
      },
      spacing: { gap: 'lg' },
      width: 'contained',
    },
  });
}
