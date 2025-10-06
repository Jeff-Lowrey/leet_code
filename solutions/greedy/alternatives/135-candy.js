/**
 * 135. Candy
 * Medium
 *
 * Candy Distribution Problem Problem: There are n children standing in a line. Each child must have at least one candy. Children with higher ratings should get more candies than their neighbors. Return the minimum number of candies you need to distribute. @param {number[]} ratings - Array of children's ratings @return {number} - Minimum total number of candies needed
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Candy is to understand the core problem pattern
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
 * Candy Distribution Problem
 * 
 * Problem: There are n children standing in a line. Each child must have at least one candy.
 * Children with higher ratings should get more candies than their neighbors.
 * Return the minimum number of candies you need to distribute.
 * 
 * @param {number[]} ratings - Array of children's ratings
 * @return {number} - Minimum total number of candies needed
 */

/**
 * Main function to calculate minimum candies needed
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function candy(ratings) {
    if (!ratings || ratings.length === 0) {
        return 0;
    }

    const n = ratings.length;
    
    // Initialize arrays to track candies from left and right
    const leftToRight = new Array(n).fill(1);
    const rightToLeft = new Array(n).fill(1);

    // Scan from left to right
    // Ensure children with higher ratings get more candies than left neighbor
    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            leftToRight[i] = leftToRight[i - 1] + 1;
        }
    }

    // Scan from right to left
    // Ensure children with higher ratings get more candies than right neighbor
    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            rightToLeft[i] = rightToLeft[i + 1] + 1;
        }
    }

    // Calculate total candies needed by taking maximum at each position
    let totalCandies = 0;
    for (let i = 0; i < n; i++) {
        totalCandies += Math.max(leftToRight[i], rightToLeft[i]);
    }

    return totalCandies;
}

/**
 * Alternative one-array solution
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function candyOptimized(ratings) {
    if (!ratings || ratings.length === 0) {
        return 0;
    }

    const n = ratings.length;
    const candies = new Array(n).fill(1);

    // Forward pass
    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }

    // Backward pass
    let totalCandies = candies[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        }
        totalCandies += candies[i];
    }

    return totalCandies;
}

// Test cases
function runTests() {
    const testCases = [
        {
            input: [1,0,2],
            expected: 5,
            description: "Basic test case with three ratings"
        },
        {
            input: [1,2,2],
            expected: 4,
            description: "Test case with equal ratings"
        },
        {
            input: [1,3,2,2,1],
            expected: 7,
            description: "Test case with peak in middle"
        },
        {
            input: [],
            expected: 0,
            description: "Empty array test case"
        },
        {
            input: [1],
            expected: 1,
            description: "Single element test case"
        }
    ];

    testCases.forEach((testCase, index) => {
        const result = candy(testCase.input);
        const optimizedResult = candyOptimized(testCase.input);
        console.log(`Test ${index + 1}: ${testCase.description}`);
        console.log(`Input: [${testCase.input}]`);
        console.log(`Expected: ${testCase.expected}`);
        console.log(`Regular Output: ${result}`);
        console.log(`Optimized Output: ${optimizedResult}`);
        console.log(`Status: ${result === testCase.expected ? 'PASSED' : 'FAILED'}`);
        console.log('------------------------');
    });
}

// Run tests if not in production
if (process.env.NODE_ENV !== 'production') {
    runTests();
}

// Export functions for external use
module.exports = {
    candy,
    candyOptimized
};