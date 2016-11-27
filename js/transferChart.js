



    var alphaAdjustment1 = 0.2;
    var alphaAdjustment2 = 0.4;
    var alphaAdjustment3 = 0.6;
    var alphaAdjustment4 =0.8;
    var alphaAdjustment5 = 1.0;
    var newAlphaAdj = 0;
    var json = {};
    var data1, data2, data3, data4, data5;
    var chartJQ;
function initTransferChart() {
  var title = {
    style: {
      color: '#cccccc'
    },
    text: 'Transfer Function'
  };

  var subtitle = {
    style: {
      color: '#cccccc'
    },
            text: 'Opacity',
  align:  'left'  ,
 };





  var xAxis = {
    title: {
      style: {
        color: '#cccccc'
      },
      text: 'Intensity'
    },
    labels: {
      style: {
        color: '#cccccc'
      }
    },tickInterval: 0.05


  };

  var yAxis = {
    title: 'opactiy',
type: 'linear',
    max: 1.0,
    labels: {
      style: {
        color: '#cccccc'
      }
    }

  };

  var tooltip = {
    formatter: function() {
return '<b>' + 'Opacity: ' + Highcharts.numberFormat(this.point.y, 2) + '</b>' ;
}
  };



  var chart = {
    type: 'spline',
    marginLeft: 5,
    marginTop: 35,
    plotBackgroundColor: '#484948',
    backgroundColor: '#000000',
    style: {
      color: '#cccccc'
    },
  };

   var credits =  {
     enabled: false
 };

 var legend = {
   enabled: false
 };



 var plotOptions = {
   series: {
     animation: false,
     dragMinY: 0,
     dragMaxY: 1.0,
    dragHandleStroke: '#484948',
     dragHandleFill: '#cccccc',
     point: {
       events: {
         drag: function (e) {
           newAlphaAdj = 1-Math.pow(1-e.y,5);
              if(e.x < 0.2){
                    guiControls.alphaAdjustmentFactor1 = newAlphaAdj;
                    $('#opacity1').val(newAlphaAdj);
                    opacitySlider1.slider('value', newAlphaAdj);
                  }else if (e.x< 0.4) {
                    guiControls.alphaAdjustmentFactor2 = newAlphaAdj;
                    $('#opacity2').val(newAlphaAdj);
                    opacitySlider2.slider('value', newAlphaAdj);

                  } else if(e.x < 0.6){
                  guiControls.alphaAdjustmentFactor3 = newAlphaAdj;
                  $('#opacity3').val(newAlphaAdj);
                  opacitySlider3.slider('value', newAlphaAdj);
                }else if(e.x < 0.8){
                  guiControls.alphaAdjustmentFactor5 = newAlphaAdj;
                  $('#opacity4').val(newAlphaAdj);
                  opacitySlider4.slider('value', newAlphaAdj);
                }else{

                 guiControls.alphaAdjustmentFactor5 = newAlphaAdj;
                 $('#opacity5').val(newAlphaAdj);
                  opacitySlider5.slider('value', newAlphaAdj);
            }

          },
          drop: function(e){
            updateData();
          }

         }
       }
     }
   };




           json.title = title;
           json.xAxis = xAxis;
           json.yAxis = yAxis;
           json.tooltip = tooltip;
           json.credits = credits;
           json.chart = chart;
           json.legend = legend;
           json.plotOptions = plotOptions;
           json.subtitle = subtitle;
}


