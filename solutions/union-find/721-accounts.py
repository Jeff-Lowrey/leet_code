I'll help you implement the Accounts Merge solution in Python. This solution will use a Union-Find data structure to efficiently merge accounts with common emails.

```python
from typing import List
from collections import defaultdict

class UnionFind:
    def __init__(self, n):
        """Initialize Union-Find data structure with n elements."""
        self.parent = list(range(n))
        self.rank = [0] * n
    
    def find(self, x):
        """Find the parent of element x with path compression."""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        """Union two elements x and y by rank."""
        px, py = self.find(x), self.find(y)
        if px == py:
            return
        if self.rank[px] < self.rank[py]:
            self.parent[px] = py
        elif self.rank[px] > self.rank[py]:
            self.parent[py] = px
        else:
            self.parent[py] = px
            self.rank[px] += 1

class Solution:
    def accountsMerge(self, accounts: List[List[str]]) -> List[List[str]]:
        """
        Merge accounts that share common emails.
        
        Args:
            accounts: List of accounts where each account is a list containing
                     name followed by emails
        
        Returns:
            List of merged accounts with emails sorted alphabetically
        """
        n = len(accounts)
        uf = UnionFind(n)
        
        # Map email to account index
        email_to_account = {}
        
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
        merged_accounts = defaultdict(set)
        for i in range(n):
            parent = uf.find(i)
            # Add all emails from current account to parent's email set
            merged_accounts[parent].update(accounts[i][1:])
        
        # Step 3: Format the result
        result = []
        for account_idx, emails in merged_accounts.items():
            # Create merged account starting with name followed by sorted emails
            merged_account = [accounts[account_idx][0]] + sorted(list(emails))
            result.append(merged_account)
        
        return result


# Test cases
def test_accounts_merge():
    solution = Solution()
    
    # Test case 1
    accounts1 = [
        ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
        ["John", "johnsmith@mail.com", "john00@mail.com"],
        ["Mary", "mary@mail.com"],
        ["John", "johnnybravo@mail.com"]
    ]
    result1 = solution.accountsMerge(accounts1)
    print("Test case 1 result:", result1)
    
    # Test case 2
    accounts2 = [
        ["Gabe", "Gabe0@m.co", "Gabe3@m.co", "Gabe1@m.co"],
        ["Kevin", "Kevin3@m.co", "Kevin5@m.co", "Kevin0@m.co"],
        ["Ethan", "Ethan5@m.co", "Ethan4@m.co", "Ethan0@m.co"],
        ["Hanzo", "Hanzo3@m.co", "Hanzo1@m.co", "Hanzo0@m.co"],
        ["Fern", "Fern5@m.co", "Fern1@m.co", "Fern0@m.co"]
    ]
    result2 = solution.accountsMerge(accounts2)
    print("Test case 2 result:", result2)

if __name__ == "__main__":
    test_accounts_merge()
```

This implementation includes:

1. A UnionFind class for efficiently merging connected accounts
2. The main Solution class with the accountsMerge method
3. Helper methods for finding and unioning accounts
4. Test cases to verify the implementation
5. Clear comments explaining the code
6. Type hints for better code readability
7. Proper handling of edge cases

The solution follows these steps:
1. Create a Union-Find data structure to track connected accounts
2. Map emails to account indices and union accounts with common emails
3. Group emails by their parent account
4. Format the result with names and sorted emails

The time complexity is O(N * K * log(N)) where N is the number of accounts and K is the average number of emails per account. The space complexity is O(N * K) to store the email mappings and result.