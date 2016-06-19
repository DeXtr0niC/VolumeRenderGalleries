if(!Detector.webgl){
  Detector.addGetWebGLMessage();
}

var container, camera, sceneFirstPass, renderer, mainScene;
var rtTexture, transferTexture;
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


var materialSecond;
init();
animate();

function init(){

  $('#introStart').click(function () {
    $('#intro').fadeOut('slow');
    if(initial)
     {
       guiControls.zoom();
     }
     initial = false;
  });


  //GUI
  guiControls =  new function() {
    this.steps = 256.0;
    this.alphaCorrection = 5.0;
    this.color1 = "#00FA58";
    this.color2 = "#eb079d";
    this.color3 = "#fafea6";
    this.color4 = "#3466fe";
    this.color5 = "#75f4d6";
    this.lowThreshold1 = 0.0;
    this.highThreshold1 = 1.0;

    this.applyTransferFunc = true;
    this.range = 0.2;
    this.preview = function(){
      screenshot = true;
      this.range = (this.highThreshold1 - this.lowThreshold1)/5.0;



     materialSecond.uniforms.lowThreshold1.value =   this.lowThreshold1;
      materialSecond.uniforms.highThreshold1.value = this.lowThreshold1 + this.range;
      renderer.render(sceneSecondPass, camera);
      image.src = renderer.domElement.toDataURL("image/png");
      $('#preview1').html(image);

      materialSecond.uniforms.lowThreshold1.value = this.lowThreshold1 + this.range;
      materialSecond.uniforms.highThreshold1.value = this.lowThreshold1 + 2.0*this.range;
      renderer.render(sceneSecondPass, camera);
      image2.src = renderer.domElement.toDataURL("image/png");
      $('#preview2').html(image2);

      materialSecond.uniforms.lowThreshold1.value = this.lowThreshold1 + 2.0*this.range;
      materialSecond.uniforms.highThreshold1.value = this.lowThreshold1 + 3.0*this.range;
      renderer.render(sceneSecondPass, camera);
      image3.src = renderer.domElement.toDataURL("image/png");
      $('#preview3').html(image3);

      materialSecond.uniforms.lowThreshold1.value = this.lowThreshold1 + 3.0*this.range;
      materialSecond.uniforms.highThreshold1.value = this.lowThreshold1 + 4.0*this.range;
      renderer.render(sceneSecondPass, camera);
      image4.src = renderer.domElement.toDataURL("image/png");
      $('#preview4').html(image4);

      materialSecond.uniforms.lowThreshold1.value = this.lowThreshold1 + 4.0*this.range;
      materialSecond.uniforms.highThreshold1.value = this.highThreshold1;
      renderer.render(sceneSecondPass, camera);
     image5.src = renderer.domElement.toDataURL("image/png");
      $('#preview5').html(image5);
      };

      this.zoom = function(){
        screenshot = true;
        this.range = (this.highThreshold1 - this.lowThreshold1)/5.0;

        updateTransferFunction();
        updateTransferFuncTex();


       materialSecond.uniforms.lowThreshold1.value =   this.lowThreshold1;
       g1Low = this.lowThreshold1;
        materialSecond.uniforms.highThreshold1.value = this.lowThreshold1 + this.range;
        g1High = this.lowThreshold1 + this.range;
        renderer.render(sceneSecondPass, camera);
        image.src = renderer.domElement.toDataURL("image/png");
        $('#preview1').html(image);

        materialSecond.uniforms.lowThreshold1.value = this.lowThreshold1 + this.range;
        g2Low = this.lowThreshold1 + this.range;
        materialSecond.uniforms.highThreshold1.value = this.lowThreshold1 + 2.0*this.range;
        g2High = this.lowThreshold1 + 2.0*this.range;
        renderer.render(sceneSecondPass, camera);
        image2.src = renderer.domElement.toDataURL("image/png");
        $('#preview2').html(image2);

        materialSecond.uniforms.lowThreshold1.value = this.lowThreshold1 + 2.0*this.range;
        g3Low = this.lowThreshold1 + 2.0*this.range;
        materialSecond.uniforms.highThreshold1.value = this.lowThreshold1 + 3.0*this.range;
        g3High = this.lowThreshold1 + 3.0*this.range;
        renderer.render(sceneSecondPass, camera);
        image3.src = renderer.domElement.toDataURL("image/png");
        $('#preview3').html(image3);

        materialSecond.uniforms.lowThreshold1.value = this.lowThreshold1 + 3.0*this.range;
        g4Low = this.lowThreshold1 + 3.0*this.range;
        materialSecond.uniforms.highThreshold1.value = this.lowThreshold1 + 4.0*this.range;
        g4High = this.lowThreshold1 + 4.0*this.range;
        renderer.render(sceneSecondPass, camera);
        image4.src = renderer.domElement.toDataURL("image/png");
        $('#preview4').html(image4);

        materialSecond.uniforms.lowThreshold1.value = this.lowThreshold1 + 4.0*this.range;
        g5Low = this.lowThreshold1 + 4.0*this.range;
        materialSecond.uniforms.highThreshold1.value = this.highThreshold1;
        g5High = this.highThreshold1;
        renderer.render(sceneSecondPass, camera);
       image5.src = renderer.domElement.toDataURL("image/png");
        $('#preview5').html(image5);
      };

      this.reset = function(){
        this.lowThreshold1 = 0.0;
        this.highThreshold1 = 1.0;
        this.range = 0.2;
        updateTransferFunction();
        updateTransferFuncTex();
        this.zoom();
      };
      this.intro = function(){
        $('#intro').fadeIn('slow');
      };
  };

  //test


  container = $('#container');
 mainScene = $('#mainScene');
 preview1 = $('#preview1');
  camera = new THREE.PerspectiveCamera(40, mainScene.innerWidth() /
mainScene.innerHeight(), 0.01, 3000.0);
  camera.position.z = 2.0;

controls = new THREE.OrbitControls( camera, window[0] );
controls.target.set(0.0,0.0,0.0);

cubeTexture = THREE.ImageUtils.loadTexture("img/heart.raw.png");
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
      applyTransferFunc: {type: 'bool', value: guiControls.applyTransferFunc}
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
  mainScene.append(renderer.domElement);

  var destinationCanvas    = document.createElement('canvas');
destinationCanvas.width  = preview1.innerWidth();
destinationCanvas.height = preview1.innerHeight();

//grab the context from your destination canvas
var destCtx = destinationCanvas.getContext('2d');

//call its drawImage() function passing it the source canvas directly
destCtx.drawImage(renderer.domElement, 0, 0);








  var gui = new dat.GUI();
 gui.add(guiControls, 'steps', 0.0, 512.0).name('Steps');
  gui.add(guiControls, 'alphaCorrection', 0.0, 10.0).step(0.01).name('Alpha Correction');
  gui.add(guiControls, 'applyTransferFunc').name('Apply TF');
  gui.add(guiControls, 'preview').name('(Update Preview)');
  gui.add(guiControls, 'zoom').name('Volume Zoom');
  gui.add(guiControls, 'reset').name('Reset to start');
  gui.add(guiControls, 'intro').name('Show instruction');

  var folder = gui.addFolder('Change Colors');
  var controllerColor1 = folder.addColor(guiControls, "color1").name('Color 1');
  var controllerColor2 = folder.addColor(guiControls, "color2").name('Color 2');
  var controllerColor3 = folder.addColor(guiControls, "color3").name('Color 3');
  var controllerColor4 = folder.addColor(guiControls, "color4").name('Color 4');
  var controllerColor5 = folder.addColor(guiControls, "color5").name('Color 5');
  folder.open();

  //var controllerLowThreshold1 = folder.add(guiControls, "lowThreshold1", 0.0, 1.0);
//  var controlerHighThreshold1 = folder.add(guiControls, "highThreshold1", 0.0, 1.0);
  controllerColor1.onChange(updateTransferFuncTex);
  controllerColor2.onChange(updateTransferFuncTex);
  controllerColor3.onChange(updateTransferFuncTex);
  controllerColor4.onChange(updateTransferFuncTex);
  controllerColor5.onChange(updateTransferFuncTex);

//  controllerLowThreshold1.onChange(updateTransferFuncTex);
//  controlerHighThreshold1.onChange(updateTransferFuncTex);
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
		/*	if(guiControls.lowThreshold1 <= 0.05){
        grd.addColorStop(0.0, "#000000" );
      }else {
        grd.addColorStop(guiControls.lowThreshold1 - 0.05, "#000000" );
      }
        grd.addColorStop(guiControls.lowThreshold1, guiControls.color1);
				grd.addColorStop(guiControls.highThreshold1,guiControls.color1);
        if(guiControls.highThreshold1 >= 0.95){
          grd.addColorStop(1.0, "#000000" );
        }else {
          grd.addColorStop(guiControls.highThreshold1 + 0.05, "#000000" );
        }*/
        grd.addColorStop( guiControls.lowThreshold1, guiControls.color1);
        grd.addColorStop(guiControls.lowThreshold1 + guiControls.range, guiControls.color1);
        grd.addColorStop(guiControls.lowThreshold1 + guiControls.range, guiControls.color2);
        grd.addColorStop(guiControls.lowThreshold1 + 2.0*guiControls.range, guiControls.color2);
        grd.addColorStop(guiControls.lowThreshold1 + 2.0*guiControls.range, guiControls.color3);
        grd.addColorStop(guiControls.lowThreshold1 + 3.0*guiControls.range, guiControls.color3);
        grd.addColorStop(guiControls.lowThreshold1 + 3.0*guiControls.range, guiControls.color4);
        grd.addColorStop(guiControls.lowThreshold1 + 4.0*guiControls.range, guiControls.color4);
        grd.addColorStop(guiControls.lowThreshold1 + 4.0*guiControls.range, guiControls.color5);
        grd.addColorStop( guiControls.highThreshold1, guiControls.color5);



				ctx.fillStyle = grd;
				ctx.fillRect(0,0,canvas.width -1 ,canvas.height -1 );

        var img = document.getElementById('transferFuncImg');
        img.src = canvas.toDataURL();
        img.style.width = "256 px";
        img.style.height = "128 px";

				transferTexture =  new THREE.Texture(canvas);
				transferTexture.wrapS = transferTexture.wrapT =  THREE.ClampToEdgeWrapping;
				transferTexture.needsUpdate = true;

        return transferTexture;
}

