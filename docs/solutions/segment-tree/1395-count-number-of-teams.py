"""
# Difficulty: Medium

# 1395. Count Number Of Teams

There are n soldiers standing in a line. Every soldier has a unique rating value.

You have to form a team of 3 soldiers amongst them under the following rules:
- Choose 3 soldiers with index (i, j, k) with rating (rating[i], rating[j], rating[k]).
- A team is valid if: (rating[i] < rating[j] < rating[k]) or (rating[i] > rating[j] > rating[k]) where (i < j < k).

Return the number of teams you can form given the conditions. (soldiers can be used in multiple teams).

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[[2, 5, 3, 4, 1]</dd>
<dt>Output:</dt>
<dd>"\nInput: rating = {rating}"</dd>
<dt>Explanation:</dt>
<dd>There are 3 valid teams of soldiers with increasing or decreasing heights</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
This problem is about counting ordered triplets in an array. We can solve it using multiple approaches: brute force O(n³), dynamic programming O(n²), or advanced data structures like segment trees or Binary Indexed Trees for O(n log n). The key insight is that for each middle element, we count how many valid left and right elements exist.

### APPROACH:
1. **Handle edge case**: Return 0 if array has fewer than 3 elements (need at least 3 for a team)
2. **Iterate through middle positions**: For each soldier j as the middle element (from index 1 to n-2)
3. **Count left elements**: Scan all elements to the left of j, counting how many are smaller and how many are larger
4. **Count right elements**: Scan all elements to the right of j, counting how many are smaller and how many are larger
5. **Calculate ascending teams**: Multiply left_smaller by right_larger (elements that can form ascending triplet with j)
6. **Calculate descending teams**: Multiply left_larger by right_smaller (elements that can form descending triplet with j)
7. **Sum all valid teams**: Add both ascending and descending team counts for each middle position to get total

### WHY THIS WORKS:
A set by definition contains only unique elements - when we convert an array to a set, any duplicates are automatically removed. By comparing the lengths of the original array and the set, we can detect if duplicates existed. The early termination approach works because as soon as we find an element already in our seen set, we've proven a duplicate exists without needing to check the remaining elements.

### EXAMPLE WALKTHROUGH:
```
Input: rating = [2,5,3,4,1]
For ascending teams (i < j < k and rating[i] < rating[j] < rating[k]):
- j=1 (rating=5): left_smaller=1 (rating=2), right_larger=0 → 0 teams
- j=2 (rating=3): left_smaller=1 (rating=2), right_larger=1 (rating=4) → 1 team
- j=3 (rating=4): left_smaller=2 (rating=2,3), right_larger=0 → 0 teams

For descending teams (i < j < k and rating[i] > rating[j] > rating[k]):
- j=1 (rating=5): left_larger=0, right_smaller=3 → 0 teams
- j=2 (rating=3): left_larger=1 (rating=5), right_smaller=1 (rating=1) → 1 team
- j=3 (rating=4): left_larger=1 (rating=5), right_smaller=1 (rating=1) → 1 team

Total: 1 + 1 + 1 = 3 teams
```

### TIME COMPLEXITY:
O(n log n)
For segment tree approach with coordinate compression

### SPACE COMPLEXITY:
O(n)
For compressed coordinates and tree structure

### EDGE CASES:
- Array length < 3
- All elements equal (no valid teams)
- Strictly increasing/decreasing array
- Duplicate ratings

</details>
"""

