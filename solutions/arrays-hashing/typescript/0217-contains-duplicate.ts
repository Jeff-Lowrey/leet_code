/**
### INTUITION:
The key insight is that if all elements are unique, then the array length equals the set length.
If there are duplicates, the set will be smaller than the array.

### APPROACH:
Data structures: Hash Set (seen elements tracking), Array (input)**
1. **Convert array to set**: Transform the input array into a set data structure, which automatically removes all duplicate values
2. **Compare lengths**: Calculate the length of both the original array and the newly created set
3. **Detect duplicates**: If the lengths differ, duplicates existed in the original array (they were removed during set conversion)
4. **Return result**: Return True if lengths differ (duplicates found), False if lengths match (all elements unique)
5. **Alternative early termination**: For better average performance, iterate through array and add elements to a set one by one, returning True immediately when an element is already in the set

### WHY THIS WORKS:
A set by definition contains only unique elements - when we convert an array to a set, any duplicates are automatically removed. By comparing the lengths of the original array and the set, we can detect if duplicates existed. The early termination approach works because as soon as we find an element already in our seen set, we've proven a duplicate exists without needing to check the remaining elements.

### EXAMPLE WALKTHROUGH:
Input:
```
nums = [1, 2, 3, 1]
```

Step 1:** Convert array to set
- Input array: [1, 2, 3, 1]
- After set conversion: {1, 2, 3}
- Duplicates automatically removed during conversion

Step 2:** Compare lengths
- Original array length: 4
- Set length: 3
- Lengths are different (4 ≠ 3)

Step 3:** Detect duplicates
- Since array.length (4) > set.length (3), duplicates existed
- The missing element (1) appeared more than once

Step 4:** Return result
- Lengths differ → return true (duplicates found)

Step 5:** Alternative early termination approach
- seen = {} (start with empty set)
- Check nums[0]=1: not in seen, add it → seen = {1}
- Check nums[1]=2: not in seen, add it → seen = {1, 2}
- Check nums[2]=3: not in seen, add it → seen = {1, 2, 3}
- Check nums[3]=1: found in seen → return true immediately (better average performance)

Output:
```
true
```

### TIME COMPLEXITY:
O(n)** where n is the length of the array. In the worst case (no duplicates), we iterate through all n elements, performing one set membership check (**O(1)**) and one set insertion (**O(1)**) for each element. Total: **O(n × 1)** = **O(n)**. In the best case (duplicate found early), we return immediately, giving us **O(1)**. Average case is still **O(n)** as we might need to check most elements. The simple set conversion approach always takes **O(n)** to create the set.

### SPACE COMPLEXITY:
O(n)** - We create a set that in the worst case (all elements unique) stores all n elements from the array. Even with duplicates, we may store up to n unique values. The space used grows linearly with input size. For the set comparison approach, TypeScript/JavaScript creates a temporary set of size up to n. For the early termination approach, we build a set incrementally but still use up to **O(n)** space.

### EDGE CASES:
- **Empty array**: Return False (no duplicates possible)
- **Single element**: Return False (need at least 2 for duplicate)
- **All elements same**: Return True immediately on second element
- **All elements unique**: Set and array lengths match, return False
- **Duplicate at start**: Early termination finds it quickly

*/

class Solution {
  /**
   * Approach: Hash Set
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  containsDuplicate(nums: number[]): boolean {
    return nums.length !== new Set(nums).size;
  }

  /**
   * Approach: Hash Set with early termination
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */
  containsDuplicateVerbose(nums: number[]): boolean {
    const seen = new Set<number>();

    for (const num of nums) {
      if (seen.has(num)) {
        return true;
      }
      seen.add(num);
    }

    return false;
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1
  const nums1 = [1, 2, 3, 1];
  console.log(`Input: ${JSON.stringify(nums1)}`);
  console.log(`Output: ${solution.containsDuplicate(nums1)}`); // true

  // Test case 2
  const nums2 = [1, 2, 3, 4];
  console.log(`Input: ${JSON.stringify(nums2)}`);
  console.log(`Output: ${solution.containsDuplicate(nums2)}`); // false

  // Test case 3
  const nums3 = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2];
  console.log(`Input: ${JSON.stringify(nums3)}`);
  console.log(`Output: ${solution.containsDuplicate(nums3)}`); // true
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
