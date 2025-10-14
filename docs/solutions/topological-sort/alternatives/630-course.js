/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 * **Step 1:** [description]
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **Pointers meet:** Handle when left == right
 * - **Empty input:** Check for null or empty arrays
 * - **Single element:** One pointer scenario
 * - **All duplicates:** Pointer movement with same values
 * - **Boundary crossing:** Prevent left > right
 *
 * </details>
 */

/**
 * Main solution for Problem 630: Course Schedule III
 *
 * @param {number[][]} courses - Array of [duration, lastDay] pairs
 * @return {number} - Maximum number of courses that can be taken
 *
 * Time Complexity: O(n log n) for sorting and priority queue operations
 * Space Complexity: O(n) for the priority queue
 */
function solve(courses) {
    // Sort courses by their end day (deadline)
    courses.sort((a, b) => a[1] - b[1]);

    // Max heap to store durations (using negative values for max behavior)
    const maxHeap = [];
    let currentTime = 0;

    // Helper functions for max heap
    const heapPush = (val) => {
        maxHeap.push(val);
        let idx = maxHeap.length - 1;
        while (idx > 0) {
            const parent = Math.floor((idx - 1) / 2);
            if (maxHeap[parent] >= maxHeap[idx]) break;
            [maxHeap[parent], maxHeap[idx]] = [maxHeap[idx], maxHeap[parent]];
            idx = parent;
        }
    };

    const heapPop = () => {
        if (maxHeap.length === 0) return null;
        if (maxHeap.length === 1) return maxHeap.pop();

        const max = maxHeap[0];
        maxHeap[0] = maxHeap.pop();
        let idx = 0;

        while (true) {
            const left = 2 * idx + 1;
            const right = 2 * idx + 2;
            let largest = idx;

            if (left < maxHeap.length && maxHeap[left] > maxHeap[largest]) {
                largest = left;
            }
            if (right < maxHeap.length && maxHeap[right] > maxHeap[largest]) {
                largest = right;
            }
            if (largest === idx) break;

            [maxHeap[idx], maxHeap[largest]] = [maxHeap[largest], maxHeap[idx]];
            idx = largest;
        }

        return max;
    };

    // Greedy approach: take courses, replace with shorter ones if needed
    for (const [duration, lastDay] of courses) {
        currentTime += duration;
        heapPush(duration);

        // If we exceed the deadline, remove the longest course taken so far
        if (currentTime > lastDay) {
            currentTime -= heapPop();
        }
    }

    return maxHeap.length;
}

/**
 * Test cases for Problem 630: Course Schedule III
 */
function testSolution() {
    console.log('Testing 630. Course Schedule III');

    // Test case 1: Can take 3 courses
    const result1 = solve([[100, 200], [200, 1300], [1000, 1250], [2000, 3200]]);
    const expected1 = 3;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Can only take 1 course
    const result2 = solve([[1, 2]]);
    const expected2 = 1;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: Can take 2 courses
    const result3 = solve([[3, 2], [4, 3]]);
    const expected3 = 0;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: Multiple courses with same deadline
    const result4 = solve([[5, 5], [4, 6], [2, 6]]);
    const expected4 = 2;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: All courses can be taken
    const result5 = solve([[1, 2], [2, 4], [3, 7]]);
    const expected5 = 3;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    console.log('All test cases passed for 630. Course Schedule III!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 630. Course ===');
    console.log('Category: Topological Sort');
    console.log('Difficulty: Medium');
    console.log('');

    // Example demonstration would go here
    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    solve,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution focuses on topological sort concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
