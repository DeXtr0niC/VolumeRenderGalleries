if(!Detector.webgl){
  Detector.addGetWebGLMessage();
}

var container, camera, sceneFirstPass, renderer, mainScene, preview1;
var rtTexture, transferTexture;
var cubeTexture;
var guiControls;

var materialSecond;
init();
animate();

function init(){

  //GUI
  guiControls =  new function() {
    this.steps = 256.0;
    this.alphaCorrection = 1.0;
    this.color1 = "#00FA58";
    this.lowThreshold1 = 0.2;
    this.highThreshold1 = 0.6;
    this.applyTransferFunc = false;
  };

  //container =  document.getElementById('container');
  container = $('#container');
//  mainScene = document.getElementById('mainScene'); //$('#container');
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

transferTexture = updateTransferFunction();

  var screenSize = new THREE.Vector2(window.innerWidth, window.innerHeight);
  var mainSceneSize = new THREE.Vector2(mainScene.innerWidth(), mainScene.innerHeight());
  console.log("mainScene.innerWidth(): " + mainScene.innerWidth() + ", mainScene.innerHeight(): " +mainScene.innerHeight() );
console.log("window.innerWidth: " +window.innerWidth + ", window.innerHeight: " +window.innerHeight);
console.log("container.innerWidth: " +container.innerWidth() + ", container.innerHeight: " +container.innerHeight());
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

  preview1.append(destinationCanvas);






  var gui = new dat.GUI();
 gui.add(guiControls, 'steps', 0.0, 512.0);
  gui.add(guiControls, 'alphaCorrection', 0.0, 5.0).step(0.01);
  gui.add(guiControls, 'applyTransferFunc');
  var folder = gui.addFolder('Transfer Function');
  var controllerColor1 = folder.addColor(guiControls, "color1");
  var controllerLowThreshold1 = folder.add(guiControls, "lowThreshold1", 0.0, 1.0);
  var controlerHighThreshold1 = folder.add(guiControls, "highThreshold1", 0.0, 1.0);
  controllerColor1.onChange(updateTransferFuncTex);
  controllerLowThreshold1.onChange(updateTransferFuncTex);
  controlerHighThreshold1.onChange(updateTransferFuncTex);

  onResize();
 window.addEventListener('resize', onResize, false);
}

function updateTransferFunction(){
var canvas = document.createElement('canvas');
				canvas.height = 20;
				canvas.width = 256;
				var ctx = canvas.getContext('2d');
				var grd = ctx.createLinearGradient(0, 0, canvas.width -1 , canvas.height - 1);
			if(guiControls.lowThreshold1 <= 0.05){
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
        }
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


  materialSecond.uniforms.steps.value = guiControls.steps;
  materialSecond.uniforms.alphaCorrection.value = guiControls.alphaCorrection;
  materialSecond.uniforms.applyTransferFunc.value = guiControls.applyTransferFunc;

}