function updateData(){
  data1=[
    {y: 0.0, x: 0.0, color: guiControls.color1},
    {y: 0.01020621831301*guiControls.alphaAdjustmentFactor1, x: 0.05, color: guiControls.color1},
    {y: 0.02085163763902*guiControls.alphaAdjustmentFactor1, x: 0.1, color: guiControls.color1},
    {y: 0.03198121499751*guiControls.alphaAdjustmentFactor1, x: 0.15, color: guiControls.color1},
    {y: 0.04364750020996*guiControls.alphaAdjustmentFactor1, x: 0.2, color: guiControls.color1}
  ];
  data2 = [
    {y: 0.04364750020996*guiControls.alphaAdjustmentFactor2, x:0.20, color: guiControls.color2},
    {y: 0.05591248870509*guiControls.alphaAdjustmentFactor2, x:0.25, color: guiControls.color2},
    {y: 0.06885008490516*guiControls.alphaAdjustmentFactor2, x:0.30, color: guiControls.color2},
    {y: 0.08254943738950*guiControls.alphaAdjustmentFactor2, x:0.35, color: guiControls.color2},
    {y: 0.09711954855256*guiControls.alphaAdjustmentFactor2, x:0.4, color: guiControls.color2}
  ];
  data3 = [
    {y: 0.09711954855256*guiControls.alphaAdjustmentFactor3, x:0.4, color: guiControls.color3},
    {y: 0.11269579863367*guiControls.alphaAdjustmentFactor3, x:0.45, color: guiControls.color3},
    {y: 0.129449436703875*guiControls.alphaAdjustmentFactor3, x:0.50, color: guiControls.color3},
    {y: 0.147601841596174*guiControls.alphaAdjustmentFactor3, x:0.55, color: guiControls.color3},
    {y: 0.167446792598126*guiControls.alphaAdjustmentFactor3, x:0.6, color: guiControls.color3}
  ];
  data4 = [
    {y:  0.167446792598126*guiControls.alphaAdjustmentFactor4, x:0.6, color: guiControls.color4},
    {y: 0.189386917*guiControls.alphaAdjustmentFactor4, x:0.65, color: guiControls.color4},
    {y: 0.213996914*guiControls.alphaAdjustmentFactor4, x:0.70, color: guiControls.color4},
    {y: 0.242141717*guiControls.alphaAdjustmentFactor4, x:0.75, color: guiControls.color4},
    {y: 0.275220336*guiControls.alphaAdjustmentFactor4, x:0.8, color: guiControls.color4}
  ];
  data5 = [
    {y:  0.275220336*guiControls.alphaAdjustmentFactor5, x:0.8, color: guiControls.color5},
    {y: 0.315744571*guiControls.alphaAdjustmentFactor5, x:0.85, color: guiControls.color5},
    {y: 0.369042656*guiControls.alphaAdjustmentFactor5, x:0.90, color: guiControls.color5},
    {y: 0.450719728*guiControls.alphaAdjustmentFactor5, x:0.95, color: guiControls.color5},
    {y: 1.0*guiControls.alphaAdjustmentFactor5, x:1.0, color: guiControls.color5}
  ];

  var series = [

      {name: "test1",
      data: data1,
      marker: {enabled: false},
      color: guiControls.color1,
      lineWidth: 4
    },
      {name: "test2",
      data: data2,
      marker: {enabled: false},
      color: guiControls.color2,
      lineWidth: 4
    },
    {name: "test3",
    data: data3,
    marker: {enabled: false},
    color: guiControls.color3,
    lineWidth: 4
  },
  {name: "test4",
  data: data4,
  marker: {enabled: false},
  color: guiControls.color4,
  lineWidth: 4
},
{name: "test5",
data: data5,
marker: {enabled: false},
color: guiControls.color5,
lineWidth: 4
}
  ];

  json.series = series;
  $('#tfContainer').highcharts(json);
  chartJQ = $('#tfContainer').highcharts();
}












initTransferChart();
updateData();














function initChart(){
  colorArray = [guiControls.color1, guiControls.color2, guiControls.color3, guiControls.color4, guiControls.color5];
for (var i = 0; i < 5; i++) {
  chartJQ.series[0].update({
      color: colorArray[i]
    });
}
}

function updatePlotlines() {
  chartJQ.xAxis[0].removePlotBand('1');
  chartJQ.xAxis[0].removePlotBand('2');

  chartJQ.xAxis[0].addPlotBand({
    color:  'rgba(40, 40, 40, 0.86)',
    from: -0.5,
    to:(rangeMin*5)-0.5,
    id: '1',
    zIndex: 5
  });
    chartJQ.xAxis[0].addPlotBand({
      color: 'rgba(40, 40, 40, 0.86)',
      from: (rangeMax*5-0.5),
      to:4.5,
      id: '2',
        zIndex: 5
    });



};
