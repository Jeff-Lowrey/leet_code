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
 * 
 * <b>🔍 SOLUTION EXPLANATION</b>
 *
 * ### METADATA:
 * **Techniques**: Sorting, Virtual indexing, Partitioning, Two-pointer technique
 * **Data Structures**: Array, In-place manipulation
 * **Patterns**: Wiggle pattern, Median finding, Index mapping
 * **Time Complexity**: **O(n²)**
 * **Space Complexity**: **O(n)**
 *
 * ### INTUITION:
The key insight is that unlike Wiggle Sort I which allows equality, this requires strict inequality (<, >, <, >).
We need to interleave smaller and larger halves to avoid adjacent equal elements.

### APPROACH:
The algorithm proceeds as follows:

**Data structures: Array (sorting and manipulation)**
1. **Find median**: Partition array around median value
2. **Interleave halves**: Place smaller elements at even indices, larger at odd
3. **Reverse order**: Place larger elements in reverse to avoid adjacency
4. **Virtual indexing**: Map indices to avoid using extra space

### WHY THIS WORKS:
 * - After sorting, split into two halves around median
 * - Interleaving ensures no same-valued elements are adjacent
 * - Reverse order within halves maximizes separation
 * - Example: [1,2,3,4,5,6] → [1,4,2,5,3,6] → rearrange → [3,6,2,5,1,4]
 *
 *

This solution uses partitioning for efficient implementation.

This solution uses two-pointer technique for efficient implementation.
### EXAMPLE WALKTHROUGH:
Input:
```
nums = [1,5,1,1,6,4]
```

**Step 1:** Sort the input array [1,5,1,1,6,4]
- Sorted: [1,1,1,4,5,6]

**Step 2:** Split around median (median ≈ 2.5, so split at index 3)
- Small half: [1,1,1]
- Large half: [4,5,6]

**Step 3:** Interleave in reverse order
- Even indices (0,2,4): [1,1,1] reversed → 1,1,1
- Odd indices (1,3,5): [4,5,6] reversed → 6,5,4

**Step 4:** Verify wiggle property
- Result: [1,6,1,5,1,4]
- Check: 1<6>1<5>1<4 ✓

Output:
```
[1,6,1,5,1,4]
```

### TIME COMPLEXITY:
 * O(n log n)
 * For sorting. Can be O(n) with median-finding algorithm.
 *
 * ### SPACE COMPLEXITY:
 * O(n)
 * For temporary sorted array. Can be O(1) with in-place virtual indexing.
 *
 * ### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

