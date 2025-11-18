import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Test environment
    environment: 'jsdom', // Simulate browser environment for DOM tests

    // Global test settings
    globals: true, // Use global test APIs (describe, it, expect) without imports

    // Coverage configuration
    coverage: {
      provider: 'v8', // Modern V8 coverage (faster than istanbul)
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['static/js/**/*.js'],
      exclude: [
        'node_modules/**',
        'static/js/**/*.test.js',
        'static/js/**/*.spec.js',
        '.claude_functions/**'
      ],
      all: true,
      lines: 85,
      functions: 85,
      branches: 85,
      statements: 85
    },

    // Test file patterns
    include: [
      'static/js/**/*.{test,spec}.js',
      '.claude_functions/**/*.{test,spec}.js'
    ],

    // Test execution settings
    testTimeout: 10000,
    hookTimeout: 10000,

    // Watch mode settings
    watch: false, // Disable by default (enable with --watch flag)

    // Reporter settings
    reporters: ['verbose'],

    // Mock settings
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,

    // Setup files (run before each test file)
    setupFiles: [], // Add setup files here if needed
  },

  // Resolve configuration
  resolve: {
    alias: {
      // Add path aliases if needed
      // '@': path.resolve(__dirname, './static/js')
    }
  }
});
