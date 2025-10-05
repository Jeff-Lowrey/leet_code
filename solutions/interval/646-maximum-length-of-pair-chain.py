I'll help you implement a solution for the Max Length Chain problem in Python. This solution will find the longest possible chain of pairs where each pair's second element is less than the next pair's first element.

```python
from typing import List

class Solution:
    def findLongestChain(self, pairs: List[List[int]]) -> int:
        """
        Find the length of the longest chain that can be formed from the given pairs.
        A pair (a, b) can follow another pair (c, d) if b < c.
        
        Args:
            pairs: List of pairs where each pair is [a, b]
            
        Returns:
            int: Length of the longest possible chain
        """
        if not pairs:
            return 0
        
        # Sort pairs based on the second element
        # This greedy approach ensures we always pick pairs that give us maximum flexibility
        # for the next selection
        pairs.sort(key=lambda x: x[1])
        
        current_end = float('-inf')  # Track the end of current chain
        chain_length = 0  # Track the length of chain
        
        # Iterate through sorted pairs
        for start, end in pairs:
            # If current pair can be added to chain (start > previous end)
            if start > current_end:
                chain_length += 1
                current_end = end
        
        return chain_length


def test_solution():
    """
    Test cases to verify the solution
    """
    solution = Solution()
    
    # Test case 1: Normal case
    assert solution.findLongestChain([[1,2],[2,3],[3,4]]) == 2
    
    # Test case 2: Non-sequential pairs
    assert solution.findLongestChain([[1,2],[7,8],[4,5]]) == 3
    
    # Test case 3: Overlapping pairs
    assert solution.findLongestChain([[3,4],[1,2],[2,3]]) == 2
    
    # Test case 4: Empty input
    assert solution.findLongestChain([]) == 0
    
    # Test case 5: Single pair
    assert solution.findLongestChain([[1,2]]) == 1
    
    print("All test cases passed!")


if __name__ == "__main__":
    # Example usage
    solution = Solution()
    example_pairs = [[1,2], [2,3], [3,4]]
    result = solution.findLongestChain(example_pairs)
    print(f"Length of longest chain for {example_pairs}: {result}")
    
    # Run tests
    test_solution()
```

This implementation includes:

1. A `Solution` class with the main `findLongestChain` method that implements the solution using a greedy approach.
2. Comprehensive comments explaining the logic and approach.
3. Type hints for better code readability and IDE support.
4. A test suite with various test cases to verify the solution.
5. Edge case handling (empty input, single pair, etc.).
6. Main block with example usage.

The algorithm works by:
1. Sorting pairs based on their second element (end point).
2. Greedily selecting pairs that can form a valid chain.
3. Keeping track of the current chain's end point and length.

The time complexity is O(n log n) due to sorting, and space complexity is O(1) as we only use a constant amount of extra space.

The solution handles various scenarios including:
- Normal sequential pairs
- Non-sequential pairs
- Overlapping pairs
- Empty input
- Single pair input

The code follows Python best practices and PEP 8 conventions for style and formatting.