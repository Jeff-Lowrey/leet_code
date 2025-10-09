"""
# Difficulty: Hard

# 135. Candy

There are n children standing in a line. Each child is assigned a rating value given
in the integer array ratings.

You are giving candies to these children subjected to the following requirements:
- Each child must have at least one candy.
- Children with a higher rating get more candies than their neighbors.

Return the minimum number of candies you need to have to distribute the candies to
the children.

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
This is a classic greedy problem requiring two passes. The key insight is that we
need to satisfy both left and right neighbor constraints independently, then take
the maximum to satisfy both.

### APPROACH:
1. **Initialize**: Give each child 1 candy initially
2. **Left to right pass**: If ratings[i] > ratings[i-1], ensure candies[i] > candies[i-1]
3. **Right to left pass**: If ratings[i] > ratings[i+1], ensure candies[i] > candies[i+1]
4. **Sum total**: Return sum of all candies

### WHY THIS WORKS:
- **Greedy choice**: We assign minimum necessary candies to satisfy local constraints
- **Two passes ensure both directions**:
  - Left pass ensures right neighbor constraint
  - Right pass ensures left neighbor constraint
  - Taking max ensures both constraints satisfied
- **Optimality**: Each assignment is minimal, so total is minimal

### EXAMPLE WALKTHROUGH:
```
Input: ratings = [1,0,2]

Initial: candies = [1,1,1]

Left to right pass:
  i=1: ratings[1]=0 < ratings[0]=1, no change
       candies = [1,1,1]
  i=2: ratings[2]=2 > ratings[1]=0, candies[2] = candies[1] + 1 = 2
       candies = [1,1,2]

Right to left pass:
  i=1: ratings[1]=0 < ratings[2]=2, no change
       candies = [1,1,2]
  i=0: ratings[0]=1 > ratings[1]=0, candies[0] = max(1, 1+1) = 2
       candies = [2,1,2]

Total: 2 + 1 + 2 = 5
```

### TIME COMPLEXITY:
O(n)
Two passes through the array

### SPACE COMPLEXITY:
O(n)
Array to store candy counts (can be optimized to O(1) with complex logic)

### EDGE CASES:
- Single child: Return 1
- All same rating: Each gets 1 candy
- Strictly increasing: [1,2,3,...,n]
- Strictly decreasing: [n,n-1,...,2,1]
- Valley pattern: [2,1,2] → [2,1,2]
- Peak pattern: [1,2,1] → [1,2,1]

</details>
"""

class Solution:
    def candy(self, ratings: List[int]) -> int:
        """
        Calculate minimum candies needed using two-pass greedy algorithm.

        Args:
            ratings: Array of children's ratings

        Returns:
            Minimum total candies needed

        Time Complexity: O(n) - two passes
        Space Complexity: O(n) - candy array
        """
        n = len(ratings)
        if n == 0:
            return 0

        # Initialize all children with 1 candy
        candies = [1] * n

        # Left to right pass: ensure right neighbor constraint
        for i in range(1, n):
            if ratings[i] > ratings[i - 1]:
                candies[i] = candies[i - 1] + 1

        # Right to left pass: ensure left neighbor constraint
        for i in range(n - 2, -1, -1):
            if ratings[i] > ratings[i + 1]:
                # Take max to preserve left pass results
                candies[i] = max(candies[i], candies[i + 1] + 1)

        return sum(candies)

    def candyVerbose(self, ratings: List[int]) -> int:
        """
        Verbose version with detailed explanation of each step.

        Args:
            ratings: Array of children's ratings

        Returns:
            Minimum total candies needed
        """
        n = len(ratings)
        if n == 0:
            return 0

        # Step 1: Initialize - everyone gets at least 1 candy
        candies = [1] * n

        # Step 2: Left to right - handle increasing ratings
        # If child i has higher rating than i-1, they need more candies
        for i in range(1, n):
            if ratings[i] > ratings[i - 1]:
                candies[i] = candies[i - 1] + 1

        # Step 3: Right to left - handle decreasing ratings
        # If child i has higher rating than i+1, they need more candies
        # Use max to keep the larger value from both passes
        for i in range(n - 2, -1, -1):
            if ratings[i] > ratings[i + 1]:
                candies[i] = max(candies[i], candies[i + 1] + 1)

        # Step 4: Return total
        return sum(candies)

    def candyOnePass(self, ratings: List[int]) -> int:
        """
        Optimized one-pass solution with O(1) space (more complex).

        This approach tracks peaks and valleys to calculate candies on the fly.

        Args:
            ratings: Array of children's ratings

        Returns:
            Minimum total candies needed

        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        n = len(ratings)
        if n == 0:
            return 0

        total = 1
        up = 0
        down = 0
        peak = 0

        for i in range(1, n):
            if ratings[i] > ratings[i - 1]:
                # Ascending
                up += 1
                down = 0
                peak = up
                total += up + 1
            elif ratings[i] < ratings[i - 1]:
                # Descending
                up = 0
                down += 1
                # If down sequence exceeds peak, need to add to peak
                total += down + (1 if down >= peak else 0)
            else:
                # Equal ratings - reset
                up = 0
                down = 0
                peak = 0
                total += 1

        return total

def test_solution():
    """Test cases for Problem 135."""
    solution = Solution()

    # Test case 1: Valley pattern
    result1 = solution.candy([1,0,2])
    expected1 = 5
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Equal ratings
    result2 = solution.candy([1,2,2])
    expected2 = 4
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Strictly increasing
    result3 = solution.candy([1,2,3,4,5])
    expected3 = 15  # 1+2+3+4+5
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Strictly decreasing
    result4 = solution.candy([5,4,3,2,1])
    expected4 = 15  # 5+4+3+2+1
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Single child
    result5 = solution.candy([1])
    expected5 = 1
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: All same
    result6 = solution.candy([3,3,3,3])
    expected6 = 4
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test case 7: Complex pattern
    result7 = solution.candy([1,3,2,2,1])
    expected7 = 7  # [1,2,1,2,1]
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test case 8: Peak pattern
    result8 = solution.candy([1,2,1])
    expected8 = 4  # [1,2,1]
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    # Test case 9: Complex case
    result9 = solution.candy([1,2,87,87,87,2,1])
    expected9 = 13  # [1,2,3,1,2,2,1]
    assert result9 == expected9, f"Expected {expected9}, got {result9}"

    # Test case 10: Ascending then descending
    result10 = solution.candy([1,6,10,8,7,3,2])
    expected10 = 18  # [1,2,3,2,1] -> need adjustment for 10
    assert result10 == expected10, f"Expected {expected10}, got {result10}"

    # Test verbose implementation
    result11 = solution.candyVerbose([1,0,2])
    expected11 = 5
    assert result11 == expected11, f"Expected {expected11}, got {result11}"

    # Test one-pass implementation
    result12 = solution.candyOnePass([1,0,2])
    expected12 = 5
    assert result12 == expected12, f"Expected {expected12}, got {result12}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 135. Candy ===")
    print(f"candy([1,0,2]) -> {solution.candy([1,0,2])}")
    print(f"candy([1,2,2]) -> {solution.candy([1,2,2])}")
    print(f"candy([1,2,3,4,5]) -> {solution.candy([1,2,3,4,5])}")
    print(f"candy([5,4,3,2,1]) -> {solution.candy([5,4,3,2,1])}")
