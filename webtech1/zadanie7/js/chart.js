var eventData;
var chartData;
var chart;
var options = {title:'Vypísanie grafu sínusu a kosínusu',
     curveType: 'function',
     legend: { position: 'bottom' }};


google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);



if(typeof(EventSource) !== "undefined") {
    var source = new EventSource("http://vmzakova.fei.stuba.sk/sse/sse.php");

    source.addEventListener("message", function(e) {
        eventData = JSON.parse(e.data);
        /*document.getElementById("result").innerHTML = eventData.x + " " + eventData.y1 + "<br>"
                                                      + eventData.x + " " + eventData.y2;
                                                      */
        if(chartData){
          chartData.addRow([parseInt(eventData.x), parseFloat(eventData.y1), parseFloat(eventData.y2)]);
          chart.draw(chartData, options);
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
   google.visualization.events.addListener(chart, 'select', selectHandler);
   chart.draw(chartData, options);
 }

 function selectHandler() {
   var selectedItem = chart.getSelection()[0];
   var value = data.getValue(selectedItem.row, 0);
   alert('The user selected ' + value);
 }
