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
 * **Space Complexity**: **O(n)**
 *
 * ### INTUITION:
 * Unlike Wiggle Sort I which allows equality, this requires strict inequality (<, >, <, >).
 * We need to interleave smaller and larger halves to avoid adjacent equal elements.
 *
 * ### APPROACH:
 * 1. **Find median**: Partition array around median value
 * 2. **Interleave halves**: Place smaller elements at even indices, larger at odd
 * 3. **Reverse order**: Place larger elements in reverse to avoid adjacency
 * 4. **Virtual indexing**: Map indices to avoid using extra space
 *
 * ### WHY THIS WORKS:
 * - After sorting, split into two halves around median
 * - Interleaving ensures no same-valued elements are adjacent
 * - Reverse order within halves maximizes separation
 * - Example: [1,2,3,4,5,6] → [1,4,2,5,3,6] → rearrange → [3,6,2,5,1,4]
 *
 * ### EXAMPLE WALKTHROUGH:
 * ```
 * Input: nums = [1,5,1,1,6,4]
 *
 * Step 1: Sort
 * [1,1,1,4,5,6]
 *
 * Step 2: Split around median (median ≈ 2.5, so split at index 3)
 * Small half: [1,1,1]
 * Large half: [4,5,6]
 *
 * Step 3: Interleave in reverse order
 * Even indices (0,2,4): [1,1,1] reversed → 1,1,1
 * Odd indices (1,3,5): [4,5,6] reversed → 6,5,4
 *
 * Result: [1,6,1,5,1,4]
 * Verify: 1<6>1<5>1<4 ✓
 *
 * Why reverse order?
 * If we used [1,1,1] and [4,5,6] directly:
 * [1,4,1,5,1,6] - works
 * But with [1,1,1,2,2,2], without reversing:
 * [1,2,1,2,1,2] - works
 * With [1,1,1,1,2,2], need clever placement:
 * [1,2,1,2,1,1] - the last two are equal!
 * Reversing: [1,2,1,2,1,1] → place from middle outward
 * ```
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
 * - Array with many duplicate elements
 * - All elements equal (impossible with strict inequality requirement)
 * - Small arrays (length 2-3)
 * - Even vs odd length arrays
 *
 *
*/

function wiggleSort(nums: number[]): void {
    const sorted: number[] = [...nums].sort((a, b) => a - b);
    const n: number = nums.length;
    const mid: number = Math.floor((n + 1) / 2);

    const small: number[] = sorted.slice(0, mid).reverse();
    const large: number[] = sorted.slice(mid).reverse();

    for (let i = 0; i < small.length; i++) {
        nums[i * 2] = small[i];
    }

    for (let i = 0; i < large.length; i++) {
        nums[i * 2 + 1] = large[i];
    }
}

function verifyWiggle(nums: number[]): boolean {
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
    const testCases: number[][] = [
        [1, 5, 1, 1, 6, 4],
        [1, 3, 2, 2, 3, 1],
        [1, 2, 3, 4, 5],
        [5, 4, 3, 2, 1],
        [1, 1, 2, 2, 3, 3],
        [4, 5, 5, 6]
    ];

    console.log("Testing wiggleSort:");
    for (const test of testCases) {
        const nums: number[] = [...test];
        const original: number[] = [...test];
        wiggleSort(nums);
        const isValid: boolean = verifyWiggle(nums);
        const status: string = isValid ? "✓" : "✗";
        console.log(`${status} Input: [${original}]`);
        console.log(`   Output: [${nums}], Valid: ${isValid}`);
    }
}

export { wiggleSort, verifyWiggle };
