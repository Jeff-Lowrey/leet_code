"""
# Difficulty: Medium

# 451. Sort Characters By Frequency

Given a string s, sort it in decreasing order based on the frequency of the characters.
The frequency of a character is the number of times it appears in the string.

Return the sorted string. If there are multiple answers, return any of them.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>Input: s = "tree"</dd>
<dt>Output:</dt>
<dd>Step 1: Count frequencies: {'t': 1, 'r': 1, 'e': 2}</dd>
<dt>Explanation:</dt>
<dd>Characters sorted by frequency: 'tree' becomes 'eetr' or 'eert'</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
We need to count character frequencies and then sort characters by their frequency
in descending order. This is a classic use case for heaps/priority queues combined
with hash maps for counting.

### APPROACH:
1. **Count frequencies**: Use hash map to count each character
2. **Sort by frequency**: Use heap or simple sorting to order by frequency
3. **Build result**: Reconstruct string with characters in frequency order

### WHY THIS WORKS:
- Hash map provides O(1) character frequency counting
- Heap/sorting organizes characters by frequency efficiently
- Multiple characters can appear in any order at same frequency

### EXAMPLE WALKTHROUGH:
```
Input: s = "tree"
Step 1: Count frequencies: {'t': 1, 'r': 1, 'e': 2}
Step 2: Sort by frequency: [('e', 2), ('t', 1), ('r', 1)]
Step 3: Build result: "eert" (or "eetr")
```

### TIME COMPLEXITY:
O(n log k)
Where n is string length, k is number of unique characters

### SPACE COMPLEXITY:
O(k)
For storing character frequencies and heap

### EDGE CASES:
- Empty string: return empty
- Single character: return as-is
- All characters same frequency: any order valid

</details>
"""

import heapq
from collections import Counter

class Solution:
    def frequencySort(self, s: str) -> str:
        """
        Sort characters by frequency using heap approach.

        Args:
            s: Input string

        Returns:
            String sorted by character frequency (descending)

        Time Complexity: O(n log k) where k is unique characters
        Space Complexity: O(k) for frequency map and heap
        """
        if not s:
            return ""

        # Count character frequencies
        freq_map = Counter(s)

        # Use max heap (negate frequencies for min heap)
        max_heap = [(-freq, char) for char, freq in freq_map.items()]
        heapq.heapify(max_heap)

        result = []
        while max_heap:
            neg_freq, char = heapq.heappop(max_heap)
            freq = -neg_freq
            result.append(char * freq)

        return "".join(result)

    def frequencySortSimple(self, s: str) -> str:
        """
        Alternative solution using simple sorting.

        Args:
            s: Input string

        Returns:
            String sorted by character frequency (descending)

        Time Complexity: O(n + k log k) where k is unique characters
        Space Complexity: O(k) for frequency map
        """
        if not s:
            return ""

        # Count frequencies
        freq_map = Counter(s)

        # Sort by frequency (descending)
        sorted_chars = sorted(freq_map.items(), key=lambda x: x[1], reverse=True)

        # Build result
        result = []
        for char, freq in sorted_chars:
            result.append(char * freq)

        return "".join(result)

    def frequencySortBucket(self, s: str) -> str:
        """
        Bucket sort approach for O(n) time complexity.

        Args:
            s: Input string

        Returns:
            String sorted by character frequency (descending)

        Time Complexity: O(n)
        Space Complexity: O(n) for buckets
        """
        if not s:
            return ""

        # Count frequencies
        freq_map = Counter(s)

        # Create buckets for each possible frequency
        buckets = [[] for _ in range(len(s) + 1)]

        # Place characters in buckets by frequency
        for char, freq in freq_map.items():
            buckets[freq].append(char)

        # Build result from highest frequency to lowest
        result = []
        for freq in range(len(buckets) - 1, 0, -1):
            for char in buckets[freq]:
                result.append(char * freq)

        return "".join(result)

def test_solution():
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Example from problem
    result = solution.frequencySort("tree")
    # Multiple valid answers: "eert" or "eetr"
    assert result in ["eert", "eetr"], f"Expected 'eert' or 'eetr', got {result}"

    # Test case 2: Empty input
    result = solution.frequencySort("")
    expected = ""
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 3: All same character
    result = solution.frequencySort("aaa")
    expected = "aaa"
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 451. Sort Characters By Frequency ===")
    print(f"frequencySort('tree') -> {solution.frequencySort('tree')}")
    print(f"frequencySort('cccaaa') -> {solution.frequencySort('cccaaa')}")
    print(f"frequencySort('Aabb') -> {solution.frequencySort('Aabb')}")
