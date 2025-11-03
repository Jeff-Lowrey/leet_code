"""
### INTUITION:
The key insight is that use max heap to track character frequencies. Greedily pick most frequent character, add to result, decrease count, and temporarily hold it. Add back to heap after one position to ensure no adjacent duplicates.

### APPROACH:
1. **Count frequencies**: Use Counter(s) to get character frequencies
2. **Check feasibility**: If max_freq > (len(s) + 1) // 2, return empty string
3. **Build max heap**: Push (-freq, char) to heap for all characters
4. **Initialize result**: Set result = [], prev_char = None, prev_freq = 0
5. **Build string**: While heap not empty, pop (freq, char)
6. **Add to result**: Append char to result
7. **Push previous back**: If prev_freq < 0, push (prev_freq, prev_char) to heap
8. **Update previous**: Set prev_char = char, prev_freq = freq + 1, return ''.join(result)

### WHY THIS WORKS:
- Max heap by frequency: greedily place most frequent chars first
- Always pick most frequent available char (not same as previous)
- After placing char, decrement count and put back if count > 0
- If can't place without adjacent duplicates, impossible (return "")
- O(n log k) time: k unique chars, n total chars, O(k) space for heap

### EXAMPLE WALKTHROUGH:
Input:
```
s = "aab"
```

Step 1: Count character frequencies
freq = {'a': 2, 'b': 1}
Step 2: Build max heap (using negative frequencies)
heap = [(-2, 'a'), (-1, 'b')]
Step 3: Rearrange characters
Pick 'a': result = "a", heap = [(-1, 'b'), (-1, 'a')]
Pick 'b': result = "ab", heap = [(-1, 'a')]
Pick 'a': result = "aba"

Output:
```
"aba" (reorganized string)
```

### TIME COMPLEXITY:
**O(n)**
- Single pass through input

### SPACE COMPLEXITY:
**O(1)**
- Constant extra space

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""

import heapq
from collections import Counter
from typing import Any


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
        result: list[Any] = []

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


def test_solution() -> None:
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem - "aab" can be reorganized to "aba"
    result = solution.reorganizeString("aab")
    # Verify no adjacent duplicates and correct length
    assert len(result) == 3, f"Wrong length: result"
    assert all(result[i] != result[i + 1] for i in range(len(result) - 1)), f"Has adjacent duplicates: result"

    # Test case 2: Impossible case - too many of one character
    result = solution.reorganizeString("aaab")
    expected = ""
    assert result == expected, f"Expected expected, got result"

    # Test case 3: Single character
    result = solution.reorganizeString("a")
    expected = "a"
    assert result == expected, f"Expected expected, got result"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 767. Reorganize String")
