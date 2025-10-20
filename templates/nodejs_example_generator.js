/**
 * Node.js Example Generator for LeetCode Solutions
 *
 * This script generates comprehensive test examples for LeetCode problems based on problem type.
 */

const fs = require('fs');
const path = require('path');

/**
 * Configuration class for problem-specific example generation
 */
class ProblemConfig {
    constructor(problemType, inputTypes = ['auto'], constraints = {}, specialCases = []) {
        this.problemType = problemType;
        this.inputTypes = inputTypes;
        this.constraints = constraints;
        this.specialCases = specialCases;
    }
}

/**
 * Main class for generating comprehensive test examples
 */
class ExampleGenerator {
    constructor() {
        this.generators = {
            'array': this.generateArrayExamples.bind(this),
            'string': this.generateStringExamples.bind(this),
            'tree': this.generateTreeExamples.bind(this),
            'linked_list': this.generateLinkedListExamples.bind(this),
            'graph': this.generateGraphExamples.bind(this),
            'matrix': this.generateMatrixExamples.bind(this),
            'interval': this.generateIntervalExamples.bind(this),
            'number': this.generateNumberExamples.bind(this),
            'dynamic_programming': this.generateDpExamples.bind(this),
            'stack_queue': this.generateStackQueueExamples.bind(this)
        };
    }

    /**
     * Generate comprehensive examples based on problem configuration
     * @param {ProblemConfig} config - Problem configuration
     * @param {number} count - Number of examples to generate
     * @returns {Array} Array of example objects
     */
    generateExamples(config, count = 10) {
        const generator = this.generators[config.problemType] || this.generateGenericExamples.bind(this);
        return generator(config, count);
    }

    /**
     * Generate examples for array-based problems
     */
    generateArrayExamples(config, count) {
        const examples = [];

        // Basic examples
        examples.push(
            {
                name: 'Basic Example - Small Array',
                input: [1, 2, 3, 4, 5],
                description: 'Standard case with small array'
            },
            {
                name: 'Basic Example - Mixed Numbers',
                input: [-1, 0, 1, 2, -3],
                description: 'Array with positive and negative numbers'
            }
        );

        // Edge cases
        examples.push(
            {
                name: 'Edge Case - Empty Array',
                input: [],
                description: 'Empty array test'
            },
            {
                name: 'Edge Case - Single Element',
                input: [42],
                description: 'Array with single element'
            },
            {
                name: 'Edge Case - Two Elements',
                input: [1, 2],
                description: 'Minimum array for most algorithms'
            }
        );

        // Boundary cases
        examples.push(
            {
                name: 'Boundary Case - All Same Elements',
                input: Array(10).fill(5),
                description: 'Array with identical elements'
            },
            {
                name: 'Boundary Case - Sorted Array',
                input: Array.from({length: 10}, (_, i) => i + 1),
                description: 'Already sorted array'
            },
            {
                name: 'Boundary Case - Reverse Sorted',
                input: Array.from({length: 10}, (_, i) => 10 - i),
                description: 'Reverse sorted array'
            }
        );

        // Large/stress cases
        const maxSize = config.constraints.maxSize || 1000;
        examples.push(
            {
                name: 'Large Case - Random Array',
                input: Array.from({length: Math.min(100, maxSize)}, () => Math.floor(Math.random() * 201) - 100),
                description: 'Large random array for performance testing'
            },
            {
                name: 'Stress Case - Maximum Size',
                input: Array.from({length: Math.min(maxSize, 1000)}, () => Math.floor(Math.random() * 10) + 1),
                description: 'Maximum constraint size test'
            }
        );

        return examples.slice(0, count);
    }

    /**
     * Generate examples for string-based problems
     */
    generateStringExamples(config, count) {
        const examples = [];

        // Basic examples
        examples.push(
            {
                name: 'Basic Example - Simple String',
                input: "hello",
                description: 'Basic string case'
            },
            {
                name: 'Basic Example - Mixed Case',
                input: "Hello World",
                description: 'String with spaces and mixed case'
            }
        );

        // Edge cases
        examples.push(
            {
                name: 'Edge Case - Empty String',
                input: "",
                description: 'Empty string test'
            },
            {
                name: 'Edge Case - Single Character',
                input: "a",
                description: 'Single character string'
            },
            {
                name: 'Edge Case - Special Characters',
                input: "!@#$%^&*()",
                description: 'String with special characters'
            }
        );

        // Pattern cases
        examples.push(
            {
                name: 'Pattern Case - Palindrome',
                input: "racecar",
                description: 'Palindromic string'
            },
            {
                name: 'Pattern Case - Repeating Characters',
                input: "aabbccddee",
                description: 'String with repeating patterns'
            },
            {
                name: 'Pattern Case - All Same Character',
                input: "a".repeat(8),
                description: 'String with identical characters'
            }
        );

        // Large cases
        const maxLength = config.constraints.maxLength || 1000;
        examples.push(
            {
                name: 'Large Case - Random String',
                input: Array.from({length: Math.min(100, maxLength)}, () =>
                    String.fromCharCode(97 + Math.floor(Math.random() * 26))).join(''),
                description: 'Large random string'
            },
            {
                name: 'Stress Case - Maximum Length',
                input: "a".repeat(Math.min(maxLength, 1000)),
                description: 'Maximum constraint length test'
            }
        );

        return examples.slice(0, count);
    }

