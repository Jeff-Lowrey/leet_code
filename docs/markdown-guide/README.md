# Markdown Structure Guide

## Overview

This guide explains the comprehensive markdown structure used in solution files across all supported programming languages. The structure is **language-agnostic**, working consistently for Python, JavaScript, TypeScript, Java, C++, Go, Rust, and other languages.

## Purpose

Understanding the markdown structure is essential for:
- **Contributors**: Writing properly formatted solutions
- **Developers**: Understanding how content is extracted and processed
- **Users**: Knowing what information is available and how it's organized

## Guide Structure

This guide is organized into focused sections:

1. **[01-overview.md](01-overview.md)** - High-level structure and design principles
2. **[02-metadata.md](02-metadata.md)** - Title, difficulty, and problem identification
3. **[03-problem-description.md](03-problem-description.md)** - Problem statement formatting
4. **[04-solution-explanation.md](04-solution-explanation.md)** - Detailed explanation sections
5. **[05-code-section.md](05-code-section.md)** - Solution code requirements
6. **[06-language-formatting.md](06-language-formatting.md)** - Language-specific comment styles
7. **[07-processing-flow.md](07-processing-flow.md)** - How the application processes markdown
8. **[08-best-practices.md](08-best-practices.md)** - Writing effective documentation
9. **[09-examples.md](09-examples.md)** - Complete examples for each language

## Quick Reference

### Basic Structure Template

```
┌─────────────────────────────────┐
│ Comment Block (language-specific) │
│                                   │
│  # Title                          │
│  Difficulty: Easy/Medium/Hard     │
│                                   │
│  Problem Description              │
│                                   │
│  <details>                        │
│    Solution Explanation           │
│  </details>                       │
│                                   │
└─────────────────────────────────┘
        ↓
┌─────────────────────────────────┐
│ Solution Code                    │
└─────────────────────────────────┘
```

### Required Sections

Every solution must include:
- ✅ Problem title with number (H1 header)
- ✅ Difficulty level (Easy/Medium/Hard)
- ✅ Problem description
- ✅ Solution explanation with complexity analysis
- ✅ Working solution code

### Optional Sections

Enhance your solution with:
- Algorithm walkthrough
- Edge case discussion
- Alternative approaches
- Visual examples
- Implementation notes

## Getting Started

**New to writing solutions?** Start with:
1. Read [01-overview.md](01-overview.md) for the big picture
2. Study [09-examples.md](09-examples.md) for your target language
3. Use templates from [docs/upload-guide/](../upload-guide/)

**Need specific information?** Jump to:
- Metadata formatting → [02-metadata.md](02-metadata.md)
- Explanation sections → [04-solution-explanation.md](04-solution-explanation.md)
- Language-specific syntax → [06-language-formatting.md](06-language-formatting.md)

**Understanding the system?** Check out:
- Processing pipeline → [07-processing-flow.md](07-processing-flow.md)
- Module reference → [../MODULE_STRUCTURE.md](../MODULE_STRUCTURE.md)

## Related Documentation

- **[Upload Guide](../upload-guide/README.md)** - How to contribute solutions
- **[Formatting Guides](../upload-guide/05-formatting-guidelines/)** - Language-specific examples
- **[Developer Guide](../developer-guide/README.md)** - Technical implementation
- **[Module Structure](../MODULE_STRUCTURE.md)** - Code organization

## Summary

The markdown structure provides:
- **Consistency** - Same format across 12+ languages
- **Structure** - Clear sections for metadata, problem, explanation, code
- **Flexibility** - Optional sections for additional insights
- **Processability** - Machine-readable for extraction and indexing
- **Readability** - Human-friendly for direct file viewing

All markdown processing is handled by modules in:
- `src/leet_code/data/` - Data extraction and parsing
- `src/leet_code/content/` - Content processing and organization
