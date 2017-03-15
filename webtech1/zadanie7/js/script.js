var eventData;
var chartData;
var chart;
var source;
var options = {
    title: 'Vypísanie grafu sínusu a kosínusu',
    actions: ['dragToZoom', 'rightClickToReset'],
    curveType: 'function',
    legend: {
        position: 'bottom'
    },
    explorer: {
        axis: 'horizontal',
        keepInBounds: true,
        maxZoomIn: 6.0,
        maxZoomOut: 4.0,
    }
};
var sin = true;
var cos = true;
var listen = true;


google.charts.load('current', {
    'packages': ['corechart']
});
google.charts.setOnLoadCallback(drawChart);



if (typeof(EventSource) !== "undefined") {
    var source = new EventSource("http://vmzakova.fei.stuba.sk/sse/sse.php");

    source.addEventListener("message", function(e) {
        eventData = JSON.parse(e.data);
        /*document.getElementById("result").innerHTML = eventData.x + " " + eventData.y1 + "<br>"
                                                      + eventData.x + " " + eventData.y2;
                                                      */
        chartData.addRow([parseInt(eventData.x), parseFloat(eventData.y1), parseFloat(eventData.y2)]);
        view = new google.visualization.DataView(chartData);

        chart.draw(chartData, options);
        if (!sin) {
            view.hideColumns([1]);
        }
        if (!cos) {
            view.hideColumns([2]);
        }
        chart.draw(view, options);
        if (!listen) {
            this.removeEventListener("message", arguments.callee);
        }


    }, false);

} else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";
}



function drawChart() {

    // Create our data table.
    chartData = new google.visualization.DataTable();
    chartData.addColumn('number', 'X');
    chartData.addColumn('number', 'Sínus');
    chartData.addColumn('number', 'Kosínus');

    // Instantiate and draw our chart, passing in some options.
    chart = new google.visualization.LineChart(document.getElementById('chart'));
    view = new google.visualization.DataView(chartData);

    google.visualization.events.addListener(chart, 'select', selectHandler);
    chart.draw(chartData, options);
    if (!sin) {
        view.hideColumns([1]);
        chart.draw(view, options);
    } else {
        chart.draw(view, options);
    }
    if (!cos) {
        view.hideColumns([2]);
        chart.draw(view, options);
    } else {
        chart.draw(view, options);
    }

}

function selectHandler() {
    var selectedItem = chart.getSelection()[0];
    var value = data.getValue(selectedItem.row, 0);
    alert('The user selected ' + value);
}

function handleClickX(cb) {
    view = new google.visualization.DataView(chartData);
    if (!cb.checked) {
        view.hideColumns([1]);
        sin = false;
    } else {
        sin = true;
    }
    chart.draw(chartData, options);
    chart.draw(view, options);

}

function handleClickY(cb) {
    view = new google.visualization.DataView(chartData);
    if (!cb.checked) {
        view.hideColumns([2]);
        cos = false;
    } else {
        cos = true;
    }
    chart.draw(chartData, options);
    chart.draw(view, options);
}

var stopBtn = document.getElementById("stop");
stopBtn.onclick = function() {
    listen = false;
    console.log("remove");

}
