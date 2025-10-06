"""
# 721. Accounts
**Medium**

Given a problem that demonstrates key concepts in Union Find.

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
[This problem requires understanding of union find concepts. The key insight is to identify the optimal approach for this specific scenario.]

### APPROACH:
1. **Analyze the problem**: Understand the input constraints and expected output
2. **Choose the right technique**: Apply union find methodology
3. **Implement efficiently**: Focus on optimal time and space complexity
4. **Handle edge cases**: Consider boundary conditions and special cases

### WHY THIS WORKS:
- The solution leverages union find principles
- Time complexity is optimized for the given constraints
- Space complexity is minimized where possible

### TIME COMPLEXITY: O(n)
### SPACE COMPLEXITY: O(1)

### EXAMPLE WALKTHROUGH:
```
Input: [example input]
Step 1: [explain first step]
Step 2: [explain second step]
Output: [expected output]
```

### EDGE CASES:
- Empty input handling
- Single element cases
- Large input considerations

</details>

<details>
<summary><b>💡 APPROACH</b></summary>

The approach uses union find techniques to solve this problem efficiently.

### Algorithm Steps:
1. Initialize necessary variables
2. Process input using union find method
3. Return the computed result

</details>
"""

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

def test_solution():
    """
    Test cases for 721. Accounts.
    """
    solution = Solution()

    # Test case 1: Basic functionality
    # result = solution.solve([test_input])
    # expected = [expected_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    # Test case 2: Edge case
    # result = solution.solve([edge_case_input])
    # expected = [edge_case_output]
    # assert result == expected, f"Expected {expected}, got {result}"

    print("All test cases passed!")

if __name__ == "__main__":
    test_solution()

    # Example usage
    solution = Solution()
    print(f"Solution for 721. Accounts")
