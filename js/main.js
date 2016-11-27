if(!Detector.webgl){
  Detector.addGetWebGLMessage();
}

var stats, container, camera, sceneFirstPass, mainScene, renderer, rangeSlider,  rangeMinOld, rangeMaxOld, rangeMinStart, rangeMaxStart, rangeDiffMin;
var rangeMinOld = 0.0;
var rangeMaxOld = 1.0;

var rtTexture, transferTexture;
var oldMinimun, oldMaximum;
var cubeTexture;
var guiControls;
var screenshot = false;
  var snapshotURL;
var image = new Image();
var  image2 = new Image();
var  image3 = new Image();
var  image4 = new Image();
var image5 = new Image();
var g1Low, g1High, g2Low, g2High, g3Low, g3High, g4Low, g4High, g5Low, g5High;
var initial = true;
var newLow;
var sliderMin = 0.0;
var sliderMax= 1.0;
rangeSlider = $('#rangeSlider');
var colorChanger1 = $('#colorChanger1');
var opacitySlider1 = $('#opacitySlider1');
var opacitySlider2 = $('#opacitySlider2');
var opacitySlider3 = $('#opacitySlider3');
var opacitySlider4 = $('#opacitySlider4');
var opacitySlider5 = $('#opacitySlider5');
var transferChartShow = false;
var data7 = [];


rangeMin = 0;
rangeMax = 1;

var materialSecond;
init();
animate();




