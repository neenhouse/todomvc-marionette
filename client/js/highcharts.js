
var HighCharts = (function(){
	var containerTarget = $("#highcharts-container"),
		_type = "pie", _data;

	function renderGraph(type, data){
		if(data.totalCount)
		_type = type || _type || "pie";
		_data = data || _data;
		if(_type == "bar"){
			renderBarChart();
		} else if(_type == "pie") {
			renderPieChart();
		} else {
			throw "chart type not supported"
		}

	}

	function renderBarChart(){
		// bar
		containerTarget.highcharts({
	        chart: {
	            type: _type
	        },
	        title: {
	            text: 'Active vs Completed'
	        },
	        xAxis: {
	            categories: ['Active', 'Completed']
	        },
	        yAxis: {
	            title: {
	                text: 'Oustanding Tasks'
	            }
	        },
	        series: [{
	            name: 'You',
	            data: [_data.activeCount, _data.completedCount]
	        }]
	    });
	}

	function renderPieChart(){
		//pie
		console.log("render pie");
		containerTarget.highcharts({
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false
	        },
	        title: {
	            text: 'Active vs Completed'
	        },
	        tooltip: {
	            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                    style: {
	                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	                    }
	                }
	            }
	        },
	        series: [{
	            type: 'pie',
	            name: 'Active vs Completed',
	            data: [
	                ['Active',   _data.activeCount / _data.totalCount ],
	                ['Completed', _data.completedCount / _data.totalCount]
	            ]
	        }]
		});
	}

	return {
		renderGraph:renderGraph
	}
})();