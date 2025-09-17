"""
Recursive Problem Solutions

This file contains various recursive problem solutions demonstrating different
recursive patterns and techniques.
"""

"""
509. Fibonacci Number
Easy

The Fibonacci numbers form a sequence such that each number is the sum of the
two preceding ones, starting from 0 and 1.

Example:
Input: n = 4
Output: 3
Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3
"""

class SolutionFibonacci:
    def fib(self, n: int) -> int:
        """
        Approach: Iterative (optimal)
        Time Complexity: O(n)
        Space Complexity: O(1)
        """
        if n <= 1:
            return n

        prev, curr = 0, 1
        for _ in range(2, n + 1):
            prev, curr = curr, prev + curr

        return curr

    def fibRecursive(self, n: int) -> int:
        """
        Approach: Recursive with memoization
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        memo = {}

        def helper(n):
            if n <= 1:
                return n
            if n in memo:
                return memo[n]

            memo[n] = helper(n - 1) + helper(n - 2)
            return memo[n]

        return helper(n)


"""
779. K-th Symbol in Grammar
Medium

We build a table of n rows (1-indexed). We start by writing 0 in the 1st row.
In every subsequent row, we replace each occurrence of 0 with 01, and each
occurrence of 1 with 10.

Given two integers n and k, return the kth (1-indexed) symbol in the nth row.

Example:
Input: n = 2, k = 2
Output: 1
Explanation:
row 1: 0
row 2: 01
"""

class SolutionKthGrammar:
    def kthGrammar(self, n: int, k: int) -> int:
        """
        Approach: Recursive pattern recognition
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        if n == 1:
            return 0

        # Find parent
        parent = self.kthGrammar(n - 1, (k + 1) // 2)

        # If k is odd, return same as parent
        # If k is even, return opposite of parent
        if k % 2 == 1:
            return parent
        else:
            return 1 - parent


"""
95. Unique Binary Search Trees II
Medium

Given an integer n, return all the structurally unique BST's, which has exactly
n nodes of unique values from 1 to n.

Example:
Input: n = 3
Output: [[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]
"""

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class SolutionUniqueBST:
    def generateTrees(self, n: int) -> list[TreeNode]:
        """
        Approach: Recursive generation with memoization
        Time Complexity: O(4^n / n^(3/2)) - Catalan number
        Space Complexity: O(4^n / n^(3/2))
        """
        if n == 0:
            return []

        memo = {}

        def generate(start, end):
            if start > end:
                return [None]

            if (start, end) in memo:
                return memo[(start, end)]

            trees = []

            for root_val in range(start, end + 1):
                left_trees = generate(start, root_val - 1)
                right_trees = generate(root_val + 1, end)

                for left in left_trees:
                    for right in right_trees:
                        root = TreeNode(root_val)
                        root.left = left
                        root.right = right
                        trees.append(root)

            memo[(start, end)] = trees
            return trees

        return generate(1, n)


"""
241. Different Ways to Add Parentheses
Medium

Given a string expression of numbers and operators, return all possible results
from computing all the different possible ways to group numbers and operators.

Example:
Input: expression = "2-1-1"
Output: [0,2]
Explanation:
((2-1)-1) = 0
(2-(1-1)) = 2
"""

class SolutionParentheses:
    def diffWaysToCompute(self, expression: str) -> list[int]:
        """
        Approach: Divide and conquer with memoization
        Time Complexity: O(2^n)
        Space Complexity: O(2^n)
        """
        memo = {}

        def compute(expr):
            if expr in memo:
                return memo[expr]

            # Base case: if expression is just a number
            if expr.isdigit():
                return [int(expr)]

            result = []

            for i, char in enumerate(expr):
                if char in '+-*':
                    # Recursively compute left and right parts
                    left_results = compute(expr[:i])
                    right_results = compute(expr[i+1:])

                    # Combine results
                    for left in left_results:
                        for right in right_results:
                            if char == '+':
                                result.append(left + right)
                            elif char == '-':
                                result.append(left - right)
                            else:  # char == '*'
                                result.append(left * right)

            memo[expr] = result
            return result

        return compute(expression)


"""
894. All Possible Full Binary Trees
Medium

Given an integer n, return a list of all possible full binary trees with n nodes.

A full binary tree is a binary tree where each node has exactly 0 or 2 children.

Example:
Input: n = 7
Output: [[0,0,0,null,null,0,0,null,null,0,0],...]
"""

class SolutionFullBinaryTrees:
    def allPossibleFBT(self, n: int) -> list[TreeNode]:
        """
        Approach: Recursive with memoization
        Time Complexity: O(2^n)
        Space Complexity: O(2^n)
        """
        if n % 2 == 0:
            return []  # Full binary trees have odd number of nodes

        memo = {1: [TreeNode(0)]}

        def generate(n):
            if n in memo:
                return memo[n]

            result = []

            # Try all possible left and right subtree sizes
            for left_size in range(1, n, 2):
                right_size = n - 1 - left_size

                left_trees = generate(left_size)
                right_trees = generate(right_size)

                for left in left_trees:
                    for right in right_trees:
                        root = TreeNode(0)
                        root.left = left
                        root.right = right
                        result.append(root)

            memo[n] = result
            return result

        return generate(n)


# Test cases
if __name__ == "__main__":
    # Test Fibonacci
    solution_fib = SolutionFibonacci()

    print("Fibonacci Numbers:")
    for n in range(10):
        result = solution_fib.fib(n)
        print(f"F({n}) = {result}")

    print("\n" + "="*50 + "\n")

    # Test K-th Grammar
    solution_grammar = SolutionKthGrammar()

    print("K-th Symbol in Grammar:")
    test_cases = [(1, 1), (2, 1), (2, 2), (3, 3)]
    for n, k in test_cases:
        result = solution_grammar.kthGrammar(n, k)
        print(f"Row {n}, Position {k}: {result}")

    print("\n" + "="*50 + "\n")

    # Test Different Ways to Add Parentheses
    solution_paren = SolutionParentheses()

    print("Different Ways to Add Parentheses:")
    expressions = ["2-1-1", "2*3-4*5", "11"]
    for expr in expressions:
        result = solution_paren.diffWaysToCompute(expr)
        print(f"Expression: '{expr}'")
        print(f"Results: {sorted(result)}\n")
