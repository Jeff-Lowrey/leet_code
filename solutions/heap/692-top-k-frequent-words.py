"""
# Difficulty: Medium

# 692. Top K Frequent Words

Given an array of strings words and an integer k, return the k most frequent strings.

Return the answer sorted by the frequency from highest to lowest. Sort the words with the same frequency by their lexicographical order.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[3, 2]</dd>
<dt>Output:</dt>
<dd>"Expected {expected}, got {result}"</dd>
<dt>Explanation:</dt>
<dd>Top k=2 frequent words in ['i','love','leetcode','i','love','coding'] are ['i','love']</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This problem combines frequency counting with sorting. We need to find the k most frequent words, but with a twist: when frequencies are equal, we sort lexicographically. A heap is perfect for this because we can maintain the top k elements efficiently while respecting both frequency and lexicographical ordering.

### APPROACH:
1. **Count frequencies**: Use HashMap to count word frequencies
2. **Use min-heap**: Maintain heap of size k with custom comparator
3. **Custom comparator**: Less frequent words first, then reverse lexicographical order
4. **Build result**: Extract from heap and reverse to get correct order

### WHY THIS WORKS:
- Min-heap keeps smallest elements at root, so we keep the k largest
- Custom comparator: (-frequency, word) ensures frequent words stay in heap
- For equal frequencies, lexicographically smaller words are "larger" in our heap
- Final result needs reversal because heap gives us reverse order

### EXAMPLE WALKTHROUGH:
```
Input: words = ["i","love","leetcode","i","love","coding"], k = 2
Frequencies: {"i": 2, "love": 2, "leetcode": 1, "coding": 1}
Heap process:
- Add ("i", 2): heap = [(-2, "i")]
- Add ("love", 2): heap = [(-2, "love"), (-2, "i")] (love > i lexicographically)
- Add ("leetcode", 1): heap = [(-1, "leetcode"), (-2, "i"), (-2, "love")]
- Remove leetcode: heap = [(-2, "love"), (-2, "i")]
- Add ("coding", 1): heap = [(-1, "coding"), (-2, "i"), (-2, "love")]
- Remove coding: heap = [(-2, "love"), (-2, "i")]
Result: ["i", "love"] (after reversing)
```

### TIME COMPLEXITY:
O(N log k)
Where N is number of words, k is the result size. Heap operations are O(log k).

### SPACE COMPLEXITY:
O(N + k)
O(N) for frequency map, O(k) for heap

### EDGE CASES:
- k equals number of unique words
- All words have same frequency (pure lexicographical sort)
- Single word repeated
- k = 1 with multiple candidates

</details>
"""

