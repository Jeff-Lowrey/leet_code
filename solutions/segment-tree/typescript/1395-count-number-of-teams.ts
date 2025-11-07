/**
### INTUITION:
This problem is about counting ordered triplets in an array. We can solve it using multiple approaches: brute force O(n³), dynamic programming O(n²), or advanced data structures like segment trees or Binary Indexed Trees for O(n log n). The key insight is that for each middle element, we count how many valid left and right elements exist.

### APPROACH:
1. **Handle edge case**: Return 0 if array has fewer than 3 elements (need at least 3 for a team)
2. **Iterate through middle positions**: For each soldier j as the middle element (from index 1 to n-2)
3. **Count left elements**: Scan all elements to the left of j, counting how many are smaller and how many are larger
4. **Count right elements**: Scan all elements to the right of j, counting how many are smaller and how many are larger
5. **Calculate ascending teams**: Multiply left_smaller by right_larger (elements that can form ascending triplet with j)
6. **Calculate descending teams**: Multiply left_larger by right_smaller (elements that can form descending triplet with j)
7. **Sum all valid teams**: Add both ascending and descending team counts for each middle position to get total

### WHY THIS WORKS:
A set by definition contains only unique elements - when we convert an array to a set, any duplicates are automatically removed. By comparing the lengths of the original array and the set, we can detect if duplicates existed. The early termination approach works because as soon as we find an element already in our seen set, we've proven a duplicate exists without needing to check the remaining elements.

### EXAMPLE WALKTHROUGH:
Input:
```
rating = [2,5,3,4,1]
```

For ascending teams (i < j < k and rating[i] < rating[j] < rating[k]):
For descending teams (i < j < k and rating[i] > rating[j] > rating[k]):

Steps:
Step 1: - j=1 (rating=5): left_smaller=1 (rating=2), right_larger=0 → 0 teams
Step 2: - j=2 (rating=3): left_smaller=1 (rating=2), right_larger=1 (rating=4) → 1 team
Step 3: - j=3 (rating=4): left_smaller=2 (rating=2,3), right_larger=0 → 0 teams
Step 4: - j=1 (rating=5): left_larger=0, right_smaller=3 → 0 teams
Step 5: - j=2 (rating=3): left_larger=1 (rating=5), right_smaller=1 (rating=1) → 1 team
Step 6: - j=3 (rating=4): left_larger=1 (rating=5), right_smaller=1 (rating=1) → 1 team
Step 7: Total: 1 + 1 + 1 = 3 teams

Output:
```
[Expected output]
```

### TIME COMPLEXITY:
O(n log n)**
- Sorting or divide-and-conquer
For segment tree approach with coordinate compression

### SPACE COMPLEXITY:
O(n)**
- Additional hash map storage
For compressed coordinates and tree structure

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

class Solution {
  /**
   * Count number of valid teams.
   *
   * Time Complexity: O(n^2)
   * Space Complexity: O(1)
   */
  numTeams(rating: number[]): number {
    if (!rating || rating.length < 3) {
      return 0;
    }

    const n = rating.length;
    let count = 0;

    // For each middle soldier
    for (let j = 1; j < n - 1; j++) {
      let lessLeft = 0,
        greaterLeft = 0;
      let lessRight = 0,
        greaterRight = 0;

      // Count soldiers on the left
      for (let i = 0; i < j; i++) {
        if (rating[i] < rating[j]) lessLeft++;
        if (rating[i] > rating[j]) greaterLeft++;
      }

      // Count soldiers on the right
      for (let k = j + 1; k < n; k++) {
        if (rating[k] < rating[j]) lessRight++;
        if (rating[k] > rating[j]) greaterRight++;
      }

      // Increasing teams: left < middle < right
      count += lessLeft * greaterRight;

      // Decreasing teams: left > middle > right
      count += greaterLeft * lessRight;
    }

    return count;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log(`Test 1: ${solution.numTeams([2, 5, 3, 4, 1]) === 3 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${solution.numTeams([2, 1, 3]) === 0 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${solution.numTeams([1, 2, 3, 4]) === 4 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
