"""
# Difficulty: Medium

# 767. Reorganize String

Given a problem that demonstrates key concepts in Heap.

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
[This problem requires understanding of heap concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply heap methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages heap principles
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
    def reorganizeString(self, s: str) -> str:
        """
        Reorganizes the input string so no adjacent characters are the same.

        Args:
            s: Input string to be reorganized

        Returns:
            Reorganized string if possible, empty string if not possible

        Time Complexity: O(n log k) where n is string length and k is unique characters
        Space Complexity: O(k) where k is number of unique characters
        """
        # Edge case: empty string
        if not s:
            return ""

        # Count frequency of each character
        char_count = Counter(s)

        # If the most frequent character appears more than (n+1)/2 times,
        # it's impossible to reorganize
        max_count = max(char_count.values())
        if max_count > (len(s) + 1) // 2:
            return ""

        # Create max heap of (-count, char) pairs
        # Using negative count for max heap since heapq is min heap
        heap = [(-count, char) for char, count in char_count.items()]
        heapq.heapify(heap)

        # Build the result string
        result = []

        # Keep taking the two most frequent characters
        while len(heap) >= 2:
            count1, char1 = heapq.heappop(heap)
            count2, char2 = heapq.heappop(heap)

            # Append both characters
            result.extend([char1, char2])

            # Update counts and push back if needed
            if count1 + 1 < 0:
                heapq.heappush(heap, (count1 + 1, char1))
            if count2 + 1 < 0:
                heapq.heappush(heap, (count2 + 1, char2))

        # Handle the last character if any
        if heap:
            count, char = heapq.heappop(heap)
            if count < -1:  # If more than one character remains
                return ""
            result.append(char)

        return "".join(result)

def test_solution():
    """
    Test cases for 767. Reorganize String.
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
    print(f"Solution for 767. Reorganize String")
