/**
### INTUITION:
The key insight is that we need to map each score to its rank. Sorting gives us the order, but we need to maintain
the original indices. Use sorting with indices or create a score-to-rank mapping.

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

Data structures: **Array** with index-score pairs for sorting, Result **Array** for output**
1. **Create index-score pairs**: Track original positions using array of tuples
2. **Sort by score descending**: Highest score first using array sort
3. **Assign ranks**: Gold/Silver/Bronze for top 3, numbers for rest, storing in result array
4. **Map back to original positions**: Use original indices to place ranks in result array

### WHY THIS WORKS:
- **Sorting with Index Tracking** technique: We pair each score with its original index before sorting
- This preserves the original position information even after the array is reordered
- Sorting by score (in descending order) gives us the ranking order
- Tracking original indices in pairs lets us place ranks correctly in result array
- After sorting, we iterate through the sorted pairs and assign ranks based on position
- Special strings for top 3 (Gold/Silver/Bronze), numbers for rest
- The original index in each pair tells us where to place the rank in the result **Array**
- **Array** iteration maps sorted ranks back to original positions efficiently in O(n) time

### EXAMPLE WALKTHROUGH:
Given input score = [5,4,3,2,1]:

Input:
```
score = [5,4,3,2,1]
```

Step 1:** Create (score, index) pairs
- [(5,0), (4,1), (3,2), (2,3), (1,4)]

Step 2:** Sort by score descending
- [(5,0), (4,1), (3,2), (2,3), (1,4)]

Step 3:** Assign ranks based on sorted order
- Rank 1 (Gold Medal): score 5, index 0
- Rank 2 (Silver Medal): score 4, index 1
- Rank 3 (Bronze Medal): score 3, index 2
- Rank 4: score 2, index 3
- Rank 5: score 1, index 4

Step 4:** Map back to original indices
- answer[0] = "Gold Medal"
- answer[1] = "Silver Medal"
- answer[2] = "Bronze Medal"
- answer[3] = "4"
- answer[4] = "5"

Output:
```
["Gold Medal","Silver Medal","Bronze Medal","4","5"]
```

### TIME COMPLEXITY:
O(n log n)**
- Sorting or divide-and-conquer
For sorting the scores

### SPACE COMPLEXITY:
O(n)**
- Additional hash map storage
For storing score-rank mappings and result

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

*/

class Solution {
  /**
   * Assign ranks to athletes based on their scores.
   *
   *         Args:
   *             score: **Array** of athlete scores
   *
   *         Returns:
   *             **Array** of rank strings for each athlete
   *
   *         Time Complexity: O(n log n) for sorting
   *         Space Complexity: O(n) for result and mappings
   */
  findRelativeRanks(score: number[]): string[] {
    const n = score.length;
    const indexed = score.map((s, i) => [s, i] as [number, number]);
    indexed.sort((a, b) => b[0] - a[0]); // Sort by score descending

    const result = new **Array**(n).fill("");
    const medals = ["Gold Medal", "Silver Medal", "Bronze Medal"];

    for (let rank = 0; rank < n; rank++) {
      const [, originalIdx] = indexed[rank];
      result[originalIdx] = rank < 3 ? medals[rank] : String(rank + 1);
    }

    return result;
  }

  /**
   * Alternative approach using dictionary mapping.
   *
   *         Time Complexity: O(n log n)
   *         Space Complexity: O(n)
   */
  findRelativeRanksDict(score: number[]): string[] {
    const sortedScores = [...score].sort((a, b) => b - a);
    const rankMap = new Map<number, string>();
    const medals = ["Gold Medal", "Silver Medal", "Bronze Medal"];

    for (let rank = 0; rank < sortedScores.length; rank++) {
      const s = sortedScores[rank];
      rankMap.set(s, rank < 3 ? medals[rank] : String(rank + 1));
    }

    return score.map((s) => rankMap.get(s)!);
  }

  /**
   * Concise solution using sorted with key.
   *
   *         Time Complexity: O(n log n)
   *         Space Complexity: O(n)
   */
  findRelativeRanksOneLiner(score: number[]): string[] {
    const sortedScores = [...score].sort((a, b) => b - a);
    const medals = ["Gold Medal", "Silver Medal", "Bronze Medal"];
    const rankMap = new Map(sortedScores.map((s, i) => [s, i < 3 ? medals[i] : String(i + 1)]));
    return score.map((s) => rankMap.get(s)!);
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  console.log("=== 506. Relative Ranks ===");
  console.log("findRelativeRanks([5,4,3,2,1]) ->", solution.findRelativeRanks([5, 4, 3, 2, 1]));
  console.log("findRelativeRanks([10,3,8,9,4]) ->", solution.findRelativeRanks([10, 3, 8, 9, 4]));
  console.log("findRelativeRanks([100]) ->", solution.findRelativeRanks([100]));
  console.log("findRelativeRanks([1,2,3]) ->", solution.findRelativeRanks([1, 2, 3]));
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;