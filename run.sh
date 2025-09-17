#!/bin/bash

# LeetCode Web App Runner

echo "Starting LeetCode Solutions Web App..."

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
echo "Starting server at http://localhost:5000"
python app.py