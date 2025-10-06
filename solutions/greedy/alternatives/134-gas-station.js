/**
 * 134. Gas Station
 * Medium
 *
 * Gas Station Problem Given two arrays: gas and cost, where: - gas[i] represents the amount of gas available at station i - cost[i] represents the cost to travel from station i to station i+1 Find the starting gas station's index from where you can travel around the circuit once in the clockwise direction. Return -1 if impossible. @param {number[]} gas - Array of gas available at each station @param {number[]} cost - Array of cost to travel to next station @return {number} - Starting index or -1 if impossible
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Gas Station is to understand the core problem pattern
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
 * Gas Station Problem
 * 
 * Given two arrays: gas and cost, where:
 * - gas[i] represents the amount of gas available at station i
 * - cost[i] represents the cost to travel from station i to station i+1
 * 
 * Find the starting gas station's index from where you can travel around 
 * the circuit once in the clockwise direction. Return -1 if impossible.
 * 
 * @param {number[]} gas - Array of gas available at each station
 * @param {number[]} cost - Array of cost to travel to next station
 * @return {number} - Starting index or -1 if impossible
 */
function canCompleteCircuit(gas, cost) {
    // Input validation
    if (!gas || !cost || gas.length !== cost.length || gas.length === 0) {
        return -1;
    }

    // Initialize variables
    let totalSurplus = 0;    // Track overall gas surplus
    let currentSurplus = 0;  // Track current journey's gas surplus
    let startStation = 0;    // Potential starting station

    for (let i = 0; i < gas.length; i++) {
        // Calculate current gas surplus/deficit
        const currentDiff = gas[i] - cost[i];
        
        // Update total surplus
        totalSurplus += currentDiff;
        // Update current journey surplus
        currentSurplus += currentDiff;

        // If we can't reach next station
        if (currentSurplus < 0) {
            // Reset start to next station
            startStation = i + 1;
            // Reset current surplus
            currentSurplus = 0;
        }
    }

    // If total surplus is negative, circuit cannot be completed
    return totalSurplus >= 0 ? startStation : -1;
}

/**
 * Test cases
 */
function runTests() {
    // Test Case 1: Valid circuit
    console.log('Test 1:', canCompleteCircuit([1,2,3,4,5], [3,4,5,1,2]));  // Expected: 3

    // Test Case 2: Impossible circuit
    console.log('Test 2:', canCompleteCircuit([2,3,4], [3,4,3]));  // Expected: -1

    // Test Case 3: Single station
    console.log('Test 3:', canCompleteCircuit([1], [1]));  // Expected: 0

    // Test Case 4: Empty input
    console.log('Test 4:', canCompleteCircuit([], []));  // Expected: -1

    // Test Case 5: Exact amount needed
    console.log('Test 5:', canCompleteCircuit([2,3,4], [2,3,4]));  // Expected: 0
}

// Export for use in other modules
module.exports = {
    canCompleteCircuit
};

// Run tests if this file is being run directly
if (require.main === module) {
    runTests();
}