/**
 * 621. Task Scheduler
 * Medium
 *
 * Task Scheduler Implementation Problem: Given a list of tasks (represented by characters) and a cooldown period 'n', calculate the minimum number of units of time needed to complete all tasks. Rules: - Same tasks must have at least 'n' units of time between them - Different tasks can be executed without waiting @param {character[]} tasks - Array of tasks (represented by characters) @param {number} n - Cooldown period between same tasks @return {number} - Minimum units of time needed to complete all tasks
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Task Scheduler is to understand the core problem pattern
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
 * Task Scheduler Implementation
 * 
 * Problem: Given a list of tasks (represented by characters) and a cooldown period 'n',
 * calculate the minimum number of units of time needed to complete all tasks.
 * 
 * Rules:
 * - Same tasks must have at least 'n' units of time between them
 * - Different tasks can be executed without waiting
 * 
 * @param {character[]} tasks - Array of tasks (represented by characters)
 * @param {number} n - Cooldown period between same tasks
 * @return {number} - Minimum units of time needed to complete all tasks
 */

/**
 * Main function to calculate minimum time needed to complete all tasks
 */
function leastInterval(tasks, n) {
    // Edge case: if no cooldown required, return number of tasks
    if (n === 0) return tasks.length;
    
    // Count frequency of each task
    const frequencyMap = new Map();
    let maxFrequency = 0;
    let maxFrequencyCount = 0;
    
    // Build frequency map and find max frequency
    for (const task of tasks) {
        const count = (frequencyMap.get(task) || 0) + 1;
        frequencyMap.set(task, count);
        
        if (count > maxFrequency) {
            maxFrequency = count;
            maxFrequencyCount = 1;
        } else if (count === maxFrequency) {
            maxFrequencyCount++;
        }
    }
    
    // Calculate minimum intervals needed
    // Formula: (maxFrequency - 1) * (n + 1) + maxFrequencyCount
    const minimumIntervals = (maxFrequency - 1) * (n + 1) + maxFrequencyCount;
    
    // Return the maximum between minimum intervals and total tasks
    return Math.max(minimumIntervals, tasks.length);
}

/**
 * Helper function to test the implementation
 */
function runTests() {
    const testCases = [
        {
            tasks: ['A', 'A', 'A', 'B', 'B', 'B'],
            n: 2,
            expected: 8
        },
        {
            tasks: ['A', 'A', 'A', 'B', 'B', 'B'],
            n: 0,
            expected: 6
        },
        {
            tasks: ['A', 'A', 'A', 'A', 'A', 'A', 'B', 'C', 'D', 'E', 'F', 'G'],
            n: 2,
            expected: 16
        }
    ];
    
    for (let i = 0; i < testCases.length; i++) {
        const { tasks, n, expected } = testCases[i];
        const result = leastInterval(tasks, n);
        console.log(`Test Case ${i + 1}:`);
        console.log(`Input: tasks = [${tasks}], n = ${n}`);
        console.log(`Expected: ${expected}`);
        console.log(`Result: ${result}`);
        console.log(`Status: ${result === expected ? 'PASSED' : 'FAILED'}`);
        console.log('---');
    }
}

// Export the main function for use in other modules
module.exports = {
    leastInterval
};

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}