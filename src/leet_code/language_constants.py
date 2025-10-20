"""Language constants for multi-language support."""

from pygments.lexers import (
    CLexer,
    CppLexer,
    CSharpLexer,
    GoLexer,
    JavaLexer,
    JavascriptLexer,
    PythonLexer,
    RustLexer,
    SwiftLexer,
    TypeScriptLexer,
    get_lexer_by_name,
)

# Map programming languages to file extensions
LANGUAGE_EXTENSIONS = {
    "Python": ".py",
    "Java": ".java",
    "C++": ".cpp",
    "C": ".c",
    "JavaScript": ".js",
    "TypeScript": ".ts",
    "Go": ".go",
    "Rust": ".rs",
    "C#": ".cs",
    "Swift": ".swift",
    "Kotlin": ".kt",
    "Ruby": ".rb",
    "PHP": ".php",
    "Scala": ".scala",
    "Lua": ".lua",
    "Perl": ".pl",
    "R": ".r",
    "Julia": ".jl",
    "Clojure": ".clj",
    "Haskell": ".hs",
    "Elixir": ".ex",
    "OCaml": ".ml",
    "Scheme": ".scm",
    "Lisp": ".lisp",
    "VB.NET": ".vb",
    "F#": ".fs",
    "Bash": ".sh",
    "Zsh": ".zsh",
    "Fish": ".fish",
    "PowerShell": ".ps1",
    "Batch": ".bat",
}

# Map file extensions to programming languages
EXTENSION_TO_LANGUAGE = {
    ".js": "JavaScript",
    ".java": "Java",
    ".cpp": "C++",
    ".c": "C",
    ".ts": "TypeScript",
    ".go": "Go",
    ".rs": "Rust",
    ".cs": "C#",
    ".swift": "Swift",
    ".kt": "Kotlin",
    ".rb": "Ruby",
    ".php": "PHP",
    ".scala": "Scala",
    ".lua": "Lua",
    ".pl": "Perl",
    ".r": "R",
    ".jl": "Julia",
    ".clj": "Clojure",
    ".hs": "Haskell",
    ".ex": "Elixir",
    ".ml": "OCaml",
    ".scm": "Scheme",
    ".lisp": "Lisp",
    ".vb": "VB.NET",
    ".fs": "F#",
    ".sh": "Bash",
    ".bash": "Bash",
    ".zsh": "Zsh",
    ".fish": "Fish",
    ".ps1": "PowerShell",
    ".bat": "Batch",
}

# Map programming languages to Pygments lexers
LANGUAGE_LEXERS = {
    "Python": PythonLexer(),
    "Java": JavaLexer(),
    "C++": CppLexer(),
    "C": CLexer(),
    "JavaScript": JavascriptLexer(),
    "TypeScript": TypeScriptLexer(),
    "Go": GoLexer(),
    "Rust": RustLexer(),
    "C#": CSharpLexer(),
    "Swift": SwiftLexer(),
}


def get_file_extension(language: str) -> str:
    """Get file extension for a programming language.

    Args:
        language: Programming language name

    Returns:
        File extension including the dot (e.g., '.py')
    """
    return LANGUAGE_EXTENSIONS.get(language, ".txt")


def get_language_from_extension(extension: str) -> str | None:
    """Get programming language from file extension.

    Args:
        extension: File extension including the dot (e.g., '.py')

    Returns:
        Programming language name or None if not found
    """
    return EXTENSION_TO_LANGUAGE.get(extension.lower())


def get_lexer_for_language(language: str) -> object:
    """Get Pygments lexer for a programming language.

    Args:
        language: Programming language name

    Returns:
        Pygments lexer instance
    """
    return LANGUAGE_LEXERS.get(language, get_lexer_by_name(language.lower()))
