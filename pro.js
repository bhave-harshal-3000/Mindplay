
document.addEventListener("DOMContentLoaded", () => {
    loadLatestScore();
    initializeChart();
});

function loadLatestScore() {
    fetch('http://localhost:5500/api/scores')
        .then(response => response.json())
        .then(scores => {
            // Update progress bar for problem-solving
            const problemSolvingBar = document.getElementById('problem-solvingBar');
            if (problemSolvingBar) {
                problemSolvingBar.style.width = `${scores.problemSolving || 0}%`;
            } else {
                console.error("Error: problem-solvingBar element not found.");
            }

            // Update LPI Score (Only considering problem-solving now)
            const lpiScore = document.getElementById('lpiScore');
            if (lpiScore) {
                lpiScore.textContent = Math.round(scores.problemSolving || 0);
            } else {
                console.error("Error: lpiScore element not found.");
            }
        })
        .catch(error => console.error('Error:', error));
}

// Initialize only problem-solving chart
function initializeChart() {
    fetch('http://localhost:5500/api/chart-data/problem-solving')
        .then(response => response.json())
        .then(data => createChart(data))
        .catch(error => {
            console.error('Error loading problem-solving chart:', error);
            createChart({ labels: [], scores: [] }); // Initialize empty chart
        });
}

function createChart(chartData) {
    const ctx = document.getElementById('problemSolvingChart');
    
    if (!ctx) {
        console.error('Canvas element not found for problem-solving chart');
        return;
    }

    // Destroy existing chart if it exists
    if (ctx.chart) ctx.chart.destroy();

    ctx.chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: chartData.labels || chartData.map((_, i) => `Play ${i + 1}`),
            datasets: [{
                data: chartData.scores || chartData.map(d => d.score),
                borderColor: "#6C5CE7",
                borderWidth: 2,
                fill: false,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: { 
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (context) => `Score: ${context.parsed.y}%`
                    }
                }
            },
            scales: {
                x: {
                    title: { 
                        display: true, 
                        text: 'Game Attempts',
                        color: '#666'
                    }
                },
                y: {
                    min: 0,
                    max: 100,
                    title: { 
                        display: true, 
                        text: 'Problem-Solving Score',
                        color: '#666'
                    },
                    ticks: { callback: (value) => `${value}%` }
                }
            }
        }
    });
}

