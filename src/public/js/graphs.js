var oilCanvas = document.getElementById("oilChart");

var oilData = {
    labels: [
        "Sanos",
        "Enfermos"
    ],
    datasets: [
        {
            data: [95,5],
            backgroundColor: [
                "#63FF84",
                "#FF6384"
            ]
        }]
};

var pieChart = new Chart(oilCanvas, {
    type: 'pie',
    data: oilData
});