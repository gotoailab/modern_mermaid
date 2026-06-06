import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Chrome Extension Manifest', () => {
  const manifestPath = path.resolve(__dirname, '../../public/manifest.json');

  it('should exist', () => {
    expect(fs.existsSync(manifestPath)).toBe(true);
  });

  it('should be valid JSON and have correct MV3 version', () => {
    if (!fs.existsSync(manifestPath)) return;
    const content = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    expect(content.manifest_version).toBe(3);
    expect(content.name).toBe('Modern Mermaid');
    expect(content.action).toBeDefined();
    expect(content.action.default_popup).toBeUndefined();
    expect(content.background).toBeDefined();
    expect(content.background.service_worker).toBe('background.js');
  });
});