class Solution:
    def numTeams(self, rating: list[int]) -> int:
        """
        Count valid teams using optimized O(n²) approach.

        Args:
            rating: Array of soldier ratings

        Returns:
            Number of valid teams

        Time Complexity: O(n²) - for each middle element, scan left and right
        Space Complexity: O(1) - constant extra space
        """
        n = len(rating)
        if n < 3:
            return 0

        count = 0

        # For each soldier as middle element
        for j in range(1, n - 1):
            left_smaller = left_larger = 0
            right_smaller = right_larger = 0

            # Count elements to the left
            for i in range(j):
                if rating[i] < rating[j]:
                    left_smaller += 1
                elif rating[i] > rating[j]:
                    left_larger += 1

            # Count elements to the right
            for k in range(j + 1, n):
                if rating[k] > rating[j]:
                    right_larger += 1
                elif rating[k] < rating[j]:
                    right_smaller += 1

            # Add teams: ascending (left_smaller * right_larger) + descending (left_larger * right_smaller)
            count += left_smaller * right_larger + left_larger * right_smaller

        return count

    def numTeamsSegmentTree(self, rating: list[int]) -> int:
        """
        Count valid teams using segment tree with coordinate compression.

        Args:
            rating: Array of soldier ratings

        Returns:
            Number of valid teams

        Time Complexity: O(n log n)
        Space Complexity: O(n)
        """
        if len(rating) < 3:
            return 0

        # Coordinate compression
        sorted_ratings = sorted(set(rating))
        coord_map = {v: i for i, v in enumerate(sorted_ratings)}
        m = len(sorted_ratings)

        class SegmentTree:
            def __init__(self, size):
                self.size = size
                self.tree = [0] * (4 * size)

            def update(self, node, start, end, idx, val):
                if start == end:
                    self.tree[node] += val
                else:
                    mid = (start + end) // 2
                    if idx <= mid:
                        self.update(2 * node, start, mid, idx, val)
                    else:
                        self.update(2 * node + 1, mid + 1, end, idx, val)
                    self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

            def query(self, node, start, end, l, r):
                if r < start or end < l:
                    return 0
                if l <= start and end <= r:
                    return self.tree[node]
                mid = (start + end) // 2
                return self.query(2 * node, start, mid, l, r) + self.query(2 * node + 1, mid + 1, end, l, r)

        n = len(rating)
        count = 0

        # For each middle element
        for j in range(1, n - 1):
            rating_j = coord_map[rating[j]]

            # Count left smaller and left larger
            left_tree = SegmentTree(m)
            for i in range(j):
                left_tree.update(1, 0, m - 1, coord_map[rating[i]], 1)

            left_smaller = left_tree.query(1, 0, m - 1, 0, rating_j - 1) if rating_j > 0 else 0
            left_larger = left_tree.query(1, 0, m - 1, rating_j + 1, m - 1) if rating_j < m - 1 else 0

            # Count right smaller and right larger
            right_tree = SegmentTree(m)
            for k in range(j + 1, n):
                right_tree.update(1, 0, m - 1, coord_map[rating[k]], 1)

            right_smaller = right_tree.query(1, 0, m - 1, 0, rating_j - 1) if rating_j > 0 else 0
            right_larger = right_tree.query(1, 0, m - 1, rating_j + 1, m - 1) if rating_j < m - 1 else 0

            # Add valid teams
            count += left_smaller * right_larger + left_larger * right_smaller

        return count

    def numTeamsBIT(self, rating: list[int]) -> int:
        """
        Count valid teams using Binary Indexed Tree.

        Args:
            rating: Array of soldier ratings

        Returns:
            Number of valid teams

        Time Complexity: O(n log n)
        Space Complexity: O(n)
        """
        if len(rating) < 3:
            return 0

        # Coordinate compression
        sorted_ratings = sorted(set(rating))
        coord_map = {v: i + 1 for i, v in enumerate(sorted_ratings)}  # 1-indexed for BIT
        m = len(sorted_ratings)

        class BinaryIndexedTree:
            def __init__(self, size):
                self.size = size
                self.tree = [0] * (size + 1)

            def update(self, idx, val):
                while idx <= self.size:
                    self.tree[idx] += val
                    idx += idx & (-idx)

            def query(self, idx):
                result = 0
                while idx > 0:
                    result += self.tree[idx]
                    idx -= idx & (-idx)
                return result

            def range_query(self, left, right):
                if left > right:
                    return 0
                return self.query(right) - self.query(left - 1)

        n = len(rating)
        count = 0

        for j in range(1, n - 1):
            rating_j = coord_map[rating[j]]

            # Build left BIT
            left_bit = BinaryIndexedTree(m)
            for i in range(j):
                left_bit.update(coord_map[rating[i]], 1)

            # Count left smaller and larger
            left_smaller = left_bit.range_query(1, rating_j - 1)
            left_larger = left_bit.range_query(rating_j + 1, m)

            # Build right BIT
            right_bit = BinaryIndexedTree(m)
            for k in range(j + 1, n):
                right_bit.update(coord_map[rating[k]], 1)

            # Count right smaller and larger
            right_smaller = right_bit.range_query(1, rating_j - 1)
            right_larger = right_bit.range_query(rating_j + 1, m)

            # Add valid teams
            count += left_smaller * right_larger + left_larger * right_smaller

        return count

    def numTeamsBruteForce(self, rating: list[int]) -> int:
        """
        Brute force solution for verification.

        Args:
            rating: Array of soldier ratings

        Returns:
            Number of valid teams

        Time Complexity: O(n³)
        Space Complexity: O(1)
        """
        n = len(rating)
        count = 0

        for i in range(n):
            for j in range(i + 1, n):
                for k in range(j + 1, n):
                    # Check ascending order
                    if rating[i] < rating[j] < rating[k] or rating[i] > rating[j] > rating[k]:
                        count += 1

        return count

