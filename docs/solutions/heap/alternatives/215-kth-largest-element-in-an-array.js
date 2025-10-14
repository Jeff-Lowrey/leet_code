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
 * - **Empty array:** Handle nums.length == 0
 * - **Single element:** Special case for minimal input
 * - **All same values:** Check for duplicate handling
 * - **Negative numbers:** Ensure algorithm works with negatives
 * - **Large arrays:** Consider O(n) vs O(n²) performance
 *
 * </details>
 */

/**
 * MinHeap implementation for the heap-based solution
 */
class MinHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    peek() {
        return this.heap[0];
    }

    push(val) {
        this.heap.push(val);
        this.heapifyUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return root;
    }

    heapifyUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex] <= this.heap[index]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    heapifyDown(index) {
        while (true) {
            let minIndex = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;

            if (leftChild < this.heap.length && this.heap[leftChild] < this.heap[minIndex]) {
                minIndex = leftChild;
            }
            if (rightChild < this.heap.length && this.heap[rightChild] < this.heap[minIndex]) {
                minIndex = rightChild;
            }

            if (minIndex === index) break;
            [this.heap[index], this.heap[minIndex]] = [this.heap[minIndex], this.heap[index]];
            index = minIndex;
        }
    }
}

/**
 * Main solution for Problem 215: Kth Largest Element In An Array
 *
 * @param {number[]} nums - Array of integers
 * @param {number} k - Find kth largest element (1-indexed)
 * @return {number} - The kth largest element
 *
 * Time Complexity: O(n log k) for heap approach, O(n) average for quickselect
 * Space Complexity: O(k) for heap approach, O(1) for quickselect
 */
function solve(nums, k) {
    // Approach 1: Min-Heap (default)
    return findKthLargestHeap(nums, k);
}

/**
 * Find kth largest element using min-heap approach
 * Time: O(n log k), Space: O(k)
 */
function findKthLargestHeap(nums, k) {
    const minHeap = new MinHeap();

    for (const num of nums) {
        minHeap.push(num);
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }

    return minHeap.peek();
}

/**
 * Find kth largest element using quickselect approach
 * Time: O(n) average, O(n²) worst case, Space: O(1)
 */
function findKthLargestQuickselect(nums, k) {
    const targetIndex = nums.length - k; // Convert to 0-indexed from end

    function partition(left, right, pivotIndex) {
        const pivotValue = nums[pivotIndex];
        // Move pivot to end
        [nums[pivotIndex], nums[right]] = [nums[right], nums[pivotIndex]];

        let storeIndex = left;
        for (let i = left; i < right; i++) {
            if (nums[i] < pivotValue) {
                [nums[storeIndex], nums[i]] = [nums[i], nums[storeIndex]];
                storeIndex++;
            }
        }

        // Move pivot to its final position
        [nums[storeIndex], nums[right]] = [nums[right], nums[storeIndex]];
        return storeIndex;
    }

    function quickselect(left, right) {
        if (left === right) return nums[left];

        // Random pivot for better average performance
        const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
        const pivotFinalIndex = partition(left, right, pivotIndex);

        if (targetIndex === pivotFinalIndex) {
            return nums[targetIndex];
        } else if (targetIndex < pivotFinalIndex) {
            return quickselect(left, pivotFinalIndex - 1);
        } else {
            return quickselect(pivotFinalIndex + 1, right);
        }
    }

    return quickselect(0, nums.length - 1);
}

/**
 * Test cases for Problem 215: Kth Largest Element In An Array
 */
function testSolution() {
    console.log('Testing 215. Kth Largest Element In An Array');

    // Test case 1: Basic functionality
    const result1 = solve([3,2,1,5,6,4], 2);
    const expected1 = 5;
    console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

    // Test case 2: Single element
    const result2 = solve([1], 1);
    const expected2 = 1;
    console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

    // Test case 3: k equals 1 (maximum element)
    const result3 = solve([3,2,3,1,2,4,5,5,6], 1);
    const expected3 = 6;
    console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

    // Test case 4: k equals array length (minimum element)
    const result4 = solve([7,10,4,3,20,15], 6);
    const expected4 = 3;
    console.assert(result4 === expected4, `Test 4 failed: expected ${expected4}, got ${result4}`);

    // Test case 5: Duplicates
    const result5 = solve([3,2,3,1,2,4,5,5,6], 4);
    const expected5 = 4;
    console.assert(result5 === expected5, `Test 5 failed: expected ${expected5}, got ${result5}`);

    // Test case 6: All same elements
    const result6 = solve([1,1,1,1], 2);
    const expected6 = 1;
    console.assert(result6 === expected6, `Test 6 failed: expected ${expected6}, got ${result6}`);

    // Test case 7: Negative numbers
    const result7 = solve([-1,-3,2,0,1], 2);
    const expected7 = 1;
    console.assert(result7 === expected7, `Test 7 failed: expected ${expected7}, got ${result7}`);

    // Test quickselect approach
    console.log('\nTesting quickselect approach:');
    const result8 = findKthLargestQuickselect([3,2,1,5,6,4], 2);
    const expected8 = 5;
    console.assert(result8 === expected8, `Test 8 failed: expected ${expected8}, got ${result8}`);

    console.log('All test cases passed for 215. Kth Largest Element In An Array!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 215. Kth Largest Element In An Array ===');
    console.log('Category: Heap');
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
    findKthLargestHeap,
    findKthLargestQuickselect,
    MinHeap,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution focuses on heap concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
