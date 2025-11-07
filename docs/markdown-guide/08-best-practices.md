# Best Practices

## Table of Contents

- [Writing Effective Documentation](#writing-effective-documentation)
- [Common Mistakes to Avoid](#common-mistakes-to-avoid)
- [Quality Checklist](#quality-checklist)
- [Related Sections](#related-sections)

## Writing Effective Documentation

### 1. Start with LeetCode
- Copy exact problem statement from LeetCode
- Use correct problem number and title
- Match difficulty level
- Include all examples and constraints

### 2. Write for Learners
- Assume reader is seeing approach for first time
- Explain the "why" not just the "what"
- Use concrete examples
- Progressive detail (high-level → implementation)

### 3. Be Complete
Required sections:
- ✅ Title with number
- ✅ Difficulty level
- ✅ Problem description
- ✅ At least one example
- ✅ Constraints
- ✅ Intuition/approach
- ✅ Complexity analysis

### 4. Use Markdown Effectively
```markdown
# Single # for title only
**Bold** for emphasis
`code` for technical terms
- Lists for constraints
Triple backticks for code blocks
```

### 5. Organize Logically
1. **INTUITION** - The "aha" moment
2. **APPROACH** - Detailed step-by-step strategy
3. **COMPLEXITY** - Time and space analysis
4. **EDGE CASES** (optional) - Special handling
5. **WHY THIS WORKS** (optional) - Correctness proof
6. **EXAMPLE WALKTHROUGH** (optional) - Concrete trace

### 6. Explain Complexity
Don't just state O(n):
```markdown
❌ Time: O(n)
✅ Time: O(n) - single pass through array
✅ Space: O(n) - hash map stores up to n elements
```

### 7. Include Examples
Concrete walkthroughs help more than abstract explanations:
```markdown
### EXAMPLE WALKTHROUGH:
nums = [2, 7, 11, 15], target = 9
i=0, num=2: complement=7, seen={}, add 2
i=1, num=7: complement=2, found! return [0,1]
```

### 8. Test Before Committing
- Verify code runs correctly
- Check markdown renders properly
- Run linters and formatters
- Test all code quality tools

### 9. Be Consistent
- Use same section names across solutions
- Follow language conventions
- Match formatting patterns
- Maintain code quality standards

### 10. Keep Updated
- Fix errors when found
- Add optimizations
- Update for new language features
- Improve explanations based on feedback

## Common Mistakes to Avoid

### 1. Incomplete Metadata
❌ Missing problem number or difficulty
✅ Always include both in correct format

### 2. No Complexity Explanation
❌ Just stating O(n) without explanation
✅ Explain why it's O(n) and what contributes

### 3. Skipping Intuition
❌ Jumping straight to implementation steps
✅ Start with high-level insight

### 4. Poor Example Formatting
❌ Inline text without code blocks
✅ Use proper code blocks for examples

### 5. Missing Type Information
❌ Generic code without types
✅ Include type hints/annotations

### 6. Inconsistent Formatting
❌ Different styles across solutions
✅ Follow established patterns

### 7. No Edge Case Discussion
❌ Only happy path examples
✅ Document boundary conditions

### 8. Unclear Variable Names
❌ Single letters or abbreviations
✅ Descriptive names (within reason)

## Quality Checklist

Before submitting a solution:

- [ ] Title matches LeetCode exactly
- [ ] Difficulty is correct
- [ ] Problem description is complete
- [ ] At least one example included
- [ ] Constraints listed
- [ ] Intuition section explains key insight
- [ ] Approach describes strategy
- [ ] Complexity includes time AND space with explanations
- [ ] Code has proper types/annotations
- [ ] Code follows language conventions
- [ ] Markdown renders correctly
- [ ] All tests pass
- [ ] Linters pass
- [ ] Code is formatted properly

## Related Sections

- **Overview** → [01-overview.md](01-overview.md)
- **Complete Examples** → [09-examples.md](09-examples.md)
- **Upload Guide** → [../upload-guide/README.md](../upload-guide/README.md)
