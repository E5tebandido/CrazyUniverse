/**
 ================================================================
 || - @author Teban18 <https://github.com/Teban18>             ||
 || - @description creation of planets using generic functions,|| 
 ||                and moving camera with sin and cos functions||
 ================================================================
 */

$(function(){
    var scene;
    var camera;
    var renderer;
    var control;
    init();
    
    function init(){
        
        var lightmapper = {
                'lig-point':THREE.PointLight,
                'lig-amb' : THREE.AmbientLight
        }
        
        var objectmapper = {
                'geom-sph': THREE.SphereGeometry,
                'geom-cir': THREE.CircleGeometry,
                'geom-plan': THREE.PlaneGeometry,
                'geom-box': THREE.BoxGeometry,
                'geom-cyl': THREE.CylinderGeometry,
        }

        var objectdata = [
            
            {
                'name':'Earth',
                'geomkey':"geom-sph",
                "geomvalues":[40,32,32],
                'materialoptions': {
                    color:'white',
                    'texture':'textures/Tierratexture.jpg'
                },
                'positionx': 0,
                'positiony': 0,
                'positionz': 400
            },
            {
                'name':'Sun',
                'geomkey':'geom-box',
                "geomvalues":[100,32,32],                
                'materialoptions': { 

                    'texture':'textures/suntexture.jpg'
                },
                'positionx': 0,
                'positiony': 0,
                'positionz': 0
            },
            {
                'name':'Moon',
                'geomkey':'geom-cyl',
                "geomvalues":[30,32,32],
                'materialoptions': {
                    'texture':'textures/moontexture.jpg'
                },
                'positionx':0,
                'positiony': 0,
                'positionz':  700
            }
        ];
        
        var lightdata = [
            {
                'name':'pointlight',
                'lightkey':'lig-point',
                'lightvalue':[0xffffff, 0.8]
            },
            {
                'name':'ambientlight',
                'lightkey': 'lig-amb',
                'lightvalue':[0xffffff, 1]
            }
        ];
        renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
        renderer.setSize( window.innerWidth, window.innerHeight );
        $("#stage").append(renderer.domElement);
        scene = new THREE.Scene();   
        createCamera();
        createLight(lightdata,lightmapper);
        createFigure(objectdata,objectmapper);
        
            scenerender(1);
          
    }

    function createFigure(data,mapper){
        data.forEach(element => {
            let geometry = new mapper[element.geomkey](...element.geomvalues);
            if('texture' in element.materialoptions){
            let texture = new THREE.TextureLoader().load(element.materialoptions.texture);
            element.materialoptions = Object.assign({map:texture});
            }
            var material = new THREE.MeshPhongMaterial( element.materialoptions );
            element.name = new THREE.Mesh(geometry,material);
            scene.add(element.name);
            element.name.position.x = element.positionx;
            element.name.position.y = element.positiony;
            element.name.position.z = element.positionz; 
        });   
    }

    function createLight(data,mapper){
        data.forEach(element =>{
            let light = new mapper[element.lightkey](...element.lightvalue);
            light.name = element.name;
            scene.add(light);
        });
    }  

    function createCamera(){
        camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight , 0.1 , 1000);
        camera.position.z = 800;
        camera.position.y = 0;
        camera.position.x = 0;
    }

    function scenerender(time){
        requestAnimationFrame( scenerender );
        camera.position.z = 1100 * Math.cos(time * 0.0005);
        camera.position.x = 200 * Math.sin(time * 0.005);
        renderer.render( scene , camera );
        
        
    }
})