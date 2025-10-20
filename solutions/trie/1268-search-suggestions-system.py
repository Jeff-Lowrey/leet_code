"""
# Difficulty: Medium

# 1268. Search Suggestions System

You are given an array of strings products and a string searchWord.

Design a system that suggests at most three product names from products after each character of searchWord is typed. Suggested products should have common prefix with searchWord. If there are more than three products with a common prefix return the three lexicographically minimums products.

Return a list of lists of the suggested products after each character of searchWord is typed.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>["mobile", "mouse", "moneypot", "monitor", "mousepad"]</dd>
<dt>Output:</dt>
<dd>1</dd>
<dt>Explanation:</dt>
<dd>Search suggestions for 'mouse' show top 3 products per character</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>


### METADATA:
**Techniques**: TBD
**Data Structures**: TBD
**Patterns**: TBD
**Time Complexity**: O(N * L + S)
**Space Complexity**: O(N * L)

### INTUITION:
This is a classic autocomplete problem that benefits from using a Trie data structure. As we type each character, we need to find all words with that prefix and return the top 3 lexicographically. A Trie allows us to efficiently navigate to the prefix and collect matching words.

### APPROACH:
1. **Build Trie**: Insert all products into a trie structure
2. **Store suggestions at nodes**: At each node, store up to 3 lexicographically smallest words that pass through it
3. **Process each character**: For each character typed, navigate to that node and return its suggestions
4. **Handle missing prefixes**: If prefix doesn't exist, return empty lists for remaining characters

Alternative: Sort products, then use binary search for each prefix

### WHY THIS WORKS:
- Trie naturally organizes words by prefixes
- Storing sorted suggestions at each node provides O(1) lookup
- As we build the trie, we can maintain the lexicographically smallest suggestions
- Navigation follows the typed prefix exactly

### EXAMPLE WALKTHROUGH:
```
products = ["mobile","mouse","moneypot","monitor","mousepad"]
searchWord = "mouse"

Build Trie and store suggestions:
  root -> 'm' (suggestions: ["mobile", "moneypot", "monitor"])
       -> 'o' (suggestions: ["mobile", "moneypot", "monitor"])
       -> 'u' (suggestions: ["mouse", "mousepad"])
       -> 's' (suggestions: ["mouse", "mousepad"])
       -> 'e' (suggestions: ["mouse", "mousepad"])

Process 'm': ["mobile", "moneypot", "monitor"]
Process 'mo': ["mobile", "moneypot", "monitor"]
Process 'mou': ["mouse", "mousepad"]
Process 'mous': ["mouse", "mousepad"]
Process 'mouse': ["mouse", "mousepad"]
```

### TIME COMPLEXITY:
O(N * L + S)
Where N is number of products, L is average length, S is searchWord length
- Building trie with suggestions: O(N * L)
- Processing search: O(S)

### SPACE COMPLEXITY:
O(N * L)
For storing the trie structure

### EDGE CASES:
- SearchWord has no matching products
- Fewer than 3 products match a prefix
- All products share the same prefix
- Empty products list

</details>
"""


from typing import Any
import re




class TrieNode:
    """Node in a Trie data structure."""

    def __init__(self) -> None:
        """Initialize TrieNode with empty children and end marker."""
        self.children: dict[str, "TrieNode"] = {}
        self.word: str | None = None  # For word storage in solutions like Word Search II
        self.is_end: bool = False  # Marks end of a word
        self.suggestions: list[str] = []  # For search suggestions


class Solution:
    def suggestedProducts(self, products: list[str], searchWord: str) -> list[list[str]]:
        """
        Return suggested products for each character typed.

        Args:
            products: List of product names
            searchWord: Search query being typed

        Returns:
            List of suggestion lists for each character

        Time Complexity: O(N * L + S) where N is products count, L avg length, S searchWord length
        Space Complexity: O(N * L) for trie storage
        """
        # Sort products for lexicographic ordering
        products.sort()

        # Build trie with suggestions
        root = TrieNode()

        for product in products:
            current = root
            for char in product:
                if char not in current.children:
                    current.children[char] = TrieNode()
                current = current.children[char]

                # Add product to suggestions if room (max 3)
                if len(current.suggestions) < 3:
                    current.suggestions.append(product)

        # Process search word
        result: list[Any] = []
        current = root

        for char in searchWord:
            if current and char in current.children:
                current = current.children[char]
                result.append(current.suggestions)
            else:
                # No more matches, remaining results are empty
                current = None  # type: ignore
                result.append([])

        return result


class SolutionBinarySearch:
    """Alternative solution using sorting and binary search."""

    def suggestedProducts(self, products: list[str], searchWord: str) -> list[list[str]]:
        """
        Use binary search to find products with matching prefix.

        Time Complexity: O(N * log(N) + S * N)
        Space Complexity: O(1) excluding output
        """
        products.sort()
        result: list[Any] = []
        prefix = ""

        for char in searchWord:
            prefix += char

            # Binary search for first product with this prefix
            start = self._find_start_index(products, prefix)

            suggestions: list[Any] = []
            # Collect up to 3 products starting from found index
            for i in range(start, min(start + 3, len(products))):
                if products[i].startswith(prefix):
                    suggestions.append(products[i])
                else:
                    break

            result.append(suggestions)

        return result

    def _find_start_index(self, products: list[str], prefix: str) -> int:
        """Binary search for first index where product >= prefix."""
        left, right = 0, len(products)

        while left < right:
            mid = (left + right) // 2
            if products[mid] < prefix:
                left = mid + 1
            else:
                right = mid

        return left


