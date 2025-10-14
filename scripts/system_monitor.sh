#!/bin/bash
# System Health Monitor - Data Collection Script

# Get current timestamp
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# CPU Usage (1-minute average)
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)

# Memory Usage Percentage
MEMORY_USAGE=$(free | grep Mem | awk '{printf "%.1f", $3/$2 * 100.0}')

# Disk Usage Percentage for root partition
DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')

# Number of logged-in users
LOGGED_USERS=$(who | wc -l)

# Number of running processes
RUNNING_PROCESSES=$(ps aux | wc -l)

# System uptime
UPTIME=$(uptime -p)

# Create JSON output
cat > ../system_stats.json << EOL
{
  "timestamp": "$TIMESTAMP",
  "cpu_usage": "$CPU_USAGE",
  "memory_usage": "$MEMORY_USAGE",
  "disk_usage": "$DISK_USAGE",
  "logged_users": "$LOGGED_USERS",
  "running_processes": "$RUNNING_PROCESSES",
  "uptime": "$UPTIME"
}
EOL

# Also log to file with timestamp
mkdir -p ../logs
echo "[$TIMESTAMP] CPU: $CPU_USAGE% | Memory: $MEMORY_USAGE% | Disk: $DISK_USAGE% | Users: $LOGGED_USERS" >> ../logs/system_health.log

echo "System stats updated at $TIMESTAMP"
