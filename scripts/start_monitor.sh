#!/bin/bash
# Starter script for system monitoring

echo "Starting System Health Monitor..."
echo "Press Ctrl+C to stop"

# Make sure logs directory exists
mkdir -p logs

# Make monitor script executable
chmod +x scripts/system_monitor.sh

# Initial run
scripts/system_monitor.sh

# Run every 10 seconds
while true; do
    scripts/system_monitor.sh
    sleep 10
done
