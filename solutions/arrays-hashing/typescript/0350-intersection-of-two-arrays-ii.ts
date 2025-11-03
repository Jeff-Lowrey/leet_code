/**
### INTUITION:
Use a hash map to count frequencies in one array, then iterate through the second
array to find common elements. This allows us to handle duplicates correctly.

### APPROACH:
1. **Convert array to set**: Transform the input array into a set data structure, which automatically removes all duplicate values
2. **Compare lengths**: Calculate the length of both the original array and the newly created set
3. **Detect duplicates**: If the lengths differ, duplicates existed in the original array (they were removed during set conversion)
4. **Return result**: Return True if lengths differ (duplicates found), False if lengths match (all elements unique)
5. **Alternative early termination**: For better average performance, iterate through array and add elements to a set one by one, returning True immediately when an element is already in the set

### WHY THIS WORKS:
- Hash map tracks how many times each element appears in nums1
- For each element in nums2, we check if it's available in the map
- Decrementing the count ensures we don't reuse elements
- Time complexity is linear, space is proportional to smaller array

### EXAMPLE WALKTHROUGH:
Input:
```
nums1 = [1,2,2,1], nums2 = [2,2]
```

Step 1: Build frequency map from nums1
freq = {1: 2, 2: 2}
Step 2: Iterate through nums2

Steps:
Step 1: num = 2: freq[2] = 2 > 0 → add 2, freq[2] = 1
Step 2: num = 2: freq[2] = 1 > 0 → add 2, freq[2] = 0

Output:
```
[2, 2]
```

### TIME COMPLEXITY:
O(n + m)** - where n = len(nums1) and m = len(nums2). We make one pass through nums1 to build the frequency map (**O(n)**), then one pass through nums2 to find intersections (**O(m)**). Each hash map operation (Counter increment, lookup, decrement) is **O(1)**. Total: **O(n)** + **O(m)** = **O(n + m)**. This is optimal since we must examine all elements in both arrays.

### SPACE COMPLEXITY:
O(min(n, m)**)** - where n = len(nums1) and m = len(nums2). We store frequencies of the smaller array in the hash map. In the worst case where all elements in the smaller array are unique, we store min(n, m) entries. The result array can be at most min(n, m) in size (when all elements of the smaller array appear in the larger array). Total space: **O(min(n, m)**) for the frequency map + **O(min(n, m)**) for the result = **O(min(n, m)**).

### EDGE CASES:
- **Empty arrays**: Return empty array
- **No intersection**: Return empty array
- **All elements intersect**: Return all with proper frequencies
- **One array is subset**: Return the subset

</details>

*/

class Solution {
  /**
   * Find intersection of two arrays with duplicate handling.
   *
   * Time Complexity: O(n + m)
   * Space Complexity: O(min(n, m))
   */
  intersect(nums1: number[], nums2: number[]): number[] {
    // Count frequencies in nums1
    const freq = new Map<number, number>();
    for (const num of nums1) {
      freq.set(num, (freq.get(num) || 0) + 1);
    }

    const result: number[] = [];

    // Find intersections in nums2
    for (const num of nums2) {
      const count = freq.get(num) || 0;
      if (count > 0) {
        result.push(num);
        freq.set(num, count - 1);
      }
    }

    return result;
  }

  /**
   * Alternative: Two pointers approach (requires sorting).
   *
   * Time Complexity: O(n log n + m log m)
   * Space Complexity: O(1) excluding output
   */
  intersectSorted(nums1: number[], nums2: number[]): number[] {
    nums1.sort((a, b) => a - b);
    nums2.sort((a, b) => a - b);

    let i = 0,
      j = 0;
    const result: number[] = [];

    while (i < nums1.length && j < nums2.length) {
      if (nums1[i] < nums2[j]) {
        i++;
      } else if (nums1[i] > nums2[j]) {
        j++;
      } else {
        result.push(nums1[i]);
        i++;
        j++;
      }
    }

    return result;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${JSON.stringify(solution.intersect([1, 2, 2, 1], [2, 2]))}`);
  console.log(`Test 2: ${JSON.stringify(solution.intersect([4, 9, 5], [9, 4, 9, 8, 4]).sort())}`);
  console.log(`Test 3: ${JSON.stringify(solution.intersect([1, 2, 3], [4, 5, 6]))}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