function init(){
  oldMinimun = 0.0;
  oldMaximum = 1.0;
  $('#introStart').click(function () {
    $('#intro').fadeOut('slow');
    if(initial)
     {
       guiControls.initZoom();
folder2.open();
     }
  //   initChart();
     initial = false;
  });


  //GUI
  guiControls =  new function() {
    this.steps = 512.0;
    this.alphaCorrection = 1.0;
    this.range = 0.2;
    this.color1 = "#00FA58";
    this.alphaAdjustmentFactor1 = 1.0;
    this.stepPos1 = 0.2;
    this.graphicPos1 = 0.2;
    this.color2 = "#eb079d";
    this.alphaAdjustmentFactor2 = 1.0;
    this.stepPos2 = 0.4;
    this.graphicPos2 = 0.4;
    this.color3 = "#fafea6";
    this.alphaAdjustmentFactor3 = 1.0;
    this.stepPos3 = 0.6;
    this.graphicPos3 = 0.6;
    this.color4 = "#3466fe";
    this.alphaAdjustmentFactor4 = 1.0;
    this.stepPos4 = 0.8;
    this.graphicPos4 = 0.8;
    this.color5 = "#75f4d6";
    this.alphaAdjustmentFactor5 = 1.0;
    this.stepPos5 = 1.0;
    this.graphicPos5 = 1.0;
    this.lowThreshold1 = rangeMin;
    this.highThreshold1 = rangeMax;

    this.applyTransferFunc = true;






  this.update = function(){
    screenshot = true;
    //
     updateTransferFunction();
     //updateTransferFuncTex();

   materialSecond.uniforms.lowThreshold1.value =   rangeMinOld;
    materialSecond.uniforms.highThreshold1.value = rangeMinOld + this.range;
    renderer.render(sceneSecondPass, camera);
    image.src = renderer.domElement.toDataURL("image/png");
     $('#preview1').children('.previewImg').html(image);


    materialSecond.uniforms.lowThreshold1.value =  rangeMinOld + this.range;
    materialSecond.uniforms.highThreshold1.value =  rangeMinOld + 2.0*this.range;
    renderer.render(sceneSecondPass, camera);
    image2.src = renderer.domElement.toDataURL("image/png");
    $('#preview2').children('.previewImg').html(image2);

    materialSecond.uniforms.lowThreshold1.value =  rangeMinOld + 2.0*this.range;
  materialSecond.uniforms.highThreshold1.value =  rangeMinOld + 3.0*this.range;
    renderer.render(sceneSecondPass, camera);
    image3.src = renderer.domElement.toDataURL("image/png");
    $('#preview3').children('.previewImg').html(image3);

    materialSecond.uniforms.lowThreshold1.value =  rangeMinOld + 3.0*this.range;
    materialSecond.uniforms.highThreshold1.value =  rangeMinOld + 4.0*this.range;
    renderer.render(sceneSecondPass, camera);
    image4.src = renderer.domElement.toDataURL("image/png");
    $('#preview4').children('.previewImg').html(image4);

    materialSecond.uniforms.lowThreshold1.value =  rangeMinOld + 4.0*this.range;
    materialSecond.uniforms.highThreshold1.value = rangeMaxOld;
    renderer.render(sceneSecondPass, camera);
   image5.src = renderer.domElement.toDataURL("image/png");
    $('#preview5').children('.previewImg').html(image5);


  };

      this.zoom = function(){

        oldMinimun = rangeSlider.slider('option', 'min');
        oldMaximum = rangeSlider.slider('option', 'max');
        screenshot = true;
        this.range = (rangeMax - rangeMin)/5.0;
         materialSecond.uniforms.range.value = this.range;

        updateTransferFunction();
        updateTransferFuncTex();

       materialSecond.uniforms.lowThreshold1.value =   rangeMin;
       g1Low = rangeMin;
        materialSecond.uniforms.highThreshold1.value = rangeMin + this.range;
        g1High = rangeMin + this.range;
        renderer.render(sceneSecondPass, camera);
        image.src = renderer.domElement.toDataURL("image/png");
         $('#preview1').children('.previewImg').html(image);


        materialSecond.uniforms.lowThreshold1.value =  rangeMin + this.range;
        g2Low = rangeMin + this.range;
        materialSecond.uniforms.highThreshold1.value =  rangeMin + 2.0*this.range;
        g2High = rangeMin + 2.0*this.range;
        renderer.render(sceneSecondPass, camera);
        image2.src = renderer.domElement.toDataURL("image/png");
        $('#preview2').children('.previewImg').html(image2);

        materialSecond.uniforms.lowThreshold1.value =  rangeMin + 2.0*this.range;
        g3Low = rangeMin + 2.0*this.range;
        materialSecond.uniforms.highThreshold1.value =  rangeMin + 3.0*this.range;
        g3High = rangeMin + 3.0*this.range;
        renderer.render(sceneSecondPass, camera);
        image3.src = renderer.domElement.toDataURL("image/png");
        $('#preview3').children('.previewImg').html(image3);

        materialSecond.uniforms.lowThreshold1.value =  rangeMin + 3.0*this.range;
        g4Low = rangeMin + 3.0*this.range;
        materialSecond.uniforms.highThreshold1.value =  rangeMin + 4.0*this.range;
        g4High = rangeMin + 4.0*this.range;
        renderer.render(sceneSecondPass, camera);
        image4.src = renderer.domElement.toDataURL("image/png");
        $('#preview4').children('.previewImg').html(image4);

        materialSecond.uniforms.lowThreshold1.value =  rangeMin + 4.0*this.range;
        g5Low = rangeMin + 4.0*this.range;
        materialSecond.uniforms.highThreshold1.value = rangeMax;
        g5High = rangeMax;
        renderer.render(sceneSecondPass, camera);
       image5.src = renderer.domElement.toDataURL("image/png");
        $('#preview5').children('.previewImg').html(image5);

        rangeSlider.slider('option', 'min', rangeMin);
        rangeSlider.slider('option', 'max', rangeMax);
        rangeSlider.slider('option', 'values', [rangeMin, rangeMax]);





           rangeMinOld = rangeMin;
          rangeMaxOld = rangeMax;
        materialSecond.uniforms.rangeMin.value =rangeMin;
       updateTransferGraphic();
        guiControls.update();
        sliderMin = 0.0;
        if(rangeMin > 0.0 || rangeMax < 1.0){
        $(folder2.domElement).attr("hidden", true);
}
      };

      this.initZoom = function(){

        screenshot = true;
        this.range = (rangeMax - rangeMin)/5.0;

        updateTransferFunction();
        updateTransferFuncTex();


       materialSecond.uniforms.lowThreshold1.value =   rangeMin;
       g1Low = rangeMin;
        materialSecond.uniforms.highThreshold1.value = rangeMin + this.range;
        g1High = rangeMin + this.range;
        renderer.render(sceneSecondPass, camera);
        image.src = renderer.domElement.toDataURL("image/png");
         $('#preview1').children('.previewImg').html(image);


        materialSecond.uniforms.lowThreshold1.value =  rangeMin + this.range;
        g2Low = rangeMin + this.range;
        materialSecond.uniforms.highThreshold1.value =  rangeMin + 2.0*this.range;
        g2High = rangeMin + 2.0*this.range;
        renderer.render(sceneSecondPass, camera);
        image2.src = renderer.domElement.toDataURL("image/png");
        $('#preview2').children('.previewImg').html(image2);

        materialSecond.uniforms.lowThreshold1.value =  rangeMin + 2.0*this.range;
        g3Low = rangeMin + 2.0*this.range;
        materialSecond.uniforms.highThreshold1.value =  rangeMin + 3.0*this.range;
        g3High = rangeMin + 3.0*this.range;
        renderer.render(sceneSecondPass, camera);
        image3.src = renderer.domElement.toDataURL("image/png");
        $('#preview3').children('.previewImg').html(image3);

        materialSecond.uniforms.lowThreshold1.value =  rangeMin + 3.0*this.range;
        g4Low = rangeMin + 3.0*this.range;
        materialSecond.uniforms.highThreshold1.value =  rangeMin + 4.0*this.range;
        g4High = rangeMin + 4.0*this.range;
        renderer.render(sceneSecondPass, camera);
        image4.src = renderer.domElement.toDataURL("image/png");
        $('#preview4').children('.previewImg').html(image4);

        materialSecond.uniforms.lowThreshold1.value =  rangeMin + 4.0*this.range;
        g5Low = rangeMin + 4.0*this.range;
        materialSecond.uniforms.highThreshold1.value = rangeMax;
        g5High = rangeMax;
        renderer.render(sceneSecondPass, camera);
       image5.src = renderer.domElement.toDataURL("image/png");
        $('#preview5').children('.previewImg').html(image5);


          rangeMinOld = rangeMin;
         rangeMaxOld = rangeMax;
         rangeMinStart = 0.0;
         rangeMaxStart = 1.0;
         updateTransferGraphic();
      };

      this.reset = function(){
      //   camera = new THREE.PerspectiveCamera(40, mainScene.innerWidth() /
      // mainScene.innerHeight(), 0.01, 3000.0);
      //   camera.position.z = 2.0;

        controls.reset();
        // controls = new THREE.OrbitControls( camera, renderer.domElement );
        // controls.target.set(0.0,0.0,0.0);

        guiControls.steps = 512.0;
        guiControls.alphaCorrection = 1.0;

        materialSecond.uniforms.steps.value = guiControls.steps;
        materialSecond.uniforms.alphaCorrection.value = guiControls.alphaCorrection;
        rangeMin = 0.0;
        rangeMax = 1.0;
        rangeMinStart = 0.0;
        rangeMaxStart = 1.0;
        rangeMinOld = 0.0;
        rangeMaxOld = 1.0;
        rangeDiffMin = 0.0;
        rangeDiffMax = 0.0;
        guiControls.lowThreshold1 = rangeMin;
        guiControls.highThreshold1 = rangeMax;
        materialSecond.uniforms.rangeMin.value = rangeMin;
        materialSecond.uniforms.rangeMax.value = rangeMax;
        guiControls.range = 0.2;
        sliderMin = 0.0;
        sliderMax = 1.0;
        rangeSlider.slider('option', 'min', rangeMin);
        rangeSlider.slider('option', 'max', rangeMax);
        rangeSlider.slider('option', 'values', [0.0,1.0]);
        opacitySlider1.slider('option', 'value', 1.0);
        $('#opacity1').val(1.0);
        opacitySlider2.slider('option', 'value', 1.0);
        $('#opacity2').val(1.0);
        opacitySlider3.slider('option', 'value', 1.0);
        $('#opacity3').val(1.0);
        opacitySlider4.slider('option', 'value', 1.0);
        $('#opacity4').val(1.0);
        opacitySlider5.slider('option', 'value', 1.0);
        $('#opacity5').val(1.0);
        materialSecond.uniforms.alphaAdjustmentFactor1.value = 1.0;
        materialSecond.uniforms.alphaAdjustmentFactor2.value = 1.0;
        materialSecond.uniforms.alphaAdjustmentFactor3.value = 1.0;
        materialSecond.uniforms.alphaAdjustmentFactor4.value = 1.0;
        materialSecond.uniforms.alphaAdjustmentFactor5.value = 1.0;
        guiControls.alphaAdjustmentFactor1 = 1.0;
        guiControls.alphaAdjustmentFactor2 = 1.0;
        guiControls.alphaAdjustmentFactor3 = 1.0;
        guiControls.alphaAdjustmentFactor4 = 1.0;
        guiControls.alphaAdjustmentFactor5 = 1.0;
        guiControls.stepPos1 = 0.2;
        guiControls.stepPos2 = 0.4;
        guiControls.stepPos3 = 0.6;
        guiControls.stepPos4 = 0.8;
        guiControls.graphicPos1 = 0.2;
        guiControls.graphicPos2 = 0.4;
        guiControls.graphicPos3 = 0.6;
        guiControls.graphicPos4 = 0.8;

        guiControls.color1 ="#00FA58";
        guiControls.color2 ="#eb079d";
        guiControls.color3 ="#fafea6";
        guiControls.color4 ="#3466fe";
        guiControls.color5 ="#75f4d6";

        document.getElementById('colorBtn1')
            .jscolor.fromString('00FA58');
          document.getElementById('colorBtn2')
            .jscolor.fromString('eb079d');
          document.getElementById('colorBtn3')
            .jscolor.fromString('fafea6');
          document.getElementById('colorBtn4')
            .jscolor.fromString('3466fe');
          document.getElementById('colorBtn5')
            .jscolor.fromString('75f4d6');



        updateTransferFunction();
        updateTransferFuncTex();
          guiControls.mainImg();
          guiControls.zoom();
          updateTransferGraphic();
          $(folder2.domElement).attr("hidden", false);

          chartJQ.series[0].data[0].update({
              y: 0.043647500209963
            });
          chartJQ.series[0].data[1].update({
              y: 0.09711954855256577
            });

          chartJQ.series[0].data[2].update({
              y:    0.1674467925981269
            });

          chartJQ.series[0].data[3].update({
                y:    0.27522033632230447
              });

          chartJQ.series[0].data[4].update({
                    y:    1
                  });
          initChart();
          updatePlotlines();


      };

      this.mainImg = function () {
        guiControls.lowThreshold1 = rangeSlider.slider('values')[0];
        guiControls.highThreshold1 = rangeSlider.slider('values')[1];
        materialSecond.uniforms.lowThreshold1.value =guiControls.lowThreshold1;
        materialSecond.uniforms.highThreshold1.value = guiControls.highThreshold1;


      };

      this.intro = function(){
        $('#intro').fadeIn('slow');
      };

      this.showTf = function(){
        $('#tfContainer').toggle();
        $('#galleryContainer').toggle();

        if(!transferChartShow){
          transferChartShow = true;
          materialSecond.uniforms.transferChartShow.value =true;
        } else {
          transferChartShow = false;
          materialSecond.uniforms.transferChartShow.value = false;
        }
        updateData();
      };
  };




  container = $('#container');
 mainScene = $('#mainScene');
 preview1 = $('#preview1');
  camera = new THREE.PerspectiveCamera(40, mainScene.innerWidth() /
mainScene.innerHeight(), 0.01, 3000.0);
  camera.position.z = 2.0;


var textureLoader = new THREE.TextureLoader();
cubeTexture = textureLoader.load("img/bonsai.raw.png");
cubeTexture.generateMipmaps = false;
cubeTexture.minFilter = THREE.LinearFilter;
cubeTexture.magFilter = THREE.LinearFilter;



  var screenSize = new THREE.Vector2(window.innerWidth, window.innerHeight);
  var mainSceneSize = new THREE.Vector2(mainScene.innerWidth(), mainScene.innerHeight());

  /*console.log("mainScene.innerWidth(): " + mainScene.innerWidth() + ", mainScene.innerHeight(): " +mainScene.innerHeight() );
console.log("window.innerWidth: " +window.innerWidth + ", window.innerHeight: " +window.innerHeight);
console.log("container.innerWidth: " +container.innerWidth() + ", container.innerHeight: " +container.innerHeight());*/


  //Texture to save worldSpaceCoords
  rtTexture = new THREE.WebGLRenderTarget(mainSceneSize.x, mainSceneSize.y, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    wrapS: THREE.ClampToEdgeWrapping,
    wrapT: THREE.ClampToEdgeWrapping,
    format: THREE.RGBFormat,
    type: THREE.FloatType,
    generateMipmaps: false
  });


  var materialFirst = new THREE.ShaderMaterial({
   vertexShader: $('#vertexShaderFirstPass').text(),
    fragmentShader: $('#fragmentShaderFirstPass').text(),
    side: THREE.BackSide
  });

  materialSecond = new THREE.ShaderMaterial({
    vertexShader: $('#vertexShaderSecondPass').text(),
    fragmentShader: $('#fragmentShaderSecondPass').text(),
    side: THREE.FrontSide,
    uniforms: {
      tex: {type: "t", value: rtTexture},
      cubeTex: {type: "t", value: cubeTexture},
      transferTex: {type: "t", value: transferTexture},
      steps: {type: "1f", value: guiControls.steps},
      alphaCorrection: {type: "1f", value: guiControls.alphaCorrection},
      lowThreshold1: {type: "1f", value: guiControls.lowThreshold1},
      highThreshold1: {type: "1f", value: guiControls.highThreshold1},
      range: {type: "1f", value: guiControls.range},
      rangeMin: {type: "1f", value: rangeMin},
      rangeMax: {type: "1f", value: rangeMax},
      applyTransferFunc: {type: 'bool', value: guiControls.applyTransferFunc},
      alphaAdjustmentFactor1: {type: "1f", value: guiControls.alphaAdjustmentFactor1},
      alphaAdjustmentFactor2: {type: "1f", value: guiControls.alphaAdjustmentFactor2},
      alphaAdjustmentFactor3: {type: "1f", value: guiControls.alphaAdjustmentFactor3},
      alphaAdjustmentFactor4: {type: "1f", value: guiControls.alphaAdjustmentFactor4},
      alphaAdjustmentFactor5: {type: "1f", value: guiControls.alphaAdjustmentFactor5},
      transferChartShow: {type: 'bool', value: transferChartShow},
    }
  });
