import React from "react";
import DayJS from "../../libs/dayjs";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Body, Button, List, ListItem, Right, Text } from "native-base";
import { setDetail } from "../../actions";
import { getAllFilteredWarnings, getAllWarnings } from "../../selectors";
import SoapImage from "../../assets/images/soap.svg";
import commonColor from "../../native-base-theme/variables/commonColor";
import contactLengthText from "../../helpers/contactLengthText";

function WarningList({ setDetailTrigger, filteredWarnings }) {
  if (filteredWarnings.length === 0) {
    return (
      <View style={styles.introWrapper}>
        <SoapImage width={220} style={styles.image} />
        <Text style={styles.title}>No warning</Text>
        <Text style={styles.subTitle}>
          There is currently no contact reported.
        </Text>
      </View>
    );
  }
  return (
    <List>
      {filteredWarnings.map((item, i) => (
        <ListItem key={i}>
          <Body>
            <Text>{item.title}</Text>
      
            <Text note numberOfLines={2}>
              {item.matches && item.matches.length >= 1 ? contactLengthText(item.duration) : "no contact found"}
            </Text>
          </Body>
          <Right>
            <Text numberOfLines={2} style={styles.date}>
              {DayJS(item.position.time).fromNow(true)}
            </Text>
            <Button transparent onPress={() => setDetailTrigger(i)}>
              <Text>Details</Text>
            </Button>
          </Right>
        </ListItem>
      ))}
    </List>
  );
}

const styles = StyleSheet.create({
  date: {
    color: "#000",
    marginBottom: 12
  },
  introWrapper: {
    height: 540,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    marginTop: -90,
    marginBottom: 10,
    width: 300,
    height: 300
  },
  title: {
    fontSize: 30,
    marginTop: -70,
    marginBottom: 10
  },
  subTitle: {
    textAlign: "center",
    fontSize: 15,
    color: commonColor.textColorLight,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 20
  }
});

const mapStateToProps = state => {
  return {
    warnings: getAllWarnings(state),
    filteredWarnings: getAllFilteredWarnings(state)
  };
};

const mapDispatchToProps = dispatch => ({
  setDetailTrigger: id => dispatch(setDetail(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(WarningList);