class Solution:
    def topKFrequent(self, words: list[str], k: int) -> list[str]:
        """
        Find top k frequent words using min-heap approach.

        Args:
            words: List of strings
            k: Number of top frequent words to return

        Returns:
            List of k most frequent words sorted by frequency (desc) then lexicographically

        Time Complexity: O(N log k) where N is number of words
        Space Complexity: O(N + k) for frequency map and heap
        """
        import heapq
        from collections import Counter

        # Count word frequencies
        freq_map = Counter(words)

        # Use min-heap with custom comparator
        # Store as (frequency, word) where we want:
        # - Higher frequency words to stay in heap
        # - For same frequency, lexicographically smaller words to stay
        heap = []

        for word, freq in freq_map.items():
            # Push (-freq, word) to simulate max-heap for frequency
            # For equal frequencies, Python's default string comparison handles lexicographical order
            heapq.heappush(heap, (freq, word))

            # Keep only k elements
            if len(heap) > k:
                heapq.heappop(heap)

        # Extract results in reverse order (heap gives smallest first)
        result = []
        while heap:
            freq, word = heapq.heappop(heap)
            result.append(word)

        # Reverse to get highest frequency first, and for same frequency, lexicographical order
        return result[::-1]

    def topKFrequentOptimal(self, words: list[str], k: int) -> list[str]:
        """
        Optimal solution using heap with proper comparator.

        Args:
            words: List of strings
            k: Number of top frequent words to return

        Returns:
            List of k most frequent words
        """
        import heapq
        from collections import Counter

        # Count frequencies
        freq_map = Counter(words)

        # Use heap with tuple (freq, word) for proper ordering
        # For min-heap: we want to keep larger frequencies and smaller lexicographical words
        # So we use (-freq, word) to achieve max-heap behavior for frequency
        heap = []

        for word, freq in freq_map.items():
            heapq.heappush(heap, (-freq, word))

        # Extract top k elements
        result = []
        for _ in range(k):
            freq, word = heapq.heappop(heap)
            result.append(word)

        return result

    def topKFrequentAlternative(self, words: list[str], k: int) -> list[str]:
        """
        Alternative solution using sorting.

        Args:
            words: List of strings
            k: Number of top frequent words

        Returns:
            List of k most frequent words

        Time Complexity: O(N log N) where N is unique words
        Space Complexity: O(N) for frequency map
        """
        from collections import Counter

        # Count frequencies
        freq_map = Counter(words)

        # Sort by frequency (descending) then lexicographically (ascending)
        sorted_words = sorted(freq_map.items(), key=lambda x: (-x[1], x[0]))

        # Return top k words
        return [word for word, freq in sorted_words[:k]]

    def topKFrequentHeapSize(self, words: list[str], k: int) -> list[str]:
        """
        Solution maintaining heap of exactly size k.

        Args:
            words: List of strings
            k: Number of top frequent words

        Returns:
            List of k most frequent words
        """
        import heapq
        from collections import Counter

        freq_map = Counter(words)

        # Min-heap of size k
        # Use (freq, reverse_word) to handle lexicographical ordering correctly
        heap = []

        for word, freq in freq_map.items():
            if len(heap) < k:
                # For min-heap: smaller elements first
                # We want to evict less frequent words, so use positive frequency
                # For same frequency, evict lexicographically larger words
                heapq.heappush(heap, (freq, word))
            else:
                # Check if current word should replace heap root
                if freq > heap[0][0] or (freq == heap[0][0] and word < heap[0][1]):
                    heapq.heapreplace(heap, (freq, word))

        # Sort result by frequency (desc) then lexicographically (asc)
        result = sorted(heap, key=lambda x: (-x[0], x[1]))
        return [word for freq, word in result]

def test_solution():
    """
    Test cases for the solution.
    """
    solution = Solution()

    # Test case 1: Basic case
    result = solution.topKFrequent([1, 2, 3], 2)
    expected = [3, 2]
    assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Empty input
    result = solution.topKFrequent([], 0)
    expected = []
    assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 692. Top K Frequent Words ===")

    # Demonstrate various approaches
    test_cases = [
        (["i", "love", "leetcode", "i", "love", "coding"], 2),
        (["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], 4),
        (["a", "b", "c"], 2),
    ]

    for words, k in test_cases:
        print(f"\nInput: words={words}, k={k}")

        result1 = solution.topKFrequent(words, k)
        result2 = solution.topKFrequentOptimal(words, k)
        result3 = solution.topKFrequentAlternative(words, k)

        print(f"Heap approach:    {result1}")
        print(f"Optimal heap:     {result2}")
        print(f"Sorting approach: {result3}")

    # Show detailed example
    print(f"\nDetailed example:")
    words = ["i", "love", "leetcode", "i", "love", "coding"]
    k = 2
    print(f"Words: {words}")
    print(f"Frequencies: i:2, love:2, leetcode:1, coding:1")
    print(f"Top {k} frequent: {solution.topKFrequent(words, k)}")
    print(f"Reasoning: 'i' and 'love' both have frequency 2 (highest)")
    print(f"'i' comes before 'love' lexicographically")