transferTexture = updateTransferFunction();
  sceneFirstPass = new THREE.Scene();
  sceneSecondPass = new THREE.Scene();

  var geometry = new THREE.BoxGeometry(1.0,1.0,1.0);
  geometry.doubleSided = true;

  var meshFirstPass = new THREE.Mesh(geometry, materialFirst);
  var meshSecondPass = new THREE.Mesh(geometry, materialSecond);

  sceneFirstPass.add(meshFirstPass);
  sceneSecondPass.add(meshSecondPass);


  renderer = new THREE.WebGLRenderer();
  var gl = renderer.getContext();
  gl.getExtension('OES_texture_float');

  gl.getExtension('OES_texture_float_linear');
  stats = new Stats();
 				stats.domElement.style.position = 'absolute';
 				stats.domElement.style.top = '250px';
 				//mainScene.append( stats.domElement );
  mainScene.append(renderer.domElement);
  controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.target.set(0.0,0.0,0.0);

//   var destinationCanvas    = document.createElement('canvas');
// destinationCanvas.width  = preview1.innerWidth();
// destinationCanvas.height = preview1.innerHeight();
//
// //grab the context from your destination canvas
// var destCtx = destinationCanvas.getContext('2d');
//
// //call its drawImage() function passing it the source canvas directly
// destCtx.drawImage(renderer.domElement, 0, 0);
//
//








  var gui = new dat.GUI();
 gui.add(guiControls, 'steps', 0.0, 1024.0).name('Steps').listen();
  gui.add(guiControls, 'alphaCorrection', 0.0, 2.0).step(0.01).name('Alpha Correction').listen();
  gui.add(guiControls, 'applyTransferFunc').name('Apply Color');
