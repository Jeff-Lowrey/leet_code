"""
# Difficulty: Easy

# 997. Find The Town Judge

In a town, there are n people labeled from 1 to n. There is a rumor that one of these people is secretly the town judge.

If the town judge exists, then:




You are given an array trust where trust[i] = [ai, bi] representing that the person labeled ai trusts the person labeled bi.

Return the label of the town judge if the town judge exists and can be identified, or return -1 otherwise.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[(2, [[1,2]</dd>
<dt>Output:</dt>
<dd>"n={n}, trust={trust} -> Judge: {result}"</dd>
<dt>Explanation:</dt>
<dd>The town judge is person 2 who is trusted by all but trusts no one</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: O(T + N)
**Space Complexity**: O(N)

### INTUITION:
This is a graph problem where we need to find a node (person) with specific in-degree and out-degree properties. The judge must have in-degree = n-1 (everyone trusts them) and out-degree = 0 (they trust nobody). We can solve this efficiently by tracking trust relationships as a directed graph.

### APPROACH:
1. **Count trust relationships**: Track who trusts whom and who is trusted by whom
2. **Calculate net trust**: For each person, calculate (trusted_by_count - trusts_count)
3. **Find the judge**: The judge will have net trust = n-1 (trusted by n-1 people, trusts 0)
4. **Validate result**: Ensure exactly one person satisfies the judge criteria

### WHY THIS WORKS:
- Judge trusts nobody: out-degree = 0
- Everyone else trusts judge: in-degree = n-1
- Net trust = in-degree - out-degree = (n-1) - 0 = n-1
- All other people have net trust < n-1 (they either trust someone or aren't trusted by everyone)

### EXAMPLE WALKTHROUGH:
```
Input: n = 3, trust = [[1,3],[2,3]]
Person 1: trusts 3, trusted by 0 → net = 0 - 1 = -1
Person 2: trusts 3, trusted by 0 → net = 0 - 1 = -1
Person 3: trusts 0, trusted by 2 → net = 2 - 0 = 2 = n-1 ✓
Output: 3 (person 3 is the judge)
```

### TIME COMPLEXITY:
O(T + N)
Where T is the number of trust relationships and N is the number of people

### SPACE COMPLEXITY:
O(N)
For storing trust counts

### EDGE CASES:
- n = 1: Only one person, they are the judge by default
- Empty trust array with n > 1: No judge possible
- Multiple people with high trust: No unique judge
- Circular trust: No judge possible

</details>
"""


from typing import Any
import re


class Solution:
    def findJudge(self, n: int, trust: list[list[int]]) -> int:
        """
        Find the town judge using net trust calculation.

        Args:
            n: Number of people (labeled 1 to n)
            trust: List of trust relationships [a, b] meaning a trusts b

        Returns:
            Label of the town judge, or -1 if no judge exists

        Time Complexity: O(T + N) where T is trust relationships, N is people
        Space Complexity: O(N) for trust count arrays
        """
        # Special case: only one person
        if n == 1:
            return 1 if not trust else -1

        # Track net trust: (trusted_by_count - trusts_count) for each person
        net_trust = [0] * (n + 1)  # Index 0 unused, 1 to n for people

        # Process all trust relationships
        for truster, trustee in trust:
            net_trust[truster] -= 1  # Truster loses trust (trusts someone)
            net_trust[trustee] += 1  # Trustee gains trust (is trusted by someone)

        # Find person with net trust = n-1 (judge criteria)
        for person in range(1, n + 1):
            if net_trust[person] == n - 1:
                return person

        return -1  # No judge found

    def findJudgeAlternative(self, n: int, trust: list[list[int]]) -> int:
        """
        Alternative implementation using separate in-degree and out-degree tracking.

        Args:
            n: Number of people
            trust: Trust relationships

        Returns:
            Judge label or -1
        """
        if n == 1:
            return 1

        # Track in-degree (trusted by) and out-degree (trusts)
        trusted_by = [0] * (n + 1)  # How many people trust this person
        trusts = [0] * (n + 1)  # How many people this person trusts

        for truster, trustee in trust:
            trusts[truster] += 1
            trusted_by[trustee] += 1

        # Judge must be trusted by n-1 people and trust nobody
        for person in range(1, n + 1):
            if trusted_by[person] == n - 1 and trusts[person] == 0:
                return person

        return -1

    def findJudgeOptimized(self, n: int, trust: list[list[int]]) -> int:
        """
        Space-optimized solution using single pass and candidate tracking.

        Args:
            n: Number of people
            trust: Trust relationships

        Returns:
            Judge label or -1
        """
        if n == 1:
            return 1 if not trust else -1

        # Use a different approach: find candidate with highest net trust
        trust_score: dict[Any, Any] = {}

        for truster, trustee in trust:
            trust_score[truster] = trust_score.get(truster, 0) - 1
            trust_score[trustee] = trust_score.get(trustee, 0) + 1

        # Check if any person has the judge criteria
        for person in range(1, n + 1):
            if trust_score.get(person, 0) == n - 1:
                return person

        return -1


