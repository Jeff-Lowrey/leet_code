#!/bin/bash

# Leet Code Learning Tool Runner

echo "Starting Learning Web App for Leet Code problems..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -q --upgrade pip
pip install -q flask markdown pygments

# Run the Flask app
# Extract host and port from command line args or use defaults
HOST="127.0.0.1"
PORT="9501"

# Parse command line arguments
for arg in "$@"; do
    if [[ $arg == --host=* ]]; then
        HOST="${arg#*=}"
    elif [[ $arg == --port=* ]]; then
        PORT="${arg#*=}"
    fi
done

# Handle --host and --port as separate arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --host)
            HOST="$2"
            shift 2
            ;;
        --port)
            PORT="$2"
            shift 2
            ;;
        *)
            shift
            ;;
    esac
done

echo "Starting server at http://$HOST:$PORT"
python -m src.leet_code.app "$@"
