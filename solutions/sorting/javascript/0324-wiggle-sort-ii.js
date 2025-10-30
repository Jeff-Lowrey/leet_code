/**
 * # 0324. Wiggle Sort Ii
 *
 * Difficulty: Medium
 *
 * Solve the Wiggle Sort Ii problem as described.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [1,5,1,1,6,4]</dd>
 * <dt>Output:</dt>
 * <dd>[1,6,1,5,1,4]</dd>
 * <dt>Explanation:</dt>
 * <dd>After sorting and interleaving, the result satisfies nums[i] < nums[i+1] > nums[i+2] pattern</dd>
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
 * Unlike Wiggle Sort I which allows equality, this requires strict inequality (<, >, <, >).
 * We need to interleave smaller and larger halves to avoid adjacent equal elements.
 *
 * ### APPROACH:
 * **Data structures: Array (sorting and manipulation)**
 * 1. **Find median**: Partition array around median value using array operations
 * 2. **Interleave halves**: Place smaller elements at even indices in array, larger at odd indices in array
 * 3. **Reverse order**: Place larger elements in reverse order in array to avoid adjacency
 * 4. **Virtual indexing**: Map indices in array to avoid using extra space
 *
 * ### WHY THIS WORKS:
 * - After sorting, split into two halves around median
 * - Interleaving ensures no same-valued elements are adjacent
 * - Reverse order within halves maximizes separation
 * - Example: [1,2,3,4,5,6] → [1,4,2,5,3,6] → rearrange → [3,6,2,5,1,4]
 *
 *

This solution uses partitioning for efficient implementation.

This solution uses two-pointer technique for efficient implementation.
### EXAMPLE WALKTHROUGH:
 * **Input:** nums = [1,5,1,1,6,4]
 *
 * **Step 1:** Sort the input array [1,5,1,1,6,4]
 * - Sorted: [1,1,1,4,5,6]
 *
 * **Step 2:** Split around median (median ≈ 2.5, so split at index 3)
 * - Small half: [1,1,1]
 * - Large half: [4,5,6]
 *
 * **Step 3:** Interleave in reverse order
 * - Even indices (0,2,4): [1,1,1] reversed → 1,1,1
 * - Odd indices (1,3,5): [4,5,6] reversed → 6,5,4
 *
 * **Step 4:** Verify wiggle property
 * - Result: [1,6,1,5,1,4]
 * - Check: 1<6>1<5>1<4 ✓
 *
 * **Output:** [1,6,1,5,1,4]
 *
 * ### TIME COMPLEXITY:
 * O(n log n)
 * For sorting. Can be O(n) with median-finding algorithm.
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * For temporary sorted array. Can be O(1) with in-place virtual indexing.
 *
 * ### EDGE CASES:
 * - Array with many duplicate elements: [1,1,1,4,5,6] → requires careful interleaving
 * - All elements equal: Impossible with strict inequality requirement (no solution)
 * - Small arrays: [1,2] → [1,2], [1,2,3] → [2,3,1] or [1,3,2]
 * - Even vs odd length arrays: [1,2,3,4] vs [1,2,3,4,5] (odd has extra in small half)
 *
 *
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