//  gui.add(guiControls, 'preview').name('(Update Preview)');
  gui.add(guiControls, 'zoom').name('Volume Zoom');
  gui.add(guiControls, 'reset').name('Reset to start');
  //gui.add(guiControls, 'intro').name('Show instruction');
  gui.add(guiControls, 'showTf').name('Show TF-Graph');

  var folder2 = gui.addFolder('Change Colorsteps');

  initStepPos();

  function initStepPos()
  {
    var stepPos1 =  folder2.add(guiControls, 'stepPos1', 0.0, guiControls.stepPos1, 0.1).name('Color 1 Position').listen();
    stepPos1.onChange(function(){
      materialSecond.uniforms.transferTex.value = updateTransferFunction();
       updateTransferGraphic();
       guiControls.graphicPos1 = ((oldMaximum - oldMinimun)/(rangeMax - rangeMin)) * (guiControls.stepPos1 - sliderMin);
     });
     var stepPos2=  folder2.add(guiControls, 'stepPos2', guiControls.stepPos1, guiControls.stepPos2).name('Color 2 Position').listen();
     stepPos2.onChange(function(){
       materialSecond.uniforms.transferTex.value = updateTransferFunction();
       updateTransferGraphic();
       guiControls.graphicPos2 = ((oldMaximum - oldMinimun)/(rangeMax - rangeMin)) * (guiControls.stepPos2 - sliderMin);

     });
     var stepPos3 =folder2.add(guiControls, 'stepPos3', guiControls.stepPos2, guiControls.stepPos3).name('Color 3 Position').listen();
      stepPos3.onChange(function(){
        materialSecond.uniforms.transferTex.value = updateTransferFunction();
        updateTransferGraphic();
        guiControls.graphicPos3 = ((oldMaximum - oldMinimun)/(rangeMax - rangeMin)) * (guiControls.stepPos3 - sliderMin);

      });
      var stepPos4 =  folder2.add(guiControls, 'stepPos4', guiControls.stepPos3, 1.0).name('Color 4 Position').listen();
      stepPos4.onChange(function(){
           materialSecond.uniforms.transferTex.value = updateTransferFunction();
           updateTransferGraphic();
           guiControls.graphicPos4 = ((oldMaximum - oldMinimun)/(rangeMax - rangeMin)) * (guiControls.stepPos4 - sliderMin);

       });
       folder2.open();
   }
