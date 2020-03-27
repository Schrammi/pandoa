import React from "react";
import { connect } from "react-redux";
import { Circle, Marker, Polyline } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { getAllPositions, getAllTracks, getAllWarnings } from "../../selectors";
import latLngDistance from "../../helpers/latLngDistance";
import contactLengthText from "../../helpers/contactLengthText";
import commonColor from "../../native-base-theme/variables/commonColor";
import { setDetail } from "../../actions";

const diffCalc = (position, track) => {
  const distance = latLngDistance(
    track.lat,
    track.lng,
    position.lat,
    position.lng,
    "M"
  );

  const timeDifference = Math.abs(
    Date.parse(position.time) - Date.parse(track.time)
  );
  return { distance, timeDifference };
};

const options = {
  weekday: "short",
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric"
};

const MapHistory = ({ positions, setDetailTrigger, warnings }) => {
  const lines = positions.map(point => {
    return {
      latitude: point.lat ? point.lat : 0,
      longitude: point.lng ? point.lng : 0
    };
  });
  
  const connectedPoints = warnings;
  
  const concatPoints = [];
  connectedPoints.forEach((position) => {
    const foundSimilar = concatPoints.findIndex(existingPoint => {
      const diff = diffCalc(position, existingPoint);
      if (diff.distance <= 100 && diff.timeDifference <= 1000 * 60 * 60 * 2) {
        return true;
      }
    });
    if (foundSimilar === -1) {
      concatPoints.push(position);
    }
  });

  const circle = positions.map((point, index) => {
    const coordinates = {
      longitude: point.lng,
      latitude: point.lat
    };
    return (
      <Circle
        key={index}
        strokeColor={commonColor.brandPrimary}
        center={coordinates}
        fillColor={commonColor.brandPrimary}
        radius={Platform.OS === "ios" ? 0.3 : 0.1}
      />
    );
  });

  const connectedLines = connectedPoints.map((point, index) => {
    if (point.matches && point.matches.length >= 1) {
      return point.matches.map((e, i) => (
        <Polyline
          key={`${i}-${index}`}
          coordinates={[
            { latitude: point.position.lat, longitude: point.position.lng },
            { latitude: e.lat, longitude: e.lng }
          ]}
          strokeColor="rgba(255,0,0,0.1)" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={["rgba(255,0,0,0.5)", "rgba(255,168,12,0.8)"]}
          strokeWidth={15.5}
        />
      ));
    }
  });

  const points = connectedPoints.map((point, index) => {
    const coordinates = {
      longitude: point.position.lng,
      latitude: point.position.lat
    };

    return (
      <Marker
        key={index}
        anchor={Platform.OS === "ios" ? { x: 0, y: 0 } : { x: 0.53, y: 0.53 }}
        coordinate={coordinates}
        onCalloutPress={() => setDetailTrigger(point)}
        title={`${new Date(point.position.time).toLocaleDateString(
          "de-DE",
          options
        )}`}
        description={contactLengthText(point.duration)}
      >
        {point.matches.length >= 1 ? (
          <View style={styles.matchCircle}>
            <View style={styles.matchCircleBackground}></View>
            <View style={styles.matchCircleInner}></View>
          </View>
        ) : (
          <View style={styles.historyCircle} />
        )}
      </Marker>
    );
  });

  //
  //
  //
  return (
    <React.Fragment>
      <Polyline
        coordinates={lines}
        geodesic={true}
        // strokeColor={Colors.tintColor}  fallback for when `strokeColors` is not supported by the map-provider
        strokeWidth={2}
        strokeColor="rgba(0,122,255,0.7)"
      />
      {circle}
      {connectedLines}
      {points}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    warnings: getAllWarnings(state),
    positions: getAllPositions(state),
    tracks: getAllTracks(state)
  };
};

const mapDispatchToProps = dispatch => ({
  setDetailTrigger: id => dispatch(setDetail(id))
});

const styles = StyleSheet.create({
  historyCircle: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: commonColor.brandPrimary
  },
  matchCircle: {
    width: Platform.OS === "ios" ? 40 : 30,
    height: Platform.OS === "ios" ? 40 : 30,
    borderRadius: 50
  },
  matchCircleBackground: {
    position: "absolute",
    width: Platform.OS === "ios" ? 40 : 30,
    height: Platform.OS === "ios" ? 40 : 30,
    borderRadius: 50,
    opacity: 0.1,
    backgroundColor: commonColor.brandDanger
  },
  matchCircleInner: {
    position: "absolute",
    width: Platform.OS === "ios" ? 12 : 12,
    height: Platform.OS === "ios" ? 12 : 12,
    left: Platform.OS === "ios" ? 14 : 10,
    top: Platform.OS === "ios" ? 14 : 10,
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 25 / 2,
    backgroundColor: commonColor.brandDanger
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapHistory);