def test_solution():
    """Test cases for Problem 1395."""
    solution = Solution()

    # Test case 1: Basic example
    result1 = solution.numTeams([2, 5, 3, 4, 1])
    expected1 = 3
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Ascending sequence
    result2 = solution.numTeams([2, 1, 3])
    expected2 = 0
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Descending sequence
    result3 = solution.numTeams([1, 2, 3, 4])
    expected3 = 4  # (1,2,3), (1,2,4), (1,3,4), (2,3,4)
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Length < 3
    result4 = solution.numTeams([1, 2])
    expected4 = 0
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: All equal elements
    result5 = solution.numTeams([1, 1, 1])
    expected5 = 0
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: Mixed ascending/descending
    result6 = solution.numTeams([1, 4, 2, 3])
    expected6 = 1  # (4,2,1) is descending wait that's wrong order... (1,2,3) is ascending
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test segment tree approach
    result7 = solution.numTeamsSegmentTree([2, 5, 3, 4, 1])
    expected7 = 3
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test BIT approach
    result8 = solution.numTeamsBIT([2, 5, 3, 4, 1])
    expected8 = 3
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    # Test brute force approach
    result9 = solution.numTeamsBruteForce([2, 5, 3, 4, 1])
    expected9 = 3
    assert result9 == expected9, f"Expected {expected9}, got {result9}"

    # Test case 7: Larger example
    result10 = solution.numTeams([1, 2, 3, 4, 5])
    expected10 = 10  # C(5,3) = 10 ascending teams
    assert result10 == expected10, f"Expected {expected10}, got {result10}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 1395. Count Number Of Teams ===")

    # Test different approaches
    test_cases = [[2, 5, 3, 4, 1], [1, 2, 3, 4], [2, 1, 3], [1, 4, 2, 3]]

    for rating in test_cases:
        print(f"\nInput: rating = {rating}")

        result1 = solution.numTeams(rating)
        result2 = solution.numTeamsBruteForce(rating)

        print(f"Optimized O(n²):  {result1}")
        print(f"Brute Force O(n³): {result2}")

        # Only test advanced approaches for small inputs to avoid timeout
        if len(rating) <= 10:
            result3 = solution.numTeamsSegmentTree(rating)
            result4 = solution.numTeamsBIT(rating)
            print(f"Segment Tree:     {result3}")
            print(f"Binary IT:        {result4}")

    # Detailed walkthrough
    print("\nDetailed example: rating = [2,5,3,4,1]")
    rating = [2, 5, 3, 4, 1]
    print("Valid teams:")
    print("Ascending teams:")
    print("- (2,3,4) at indices (0,2,3)")
    print("Descending teams:")
    print("- (5,3,1) at indices (1,2,4)")
    print("- (5,4,1) at indices (1,3,4)")
    print(f"Total: {solution.numTeams(rating)} teams")

    # Performance comparison
    print("\nApproach complexities:")
    print("Optimized:      O(n²) time, O(1) space")
    print("Segment Tree:   O(n log n) time, O(n) space")
    print("Binary IT:      O(n log n) time, O(n) space")
    print("Brute Force:    O(n³) time, O(1) space")
