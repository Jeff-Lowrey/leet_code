"""
# Difficulty: Medium

# 284. Peeking Iterator

Design an iterator that supports the peek operation on an existing iterator in addition to the hasNext and the next operations.

Implement the PeekingIterator class:
- PeekingIterator(Iterator<int> iterator) Initializes the object with the given integer iterator iterator.
- int next() Returns the next element in the array and moves the pointer to the next element.
- boolean hasNext() Returns true if there are still elements in the array.
- int peek() Returns the next element in the array without moving the pointer.

Note: Each language may have a different implementation of the constructor and Iterator, but they all support the int next() and boolean hasNext() functions.

**Example:**

<dl class="example-details">
<dt>Input:</dt>
<dd>[input description]</dd>
<dt>Output:</dt>
<dd>[output description]</dd>
<dt>Explanation:</dt>
<dd>[explanation]</dd>
</dl>

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>

### INTUITION:
The challenge is to add a peek() operation that returns the next element without advancing the iterator. We need to cache the next element to support this functionality while maintaining compatibility with the original iterator interface.

### APPROACH:
1. **Cache next element**: Store the upcoming element when needed
2. **Track cached state**: Know when we have a cached element vs need to fetch
3. **Peek operation**: Return cached element without advancing
4. **Next operation**: Return cached element (if exists) or fetch from iterator
5. **HasNext operation**: Check if cached element exists or iterator has more

### WHY THIS WORKS:
- Caching allows us to "look ahead" without consuming the iterator
- State tracking ensures we don't double-consume elements
- All operations maintain O(1) complexity
- Original iterator interface is preserved

### EXAMPLE WALKTHROUGH:
```
Iterator: [1,2,3]
PeekingIterator created
peek() → 1 (cache element 1, don't advance)
next() → 1 (return cached element, advance iterator)
peek() → 2 (cache element 2, don't advance)
peek() → 2 (return same cached element)
next() → 2 (return cached element, advance iterator)
hasNext() → true (iterator still has element 3)
next() → 3 (fetch from iterator)
hasNext() → false
```

### TIME COMPLEXITY:
O(1)
All operations are constant time

### SPACE COMPLEXITY:
O(1)
Only storing one cached element

### EDGE CASES:
- **[Edge case 1]:** [how it's handled]
- **[Edge case 2]:** [how it's handled]

</details>
"""


