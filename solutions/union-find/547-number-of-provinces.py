"""
547. Number of Provinces
Medium

There are n cities. Some of them are connected, while some are not. If city a is
connected directly with city b, and city b is connected directly with city c,
then city a is connected indirectly with city c.

A province is a group of directly or indirectly connected cities and no other
cities outside of the group.

You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith
city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.

Return the total number of provinces.

Example:
Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2
"""

class Solution:
    def findCircleNum(self, isConnected: list[list[int]]) -> int:
        """
        Approach: Union Find
        Time Complexity: O(n² * α(n)) where α is inverse Ackermann
        Space Complexity: O(n)
        """
        n = len(isConnected)
        parent = list(range(n))
        rank = [0] * n

        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])  # Path compression
            return parent[x]

        def union(x, y):
            px, py = find(x), find(y)
            if px == py:
                return

            # Union by rank
            if rank[px] < rank[py]:
                parent[px] = py
            elif rank[px] > rank[py]:
                parent[py] = px
            else:
                parent[py] = px
                rank[px] += 1

        # Build union find
        for i in range(n):
            for j in range(i + 1, n):
                if isConnected[i][j] == 1:
                    union(i, j)

        # Count unique provinces
        return len(set(find(i) for i in range(n)))

    def findCircleNumDFS(self, isConnected: list[list[int]]) -> int:
        """
        Approach: DFS
        Time Complexity: O(n²)
        Space Complexity: O(n)
        """
        n = len(isConnected)
        visited = [False] * n
        provinces = 0

        def dfs(city):
            for neighbor in range(n):
                if isConnected[city][neighbor] == 1 and not visited[neighbor]:
                    visited[neighbor] = True
                    dfs(neighbor)

        for city in range(n):
            if not visited[city]:
                visited[city] = True
                dfs(city)
                provinces += 1

        return provinces


"""
684. Redundant Connection
Medium

In this problem, a tree is an undirected graph that is connected and has no cycles.

You are given a graph that started as a tree with n nodes labeled from 1 to n,
with one additional edge added.

Return an edge that can be removed so that the resulting graph is a tree of n nodes.

Example:
Input: edges = [[1,2],[1,3],[2,3]]
Output: [2,3]
"""

class SolutionRedundant:
    def findRedundantConnection(self, edges: list[list[int]]) -> list[int]:
        """
        Approach: Union Find
        Time Complexity: O(n * α(n))
        Space Complexity: O(n)
        """
        parent = {}

        def find(x):
            if x not in parent:
                parent[x] = x
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]

        def union(x, y):
            px, py = find(x), find(y)
            if px == py:
                return False  # Cycle detected
            parent[px] = py
            return True

        for u, v in edges:
            if not union(u, v):
                return [u, v]

        return []


"""
721. Accounts Merge
Medium

Given a list of accounts where each element accounts[i] is a list of strings,
where the first element accounts[i][0] is a name, and the rest of the elements
are emails representing emails of the account.

Merge the accounts and return the accounts in sorted order.

Example:
Input: accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],
                   ["John","johnsmith@mail.com","john00@mail.com"],
                   ["Mary","mary@mail.com"],
                   ["John","johnnybravo@mail.com"]]
Output: [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],
         ["Mary","mary@mail.com"],
         ["John","johnnybravo@mail.com"]]
"""

class SolutionAccounts:
    def accountsMerge(self, accounts: list[list[str]]) -> list[list[str]]:
        """
        Approach: Union Find with email mapping
        Time Complexity: O(n * k * α(n)) where k is average emails per account
        Space Complexity: O(n * k)
        """
        from collections import defaultdict

        parent = {}
        email_to_name = {}

        def find(x):
            if x not in parent:
                parent[x] = x
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]

        def union(x, y):
            parent[find(x)] = find(y)

        # Process each account
        for account in accounts:
            name = account[0]
            first_email = account[1]

            for email in account[1:]:
                email_to_name[email] = name
                union(first_email, email)

        # Group emails by component
        components = defaultdict(list)
        for email in email_to_name:
            components[find(email)].append(email)

        # Build result
        result = []
        for emails in components.values():
            name = email_to_name[emails[0]]
            result.append([name] + sorted(emails))

        return result


# Test cases
if __name__ == "__main__":
    # Test Number of Provinces
    solution = Solution()

    print("Number of Provinces:")
    test_cases = [
        [[1, 1, 0], [1, 1, 0], [0, 0, 1]],
        [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
        [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
    ]

    for matrix in test_cases:
        result = solution.findCircleNum(matrix)
        print(f"Connections: {matrix}")
        print(f"Provinces: {result}\n")

    # Test Redundant Connection
    solution_redundant = SolutionRedundant()

    print("Redundant Connection:")
    edges_cases = [
        [[1, 2], [1, 3], [2, 3]],
        [[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]
    ]

    for edges in edges_cases:
        result = solution_redundant.findRedundantConnection(edges)
        print(f"Edges: {edges}")
        print(f"Redundant: {result}\n")
