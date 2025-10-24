/**
 * # 324. Wiggle Sort Ii
 *
 * Difficulty: Medium
 *
 * Solve the Wiggle Sort Ii problem as described.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>* ```</dd>
 * <dt>Output:</dt>
 * <dd>* ```</dd>
 * <dt>Explanation:</dt>
 * <dd>Processing input produces the expected output</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Sorting, Virtual indexing, Partitioning, Two-pointer technique
 * **Data Structures**: Array, In-place manipulation
 * **Patterns**: Wiggle pattern, Median finding, Index mapping
 * **Time Complexity**: **O(n²)**
 * **Space Complexity**: **O(1)**
 *
 * ### INTUITION:
 * The key insight is to solve this problem efficiently.
 *
 * ### APPROACH:
 * We solve this problem by implementing the required algorithm.
 *
 * ### WHY THIS WORKS:
 * This approach works because it correctly implements the problem requirements.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * example input
 * ```
 *
 * Output:
 * ```
 * example output
 * ```

### TIME COMPLEXITY:
 * **O(n²)** - Analysis of time complexity
 *
 * ### SPACE COMPLEXITY:
 * **O(1)** - Analysis of space complexity
 *
 * ### EDGE CASES:
 * - Handle empty input
 * - Handle boundary conditions
 *
 * </details>
 */

function wiggleSort(nums) {
    const sorted = [...nums].sort((a, b) => a - b);
    const n = nums.length;
    const mid = Math.floor((n + 1) / 2);

    const small = sorted.slice(0, mid).reverse();
    const large = sorted.slice(mid).reverse();

    for (let i = 0; i < small.length; i++) {
        nums[i * 2] = small[i];
    }

    for (let i = 0; i < large.length; i++) {
        nums[i * 2 + 1] = large[i];
    }
}

function verifyWiggle(nums) {
    for (let i = 0; i < nums.length - 1; i++) {
        if (i % 2 === 0) {
            if (nums[i] >= nums[i + 1]) return false;
        } else {
            if (nums[i] <= nums[i + 1]) return false;
        }
    }
    return true;
}

if (require.main === module) {
    const testCases = [
        [1, 5, 1, 1, 6, 4],
        [1, 3, 2, 2, 3, 1],
        [1, 2, 3, 4, 5],
        [5, 4, 3, 2, 1],
        [1, 1, 2, 2, 3, 3],
        [4, 5, 5, 6]
    ];

    console.log("Testing wiggleSort:");
    for (const test of testCases) {
        const nums = [...test];
        const original = [...test];
        wiggleSort(nums);
        const isValid = verifyWiggle(nums);
        const status = isValid ? "✓" : "✗";
        console.log(`${status} Input: [${original}]`);
        console.log(`   Output: [${nums}], Valid: ${isValid}`);
    }
}

module.exports = { wiggleSort, verifyWiggle };