updateTransferFuncTex();

  onResize();
 window.addEventListener('resize', onResize, false);
}



function updateTransferFunction(){
        var canvas = document.createElement('canvas');
				canvas.height = 20;
				canvas.width = 256;
				var ctx = canvas.getContext('2d');
				var grd = ctx.createLinearGradient(0, 0, canvas.width -1 , canvas.height - 1);


        grd.addColorStop( guiControls.stepPos1, guiControls.color1);
     grd.addColorStop( guiControls.stepPos1, guiControls.color2);
       grd.addColorStop( guiControls.stepPos2, guiControls.color2);
       grd.addColorStop(guiControls.stepPos2, guiControls.color3);
     grd.addColorStop(guiControls.stepPos3, guiControls.color3);
        grd.addColorStop(guiControls.stepPos3, guiControls.color4);
    grd.addColorStop(guiControls.stepPos4, guiControls.color4);
        grd.addColorStop(guiControls.stepPos4, guiControls.color5);


				ctx.fillStyle = grd;
				ctx.fillRect(0,0,canvas.width -1 ,canvas.height -1 );



        // var img = document.getElementById('transferFuncImg');
        // img.style.width = "256 px";
        // img.style.height = "20 px";
        // img.src = canvas.toDataURL();


				transferTexture =  new THREE.Texture(canvas);
				transferTexture.wrapS = transferTexture.wrapT =  THREE.ClampToEdgeWrapping;
				transferTexture.needsUpdate = true;



        return transferTexture;
}

