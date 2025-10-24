"""
# Difficulty: Medium

# 0721. Accounts Merge

Given a list of accounts where each element accounts[i] is a list of strings, where the first element accounts[i][0] is a name, and the rest of the elements are emails representing emails of the account.

Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. Note that even if two accounts have the same name, they may belong to different people as people could have the same name. A person can have any number of accounts initially, but all of their accounts definitely have the same name.

After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails in sorted order. The accounts themselves can be returned in any order.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[["John", "johnsmith@mail.com", "john_newyork@mail.com"]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>Accounts merged by common emails</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
**Techniques**: Hash Table Lookup, Hash Map Storage, Set Operations
**Data Structures**: Hash Map, Hash Set, Array
**Patterns**: Hash Table Pattern, Divide and Conquer
**Time Complexity**: O(N × M × α(N))
**Space Complexity**: O(N × M)

### INTUITION:
This is a classic Union-Find problem where we need to group accounts that belong to the same person. The key insight is that if two accounts share any email address, they belong to the same person and should be merged. We use Union-Find to efficiently group accounts with shared emails.

### APPROACH:
1. **Map emails to accounts**: Create a mapping from emails to account indices
2. **Union accounts with shared emails**: Use Union-Find to group accounts that share emails
3. **Collect emails by parent**: Group all emails under their root parent account
4. **Format result**: Create merged accounts with sorted emails

### WHY THIS WORKS:
- Union-Find efficiently manages grouping of accounts
- Email-to-account mapping allows us to detect shared emails
- Transitivity: if account A shares email with B, and B shares with C, then A, B, C belong to same person
- Union-Find naturally handles this transitivity

### EXAMPLE WALKTHROUGH:
Input:
```
[["John","johnsmith@mail.com","john_newyork@mail.com"],
```

["John","johnsmith@mail.com","john00@mail.com"],
["Mary","mary@mail.com"],
["John","johnnybravo@mail.com"]]
Step 1: Map emails to accounts

Steps:
Step 1: - johnsmith@mail.com → account 0
Step 2: - john_newyork@mail.com → account 0
Step 3: - johnsmith@mail.com → already exists, union(0, 1)
Step 4: - john00@mail.com → account 1
Step 5: - mary@mail.com → account 2
Step 6: - johnnybravo@mail.com → account 3
Step 7: After union operations
Step 8: - Accounts 0 and 1 are connected (share johnsmith@mail.com)
Step 9: - Account 2 is separate
Step 10: - Account 3 is separate
Step 11: Group emails by parent
Step 12: - Parent 0: {johnsmith@mail.com, john_newyork@mail.com, john00@mail.com}
Step 13: - Parent 2: {mary@mail.com}
Step 14: - Parent 3: {johnnybravo@mail.com}

Output:
```
[["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],
["Mary","mary@mail.com"],
["John","johnnybravo@mail.com"]]
```

### TIME COMPLEXITY:
O(N × M × α(N))
Where N is number of accounts, M is average emails per account, α is inverse Ackermann function

### SPACE COMPLEXITY:
O(N × M)
For storing email mappings and Union-Find structure

### EDGE CASES:
- Single account with one email
- Multiple accounts with no shared emails
- Accounts with same name but no shared emails
- Empty email lists (though problem guarantees at least one email)

</details>
"""

from collections import defaultdict
from typing import Any
import re


class UnionFind:
    """Union-Find (Disjoint Set Union) data structure."""

    def __init__(self, n: int) -> None:
        """Initialize with n elements."""
        self.parent = list(range(n))
        self.rank = [0] * n

    @property
    def components(self) -> int:
        """Return number of connected components."""
        return len(set(self.find(i) for i in range(len(self.parent))))

    def find(self, x: int) -> int:
        """Find root of element x with path compression."""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x: int, y: int) -> bool:
        """Union two sets. Returns True if they were in different sets."""
        px, py = self.find(x), self.find(y)
        if px == py:
            return False

        if self.rank[px] < self.rank[py]:
            self.parent[px] = py
        elif self.rank[px] > self.rank[py]:
            self.parent[py] = px
        else:
            self.parent[py] = px
            self.rank[px] += 1

        return True

    def connected(self, x: int, y: int) -> bool:
        """Check if two elements are in the same set."""
        return self.find(x) == self.find(y)


