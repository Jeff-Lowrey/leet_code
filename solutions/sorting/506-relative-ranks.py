"""
# Difficulty: Easy

# 506. Relative Ranks

You are given an integer array score of size n, where score[i] is the score of the ith athlete
in a competition. All the scores are guaranteed to be unique.

The athletes are placed based on their scores, where the 1st place athlete has the highest score,
the 2nd place athlete has the 2nd highest score, and so on. The placement of each athlete determines
their rank:

- The 1st place athlete's rank is "Gold Medal".
- The 2nd place athlete's rank is "Silver Medal".
- The 3rd place athlete's rank is "Bronze Medal".
- For the 4th place to the nth place athlete, their rank is their placement number (i.e., the xth place athlete's rank is "x").

Return an array answer of size n where answer[i] is the rank of the ith athlete.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
We need to map each score to its rank. Sorting gives us the order, but we need to maintain
the original indices. Use sorting with indices or create a score-to-rank mapping.

### APPROACH:
1. **Create index-score pairs**: Track original positions
2. **Sort by score descending**: Highest score first
3. **Assign ranks**: Gold/Silver/Bronze for top 3, numbers for rest
4. **Map back to original positions**: Use original indices

### WHY THIS WORKS:
- Sorting by score gives us the ranking order
- Tracking original indices lets us place ranks correctly
- Dictionary mapping from score to rank is efficient
- Special strings for top 3, numbers for rest

### EXAMPLE WALKTHROUGH:
```
Input: score = [5,4,3,2,1]

Step 1: Create (score, index) pairs
[(5,0), (4,1), (3,2), (2,3), (1,4)]

Step 2: Sort by score descending
[(5,0), (4,1), (3,2), (2,3), (1,4)]

Step 3: Assign ranks
Rank 1 (Gold Medal): score 5, index 0
Rank 2 (Silver Medal): score 4, index 1
Rank 3 (Bronze Medal): score 3, index 2
Rank 4: score 2, index 3
Rank 5: score 1, index 4

Step 4: Map back to original indices
answer[0] = "Gold Medal"
answer[1] = "Silver Medal"
answer[2] = "Bronze Medal"
answer[3] = "4"
answer[4] = "5"

Output: ["Gold Medal","Silver Medal","Bronze Medal","4","5"]
```

### TIME COMPLEXITY:
O(n log n)
For sorting the scores

### SPACE COMPLEXITY:
O(n)
For storing score-rank mappings and result

### EDGE CASES:
- Single athlete (gets Gold Medal)
- Two athletes (Gold and Silver only)
- Three athletes (Gold, Silver, Bronze)
- Large number of athletes

</details>
"""

class Solution:
    def findRelativeRanks(self, score: list[int]) -> list[str]:
        """
        Assign ranks to athletes based on their scores.

        Args:
            score: Array of athlete scores

        Returns:
            Array of rank strings for each athlete

        Time Complexity: O(n log n) for sorting
        Space Complexity: O(n) for result and mappings
        """
        n = len(score)

        # Create (score, original_index) pairs and sort by score descending
        sorted_scores = sorted(enumerate(score), key=lambda x: x[1], reverse=True)

        # Initialize result array
        result = [""] * n

        # Assign ranks
        for rank, (original_idx, _) in enumerate(sorted_scores):
            if rank == 0:
                result[original_idx] = "Gold Medal"
            elif rank == 1:
                result[original_idx] = "Silver Medal"
            elif rank == 2:
                result[original_idx] = "Bronze Medal"
            else:
                result[original_idx] = str(rank + 1)

        return result

    def findRelativeRanksDict(self, score: list[int]) -> list[str]:
        """
        Alternative approach using dictionary mapping.

        Time Complexity: O(n log n)
        Space Complexity: O(n)
        """
        # Create score to rank mapping
        sorted_scores = sorted(score, reverse=True)
        rank_map = {}

        for rank, s in enumerate(sorted_scores):
            if rank == 0:
                rank_map[s] = "Gold Medal"
            elif rank == 1:
                rank_map[s] = "Silver Medal"
            elif rank == 2:
                rank_map[s] = "Bronze Medal"
            else:
                rank_map[s] = str(rank + 1)

        # Map original scores to ranks
        return [rank_map[s] for s in score]

    def findRelativeRanksOneLiner(self, score: list[int]) -> list[str]:
        """
        Concise solution using sorted with key.

        Time Complexity: O(n log n)
        Space Complexity: O(n)
        """
        sorted_scores = sorted(score, reverse=True)
        medals = ["Gold Medal", "Silver Medal", "Bronze Medal"]
        rank_map = {s: medals[i] if i < 3 else str(i + 1) for i, s in enumerate(sorted_scores)}
        return [rank_map[s] for s in score]

def test_solution():
    """Test cases for Problem 506."""
    solution = Solution()

    # Test case 1: Example from problem
    result1 = solution.findRelativeRanks([5, 4, 3, 2, 1])
    expected1 = ["Gold Medal", "Silver Medal", "Bronze Medal", "4", "5"]
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Another example
    result2 = solution.findRelativeRanks([10, 3, 8, 9, 4])
    expected2 = ["Gold Medal", "5", "Bronze Medal", "Silver Medal", "4"]
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Single athlete
    result3 = solution.findRelativeRanks([100])
    expected3 = ["Gold Medal"]
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Two athletes
    result4 = solution.findRelativeRanks([5, 10])
    expected4 = ["Silver Medal", "Gold Medal"]
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Three athletes
    result5 = solution.findRelativeRanks([1, 2, 3])
    expected5 = ["Bronze Medal", "Silver Medal", "Gold Medal"]
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Four athletes
    result6 = solution.findRelativeRanks([10, 20, 30, 40])
    expected6 = ["4", "Bronze Medal", "Silver Medal", "Gold Medal"]
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test dictionary approach
    result7 = solution.findRelativeRanksDict([5, 4, 3, 2, 1])
    expected7 = ["Gold Medal", "Silver Medal", "Bronze Medal", "4", "5"]
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test one-liner approach
    result8 = solution.findRelativeRanksOneLiner([5, 4, 3, 2, 1])
    expected8 = ["Gold Medal", "Silver Medal", "Bronze Medal", "4", "5"]
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    # Test case 9: Random order
    result9 = solution.findRelativeRanks([100, 50, 200, 150])
    # Sorted descending: 200, 150, 100, 50
    # Ranks: Gold, Silver, Bronze, 4
    # Original order: [100->Bronze, 50->4, 200->Gold, 150->Silver]
    expected9 = ["Bronze Medal", "4", "Gold Medal", "Silver Medal"]
    assert result9 == expected9, f"Expected {expected9}, got {result9}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 506. Relative Ranks ===")
    print(f"findRelativeRanks([5,4,3,2,1]) -> {solution.findRelativeRanks([5, 4, 3, 2, 1])}")
    print(f"findRelativeRanks([10,3,8,9,4]) -> {solution.findRelativeRanks([10, 3, 8, 9, 4])}")
    print(f"findRelativeRanks([100]) -> {solution.findRelativeRanks([100])}")
    print(f"findRelativeRanks([1,2,3]) -> {solution.findRelativeRanks([1, 2, 3])}")
