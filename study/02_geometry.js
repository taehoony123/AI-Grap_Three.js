import * as THREE from '../build/three.module.js';

import {OrbitControls} from '../examples/jsm/controls/OrbitControls.js'

class App{
    constructor(){
        //webgl-container를 this.div로 받아 여기서 사용할 수 있게 함
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;

        const renderer = new THREE.WebGL1Renderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);

        this._renderer = renderer;

        const scene = new THREE.Scene();
        this._scene = scene;

        //  사용할 클래스를 import 하고 클래스 사용
        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));

    }
    _setupCamera(){
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        );
        camera.position.z = 2;
        this._camera = camera;    
    }
    _setupLight(){
        const color = 0xffffff;
        const intensity = 5;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
    }

    //orbitControl 객체를 생성할 때에 카메라 객체와 Dom요소가 필요
    _setupControls() {
        new OrbitControls(this._camera, this._divContainer);
    }


    _setupModel(){
        // const geometry에서 모든 도형과 각도 등등 설정 가능 ex)box , cylinder , circle , sphere 등등
        const geometry = new THREE.BoxGeometry(1,1,1,2,2,2);//가로세로깊이 크기가 1
        const fillMaterial = new THREE.MeshPhongMaterial({color: 0x515151});//회색색상
        const cube = new THREE.Mesh(geometry, fillMaterial);

        const lineMaterial = new THREE.LineBasicMaterial({color : 0xffff00});//노란색 선
        const line = new THREE.LineSegments( // 라인 타입의 오브젝트 사용
            new THREE.WireframeGeometry(geometry),lineMaterial);
        
        const group = new THREE.Group() //mesh와 line을 하나의 오브젝트로 다루기위해 묶음
        group.add(cube); // 면
        group.add(line);   //노란 선

        this._scene.add(group) //Group 개체를 scene에 포함
        this._cube = group
    }
    resize(){
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }
    render(time){
        this._renderer.render(this._scene, this._camera);
        this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }
    update(time){ 
        time *= 0.001;

        //자동으로 회전하게 만드는 부분
        //this._cube.rotation.x = time;
        //this._cube.rotation.y = time;
    }
}

window.onload = function(){
    new App()
}