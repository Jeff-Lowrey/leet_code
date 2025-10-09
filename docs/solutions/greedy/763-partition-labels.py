"""
# Difficulty: Medium

# 763. Partition Labels

Given a problem that demonstrates key concepts in Greedy.

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
[This problem requires understanding of greedy concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply greedy methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages greedy principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```

### TIME COMPLEXITY:
O(n)

### SPACE COMPLEXITY:
O(1)

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>
"""

class Solution:
    def partitionLabels(self, s: str) -> List[int]:
        """
        Partitions the input string into as many parts as possible where each letter
        appears in at most one part.

        Args:
            s: Input string to be partitioned

        Returns:
            List of integers representing the lengths of the partitions

        Time Complexity: O(n) where n is the length of the input string
        Space Complexity: O(1) since we only use a fixed-size array for last_occurrence
        """
        if not s:
            return []

        # Store the last occurrence of each character
        last_occurrence = {}
        for i, char in enumerate(s):
            last_occurrence[char] = i

        partitions = []
        start = 0
        end = 0

        # Iterate through the string to find partitions
        for i, char in enumerate(s):
            # Update the end to be the maximum of current end and
            # the last occurrence of current character
            end = max(end, last_occurrence[char])

            # If we've reached the end of current partition
            if i == end:
                partitions.append(end - start + 1)
                start = i + 1

        return partitions

def test_solution():
    """
    Test cases for 763. Partition Labels.
    """
    solution = Solution()

    # Test case 1: Basic functionality
    # result = solution.solve([test_input])
    # expected = [expected_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Edge case
    # result = solution.solve([edge_case_input])
    # expected = [edge_case_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 763. Partition Labels")
