var totalEarnings = {
    plastic: 0,
    metal: 0,
    glass: 0
};

function showEarnings(type) {
    var earningsContainer = document.getElementById("earnings-container");
    var totalEarned = 0;
    switch (type) {
        case 'plastic':
            totalEarned = calculateEarnings(5);
            break;
        case 'metal':
            totalEarned = calculateEarnings(100);
            break;
        case 'glass':
            totalEarned = calculateEarnings(250);
            break;
    }
    totalEarnings[type] += totalEarned;
    displayEarnings(earningsContainer);
}

function calculateEarnings(rate) {
    var quantity = parseFloat(prompt("Enter the quantity recycled:", 0));
    return quantity * rate;
}

function displayEarnings(container) {
    container.innerHTML = '';
    for (var type in totalEarnings) {
        var div = document.createElement('div');
        div.classList.add('earnings-item');
        div.innerHTML = `<span>${type.charAt(0).toUpperCase() + type.slice(1)}:</span> KES ${totalEarnings[type].toFixed(2)}`;
        container.appendChild(div);
    }
    updateChart();
}

function dropOffWaste() {
    var wasteType = prompt("Select the type of waste (plastic, metal, or glass):").toLowerCase();
    if (wasteType === 'plastic' || wasteType === 'metal' || wasteType === 'glass') {
        totalEarnings[wasteType] += parseFloat(prompt("Enter the quantity recycled:", 0)) * (wasteType === 'plastic' ? 5 : (wasteType === 'metal' ? 100 : 250));
        displayEarnings(document.getElementById("earnings-container"));
    } else {
        alert("Invalid waste type!");
    }
}

// Initialize the chart
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Plastic', 'Metal', 'Glass'],
        datasets: [{
            label: 'Total Earnings',
            data: [0, 0, 0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function updateChart() {
    myChart.data.datasets[0].data = [totalEarnings['plastic'], totalEarnings['metal'], totalEarnings['glass']];
    myChart.update();
}