function updateTransferGraphic(){
        var canvas2 = document.createElement('canvas');
				canvas2.height = 20;
				canvas2.width = 256;
				var ctx2 = canvas2.getContext('2d');
				var grd2 = ctx2.createLinearGradient(0, 0, canvas2.width -1 , canvas2.height - 1);



        // var dist = (rangeMax - rangeMinOld) - (sliderMin - rangeMinOld);
        var newPos1 =
          (
            ((oldMaximum - oldMinimun)/(rangeMax - rangeMin)) * (guiControls.graphicPos1 - sliderMin)
          )  ;
         var newPos2 = ((oldMaximum - oldMinimun)/(rangeMax - rangeMin)) * (guiControls.graphicPos2 - sliderMin);
         var newPos3 = ((oldMaximum - oldMinimun)/(rangeMax - rangeMin)) * (guiControls.graphicPos3 - sliderMin);
         var newPos4 = ((oldMaximum - oldMinimun)/(rangeMax - rangeMin)) * (guiControls.graphicPos4 - sliderMin);



         if(newPos1 < 0.0){
           guiControls.graphicPos1 = 0.0;
         } else if (newPos1 > 1.0) {
           guiControls.graphicPos1 = 1.0;
         }else {
           guiControls.graphicPos1 = newPos1;
         }

         if(newPos2 < 0.0){
           guiControls.graphicPos2 = 0.0;
         } else if (newPos2 > 1.0) {
           guiControls.graphicPos2 = 1.0;
         }else {
           guiControls.graphicPos2 = newPos2;
         }

         if(newPos3 < 0.0){
           guiControls.graphicPos3 = 0.0;
         } else if (newPos3 > 1.0) {
           guiControls.graphicPos3 = 1.0;
         }else {
           guiControls.graphicPos3 = newPos3;
         }

         if(newPos4 < 0.0){
           guiControls.graphicPos4 = 0.0;
         } else if (newPos4 > 1.0) {
           guiControls.graphicPos4 = 1.0;
         }else {
           guiControls.graphicPos4 = newPos4;
         }






          grd2.addColorStop( guiControls.graphicPos1, guiControls.color1);
       grd2.addColorStop( guiControls.graphicPos1, guiControls.color2);

        grd2.addColorStop( guiControls.graphicPos2, guiControls.color2);

       grd2.addColorStop(guiControls.graphicPos2, guiControls.color3);

        grd2.addColorStop(guiControls.graphicPos3, guiControls.color3);

       grd2.addColorStop(guiControls.graphicPos3, guiControls.color4);

        grd2.addColorStop(guiControls.graphicPos4, guiControls.color4);

        grd2.addColorStop(guiControls.graphicPos4, guiControls.color5);




				ctx2.fillStyle = grd2;
				ctx2.fillRect(0,0,canvas2.width -1 ,canvas2.height -1 );



        var img = document.getElementById('transferFuncImg');
        img.style.width = "256 px";
        img.style.height = "20 px";
        img.src = canvas2.toDataURL();
        //var oldPos = newPos1;

}


