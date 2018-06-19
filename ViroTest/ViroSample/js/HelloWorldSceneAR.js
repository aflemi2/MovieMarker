'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroImage,
  ViroConstants,
} from 'react-viro';


export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing mARco...",
      points: []
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  _onInitialized(state) {
    const success = (pos) => {
      const crd = pos.coords;
      const latitude = crd.latitude.toFixed(6);
      const longitude = crd.longitude.toFixed(6);
      fetch(`https://api.tomtom.com/search/2/nearbySearch/.JSON?key=X00cnasclWOj31PE35FcEmTYJO7TEAYl&lat=${latitude}&lon=${longitude}&radius=100`)
        .then(result => {
          return result.json();
        })
        .then(data => {
          this.setState({ text: data.results[0].poi.name, points: data.results });
        });
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    if (state == ViroConstants.TRACKING_NORMAL) {

      navigator.geolocation.getCurrentPosition(success, error, options);
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }



  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        {
          this.state.points.map((point, index) => <ViroText key={point.id} text={point.poi.name} scale={[.5, .5, .5]} position={[0, 0, index]} style={styles.helloWorldTextStyle} />)
        }
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, -2, -2]} style={styles.helloWorldTextStyle} />
        <ViroImage
          position={[0, .5, -2]}
          height={2}
          width={2}
          placeholderSource={require("./res/MovieMarkerLogo.png")}
          source={require("./res/MovieMarkerLogo.png")}
        />
        <ViroImage
          position={[2, 1, -2]}
          height={2}
          width={2}
          placeholderSource={require("./res/StayPuff.jpg")}
          source={require("./res/StayPuff.jpg")}
        />
      </ViroARScene>
    );
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;



// 'use strict';

// import React, { Component } from 'react';
// import {StyleSheet} from 'react-native';
// import {
//   ViroARScene,
//   ViroText,
//   ViroMaterials,
//   ViroBox,
//   Viro3DObject,
//   ViroAmbientLight,
//   ViroSpotLight,
//   ViroARPlaneSelector,
//   ViroNode,
//   ViroAnimations,
// } from 'react-viro';
// var createReactClass = require('create-react-class');
// var HelloWorldSceneAR = createReactClass({
//   getInitialState() {
//     return {
//       text : "Initializing AR..."
//     };
//   },

//   render: function() {
//     return (
//       <ViroARScene onTrackingInitialized={()=>{this.setState({text : "Hello World!"})}}>
//         <ViroText text={this.state.text} scale={[.1, .1, .1]} height={1} width={4} position={[0, .5, -1]} style={styles.helloWorldTextStyle} />

//         <ViroAmbientLight color={"#aaaaaa"} />
//         <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]} position={[0, 3, 1]} color="#ffffff" castsShadow={true} />

//           <Viro3DObject
//             source={require('./res/emoji_smile/emoji_smile.vrx')}
//             position={[0, 0, -1]}
//             scale={[.2, .2, .2]}
//             type="VRX"
//             dragType="FixedDistance" onDrag={()=>{}}
//           />

//       </ViroARScene>
//     );
//   },
// });

// var styles = StyleSheet.create({
//   helloWorldTextStyle: {
//     fontFamily: 'Arial',
//     fontSize: 50,
//     color: '#ffffff',
//     textAlignVertical: 'center',
//     textAlign: 'center',
//   },
// });

// module.exports = HelloWorldSceneAR;
