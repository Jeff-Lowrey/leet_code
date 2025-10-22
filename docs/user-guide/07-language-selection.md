# Language Selection and Upload Workflows

[← Previous: Customizing Themes](06-customizing-themes.md) | [🏠 Home](README.md) | [Next: Language Examples →](08-language-examples.md)

---

## Table of Contents

- [Choosing a Language](#choosing-a-language)
- [Supported Languages](#supported-languages)
- [Upload Workflows](#upload-workflows)
- [Viewing Alternative Languages](#viewing-alternative-languages)
- [Language Comparison](#language-comparison)
- [Troubleshooting](#troubleshooting)

## Choosing a Language

### When to Use Each Language

**Python:**
- **Best For**: Rapid prototyping, readability, data structures
- **Strengths**: Clean syntax, extensive standard library, quick development
- **Use When**: Learning algorithms, interview prep, readability matters most
- **Example Use Cases**: Hash maps, array manipulation, string processing

**JavaScript:**
- **Best For**: Web development context, familiar to web developers
- **Strengths**: Async operations, functional programming, JSON handling
- **Use When**: Frontend developers learning algorithms, web-focused projects
- **Example Use Cases**: Array methods, object manipulation, event handling

**TypeScript:**
- **Best For**: Type-safe JavaScript, larger projects
- **Strengths**: Type checking, IDE support, compile-time error detection
- **Use When**: You need JavaScript with type safety, working on scalable projects
- **Example Use Cases**: Complex data structures, enterprise applications

**Java:**
- **Best For**: Enterprise applications, object-oriented design
- **Strengths**: Strong typing, mature ecosystem, excellent tooling
- **Use When**: Corporate interviews, OOP-focused problems, Android development
- **Example Use Cases**: Class design, threading, collections framework

**C++:**
- **Best For**: Performance-critical applications, systems programming
- **Strengths**: Low-level control, speed, STL library
- **Use When**: Performance matters, competitive programming, systems interviews
- **Example Use Cases**: Memory optimization, pointer manipulation, templates

**Go:**
- **Best For**: Concurrent programming, cloud services
- **Strengths**: Simplicity, built-in concurrency, fast compilation
- **Use When**: Building scalable services, learning modern systems language
- **Example Use Cases**: Concurrent problems, network programming, microservices

**Rust:**
- **Best For**: Memory safety, systems programming
- **Strengths**: Memory safety without garbage collection, zero-cost abstractions
- **Use When**: Learning systems programming safely, performance + safety required
- **Example Use Cases**: Safe memory management, concurrent programming

## Supported Languages

The platform supports 7 languages with full template and formatting guide support:

| Language   | File Extension | Template Available | Formatting Guide | Example Solutions |
|------------|----------------|-------------------|------------------|-------------------|
| Python     | `.py`          | ✅                | ✅               | ✅                |
| JavaScript | `.js`          | ✅                | ✅               | ✅                |
| TypeScript | `.ts`          | ✅                | ✅               | ✅                |
| Java       | `.java`        | ✅                | ✅               | ✅                |
| C++        | `.cpp`         | ✅                | ✅               | ✅                |
| Go         | `.go`          | ✅                | ✅               | ✅                |
| Rust       | `.rs`          | ✅                | ✅               | ✅                |

## Upload Workflows

### Method 1: Web Interface Upload

**Step 1: Navigate to Solution**
1. Browse to the category (e.g., Arrays & Hashing)
2. Select the problem you want to add a solution for
3. View the existing solution page

**Step 2: Access Upload Form**
1. Scroll to the bottom of the solution page
2. Click the "Upload Alternative Language Solution" button
3. Upload form appears

**Step 3: Select Language**
1. Choose language from dropdown menu
2. Available options: Java, C++, JavaScript, TypeScript, Go, Rust, Python
3. Selection determines file validation rules

**Step 4: Select File**
1. Click "Choose File" button
2. Navigate to your solution file
3. Ensure filename follows naming convention: `NNNN-problem-name.ext.ext`
   - Example: `0001-two-sum.java.java`
   - Example: `0217-contains-duplicate.cpp.cpp`

**Step 5: Upload**
1. Click "Upload" button
2. System validates:
   - Filename format matches pattern
   - File extension matches selected language
   - File contains valid code
3. Success: Language badge appears on solution page
4. Error: Error message displays with details

### Method 2: Direct File Creation

**Step 1: Copy Template**
```bash
# Navigate to language directory
cd solutions/<category>/<language>/

# Copy appropriate template
cp docs/developer-guide/templates/SOLUTION_TEMPLATE.<ext> NNNN-problem-name.<ext>.<ext>
```

**Step 2: Fill in Content**
1. Open the file in your editor
2. Update problem number, title, and difficulty
3. Add problem description and examples
4. Write solution explanation
5. Implement the solution
6. Add test cases

**Step 3: Verify Format**
- Check template sections are complete
- Ensure HTML formatting in examples uses `<dl>` tags
- Verify complexity analysis is present
- Test code runs correctly

**Step 4: Test Solution**
```bash
# Python
python solutions/<category>/python/NNNN-problem-name.py

# JavaScript
node solutions/<category>/javascript/NNNN-problem-name.js.js

# Java
javac solutions/<category>/java/NNNN-problem-name.java.java
java Solution

# C++
g++ -std=c++17 -o solution solutions/<category>/cpp/NNNN-problem-name.cpp.cpp
./solution

# Go
go run solutions/<category>/go/NNNN-problem-name.go.go

# Rust
rustc solutions/<category>/rust/NNNN-problem-name.rs.rs
./NNNN-problem-name
```

## Viewing Alternative Languages

### Language Badges

On solution pages, language badges appear below the problem title:

- **Primary Language**: Always shown (usually Python)
- **Alternative Languages**: Shown as badges when available
- **Badge Colors**: Each language has a unique color
- **Clickable**: Click badge to switch to that language

### Switching Languages

1. **View Current Solution**: Default shows primary language
2. **Click Language Badge**: Switch to alternative language
3. **Compare Implementations**: Switch between languages to compare approaches
4. **Download Any Version**: Download button works for current language

## Language Comparison

### Side-by-Side Comparison

**Different Approaches:**
- Python: Clean, readable hash map solution
- Java: Verbose but type-safe HashMap implementation
- C++: Performance-optimized with unordered_map
- Go: Simple with built-in map type
- JavaScript: Modern ES6 Map syntax
- TypeScript: Type-safe Map with interfaces
- Rust: Memory-safe HashMap with ownership

**Example: Two Sum**

| Aspect | Python | Java | C++ | Go | JavaScript |
|--------|--------|------|-----|-----|-----------|
| Lines of Code | ~15 | ~20 | ~18 | ~16 | ~15 |
| Verbosity | Low | High | Medium | Low | Low |
| Type Safety | Dynamic | Static | Static | Static | Dynamic |
| Performance | Good | Excellent | Excellent | Excellent | Good |
| Readability | Excellent | Good | Good | Excellent | Excellent |

### Learning Path Suggestions

**Beginner → Intermediate:**
1. Start with Python for clean syntax
2. Add JavaScript for web context
3. Try TypeScript for type safety

**Intermediate → Advanced:**
1. Learn Java for enterprise patterns
2. Try C++ for performance optimization
3. Explore Go for modern systems programming

**Advanced:**
1. Master Rust for memory safety
2. Compare all implementations
3. Understand trade-offs between languages

## Troubleshooting

### Common Upload Issues

**Issue: "Invalid filename format"**
- **Cause**: Filename doesn't match pattern `NNNN-problem-name.ext.ext`
- **Solution**: Rename file with correct format (double extension required)
- **Example**: Change `two-sum.java` to `0001-two-sum.java.java`

**Issue: "File extension doesn't match selected language"**
- **Cause**: Selected Java but uploaded `.cpp` file
- **Solution**: Either change language selection or upload correct file
- **Verification**: Check file extension matches language dropdown

**Issue: "File already exists"**
- **Cause**: Solution in this language already uploaded
- **Solution**: Either update existing file directly or choose different language
- **Note**: Upload interface doesn't support overwriting

**Issue: "Template sections missing"**
- **Cause**: File doesn't follow required template structure
- **Solution**: Copy from template and ensure all sections present:
  - Problem description
  - Examples with `<dl>` formatting
  - Solution explanation in `<details>` block
  - Solution implementation
  - Test cases

**Issue: "Syntax highlighting not working"**
- **Cause**: File extension not recognized by Pygments
- **Solution**: Verify double extension format (e.g., `.java.java`)
- **Note**: System uses file extension for syntax highlighting

### Testing Issues

**Issue: "Code doesn't compile"**
- **Python/JavaScript**: Check for syntax errors, missing imports
- **Java**: Verify class name is `Solution`, all imports present
- **C++**: Check for missing headers, namespace issues
- **Go**: Verify package declaration, imports
- **Rust**: Check for borrowing errors, trait implementations

**Issue: "Test cases fail"**
- **Solution**: Verify algorithm logic
- **Debug**: Add print statements to trace execution
- **Compare**: Check against reference implementation in another language

**Issue: "Performance differs from expected"**
- **Python/JavaScript**: Acceptable for interpreted languages
- **Java/C++/Rust**: Should match expected performance
- **Go**: Generally good performance
- **Note**: Different languages have different performance characteristics

### Getting Help

**Resources:**
- Review [Upload Guide](../upload-guide/README.md) for detailed templates
- Check [example implementations](../../solutions/arrays-hashing/) in each language
- Consult language-specific [formatting guides](../upload-guide/05-formatting-guidelines/)
- Review [Quick Start Guide](../upload-guide/04-quick-start.md) for step-by-step instructions

**Common Questions:**
- Q: Can I upload multiple languages for one problem?
  - A: Yes! Each language goes in its own language subdirectory
- Q: Which language should I start with?
  - A: Python for beginners, Java for corporate interviews, C++ for performance
- Q: Do all solutions need the same structure?
  - A: Yes, follow the template structure for consistency
- Q: Can I add a new language not listed?
  - A: See [Developer Guide](../developer-guide/README.md) for adding language support

---

[← Previous: Customizing Themes](06-customizing-themes.md) | [🏠 Home](README.md) | [Next: Language Examples →](08-language-examples.md)
