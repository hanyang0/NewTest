Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4NzM5NjZjZC1mYjY2LTQ5YTEtOTY0Ni0zYzBmM2YwOTM5YmYiLCJpZCI6MTk1OTQsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJnYyJdLCJpYXQiOjE1NzU4NzgzMzF9.eZ0FL7BHtgX9wPq0lyf34JEhh-0qxkrLi06l58vNYZg';
    
var viewer = new Cesium.Viewer("cesiumContainer", {
  //  animation: false,  //是否显示动画控件
  //  baseLayerPicker: false, //是否显示图层选择控件
  //  geocoder: false, //是否显示地名查找控件
  //  timeline: false, //是否显示时间线控件
  //  sceneModePicker: false, //是否显示投影方式控件
  // navigationHelpButton: false, //是否显示帮助信息控件
//   infoBox: false,  //是否显示点击要素之后显示的信息
terrainProvider : Cesium.createWorldTerrain()
  // imageryProvider : new Cesium.WebMapTileServiceImageryProvider({
  //     url: "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
  //     layer: "tdtVecBasicLayer",
  //     style: "default",
  //     format: "image/jpeg",
  //     tileMatrixSetID: "GoogleMapsCompatible",
  //     show: false
  // })
});
//viewer.imageryLayers.get(0).show = false;
//viewer.scene.globe.imageryLayers.removeAll();
// viewer.scene.globe.baseColor = Cesium.Color.BLACK;


//http://localhost:8087/Apps/3dtiles4.html

// var viewModel = {
//     height:-16,
//   };
//    Cesium.knockout.track(viewModel);

//  var toolbar = document.getElementById("toolbar");
//  Cesium.knockout.applyBindings(viewModel, toolbar);

// viewer.scene.globe.depthTestAgainstTerrain = true;
// //加载倾斜摄影数据
// var url ="";
// "111/tileset.json";
// var tileset = new Cesium.Cesium3DTileset({
//     url: url
//   });
  
// var primitive = viewer.scene.primitives.add(tileset);
// primitive.readyPromise.then(function (t) {
//   var originalSphere = t.boundingSphere;
//   var radius = originalSphere.radius;
//   viewer.zoomTo(t, new Cesium.HeadingPitchRange(0.5, -0.5, radius * 4.0));
//   fixGltf();
// }).otherwise(function (error) {
//   var msg = JSON.stringify(error);
//   console.log(msg);
// });



var options = {
  camera : viewer.scene.camera,
  canvas : viewer.scene.canvas,
  screenOverlayContainer:viewer.container,
  clampToGround: true //开启贴地
};
viewer.dataSources.add(Cesium.KmlDataSource.load('Smx2_PS_60_1_LayerToKML.kmz', options)).then(function(dataSource){
  viewer.clock.shouldAnimate = false;
  var rider = dataSource.entities.getById('tour');
  viewer.flyTo(rider).then(function(){
      viewer.trackedEntity = rider;
      viewer.selectedEntity = viewer.trackedEntity;
      viewer.clock.multiplier = 30;
      viewer.clock.shouldAnimate = true;
      viewer.zoomTo(dataSource.entities,new Cesium.HeadingPitchRange(
                  0.0,
                  -0.5,
                  0)
      );
      // viewer.zoomTo(
      //   rider,
      //     new Cesium.HeadingPitchRange(
      //       0.0,
      //       -0.5,
      //       rider.boundingSphere.radius * 2.0
      //     )
      // )
      // ;
  });
});




// var tileset=viewer.scene.groundPrimitives.add(new Cesium.Cesium3DTileset({
//     url: url,//此处填写tileset url地址
// }));
// tileset.readyPromise
//   .then(function (tileset) {
//     viewer.scene.primitives.add(tileset);
//     // viewer.zoomTo(
//     //   tileset,
//     //   new Cesium.HeadingPitchRange(
//     //     0.0,
//     //     -0.5,
//     //     tileset.boundingSphere.radius * 2.0
//     //   )
//    // )
//    // ;
//     var cartographic = Cesium.Cartographic.fromCartesian(
//         tileset.boundingSphere.center
//       );
//       var surface = Cesium.Cartesian3.fromRadians(
//         cartographic.longitude,
//         cartographic.latitude,
//         0.0
//       );
//       var offset = Cesium.Cartesian3.fromRadians(
//         cartographic.longitude,
//         cartographic.latitude,
//         -16
//       );
//       var translation = Cesium.Cartesian3.subtract(
//         offset,
//         surface,
//         new Cesium.Cartesian3()
//       );
//       tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);