function updateTransferFuncTex(value) {
  materialSecond.uniforms.transferTex.value = updateTransferFunction();
  materialSecond.uniforms.lowThreshold1.value = guiControls.lowThreshold1;
  materialSecond.uniforms.highThreshold1.value =guiControls.highThreshold1;
}



rangeSlider.slider({
  orientation: "horizontal",
  range: true,
  min: 0.0,
  max: 1.0,
  values: [0.0,1.0],
  step: 0.01,
  animate: true,


  stop: function(event, ui){
    guiControls.mainImg();

    sliderMin = rangeSlider.slider('option', 'values')[0];


   sliderMax = rangeSlider.slider('option', 'values')[1];

  rangeMin = rangeSlider.slider('option', 'values')[0];
   rangeMax = rangeSlider.slider('option', 'values')[1];
    newLow = rangeMin;
    guiControls.lowThreshold1 = rangeMin;
    guiControls.highThreshold1 = rangeMax;
updatePlotlines();
  },
   start: function(event, ui){
    rangeMinStart = rangeSlider.slider('option', 'values')[0];
    rangeMaxStart = rangeSlider.slider('option', 'values')[1];
   }

});

opacitySlider1.slider({
  range: 'min',
  min: 0.0,
  max: 1.0,
  step: 0.01,
  value: 1.0,
  slide: function( event, ui ) {
       $( "#opacity1" ).val( ui.value );
       guiControls.alphaAdjustmentFactor1 = opacitySlider1.slider('value');

     },
  stop: function(event,ui){

  },
  change: function(event,ui){
    $( "#opacity1" ).val( ui.value );

     guiControls.alphaAdjustmentFactor1 = opacitySlider1.slider('value');
    guiControls.update();
    console.log(transferChartShow);
  }
});
$('#opacity1').val(opacitySlider1.slider('value'));

opacitySlider2.slider({
  range: 'min',
  min: 0.0,
  max: 1.0,
  step: 0.01,
  value: 1.0,
  slide: function( event, ui ) {
       $( "#opacity2" ).val( ui.value );
       guiControls.alphaAdjustmentFactor2 = opacitySlider2.slider('value');

     },
  stop: function(event,ui){
    guiControls.update();

  },
  change: function(event,ui){
    $( "#opacity2" ).val( ui.value );

    guiControls.alphaAdjustmentFactor2 = opacitySlider2.slider('value');
    guiControls.update();
    console.log();

  }
});
$('#opacity2').val(opacitySlider2.slider('value'));

