"""
# 451. Sort Characters By Frequency
# Difficulty: Medium
Given a string s, sort it in decreasing order based on the frequency of the characters.
The frequency of a character is the number of times it appears in the string.

Return the sorted string. If there are multiple answers, return any of them.

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

### TIME COMPLEXITY: O(n log k)
Where n is string length, k is number of unique characters

### SPACE COMPLEXITY: O(k)
For storing character frequencies and heap

### EXAMPLE WALKTHROUGH:
```
Input: s = "tree"
Step 1: Count frequencies: {'t': 1, 'r': 1, 'e': 2}
Step 2: Sort by frequency: [('e', 2), ('t', 1), ('r', 1)]
Step 3: Build result: "eert" (or "eetr")
```

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
    """Test cases for Problem 451."""
    solution = Solution()

    # Test case 1: Basic functionality
    result1 = solution.frequencySort("tree")
    # "eert" or "eetr" are both valid
    assert len(result1) == 4 and result1.count("e") == 2, f"Failed test 1: {result1}"

    # Test case 2: All same frequency
    result2 = solution.frequencySort("cccaaa")
    # Should be "cccaaa" or "aaaccc"
    assert result2 == "cccaaa" or result2 == "aaaccc", f"Failed test 2: {result2}"

    # Test case 3: Single character
    result3 = solution.frequencySort("Aabb")
    # Multiple valid answers, check length and content
    assert len(result3) == 4 and "A" in result3 and result3.count("b") == 2, f"Failed test 3: {result3}"

    # Test case 4: Empty string
    result4 = solution.frequencySort("")
    assert result4 == "", f"Failed test 4: {result4}"

    # Test case 5: Test simple sort approach
    result5 = solution.frequencySortSimple("tree")
    assert len(result5) == 4 and result5.count("e") == 2, f"Failed test 5: {result5}"

    # Test case 6: Test bucket sort approach
    result6 = solution.frequencySortBucket("tree")
    assert len(result6) == 4 and result6.count("e") == 2, f"Failed test 6: {result6}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 451. Sort Characters By Frequency ===")
    print(f"frequencySort('tree') -> {solution.frequencySort('tree')}")
    print(f"frequencySort('cccaaa') -> {solution.frequencySort('cccaaa')}")
    print(f"frequencySort('Aabb') -> {solution.frequencySort('Aabb')}")