function updateTransferFuncTex(value) {
  materialSecond.uniforms.transferTex.value = updateTransferFunction();
  materialSecond.uniforms.lowThreshold1.value = guiControls.lowThreshold1;
  materialSecond.uniforms.highThreshold1.value =guiControls.highThreshold1;
}

$("#preview1").click(function(){



  guiControls.lowThreshold1 = g1Low;
  guiControls.highThreshold1 = g1High;
  materialSecond.uniforms.lowThreshold1.value = g1Low;// guiControls.lowThreshold1;
  materialSecond.uniforms.highThreshold1.value = g1High;//guiControls.lowThreshold1 + guiControls.range;


});

$("#preview2").click(function(){


 guiControls.lowThreshold1 = g2Low;
  guiControls.highThreshold1 = g2High;
  materialSecond.uniforms.lowThreshold1.value = g2Low;//guiControls.lowThreshold1 + guiControls.range;
  materialSecond.uniforms.highThreshold1.value = g2High;//guiControls.lowThreshold1 + 2.0*guiControls.range;



});

$("#preview3").click(function(){
  guiControls.lowThreshold1 = g3Low;
  guiControls.highThreshold1 = g3High;

  materialSecond.uniforms.lowThreshold1.value = g3Low; //guiControls.lowThreshold1 + 2.0*guiControls.range;
  materialSecond.uniforms.highThreshold1.value = g3High;//guiControls.lowThreshold1 + 3.0*guiControls.range;


});

$("#preview4").click(function(){

  guiControls.lowThreshold1 = g4Low;
  guiControls.highThreshold1 = g4High;
  materialSecond.uniforms.lowThreshold1.value = g4Low;//guiControls.lowThreshold1 + 3.0*guiControls.range;
  materialSecond.uniforms.highThreshold1.value = g4High;//guiControls.lowThreshold1 + 4.0*guiControls.range;

});

$("#preview5").click(function(){

  guiControls.lowThreshold1 = g5Low;
  guiControls.highThreshold1 = g5High;
  materialSecond.uniforms.lowThreshold1.value =g5Low;//guiControls.lowThreshold1 + 4.0*guiControls.range;
  materialSecond.uniforms.highThreshold1.value =g5High;//guiControls.lowThreshold1 + 5.0* guiControls.range;

});

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

}

function render() {

  //First renderpass, stores worldSpaceCoords of backsides into texture
  renderer.render(sceneFirstPass, camera, rtTexture);

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
}