opacitySlider3.slider({
  range: 'min',
  min: 0.0,
  max: 1.0,
  step: 0.01,
  value: 1.0,
  slide: function( event, ui ) {
       $( "#opacity3" ).val( ui.value );
       guiControls.alphaAdjustmentFactor3 = opacitySlider3.slider('value');

     },
  stop: function(event,ui){

  },
  change: function(event,ui){
    $( "#opacity3" ).val( ui.value );
    guiControls.alphaAdjustmentFactor3 = opacitySlider3.slider('value');
    guiControls.update();

  }
});


$('#opacity3').val(opacitySlider3.slider('value'));

opacitySlider4.slider({
  range: 'min',
  min: 0.0,
  max: 1.0,
  step: 0.01,
  value: 1.0,
  slide: function( event, ui ) {
       $( "#opacity4" ).val( ui.value );
       guiControls.alphaAdjustmentFactor4 = opacitySlider4.slider('value');

     },
  stop: function(event,ui){

  },
  change: function(event,ui){
    $( "#opacity4" ).val( ui.value );
    guiControls.alphaAdjustmentFactor4 = opacitySlider4.slider('value');
    console.log(opacitySlider4.slider('option', 'value'));
    guiControls.update();

  }
});
$('#opacity4').val(opacitySlider4.slider('value'));

opacitySlider5.slider({
  range: 'min',
  min: 0.0,
  max: 1.0,
  step: 0.01,
  value: 1.0,
  slide: function( event, ui ) {
       $( "#opacity5" ).val( ui.value );
       guiControls.alphaAdjustmentFactor5 = opacitySlider5.slider('value');

     },


  change: function(event,ui){
    $( "#opacity5" ).val( ui.value );
    guiControls.alphaAdjustmentFactor5 = opacitySlider5.slider('value');
    guiControls.update();

  }
});
$('#opacity5').val(opacitySlider5.slider('value'));






function onResize(event) {
 camera.aspect = $(renderer.domElement).parent().innerWidth() / $(renderer.domElement).parent().innerHeight();
// camera.aspect = mainScene.innerWidth() / mainScene.innerHeight();
  camera.updateProjectionMatrix();
//renderer.setSize(mainScene.innerWidth(), mainScene.innerHeight());
 renderer.setSize($(renderer.domElement).parent().innerWidth(), $(renderer.domElement).parent().innerHeight());
}

function animate() {
  requestAnimationFrame(animate);

  render();
  stats.update();
}

function render() {

  //First renderpass, stores worldSpaceCoords of backsides into texture
  renderer.render(sceneFirstPass, camera,rtTexture);

  renderer.render(sceneSecondPass, camera);
  if(screenshot){
//  snapshotURL = renderer.domElement.toDataURL("image/png");
  // image.src = snapshotURL;
   //renderer.render(sceneSecondPass, camera);
  // image2.src =  renderer.domElement.toDataURL("image/png");


   materialSecond.uniforms.lowThreshold1.value = guiControls.lowThreshold1;
  materialSecond.uniforms.highThreshold1.value =guiControls.highThreshold1;
   screenshot = false;

}


  materialSecond.uniforms.steps.value = guiControls.steps;
  materialSecond.uniforms.alphaCorrection.value = guiControls.alphaCorrection;
  materialSecond.uniforms.applyTransferFunc.value = guiControls.applyTransferFunc;
  materialSecond.uniforms.alphaAdjustmentFactor1.value = guiControls.alphaAdjustmentFactor1;
  materialSecond.uniforms.alphaAdjustmentFactor2.value = guiControls.alphaAdjustmentFactor2;
  materialSecond.uniforms.alphaAdjustmentFactor3.value = guiControls.alphaAdjustmentFactor3;
  materialSecond.uniforms.alphaAdjustmentFactor4.value = guiControls.alphaAdjustmentFactor4;
  materialSecond.uniforms.alphaAdjustmentFactor5.value = guiControls.alphaAdjustmentFactor5;

}
