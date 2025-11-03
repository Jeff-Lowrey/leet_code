"""
### INTUITION:
The key insight is that the challenge is to add a peek() operation that returns the next element without advancing the iterator. We need to cache the next element to support this functionality while maintaining compatibility with the original iterator interface.

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
Input:
```
Iterator: [1,2,3]
```

PeekingIterator created

Steps:
Step 1: peek() → 1 (cache element 1, don't advance)
Step 2: next() → 1 (return cached element, advance iterator)
Step 3: peek() → 2 (cache element 2, don't advance)
Step 4: peek() → 2 (return same cached element)
Step 5: next() → 2 (return cached element, advance iterator)
Step 6: hasNext() → true (iterator still has element 3)
Step 7: next() → 3 (fetch from iterator)
Step 8: hasNext() → false

Output:
```
true
```

### TIME COMPLEXITY:
**O(1)**
All operations are constant time

### SPACE COMPLEXITY:
**O(1)**
Only storing one cached element

### EDGE CASES:
- **Empty input**: Handle when input is empty
- **Single element**: Handle single-element inputs
- **Boundary values**: Handle minimum/maximum valid values

"""