class Solution:
    def accountsMerge(self, accounts: list[list[str]]) -> list[list[str]]:
        """
        Merge accounts that share common emails using Union-Find.

        Args:
            accounts: List of accounts where each account is a list containing
                     name followed by emails

        Returns:
            List of merged accounts with emails sorted alphabetically

        Time Complexity: O(N × M × α(N)) where N is accounts, M is avg emails per account
        Space Complexity: O(N × M) for email mappings and Union-Find structure
        """
        n = len(accounts)
        uf = UnionFind(n)

        # Map email to account index
        email_to_account: dict[Any, Any] = {}

        # Step 1: Build email to account mapping and union accounts with common emails
        for i, account in enumerate(accounts):
            for email in account[1:]:
                if email in email_to_account:
                    # If email already exists, union current account with existing account
                    uf.union(i, email_to_account[email])
                else:
                    # Map email to current account
                    email_to_account[email] = i

        # Step 2: Group emails by their parent account
        merged_accounts: dict[Any, set[Any]] = defaultdict(set)
        for i in range(n):
            parent = uf.find(i)
            # Add all emails from current account to parent's email set
            merged_accounts[parent].update(accounts[i][1:])

        # Step 3: Format the result
        result: list[Any] = []
        for account_idx, emails in merged_accounts.items():
            # Create merged account starting with name followed by sorted emails
            merged_account = [accounts[account_idx][0]] + sorted(list(emails))
            result.append(merged_account)

        return result

    def accountsMergeAlternative(self, accounts: list[list[str]]) -> list[list[str]]:
        """
        Alternative implementation using DFS-based approach.

        Args:
            accounts: List of accounts

        Returns:
            List of merged accounts with sorted emails
        """
        # Build email to accounts mapping
        email_to_accounts: dict[Any, list[Any]] = defaultdict(list)
        for i, account in enumerate(accounts):
            for email in account[1:]:
                email_to_accounts[email].append(i)

        # DFS to find connected components
        visited = [False] * len(accounts)
        result = []

        def dfs(account_idx: Any, emails: Any) -> Any:
            if visited[account_idx]:
                return
            visited[account_idx] = True

            # Add all emails from current account
            for email in accounts[account_idx][1:]:
                emails.add(email)

                # Visit all accounts that share this email
                for neighbor_idx in email_to_accounts[email]:
                    if not visited[neighbor_idx]:
                        dfs(neighbor_idx, emails)

        for i in range(len(accounts)):
            if not visited[i]:
                emails: set[str] = set()
                dfs(i, emails)
                merged_account = [accounts[i][0]] + sorted(list(emails))
                result.append(merged_account)

        return result


def test_solution() -> None:
    """Test cases for 721. Accounts Merge."""
    solution = Solution()

    # Test case 1: Basic merge case
    accounts1 = [
        ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
        ["John", "johnsmith@mail.com", "john00@mail.com"],
        ["Mary", "mary@mail.com"],
        ["John", "johnnybravo@mail.com"],
    ]
    result1 = solution.accountsMerge(accounts1)
    expected1 = [
        ["John", "john00@mail.com", "john_newyork@mail.com", "johnsmith@mail.com"],
        ["Mary", "mary@mail.com"],
        ["John", "johnnybravo@mail.com"],
    ]
    # Sort both for comparison since order doesn't matter
    result1.sort()
    expected1.sort()
    assert result1 == expected1, f"Expected {expected1}, got {result1}"

    # Test case 2: No merging needed
    accounts2 = [
        ["Gabe", "Gabe0@m.co", "Gabe3@m.co", "Gabe1@m.co"],
        ["Kevin", "Kevin3@m.co", "Kevin5@m.co", "Kevin0@m.co"],
        ["Ethan", "Ethan5@m.co", "Ethan4@m.co", "Ethan0@m.co"],
    ]
    result2 = solution.accountsMerge(accounts2)
    expected2 = [
        ["Gabe", "Gabe0@m.co", "Gabe1@m.co", "Gabe3@m.co"],
        ["Kevin", "Kevin0@m.co", "Kevin3@m.co", "Kevin5@m.co"],
        ["Ethan", "Ethan0@m.co", "Ethan4@m.co", "Ethan5@m.co"],
    ]
    result2.sort()
    expected2.sort()
    assert result2 == expected2, f"Expected {expected2}, got {result2}"

    # Test case 3: Single account
    accounts3 = [["David", "david@gmail.com"]]
    result3 = solution.accountsMerge(accounts3)
    expected3 = [["David", "david@gmail.com"]]
    assert result3 == expected3, f"Expected {expected3}, got {result3}"

    # Test case 4: Complex merge case
    accounts4 = [["Alex", "alex@gmail.com"], ["Bob", "bob@gmail.com"], ["Alex", "alex@yahoo.com", "alex@gmail.com"]]
    result4 = solution.accountsMerge(accounts4)
    expected4 = [["Alex", "alex@gmail.com", "alex@yahoo.com"], ["Bob", "bob@gmail.com"]]
    result4.sort()
    expected4.sort()
    assert result4 == expected4, f"Expected {expected4}, got {result4}"

    # Test alternative implementation
    result5 = solution.accountsMergeAlternative(accounts1)
    result5.sort()
    assert result5 == expected1, f"Alternative: Expected {expected1}, got {result5}"

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print("=== 721. Accounts Merge ===")

    # Example 1: Basic case
    accounts = [
        ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
        ["John", "johnsmith@mail.com", "john00@mail.com"],
        ["Mary", "mary@mail.com"],
        ["John", "johnnybravo@mail.com"],
    ]
    result = solution.accountsMerge(accounts)
    print(f"Input: {accounts}")
    print(f"Output: result")
    print("Analysis: John's first two accounts share 'johnsmith@mail.com' so they merge")

    # Example 2: No merging case
    accounts2 = [["David", "david@gmail.com", "david@yahoo.com"], ["Alex", "alex@gmail.com"]]
    result2 = solution.accountsMerge(accounts2)
    print(f"\nInput: {accounts2}")
    print(f"Output: {result2}")
    print("Analysis: No shared emails, so accounts remain separate")

    print("\nKey insights:")
    print("1. Union-Find groups accounts with shared emails efficiently")
    print("2. Email-to-account mapping detects shared emails")
    print("3. Transitivity: if A shares with B and B shares with C, A-B-C merge")
    print("4. Time: O(N×M×α(N)), Space: O(N×M)")
    print("5. Result emails must be sorted alphabetically")
