# Markdown Structure Overview

## Table of Contents

- [Introduction](#introduction)
- [Design Principles](#design-principles)
- [Overall Structure](#overall-structure)
- [Content Flow](#content-flow)
- [Key Features](#key-features)
- [Benefits](#benefits)
- [Processing Modules](#processing-modules)
- [Design Goals](#design-goals)
- [Next Steps](#next-steps)

## Introduction

The Leet Code Learning Tool uses a unified markdown structure embedded in solution files. This design allows the same format to work across all supported programming languages while maintaining language-specific best practices.

## Design Principles

### 1. Language-Agnostic Content
The markdown structure is **independent of the programming language**. Whether you're writing in Python, JavaScript, Java, or Rust, the markdown format remains identical.

**Why?** This allows:
- Consistent user experience across languages
- Single processing pipeline for all content
- Easy addition of new languages
- Reusable extraction logic

### 2. Comment-Block Embedding
All markdown content is embedded within language-specific comment blocks:
- Python: `"""..."""` (docstring)
- JavaScript/TypeScript: `/** ... */` (JSDoc)
- Java: `/** ... */` (Javadoc)
- C++: `/** ... */` (Doxygen)
- Go/Rust: `/** ... */`

**Why?** This ensures:
- Valid syntax in all languages
- Content stays with code
- No separate documentation files to maintain
- Comments are extracted without affecting execution

### 3. Structured Sections
Content is organized into well-defined sections:
- **Metadata** - Title, difficulty, identification
- **Problem Description** - Requirements and examples
- **Solution Explanation** - Approach and analysis
- **Code** - Implementation

**Why?** This enables:
- Predictable extraction and parsing
- Targeted content rendering
- Flexible display organization
- Quality validation

### 4. Collapsible Details
Solution explanations are wrapped in `<details>` tags for progressive disclosure.

**Why?** This provides:
- Reduced initial visual clutter
- User control over information density
- Mobile-friendly layout
- Better learning experience

## Overall Structure

```
┌──────────────────────────────────────────────┐
│ Language-Specific Comment Block              │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │ METADATA SECTION                       │ │
│  │ - Problem title (H1)                   │ │
│  │ - Difficulty level                     │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │ PROBLEM DESCRIPTION                    │ │
│  │ - Problem statement                    │ │
│  │ - Examples                             │ │
│  │ - Constraints                          │ │
│  └────────────────────────────────────────┘ │
│                                              │
│  ┌────────────────────────────────────────┐ │
│  │ SOLUTION EXPLANATION                   │ │
│  │ <details>                              │ │
│  │   - Intuition                          │ │
│  │   - Approach                           │ │
│  │   - Algorithm                          │ │
│  │   - Complexity                         │ │
│  │   - Edge cases (optional)              │ │
│  │ </details>                             │ │
│  └────────────────────────────────────────┘ │
│                                              │
└──────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────┐
│ CODE SECTION                                 │
│ - Language-specific implementation           │
│ - Type hints/annotations                     │
│ - Inline documentation                       │
└──────────────────────────────────────────────┘
```

## Content Flow

### 1. Authoring
Developer writes solution with embedded markdown:
```python
"""
# 1. Two Sum
Difficulty: Easy

Given an array...

<details>
<summary><b>🔍 SOLUTION EXPLANATION</b></summary>
...
</details>
"""

class Solution:
    def twoSum(self, nums, target):
        # implementation
```

### 2. Storage
File stored in structured directory:
```
solutions/arrays-hashing/python/0001-two-sum.py
```

### 3. Extraction
Application reads file and extracts markdown:
```python
markdown = extract_markdown_from_code(code, ".py")
```

### 4. Parsing
Markdown is parsed into structured data:
```python
metadata = parse_metadata(markdown)  # title, difficulty
problem = parse_problem(markdown)    # description HTML
explanation = parse_explanation(markdown)  # section dict
```

### 5. Rendering
Content displayed on solution page with:
- Syntax-highlighted code
- Formatted problem description
- Collapsible explanation sections
- Download options

## Key Features

### Metadata Extraction
- **Problem Number**: Extracted from title for navigation
- **Difficulty**: Used for filtering and badges
- **Title**: Displayed as page heading

### Smart Content Organization
- **Duplicate Removal**: Similar content in docs and explanation is merged
- **Section Grouping**: Related sections combined intelligently
- **Progressive Disclosure**: Complex explanations start collapsed

### Multi-Language Support
- **Universal Parsing**: Same extraction logic for all languages
- **Language Detection**: Automatic based on file extension
- **Comment Style Handling**: Strips language-specific comment markers

### Flexible Rendering
- **HTML Conversion**: Markdown → HTML with syntax highlighting
- **Code Formatting**: Language-specific syntax coloring
- **Mobile Responsive**: Adapts to screen size

## Benefits

### For Contributors
- Write once, works everywhere
- No separate documentation files
- Clear section templates
- Validation feedback

### For Users
- Consistent experience across languages
- Progressive information disclosure
- Easy navigation and search
- Rich formatting and examples

### For Developers
- Single processing pipeline
- Reusable extraction modules
- Easy to add new languages
- Testable parsing logic

## Processing Modules

Content extraction and processing is handled by:

- **`data/markdown_extraction.py`**
  - Extract markdown from language-specific comments
  - Parse metadata (title, difficulty, number)
  - Language-agnostic extraction functions

- **`content/content_processing.py`**
  - Parse problem descriptions
  - Extract explanation sections
  - Merge and organize content
  - Clean and format HTML

- **`data/category_data.py`**
  - Solution data models
  - Category management
  - Content caching

See [07-processing-flow.md](07-processing-flow.md) for detailed processing information.

## Design Goals

✅ **Consistency** - Same structure across all languages
✅ **Simplicity** - Easy to write and understand
✅ **Completeness** - All necessary information captured
✅ **Flexibility** - Optional sections for additional details
✅ **Maintainability** - Content stays with code
✅ **Processability** - Machine-readable and parseable
✅ **Readability** - Human-friendly when viewing raw files

## Next Steps

- **Learn metadata format** → [02-metadata.md](02-metadata.md)
- **See complete examples** → [09-examples.md](09-examples.md)
- **Understand processing** → [07-processing-flow.md](07-processing-flow.md)
