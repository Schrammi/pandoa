import React, { Component } from "react";
import MapView from "react-native-maps";
import { connect } from "react-redux";
import { getAllPositions } from "../../selectors";
import { Button, Icon } from "react-native-elements";
import { StyleSheet } from "react-native";

class PaddedMapView extends Component {
  
  _getPoints = () => this.props.positions.map(point => ({ longitude: point.lng, latitude: point.lat }));
  
  fitToPoints = () => {
    if (!this.props.positions || this.props.positions.length === 0) return null;
    this.ref.fitToCoordinates(
      this._getPoints(),
      {
        edgePadding: {
          top: 30,
          right: 30,
          bottom: 100,
          left: 30
        },
        animated: false
      }
    );
  };
  
  render() {
    return (
      <>
        <MapView
          ref={map => {
            this.ref = map;
          }}
          onLayout={this.fitToPoints}
          {...this.props}
        />
        <Button
          onPress={this.fitToPoints}
          icon={
            <Icon type="material-community" name="crosshairs-gps" size={25} />
          }
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.containerStyle}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "white",
    borderRadius: 50
  },
  containerStyle: {
    position: "absolute",
    top: "12%",
    right: "7%"
  }
});

const mapStateToProps = state => {
  return {
    positions: getAllPositions(state)
  };
};

export default connect(mapStateToProps)(PaddedMapView);
