"""
# Difficulty: Medium

# 0274. H Index

Given an array of integers citations where citations[i] is the number of citations a researcher
received for their ith paper, return the researcher's h-index.

According to the definition of h-index on Wikipedia: The h-index is defined as the maximum value
of h such that the given researcher has published at least h papers that have each been cited at
least h times.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>citations = [3,0,6,1,5]</dd>
<dt>Output:</dt>
<dd>3</dd>
<dt>Explanation:</dt>
<dd>H-index for citations [3,0,6,1,5] is 3</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
**Data Structures**: Array
**Patterns**: Hash Table Pattern
**Time Complexity**: O(n log n) - Sorting or divide-and-conquer
**Space Complexity**: O(1) - Constant extra space

### INTUITION:
The h-index is the largest number h where at least h papers have h or more citations.
Sorting helps us find this threshold efficiently. We can also use counting for O(n) solution.

### APPROACH:
1. **Sort citations** in descending order
2. **Iterate through sorted array**: For each position i, check if citations[i] >= i+1
3. **Find maximum h**: The h-index is the largest i+1 where citations[i] >= i+1
4. **Alternative**: Count papers with at least k citations for each k

### WHY THIS WORKS:
- After sorting in descending order, citations[i] is the (i+1)th highest citation count
- If citations[i] >= i+1, we have at least i+1 papers with i+1+ citations
- The h-index is the maximum such i+1 value
- Counting approach: For each h, count papers with >= h citations

### EXAMPLE WALKTHROUGH:
Input:
```
citations = [3,0,6,1,5]
```

Sorted (descending): [6,5,3,1,0]
Check each position:
i=0: citations[0]=6 >= 1? YES (h >= 1)
i=1: citations[1]=5 >= 2? YES (h >= 2)
i=2: citations[2]=3 >= 3? YES (h >= 3)
i=3: citations[3]=1 >= 4? NO  (h < 4)
i=4: citations[4]=0 >= 5? NO  (h < 5)
Maximum h where condition holds: h=3
This means: 3 papers with at least 3 citations each
Verification:
Papers: [6,5,3,1,0]
Papers with >= 3 citations: 6,5,3 = 3 papers ✓
Papers with >= 4 citations: 6,5 = 2 papers (not enough for h=4)

Output:
```
3
```

### TIME COMPLEXITY:
O(n log n)
For sorting approach. Counting approach is O(n).

### SPACE COMPLEXITY:
O(1)
If sorting in place, O(n) for sorting with extra space

### EDGE CASES:
- All zeros (h-index = 0)
- All citations > n (h-index = n)
- Single paper
- Empty array

</details>
"""


class Solution:
    def hIndex(self, citations: list[int]) -> int:
        """
        Calculate h-index using sorting approach.

        Args:
            citations: Array of citation counts for each paper

        Returns:
            The h-index value

        Time Complexity: O(n log n) for sorting
        Space Complexity: O(1) or O(n) depending on sort implementation
        """
        # Sort in descending order
        citations.sort(reverse=True)

        h = 0
        for i, citation in enumerate(citations):
            # If this paper has at least i+1 citations, h-index is at least i+1
            if citation >= i + 1:
                h = i + 1
            else:
                break

        return h

    def hIndexCounting(self, citations: list[int]) -> int:
        """
        Calculate h-index using counting approach for O(n) time.

        Uses bucket counting: count[k] = number of papers with k citations.
        For citations > n, we group them in bucket n.

        Time Complexity: O(n)
        Space Complexity: O(n) for counting array
        """
        n = len(citations)
        # count[i] = number of papers with i citations
        # Papers with more than n citations go in count[n]
        count = [0] * (n + 1)

        for citation in citations:
            if citation >= n:
                count[n] += 1
            else:
                count[citation] += 1

        # Count papers with at least k citations, going from high to low
        papers = 0
        for h in range(n, -1, -1):
            papers += count[h]
            # If we have at least h papers with h+ citations, h is the answer
            if papers >= h:
                return h

        return 0

    def hIndexSimple(self, citations: list[int]) -> int:
        """
        Simple approach: try each possible h-index from n down to 0.

        Time Complexity: O(n^2) in worst case
        Space Complexity: O(1)
        """
        n = len(citations)

        # Try each possible h-index from n down to 0
        for h in range(n, -1, -1):
            # Count papers with at least h citations
            count = sum(1 for c in citations if c >= h)
            if count >= h:
                return h

        return 0

    def hIndexOneLiner(self, citations: list[int]) -> int:
        """
        Concise one-liner solution using sorting.

        Time Complexity: O(n log n)
        Space Complexity: O(n)
        """
        return sum(i < c for i, c in enumerate(sorted(citations, reverse=True)))


def test_solution() -> None:
    """Test cases for Problem 274."""
    solution = Solution()

    # Test case 1: Example from problem
    result1 = solution.hIndex([3, 0, 6, 1, 5])
    expected1 = 3
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Another example
    result2 = solution.hIndex([1, 3, 1])
    expected2 = 1
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: All zeros
    result3 = solution.hIndex([0, 0, 0])
    expected3 = 0
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: All high citations
    result4 = solution.hIndex([100, 100, 100])
    expected4 = 3
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Single paper
    result5 = solution.hIndex([1])
    expected5 = 1
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Single paper with zero citations
    result6 = solution.hIndex([0])
    expected6 = 0
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test case 7: Descending order
    result7 = solution.hIndex([10, 8, 5, 4, 3])
    expected7 = 4
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test counting solution
    result8 = solution.hIndexCounting([3, 0, 6, 1, 5])
    expected8 = 3
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    result9 = solution.hIndexCounting([1, 3, 1])
    expected9 = 1
    assert result9 == expected9, f"Expected {expected9}, got {result9}"

    # Test simple solution
    result10 = solution.hIndexSimple([3, 0, 6, 1, 5])
    expected10 = 3
    assert result10 == expected10, f"Expected {expected10}, got {result10}"

    # Test one-liner solution
    result11 = solution.hIndexOneLiner([3, 0, 6, 1, 5])
    expected11 = 3
    assert result11 == expected11, f"Expected {expected11}, got {result11}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 274. H Index ===")
    print(f"hIndex([3,0,6,1,5]) -> {solution.hIndex([3, 0, 6, 1, 5])}")
    print(f"hIndex([1,3,1]) -> {solution.hIndex([1, 3, 1])}")
    print(f"hIndex([100,100,100]) -> {solution.hIndex([100, 100, 100])}")
    print(f"hIndexCounting([3,0,6,1,5]) -> {solution.hIndexCounting([3, 0, 6, 1, 5])}")
