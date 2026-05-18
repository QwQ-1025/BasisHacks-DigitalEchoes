// ============================================
// Digital Echoes — Privacy Pulse Dashboard
// Interactive data visualization and scoring
// ============================================

// State
var selectedHabits = [];

// Chart instances (for updating)
var trailChart, collectorChart, breachChart;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  buildHabitGrid();
  buildTrackerList();
  initCharts();
});

// Build habit checkboxes from data
function buildHabitGrid() {
  var grid = document.getElementById('habitGrid');
  habitCategories.forEach(function(habit) {
    var div = document.createElement('div');
    div.className = 'habit-item';
    div.innerHTML = '<input type="checkbox" id="' + habit.id + '" value="' + habit.id + '" onchange="toggleHabit(\'' + habit.id + '\')">' +
      '<label for="' + habit.id + '">' + habit.icon + ' ' + habit.name + '</label>';
    grid.appendChild(div);
  });
}

// Toggle a habit on/off
function toggleHabit(id) {
  var idx = selectedHabits.indexOf(id);
  if (idx === -1) {
    selectedHabits.push(id);
  } else {
    selectedHabits.splice(idx, 1);
  }
}

// Calculate total data points from selected habits
function calculateTotalDataPoints() {
  var total = 0;
  // Use filter to traverse the habit list and sum matching data points
  // FILTER: selecting only habits the user has checked
  var selectedData = habitCategories.filter(function(habit) {
    return selectedHabits.indexOf(habit.id) !== -1;
  });
  // Then use map to extract just the dataPoints values
  var pointValues = selectedData.map(function(habit) {
    return habit.dataPoints;
  });
  // Reduce to sum them up
  if (pointValues.length > 0) {
    total = pointValues.reduce(function(acc, val) { return acc + val; }, 0);
  }
  return total;
}

// Calculate privacy score (0-100, higher = more exposed / worse privacy)
function calculatePrivacyScore(totalDataPoints) {
  var maxPoints = 4290; // Sum of all habit dataPoints
  if (maxPoints === 0) return 0;
  var rawScore = Math.round((totalDataPoints / maxPoints) * 100);
  return Math.min(rawScore, 100);
}

// Get score interpretation
function getScoreLabel(score) {
  if (score === 0) return { text: "No data — select habits above", color: "#8b949e" };
  if (score < 25) return { text: "Low Exposure — your footprint is minimal", color: "#39ff14" };
  if (score < 50) return { text: "Moderate Exposure — you're leaving a trail", color: "#e3b341" };
  if (score < 75) return { text: "High Exposure — data brokers know you well", color: "#ff7b42" };
  return { text: "Critical Exposure — you're tracked everywhere", color: "#ff4757" };
}

// Update all dashboard components
function updateAll() {
  var totalPoints = calculateTotalDataPoints();
  var score = calculatePrivacyScore(totalPoints);
  var scoreInfo = getScoreLabel(score);

  // Update score circle
  var circle = document.getElementById('scoreCircle');
  circle.textContent = score;
  circle.style.borderColor = scoreInfo.color;
  circle.style.boxShadow = '0 0 20px ' + scoreInfo.color + '40';
  circle.style.color = scoreInfo.color;

  // Update score label
  document.getElementById('scoreLabel').textContent = scoreInfo.text;
  document.getElementById('scoreLabel').style.color = scoreInfo.color;

  // Update score meter
  var meter = document.getElementById('scoreMeter');
  meter.style.width = score + '%';
  if (score < 25) meter.style.background = '#39ff14';
  else if (score < 50) meter.style.background = '#e3b341';
  else if (score < 75) meter.style.background = '#ff7b42';
  else meter.style.background = '#ff4757';

  // Update charts
  updateTrailChart(selectedHabits);
  updateCollectorChart(totalPoints);
}

// Create estimated daily data trail chart
function estimateTrailData(selectedIds) {
  // Use filter to get only selected habits, then build chart data
  var filtered = habitCategories.filter(function(h) {
    return selectedIds.indexOf(h.id) !== -1;
  });
  return {
    labels: filtered.map(function(h) { return h.name.split(' ')[0]; }),
    data: filtered.map(function(h) { return h.dataPoints; })
  };
}

// Initialize all Chart.js charts
function initCharts() {
  var trailCtx = document.getElementById('trailChart').getContext('2d');
  trailChart = new Chart(trailCtx, {
    type: 'bar',
    data: { labels: [], datasets: [{ label: 'Data Points/Day', data: [], backgroundColor: 'rgba(88,166,255,0.6)', borderColor: '#58a6ff', borderWidth: 1 }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#8b949e' } } },
      scales: { x: { ticks: { color: '#8b949e' }, grid: { color: '#21262d' } }, y: { ticks: { color: '#8b949e' }, grid: { color: '#21262d' } } }
    }
  });

  var collectorCtx = document.getElementById('collectorChart').getContext('2d');
  collectorChart = new Chart(collectorCtx, {
    type: 'doughnut',
    data: { labels: ['Advertisers', 'Data Brokers', 'Platforms', 'ISPs'], datasets: [{ data: [45, 30, 18, 7], backgroundColor: ['#ff4757', '#ff7b42', '#58a6ff', '#8b949e'], borderWidth: 0 }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { color: '#8b949e', padding: 16 } } }
    }
  });

  var breachCtx = document.getElementById('breachChart').getContext('2d');
  breachChart = new Chart(breachCtx, {
    type: 'bar',
    data: {
      labels: breachData.map(function(b) { return b.year + ' (' + b.company + ')'; }),
      datasets: [{ label: 'Records Exposed (Millions)', data: breachData.map(function(b) { return b.records; }), backgroundColor: function(ctx) { return ctx.raw > 1000 ? 'rgba(255,71,87,0.7)' : 'rgba(255,138,76,0.5)'; }, borderColor: '#ff4757', borderWidth: 1 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#8b949e' } } },
      scales: { x: { ticks: { color: '#8b949e', maxRotation: 90, font: { size: 9 } }, grid: { color: '#21262d' } }, y: { ticks: { color: '#8b949e' }, grid: { color: '#21262d' }, type: 'logarithmic' } }
    }
  });
}

// Update trail chart based on selected habits
function updateTrailChart(selectedIds) {
  var trailEstimate = estimateTrailData(selectedIds);
  trailChart.data.labels = trailEstimate.labels;
  trailChart.data.datasets[0].data = trailEstimate.data;
  trailChart.update();
}

// Update collector chart based on total exposure
function updateCollectorChart(totalPoints) {
  var maxPoints = 4290;
  var ratio = maxPoints > 0 ? totalPoints / maxPoints : 0;
  collectorChart.data.datasets[0].data = [
    Math.round(45 * (1 + ratio)),
    Math.round(30 * (1 + ratio)),
    Math.round(18 * (1 + ratio)),
    Math.round(7 * (1 + ratio))
  ];
  collectorChart.update();
}

// Build tracker list from data
function buildTrackerList() {
  var list = document.getElementById('trackerList');
  // Use map to transform trackerData into HTML elements
  trackerData.map(function(item) {
    var div = document.createElement('div');
    div.className = 'tracker-item';
    div.innerHTML = '<span class="tracker-name">' + item.category + '</span><span class="tracker-count">' + item.trackers + ' trackers avg</span>';
    list.appendChild(div);
  });
}
