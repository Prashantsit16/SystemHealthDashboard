class SystemDashboard {
    constructor() {
        this.stats = {};
        this.init();
    }

    init() {
        this.loadDarkModePreference();
        this.setupEventListeners();
        this.startAutoRefresh();
        this.updateStats(); // Initial load
    }

    setupEventListeners() {
        // Dark mode toggle
        document.getElementById('darkModeToggle').addEventListener('click', () => {
            this.toggleDarkMode();
        });

        // Manual refresh
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.updateStats();
        });
    }

    toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        // Update button text
        const button = document.getElementById('darkModeToggle');
        button.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
    }

    loadDarkModePreference() {
        const darkMode = localStorage.getItem('darkMode') === 'true';
        if (darkMode) {
            document.body.classList.add('dark-mode');
            document.getElementById('darkModeToggle').textContent = '☀️ Light Mode';
        }
    }

    async updateStats() {
        try {
            const response = await fetch('/api/system-stats');
            this.stats = await response.json();
            this.updateDashboard();
        } catch (error) {
            console.error('Error fetching system stats:', error);
            this.showError('Unable to fetch system statistics');
        }
    }

    updateDashboard() {
        // Update CPU
        document.getElementById('cpu-usage').textContent = `${this.stats.cpu_usage}%`;
        document.getElementById('cpu-progress').style.width = `${this.stats.cpu_usage}%`;

        // Update Memory
        document.getElementById('memory-usage').textContent = `${this.stats.memory_usage}%`;
        document.getElementById('memory-progress').style.width = `${this.stats.memory_usage}%`;

        // Update Disk
        document.getElementById('disk-usage').textContent = `${this.stats.disk_usage}%`;
        document.getElementById('disk-progress').style.width = `${this.stats.disk_usage}%`;

        // Update Users & Processes
        document.getElementById('logged-users').textContent = this.stats.logged_users;
        document.getElementById('running-processes').textContent = this.stats.running_processes;
        document.getElementById('system-uptime').textContent = this.stats.uptime;

        // Update timestamps
        const now = new Date().toLocaleTimeString();
        document.getElementById('last-update-time').textContent = now;
        
        // Update all "last updated" indicators
        document.querySelectorAll('.last-updated').forEach(el => {
            el.textContent = 'Just now';
        });

        // Color coding based on usage levels
        this.colorCodeMetrics();
    }

    colorCodeMetrics() {
        this.colorCodeMetric('cpu-usage', this.stats.cpu_usage, 80, 90);
        this.colorCodeMetric('memory-usage', this.stats.memory_usage, 80, 90);
        this.colorCodeMetric('disk-usage', this.stats.disk_usage, 80, 90);
    }

    colorCodeMetric(elementId, value, warningThreshold, dangerThreshold) {
        const element = document.getElementById(elementId);
        element.className = 'stat-value';
        
        if (value >= dangerThreshold) {
            element.classList.add('danger');
        } else if (value >= warningThreshold) {
            element.classList.add('warning');
        } else {
            element.classList.add('safe');
        }
    }

    showError(message) {
        // Simple error display - you can enhance this
        console.error(message);
        alert(`Error: ${message}`);
    }

    startAutoRefresh() {
        // Update every 5 seconds
        setInterval(() => {
            this.updateStats();
        }, 5000);
    }
}

// Add CSS for color coding
const style = document.createElement('style');
style.textContent = `
    .stat-value.safe { color: #27ae60; }
    .stat-value.warning { color: #f39c12; }
    .stat-value.danger { color: #e74c3c; }
    .dark-mode .stat-value.safe { color: #2ecc71; }
    .dark-mode .stat-value.warning { color: #f1c40f; }
    .dark-mode .stat-value.danger { color: #e74c3c; }
`;
document.head.appendChild(style);

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', () => {
    new SystemDashboard();
});
