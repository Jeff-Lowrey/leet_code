/**
### INTUITION:
The key insight is that use bucket sort where the index represents frequency. After counting frequencies with a hash map, place each number in a bucket corresponding to its frequency. Then collect results from the highest frequency buckets downward until we have k elements.

### APPROACH:
1. **Convert array to set**: Transform the input array into a set data structure, which automatically removes all duplicate values
2. **Compare lengths**: Calculate the length of both the original array and the newly created set
3. **Detect duplicates**: If the lengths differ, duplicates existed in the original array (they were removed during set conversion)
4. **Return result**: Return True if lengths differ (duplicates found), False if lengths match (all elements unique)
5. **Alternative early termination**: For better average performance, iterate through array and add elements to a set one by one, returning True immediately when an element is already in the set

### WHY THIS WORKS:
- This ensures that bucket sort by frequency achieves O(n) time vs heap's O(n log k)
- This ensures that frequency can't exceed n, so we need at most n+1 buckets (index 0 to n)
- This ensures that hash map counts frequencies in O(n), bucketing also O(n)
- This ensures that collecting from buckets high to low gets k elements without full sort
- This ensures that trade space O(n) for buckets to gain linear time complexity

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [1,1,1,2,2,3], k = 2
```

Step 1: Count frequencies
freq_map = {1: 3, 2: 2, 3: 1}
Step 2: Create buckets by frequency
buckets[3] = [1]
buckets[2] = [2]
buckets[1] = [3]
Step 3: Collect from highest frequency buckets
- From bucket 3: add 1
- From bucket 2: add 2

Output:
```
[1, 2]
```

### TIME COMPLEXITY:
O(n)** - where n is the length of the nums array. We perform three linear passes: (1) count frequencies in hash map **O(n)**, (2) place numbers into frequency buckets **O(unique elements)** ≤ **O(n)**, (3) collect k elements from buckets **O(n)** in worst case. Total: **O(n)** + **O(n)** + **O(n)** = **O(3n)** = **O(n)**. This is better than heap-based solutions which would be **O(n log k)** or sorting-based solutions which would be **O(n log n)**.

### SPACE COMPLEXITY:
O(n)** - where n is the length of the input array. We use a frequency hash map that stores at most n unique elements (**O(n)**), plus a buckets array of size n+1 where each bucket can hold numbers (**O(n)** total across all buckets in worst case), plus the result array of size k (**O(k)** ≤ **O(n)**). Total space: **O(n)** + **O(n)** + **O(k)** = **O(n)**. The dominant factors are the hash map and buckets array, both **O(n)**.

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

</details>

*/

class Solution {
  /**
   * Find the k most frequent elements using bucket sort.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  topKFrequent(nums: number[], k: number): number[] {
    // Handle edge cases
    if (!nums || nums.length === 0 || k <= 0) {
      return [];
    }
    if (k >= nums.length) {
      return Array.from(new Set(nums));
    }

    // Count frequency of each number
    const freqMap = new Map<number, number>();
    for (const num of nums) {
      freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    // Create buckets where index represents frequency
    const buckets: number[][] = Array.from({ length: nums.length + 1 }, () =>
      [],
    );
    for (const [num, freq] of freqMap.entries()) {
      buckets[freq].push(num);
    }

    // Collect k most frequent elements
    const result: number[] = [];
    for (let i = buckets.length - 1; i >= 0; i--) {
      if (buckets[i].length > 0) {
        result.push(...buckets[i]);
        if (result.length >= k) {
          return result.slice(0, k);
        }
      }
    }

    return result;
  }

  /**
   * Alternative implementation using sorting.
   *
   * Time Complexity: O(n log n)
   * Space Complexity: O(n)
   */
  topKFrequentSort(nums: number[], k: number): number[] {
    // Handle edge cases
    if (!nums || nums.length === 0 || k <= 0) {
      return [];
    }
    if (k >= nums.length) {
      return Array.from(new Set(nums));
    }

    // Count frequency of each number
    const freqMap = new Map<number, number>();
    for (const num of nums) {
      freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    // Sort by frequency and take top k
    return Array.from(freqMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, k)
      .map((entry) => entry[0]);
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1: Example from problem
  const result1 = solution.topKFrequent([1, 1, 1, 2, 2, 3], 2);
  const expected1 = [1, 2];
  console.log(`Test 1: ${JSON.stringify(result1.sort()) === JSON.stringify(expected1.sort()) ? "PASS" : "FAIL"}`);
  console.log(`  Input: [1, 1, 1, 2, 2, 3], k=2`);
  console.log(`  Expected: ${JSON.stringify(expected1)}`);
  console.log(`  Got: ${JSON.stringify(result1)}`);

  // Test case 2: Single element
  const result2 = solution.topKFrequent([1], 1);
  const expected2 = [1];
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify(expected2) ? "PASS" : "FAIL"}`);
  console.log(`  Input: [1], k=1`);
  console.log(`  Expected: ${JSON.stringify(expected2)}`);
  console.log(`  Got: ${JSON.stringify(result2)}`);

  // Test case 3: All different elements
  const result3 = solution.topKFrequent([1, 2, 3, 4, 5], 2);
  console.log(`Test 3: Got ${JSON.stringify(result3)} (any 2 elements valid)`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
