$(function(){
    var scene;
    var camera;
    var renderer;
    var control;
    init();
    
    function init(){
        
        var mapper = {
                'geom-sph': THREE.SphereGeometry,
                'geom-cir': THREE.CircleGeometry,
                'geom-plan': THREE.PlaneGeometry,
                'geom-box': THREE.BoxGeometry,
                'geom-cyl': THREE.CylinderGeometry,
                'lig-point':THREE.PointLight,
                'lig-amb' : THREE.AmbientLight
        }

        var objectdata = [
            
            {
                'name':'Earth',
                'geomkey':"geom-sph",
                "geomvalues":[40,32,32],
                'texture':'textures/Tierratexture.jpg',
                'positionx': 400,
                'positiony': 0,
                'positionz': 0
            },
            {
                'name':'Sun',
                'geomkey':'geom-sph',
                "geomvalues":[100,32,32],
                'texture':'textures/suntexture.jpg',
                'positionx': 0,
                'positiony': 0,
                'positionz': 0
            },
            {
                'name':'Moon',
                'geomkey':'geom-sph',
                "geomvalues":[30,32,32],
                'texture':'textures/moontexture.jpg',
                'positionx': 700,
                'positiony': 0,
                'positionz': 0
            }
        ];
        
        var lightdata = [
            {
                'name':'pointlight',
                'lightkey':'lig-point',
                'lightvalue':[0xffffff, 4]
            },
            {
                'name':'ambientlight',
                'lightkey': 'lig-amb',
                'lightvalue':[0xffffff, 4]
            }
        ];
        renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
        renderer.setSize( window.innerWidth, window.innerHeight );
        $("#stage").append(renderer.domElement);
        scene = new THREE.Scene();   
        createCamera();
        createLight(lightdata,mapper);
        createFigure(objectdata,mapper);
        render();   
    }

    function createFigure(pdata,mapper){
        pdata.forEach(element => {
            let geometry = new mapper[element.geomkey](...element.geomvalues);
            let texture = new THREE.TextureLoader().load(element.texture);
            var material = new THREE.MeshBasicMaterial( { map: texture } );
            element.name = new THREE.Mesh(geometry,material);
            scene.add(element.name);
            element.name.position.x = element.positionx;
            element.name.position.y = element.positiony;
            element.name.position.z = element.positionz;  
        });   
    }

    function createLight(ldata,mapper){
        ldata.forEach(element =>{
            let light = new mapper[element.lightkey](...element.lightvalue);
            scene.add(light);
        });
    }  

    function createCamera(){
        camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight , 0.1 , 1000);
        camera.position.z = 0;
        camera.position.y = 400;
        camera.position.x = 0;
        control = new THREE.OrbitControls(camera);
    }

    function render(){
        requestAnimationFrame( render );
        control.update();
        renderer.render( scene , camera );
    }
})