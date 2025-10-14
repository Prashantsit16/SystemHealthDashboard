# System Health Dashboard

A real-time Linux system monitoring dashboard that displays CPU, memory, disk, and user statistics.

## Features
  Real-time system metrics monitoring
  Beautiful web-based dashboard
  Dark/Light mode toggle
  Responsive design
  Automatic data refresh every 10 seconds

## Technologies Used
  HTML, CSS, JavaScript (Frontend)
  Node.js with Express (Backend)
  Bash scripting (Data collection)
  Linux system commands
  Git & GitHub

## Team Members
  Prashant Bajpai - Full-stack development & project setup
  Priti - Will work on frontend improvements
  Ashu Yadav - Will work on backend features  
  Shloka Patel - Will work on monitoring scripts
  Shrey Raj - Will work on testing
## Prerequisites
  WSL/Ubuntu with Node.js
  Git for version control

## Installation & Setup

### 1. Install Node.js
```bash
sudo apt update
sudo apt install nodejs npm -y
How to Run:
bash
# Terminal 1:
./scripts/start_monitor.sh

# Terminal 2:
cd backend && npm start

# Browser: http://localhost:3000

Features:
Real-time CPU, Memory, Disk monitoring

Live system statistics

Dark/Light mode

Automatic updates every 10 seconds
