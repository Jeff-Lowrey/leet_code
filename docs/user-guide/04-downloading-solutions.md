# Downloading Solutions

[← Previous: Browsing Solutions](03-browsing-solutions.md) | [🏠 Home](README.md) | [Next: Code Viewing →](05-code-viewing.md)

---

## Table of Contents

- [Download Options](#download-options)
- [Download Formats](#download-formats)
- [Language-Specific Downloads](#language-specific-downloads)
- [Download Process](#download-process)
- [File Naming Conventions](#file-naming-conventions)
- [Using Downloaded Files](#using-downloaded-files)
- [Best Practices](#best-practices)
- [Download Troubleshooting](#download-troubleshooting)

## Download Options

The platform provides multiple download formats to support different learning and practice needs.

## Download Formats

### 1. Skeleton Download

Downloads method signatures only - perfect for practice:

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        """
        Approach: [brief description]
        Time Complexity: O(?)
        Space Complexity: O(?)
        """
        pass
```

**Use Cases:**
- Practice implementing solutions yourself
- Test your understanding without seeing the answer
- Create your own solution before comparing
- Interview practice with method signatures

### 2. Solution Download

Downloads complete implementation with all code:

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        """
        Approach: Hash Map for O(n) lookup
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []
```

**Use Cases:**
- Study complete implementations
- Reference solutions offline
- Compare your solution with provided one
- Learn best practices and patterns

### 3. LeetCode Skeleton Download

Converts Python snake_case to camelCase for LeetCode submission:

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        pass
```

**Use Cases:**
- Copy-paste ready for LeetCode editor
- Practice on LeetCode platform
- Submit skeleton for testing
- Quick start on LeetCode problems

### 4. LeetCode Solution Download

Complete solution in LeetCode-compatible format:

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []
```

**Use Cases:**
- Verify solution on LeetCode platform
- Quick submission for validation
- Compare with LeetCode test cases
- Submission-ready code

### 5. ZIP Bundle Download

Downloads all formats in a single ZIP file:

```
001-two-sum.zip
├── 001-two-sum-skeleton.py
├── 001-two-sum-solution.py
├── 001-two-sum-leetcode-skeleton.py
└── 001-two-sum-leetcode-solution.py
```

**Use Cases:**
- Offline study with all formats
- Archive entire category
- Complete reference package
- Batch download multiple formats

## Language-Specific Downloads

### Selecting Language

If alternative language implementations are available:

1. **View Language Badges**: Check available languages on solution page
2. **Select Language**: Click the language badge to switch
3. **Download**: All download buttons now use selected language

### Multi-Language Support

Available languages include:
- Python (default)
- Java
- C++ / C
- JavaScript / TypeScript
- Go
- Rust
- C#
- Swift
- Kotlin
- Ruby
- PHP
- Scala

### Language-Aware Downloads

When you select a language:
- ✅ Skeleton downloads in selected language
- ✅ Solution downloads in selected language
- ✅ LeetCode format converts to language conventions
- ✅ ZIP bundle includes all formats for that language

## Download Process

### Single File Download

1. **Navigate to Solution**: Open the problem you want to download
2. **Select Language** (optional): Choose your preferred language
3. **Click Download Button**: Choose format (Skeleton/Solution/LeetCode)
4. **Save File**: Browser downloads file to default location

### ZIP Bundle Download

1. **Navigate to Solution**: Open the problem
2. **Select Language** (optional): Choose implementation language
3. **Click "Download All (ZIP)"**: Downloads bundle with all formats
4. **Extract ZIP**: Unzip to access all format files

### Batch Downloads

To download multiple problems:

1. **Manual Method**: Download each problem individually
2. **Category Download**: Download all problems in a category
3. **ZIP Method**: Use ZIP bundle for each problem

## File Naming Conventions

### Standard Format

Downloads follow consistent naming:

```
{number}-{problem-name}-{format}.{extension}
```

**Examples:**
- `001-two-sum-skeleton.py`
- `001-two-sum-solution.py`
- `001-two-sum-leetcode-skeleton.py`
- `217-contains-duplicate-solution.java`

### Components

- **Number**: LeetCode problem number (e.g., 001, 217)
- **Problem Name**: Kebab-case problem title
- **Format**: skeleton, solution, leetcode-skeleton, leetcode-solution
- **Extension**: Language-specific (.py, .java, .cpp, .js, etc.)

## Using Downloaded Files

### For Practice

1. **Download Skeleton**: Get method signatures
2. **Implement Solution**: Write your code
3. **Run Tests**: Test with sample inputs
4. **Compare Solution**: Download full solution if needed

### For Study

1. **Download Solution**: Get complete implementation
2. **Study Code**: Read through with comments
3. **Run Locally**: Test with your own inputs
4. **Modify & Experiment**: Try variations

### For LeetCode Submission

1. **Download LeetCode Format**: Get submission-ready code
2. **Open LeetCode**: Navigate to problem on LeetCode.com
3. **Copy Code**: Copy downloaded file content
4. **Paste & Submit**: Paste into LeetCode editor and submit

### For Offline Study

1. **Download ZIP Bundles**: Get all formats for each problem
2. **Organize Locally**: Create folder structure by category
3. **Study Offline**: Access solutions without internet
4. **Take Notes**: Annotate downloaded files

## Best Practices

### Organized Downloads

Create a structured folder system:

```
leet_code_practice/
├── arrays-hashing/
│   ├── 001-two-sum/
│   │   ├── skeleton.py
│   │   ├── solution.py
│   │   ├── my-solution.py
│   │   └── notes.md
│   └── 217-contains-duplicate/
│       └── ...
├── two-pointers/
└── ...
```

### Version Control

Track your solutions with Git:

```bash
# Initialize repository
git init leet_code_practice
cd leet_code_practice

# Download and commit
git add 001-two-sum-skeleton.py
git commit -m "Add Two Sum skeleton"

# After solving
git add 001-two-sum-my-solution.py
git commit -m "Solve Two Sum"

# Compare with reference
git add 001-two-sum-solution.py
git commit -m "Add reference solution"
```

### Learning Strategy

1. **Download Skeleton First**: Try solving without seeing answer
2. **Implement Your Solution**: Write code independently
3. **Test Thoroughly**: Verify with multiple test cases
4. **Compare Solutions**: Download reference solution
5. **Analyze Differences**: Learn from comparison
6. **Study Alternatives**: Check other language implementations

### Storage Management

- **Selective Downloads**: Only download what you need
- **ZIP for Archives**: Use bundles for long-term storage
- **Clean Up**: Remove temporary files after learning
- **Cloud Backup**: Store important solutions in cloud

## Download Troubleshooting

### File Won't Download

- **Check Browser Settings**: Ensure downloads are enabled
- **Disable Pop-up Blockers**: May block download windows
- **Try Different Browser**: Test with alternative browser
- **Check Disk Space**: Ensure sufficient storage

### Incorrect Format

- **Verify Language Selection**: Check selected language badge
- **Clear Browser Cache**: Force fresh download
- **Refresh Page**: Reload solution page
- **Report Issue**: If problem persists

### ZIP Extract Issues

- **Use Proper Extractor**: WinZip, 7-Zip, or built-in tools
- **Check ZIP Integrity**: Re-download if corrupted
- **Permissions**: Ensure write access to destination

---

[← Previous: Browsing Solutions](03-browsing-solutions.md) | [🏠 Home](README.md) | [Next: Code Viewing →](05-code-viewing.md)
