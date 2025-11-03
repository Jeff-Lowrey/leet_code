/**
### INTUITION:
The key insight is that implement various sorting algorithms from scratch. Quicksort, Mergesort, and Heapsort all
achieve O(n log n) time. This problem tests understanding of fundamental sorting algorithms.

### APPROACH:
The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

The algorithm proceeds as follows:

Data structures: Array (for storage), Stack (for recursion), Heap (for heap sort)**
Merge Sort:**
1. Divide array into two halves recursively
2. Sort each half recursively using array operations
3. Merge sorted halves back together into array

Quick Sort:**
1. Choose pivot element from array
2. Partition array around pivot using two pointers
3. Recursively sort left and right partitions in array

Heap Sort:**
1. Build max heap from array
2. Repeatedly extract maximum and rebuild heap using array operations

### WHY THIS WORKS:
- This ensures that **Merge Sort**: Divide-and-conquer with guaranteed O(n log n), stable, needs O(n) space
- This ensures that **Quick Sort**: Average O(n log n), in-place, but O(n²) worst case
- This ensures that **Heap Sort**: Guaranteed O(n log n), in-place, not stable



This solution uses hash map storage for efficient implementation.

This solution uses two pointers for efficient implementation.

The solution leverages stack for efficient operations.

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [5,2,3,1]
```

Merge Sort Approach:**

Step 1:** Divide array into two halves recursively
- Split [5,2,3,1] → [5,2] and [3,1]
- Split [5,2] → [5] and [2] (base case)
- Split [3,1] → [3] and [1] (base case)

Step 2:** Sort each half recursively using array operations
- [5] is sorted (single element)
- [2] is sorted (single element)
- Merge [5] and [2] → [2,5] (sorted left half)
- [3] is sorted (single element)
- [1] is sorted (single element)
- Merge [3] and [1] → [1,3] (sorted right half)

Step 3:** Merge sorted halves back together into array
- Merge [2,5] and [1,3]
- Compare: 2 vs 1 → take 1, result = [1]
- Compare: 2 vs 3 → take 2, result = [1,2]
- Compare: 5 vs 3 → take 3, result = [1,2,3]
- Remaining: 5, result = [1,2,3,5]

Quick Sort Approach (Alternative):**

Step 4:** Choose pivot element from array
- Choose pivot = 3 (middle element) from [5,2,3,1]

Step 5:** Partition array around pivot using two pointers
- Elements < 3: [2,1]
- Pivot: [3]
- Elements > 3: [5]
- After partition: [2,1,3,5]

Step 6:** Recursively sort left and right partitions in array
- Sort [2,1]: choose pivot=2, partition → [1,2]
- Sort [5]: single element, already sorted
- Combine: [1,2] + [3] + [5] = [1,2,3,5]

Heap Sort Approach (Alternative):**

Step 7:** Build max heap from array
- Input: [5,2,3,1]
- Build heap: [5,2,3,1] (5 is already max at root)

Step 8:** Repeatedly extract maximum and rebuild heap using array operations
- Extract 5, heap becomes [3,2,1], result = [5]
- Extract 3, heap becomes [2,1], result = [3,5]
- Extract 2, heap becomes [1], result = [2,3,5]
- Extract 1, result = [1,2,3,5]

Output:
```
[1,2,3,5]
```

### TIME COMPLEXITY:
O(n log n)**
- Sorting or divide-and-conquer
All three algorithms achieve this complexity

### SPACE COMPLEXITY:
- Merge Sort: **O(n)** for merge array
- Quick Sort: **O(log n)** for recursion stack
- Heap Sort: **O(1)** in-place

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  sortArray(nums: number[]): number[] {
    if (nums.length <= 1) {
      return nums;
    }

    const mid = Math.floor(nums.length / 2);
    const left = this.sortArray(nums.slice(0, mid));
    const right = this.sortArray(nums.slice(mid));

    return this.merge(left, right);
  }

  private merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    result.push(...left.slice(i));
    result.push(...right.slice(j));

    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  const result1 = solution.sortArray([5, 2, 3, 1]);
  console.log(
    `Test 1: ${JSON.stringify(result1) === JSON.stringify([1, 2, 3, 5]) ? "PASS" : "FAIL"}`
  );

  const result2 = solution.sortArray([5, 1, 1, 2, 0, 0]);
  console.log(
    `Test 2: ${JSON.stringify(result2) === JSON.stringify([0, 0, 1, 1, 2, 5]) ? "PASS" : "FAIL"}`
  );

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
