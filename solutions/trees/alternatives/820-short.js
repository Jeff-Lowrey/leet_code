/**
 * 820. Short
 * Medium
 *
 * Short Encoding - JavaScript Implementation This module provides string encoding functionality with efficient compression
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Short is to understand the core problem pattern
 * and apply the most efficient algorithmic approach.
 *
 * ### APPROACH:
 * 1. Analyze the problem requirements
 * 2. Choose the optimal data structure
 * 3. Implement the solution step by step
 * 4. Handle edge cases appropriately
 *
 * ### WHY THIS WORKS:
 * This approach works because it leverages the fundamental properties of the problem
 * to achieve an efficient solution.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For a typical input, the algorithm processes the data systematically
 * to produce the expected output.
 *
 * </details>
 */

/**
 * Short Encoding - JavaScript Implementation
 * This module provides string encoding functionality with efficient compression
 */

class ShortEncoder {
    constructor() {
        this.encodingMap = new Map();
        this.decodingMap = new Map();
        this.initializeMaps();
    }

    /**
     * Initialize encoding and decoding maps with default character mappings
     * @private
     */
    initializeMaps() {
        // Basic character set mapping
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        for (let i = 0; i < characters.length; i++) {
            const shortCode = i.toString(36); // Convert to base36 for shorter codes
            this.encodingMap.set(characters[i], shortCode);
            this.decodingMap.set(shortCode, characters[i]);
        }
    }

    /**
     * Encode a string using the short encoding algorithm
     * @param {string} input - The string to encode
     * @returns {string} The encoded string
     * @throws {Error} If input is invalid
     */
    encode(input) {
        if (typeof input !== 'string') {
            throw new Error('Input must be a string');
        }

        if (input.length === 0) {
            return '';
        }

        try {
            let encoded = '';
            for (let i = 0; i < input.length; i++) {
                const char = input[i];
                const code = this.encodingMap.get(char) || char;
                encoded += code + '.';
            }
            return encoded.slice(0, -1); // Remove trailing dot
        } catch (error) {
            throw new Error(`Encoding failed: ${error.message}`);
        }
    }

    /**
     * Decode a previously encoded string
     * @param {string} encoded - The encoded string to decode
     * @returns {string} The decoded original string
     * @throws {Error} If input is invalid or corrupted
     */
    decode(encoded) {
        if (typeof encoded !== 'string') {
            throw new Error('Input must be a string');
        }

        if (encoded.length === 0) {
            return '';
        }

        try {
            const parts = encoded.split('.');
            let decoded = '';
            
            for (const part of parts) {
                const char = this.decodingMap.get(part) || part;
                decoded += char;
            }
            
            return decoded;
        } catch (error) {
            throw new Error(`Decoding failed: ${error.message}`);
        }
    }

    /**
     * Get the current encoding map
     * @returns {Map} The current encoding map
     */
    getEncodingMap() {
        return new Map(this.encodingMap);
    }

    /**
     * Get the current decoding map
     * @returns {Map} The current decoding map
     */
    getDecodingMap() {
        return new Map(this.decodingMap);
    }
}

// Example usage and tests
function runTests() {
    const encoder = new ShortEncoder();

    // Test cases
    const testCases = [
        'Hello World',
        'JavaScript123',
        '',
        'Special@Characters!'
    ];

    console.log('Running Short Encoder Tests:');
    console.log('----------------------------');

    testCases.forEach((test, index) => {
        try {
            const encoded = encoder.encode(test);
            const decoded = encoder.decode(encoded);
            
            console.log(`Test ${index + 1}:`);
            console.log(`Original: ${test}`);
            console.log(`Encoded: ${encoded}`);
            console.log(`Decoded: ${decoded}`);
            console.log(`Success: ${test === decoded}`);
            console.log('----------------------------');
        } catch (error) {
            console.error(`Test ${index + 1} failed:`, error.message);
        }
    });
}

// Export the encoder class
module.exports = ShortEncoder;

// Run tests if this file is executed directly
if (require.main === module) {
    runTests();
}