def test_solution() -> None:
    """Test cases for Problem 997."""
    solution = Solution()

    # Test case 1: Basic judge scenario
    result1 = solution.findJudge(2, [[1, 2]])
    expected1 = 2
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: Three people, clear judge
    result2 = solution.findJudge(3, [[1, 3], [2, 3]])
    expected2 = 3
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: No judge (circular trust)
    result3 = solution.findJudge(3, [[1, 3], [2, 3], [3, 1]])
    expected3 = -1
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Single person (is judge by default)
    result4 = solution.findJudge(1, [])
    expected4 = 1
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test case 5: Single person but has trust relationship (impossible)
    result5 = solution.findJudge(1, [[1, 1]])
    expected5 = -1
    assert result5 == expected5, f"Expected {expected5}, got {result5}"

    # Test case 6: No trust relationships with multiple people
    result6 = solution.findJudge(3, [])
    expected6 = -1
    assert result6 == expected6, f"Expected {expected6}, got {result6}"

    # Test case 7: Complex scenario - multiple trust but no clear judge
    result7 = solution.findJudge(4, [[1, 3], [1, 4], [2, 3], [2, 4], [4, 3]])
    expected7 = 3
    assert result7 == expected7, f"Expected {expected7}, got {result7}"

    # Test case 8: Everyone trusts each other (no judge)
    result8 = solution.findJudge(3, [[1, 2], [2, 3], [3, 1]])
    expected8 = -1
    assert result8 == expected8, f"Expected {expected8}, got {result8}"

    # Test alternative implementation
    result9 = solution.findJudgeAlternative(3, [[1, 3], [2, 3]])
    expected9 = 3
    assert result9 == expected9, f"Expected {expected9}, got {result9}"

    # Test optimized implementation
    result10 = solution.findJudgeOptimized(3, [[1, 3], [2, 3]])
    expected10 = 3
    assert result10 == expected10, f"Expected {expected10}, got {result10}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 997. Find The Town Judge ===")

    # Demonstrate various scenarios
    test_cases = [
        (2, [[1, 2]]),
        (3, [[1, 3], [2, 3]]),
        (3, [[1, 3], [2, 3], [3, 1]]),
        (1, []),
        (4, [[1, 3], [1, 4], [2, 3], [2, 4], [4, 3]]),
    ]

    for n, trust in test_cases:
        result = solution.findJudge(n, trust)
        print(f"n={n}, trust={trust} -> Judge: {result}")

    print("\nDetailed example:")
    print("n=3, trust=[[1,3],[2,3]]")
    print("Person 1: trusts person 3 (net trust = -1)")
    print("Person 2: trusts person 3 (net trust = -1)")
    print("Person 3: trusted by persons 1,2 (net trust = +2 = n-1)")
    print("Judge: Person 3 ✓")