//       var entity = viewer.entities.add({
//           position: tileset.boundingSphere.center ,
//           point: {
//               color: Cesium.Color.RED,    //点位颜色
//               pixelSize: 5                //像素点大小
//           },
//           description:"倾斜影像",  
//           name:"倾斜影像",
//           label : {
//               text : '倾斜影像',
//               font : '14pt Source Han Sans CN',    //字体样式
//               fillColor:Cesium.Color.white,        //字体颜色
//               backgroundColor:null,    //背景颜色
//               showBackground:true,                //是否显示背景颜色
//               style: Cesium.LabelStyle.FILL_AND_OUTLINE,        //label样式
//               outlineWidth : 2,                  
//               verticalOrigin : Cesium.VerticalOrigin.CENTER,//垂直位置
//               horizontalOrigin :Cesium.HorizontalOrigin.LEFT,//水平位置
//               pixelOffset:new Cesium.Cartesian2(20,-20)            //偏移
//           }
//       });
//   })  .otherwise(function (error) {
//     console.log(error);
//   });

// Cesium.knockout
//   .getObservable(viewModel, "height")
//   .subscribe(function (height) {
//     height = Number(height);
//     if (isNaN(height)) {
//       return;
//     }

//     var cartographic = Cesium.Cartographic.fromCartesian(
//       tileset.boundingSphere.center
//     );
//     var surface = Cesium.Cartesian3.fromRadians(
//       cartographic.longitude,
//       cartographic.latitude,
//       0.0
//     );
//     var offset = Cesium.Cartesian3.fromRadians(
//       cartographic.longitude,
//       cartographic.latitude,
//       height
//     );
//     var translation = Cesium.Cartesian3.subtract(
//       offset,
//       surface,
//       new Cesium.Cartesian3()
//     );
//     tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
//   });


 










var fixGltf = function(gltf) {
if (!gltf.extensionsUsed) {
    return;
}
var v = gltf.extensionsUsed.indexOf('KHR_technique_webgl');
var t = gltf.extensionsRequired.indexOf('KHR_technique_webgl');
// 中招了。。
if (v !== -1) {
    gltf.extensionsRequired.splice(t, 1, 'KHR_techniques_webgl');
    gltf.extensionsUsed.splice(v, 1, 'KHR_techniques_webgl');
    gltf.extensions = gltf.extensions || {};
    gltf.extensions['KHR_techniques_webgl'] = {};
    gltf.extensions['KHR_techniques_webgl'].programs = gltf.programs;
    gltf.extensions['KHR_techniques_webgl'].shaders = gltf.shaders;
    gltf.extensions['KHR_techniques_webgl'].techniques = gltf.techniques;
    var techniques = gltf.extensions['KHR_techniques_webgl'].techniques;

    gltf.materials.forEach(function (mat, index) {
        gltf.materials[index].extensions['KHR_technique_webgl'].values = gltf.materials[index].values;
        gltf.materials[index].extensions['KHR_techniques_webgl'] = gltf.materials[index].extensions['KHR_technique_webgl'];

        var vtxfMaterialExtension = gltf.materials[index].extensions['KHR_techniques_webgl'];

        for (var value in vtxfMaterialExtension.values) {
            var us = techniques[vtxfMaterialExtension.technique].uniforms;
            for (var key in us) {
                if (us[key] === value) {
                    vtxfMaterialExtension.values[key] = vtxfMaterialExtension.values[value];
                    delete vtxfMaterialExtension.values[value];
                    break;
                }
            }
        };
    });

    techniques.forEach(function (t) {
        for (var attribute in t.attributes) {
            var name = t.attributes[attribute];
            t.attributes[attribute] = t.parameters[name];
        };

        for (var uniform in t.uniforms) {
            var name = t.uniforms[uniform];
            t.uniforms[uniform] = t.parameters[name];
        };
    });
}
}

Object.defineProperties(Cesium.Model.prototype, {
_cachedGltf: {
    set: function (value) {
        this._vtxf_cachedGltf = value;
        if (this._vtxf_cachedGltf && this._vtxf_cachedGltf._gltf) {
            fixGltf(this._vtxf_cachedGltf._gltf);
        }
    },
    get: function () {
        return this._vtxf_cachedGltf;
    }
}
});

