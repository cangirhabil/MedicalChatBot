"""
DEPRECATED: Flask app - This file is deprecated.
Use main.py with FastAPI instead.

This file is kept for reference and legacy compatibility.
"""

import warnings
warnings.warn(
    "app.py is deprecated. Use 'python main.py' or 'uvicorn main:app' to start the FastAPI server.",
    DeprecationWarning,
    stacklevel=2
)

if __name__ == "__main__":
    print("=" * 60)
    print("DEPRECATED: This Flask app has been replaced with FastAPI")
    print("Please use one of the following commands instead:")
    print("  python main.py")
    print("  uvicorn main:app --host 0.0.0.0 --port 8080 --reload")
    print("  ./start.sh")
    print("=" * 60)