    /**
     * Generate examples for tree-based problems
     */
    generateTreeExamples(config, count) {
        const examples = [];

        examples.push(
            {
                name: 'Basic Tree - Balanced',
                input: [1, 2, 3, 4, 5, 6, 7],
                description: 'Complete balanced binary tree'
            },
            {
                name: 'Basic Tree - Simple',
                input: [1, 2, 3],
                description: 'Simple three-node tree'
            },
            {
                name: 'Edge Case - Single Node',
                input: [1],
                description: 'Tree with only root node'
            },
            {
                name: 'Edge Case - Empty Tree',
                input: null,
                description: 'Empty tree (null root)'
            },
            {
                name: 'Skewed Tree - Left Heavy',
                input: [1, 2, null, 3, null, null, null, 4],
                description: 'Left-skewed tree'
            },
            {
                name: 'Skewed Tree - Right Heavy',
                input: [1, null, 2, null, null, null, 3, null, null, null, null, null, null, null, 4],
                description: 'Right-skewed tree'
            }
        );

        return examples.slice(0, count);
    }

    /**
     * Generate examples for linked list problems
     */
    generateLinkedListExamples(config, count) {
        const examples = [];

        examples.push(
            {
                name: 'Basic List - Sequential',
                input: [1, 2, 3, 4, 5],
                description: 'Standard sequential linked list'
            },
            {
                name: 'Basic List - Small',
                input: [1, 2],
                description: 'Small two-node list'
            },
            {
                name: 'Edge Case - Single Node',
                input: [1],
                description: 'Single node list'
            },
            {
                name: 'Edge Case - Empty List',
                input: null,
                description: 'Empty linked list'
            },
            {
                name: 'Pattern Case - Duplicates',
                input: [1, 1, 2, 3, 3],
                description: 'List with duplicate values'
            }
        );

        return examples.slice(0, count);
    }

    /**
     * Generate examples for number-based problems
     */
    generateNumberExamples(config, count) {
        const examples = [];

        examples.push(
            {
                name: 'Basic Number - Positive',
                input: 42,
                description: 'Standard positive number'
            },
            {
                name: 'Basic Number - Negative',
                input: -17,
                description: 'Negative number test'
            },
            {
                name: 'Edge Case - Zero',
                input: 0,
                description: 'Zero value test'
            },
            {
                name: 'Edge Case - One',
                input: 1,
                description: 'Unity value test'
            },
            {
                name: 'Boundary Case - Large Positive',
                input: Math.pow(2, 31) - 1,
                description: 'Maximum 32-bit integer'
            },
            {
                name: 'Boundary Case - Large Negative',
                input: -Math.pow(2, 31),
                description: 'Minimum 32-bit integer'
            }
        );

        return examples.slice(0, count);
    }

    /**
     * Generate generic examples for unknown problem types
     */
    generateGenericExamples(config, count) {
        const examples = [];

        for (let i = 0; i < count; i++) {
            examples.push({
                name: `Test Case ${i + 1}`,
                input: `test_input_${i + 1}`,
                description: `Generic test case ${i + 1}`
            });
        }

        return examples;
    }
}

/**
 * Main function to generate test cases for a specific problem type
 * @param {string} problemType - Type of problem (array, string, tree, etc.)
 * @param {Object} constraints - Problem constraints object
 * @param {number} count - Number of test cases to generate
 * @returns {Array} List of test case objects
 */
function generateTestCasesForProblem(problemType, constraints = {}, count = 10) {
    const generator = new ExampleGenerator();
    const config = new ProblemConfig(problemType, ['auto'], constraints, []);

    return generator.generateExamples(config, count);
}

/**
 * Save generated examples to a JSON file
 * @param {Array} examples - Array of example objects
 * @param {string} filename - Output filename
 */
function saveExamplesToFile(examples, filename) {
    const data = JSON.stringify(examples, null, 2);
    fs.writeFileSync(filename, data);
    console.log(`✅ Saved ${examples.length} examples to ${filename}`);
}

/**
 * Utility functions for random generation
 */
const Utils = {
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    randomArray(size, min = -100, max = 100) {
        return Array.from({length: size}, () => this.randomInt(min, max));
    },

    randomString(length, chars = 'abcdefghijklmnopqrstuvwxyz') {
        return Array.from({length}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    }
};

// Main execution (equivalent to Python's if __name__ == "__main__")
if (require.main === module) {
    console.log('🔧 Node.js Example Generator for LeetCode Solutions');
    console.log('='.repeat(50));

    // Generate examples for different problem types
    const problemTypes = ['array', 'string', 'tree', 'number'];

    for (const probType of problemTypes) {
        console.log(`\nGenerating examples for ${probType} problems:`);
        const examples = generateTestCasesForProblem(probType, {}, 10);

        examples.forEach((example, i) => {
            console.log(`  ${(i + 1).toString().padStart(2)}. ${example.name}: ${example.description}`);
        });
    }

    // Save array examples as demonstration
    const arrayExamples = generateTestCasesForProblem('array', { maxSize: 100 }, 10);
    saveExamplesToFile(arrayExamples, 'sample_array_examples_nodejs.json');
}

// Export for use in other modules
module.exports = {
    ExampleGenerator,
    ProblemConfig,
    generateTestCasesForProblem,
    saveExamplesToFile,
    Utils
};