class SolutionSimple:
    """Simple solution using filtering."""

    def suggestedProducts(self, products: list[str], searchWord: str) -> list[list[str]]:
        """
        Simple solution that filters products for each prefix.

        Time Complexity: O(N * L * S) where S is searchWord length
        Space Complexity: O(1) excluding output
        """
        products.sort()
        result: list[Any] = []
        prefix = ""

        for char in searchWord:
            prefix += char

            # Filter products with this prefix and take first 3
            matches = [p for p in products if p.startswith(prefix)]
            result.append(matches[:3])

        return result


def test_solution() -> None:
    """Test cases for 1268. Search Suggestions System."""
    solution = Solution()
    solution_bs = SolutionBinarySearch()
    solution_simple = SolutionSimple()

    # Test case 1: Standard case
    products1 = ["mobile", "mouse", "moneypot", "monitor", "mousepad"]
    searchWord1 = "mouse"
    expected1 = [
        ["mobile", "moneypot", "monitor"],
        ["mobile", "moneypot", "monitor"],
        ["mouse", "mousepad"],
        ["mouse", "mousepad"],
        ["mouse", "mousepad"],
    ]
    assert solution.suggestedProducts(products1, searchWord1) == expected1
    assert solution_bs.suggestedProducts(products1, searchWord1) == expected1
    assert solution_simple.suggestedProducts(products1, searchWord1) == expected1

    # Test case 2: More than 3 matches
    products2 = ["havana"]
    searchWord2 = "havana"
    expected2 = [["havana"], ["havana"], ["havana"], ["havana"], ["havana"], ["havana"]]
    assert solution.suggestedProducts(products2, searchWord2) == expected2
    assert solution_bs.suggestedProducts(products2, searchWord2) == expected2
    assert solution_simple.suggestedProducts(products2, searchWord2) == expected2

    # Test case 3: No matches
    products3 = ["bags", "baggage", "banner", "box", "cloths"]
    searchWord3 = "bags"
    expected3 = [["baggage", "bags", "banner"], ["baggage", "bags", "banner"], ["baggage", "bags"], ["bags"]]
    assert solution.suggestedProducts(products3, searchWord3) == expected3
    assert solution_bs.suggestedProducts(products3, searchWord3) == expected3
    assert solution_simple.suggestedProducts(products3, searchWord3) == expected3

    # Test case 4: Partial prefix with no matches
    products4 = ["apple", "application", "applied"]
    searchWord4 = "apz"
    expected4 = [["apple", "application", "applied"], ["apple", "application", "applied"], []]
    assert solution.suggestedProducts(products4, searchWord4) == expected4
    assert solution_bs.suggestedProducts(products4, searchWord4) == expected4
    assert solution_simple.suggestedProducts(products4, searchWord4) == expected4

    # Test case 5: Single character search
    products5 = ["code", "coder", "coding", "codable"]
    searchWord5 = "c"
    result5 = solution.suggestedProducts(products5, searchWord5)
    assert len(result5) == 1 and len(result5[0]) == 3  # Should return 3 products
    result5_bs = solution_bs.suggestedProducts(products5, searchWord5)
    assert len(result5_bs) == 1 and len(result5_bs[0]) == 3
    result5_simple = solution_simple.suggestedProducts(products5, searchWord5)
    assert len(result5_simple) == 1 and len(result5_simple[0]) == 3

    print("All test cases passed!")


if __name__ == "__main__":
    test_solution()

    # Example usage
    print("=== 1268. Search Suggestions System ===")

    solution = Solution()

    products = ["mobile", "mouse", "moneypot", "monitor", "mousepad"]
    searchWord = "mouse"

    print(f"Products: {products}")
    print(f"Search word: {searchWord}")
    print("\nSuggestions as user types:")

    result = solution.suggestedProducts(products, searchWord)

    for i, _char in enumerate(searchWord):
        prefix = searchWord[: i + 1]
        suggestions = result[i]
        print(f"  '{prefix}': {suggestions}")

    print("\nDemonstrating binary search solution:")
    solution_bs = SolutionBinarySearch()
    products2 = ["bags", "baggage", "banner", "box", "cloths"]
    searchWord2 = "bags"

    print(f"\nProducts: {products2}")
    print(f"Search word: {searchWord2}")

    result2 = solution_bs.suggestedProducts(products2, searchWord2)

    for i, _char in enumerate(searchWord2):
        prefix = searchWord2[: i + 1]
        suggestions = result2[i]
        print(f"  '{prefix}': {suggestions}")

    print("\nAutocomplete system working efficiently!")
