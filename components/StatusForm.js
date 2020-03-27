import React, { useState } from 'react';
import { StyleSheet, View, Alert, Linking } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";

import { clearAll, reportCase } from "../actions";
import { getAllPositions, getAllTracks } from "../selectors";
import Colors from "../constants/Colors";
import ChariteImage from "../assets/images/charite.svg";

import realm from 'realm';

import {
  Button,
  Text,
    Icon,
    Switch,
} from "native-base";

function ReportForm({ reportCaseTrigger, positions }) {
  const { control, handleSubmit, errors } = useForm();
  const [temp, setTemp] = useState(37);
  const [quarantine, setQuarantine] = useState(false);
  const [upload, setUpload] = useState(false);
  const saveData = () => {
    Alert.alert("Data submitted");

  }
  const updateTemp = (val) => {
    const newTemp = parseFloat(temp)+val;
    setTemp(newTemp.toFixed(1))
  }



  return (
    <View style={styles.wrapper}>

          <Text style={{marginBottom:20}}>
            Trage hier deinen aktuellen Gesundheitsstatus ein
          </Text>

          <Text>Körpertemperatur</Text>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1, height: 50}}>
              <Button transparent onPress={() => updateTemp(-0.1)}>
                <Icon type="AntDesign" name='minuscircle' style={{color: '#007AFF'}} />
              </Button>
            </View>
            <View style={{flex: 3, height: 50}} >
              <Text style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold'}}>{temp} °C</Text>
            </View>
            <View style={{flex: 1, height: 50}}>
                <Button transparent onPress={() => updateTemp(0.1)}>
                <Icon type="AntDesign" name='pluscircle' style={{color: '#007AFF'}} />
              </Button>
            </View>
          </View>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 4, height: 50}} >
              <Text >Bist du in Quarantäne?</Text>
            </View>
            <View style={{flex: 1, height: 50}}>
              <Switch value={quarantine} thumbColor={quarantine ? "#007AFF" : null} trackColor={{true: "#007AFFAA", false: null}} onValueChange={() => setQuarantine(!quarantine)} style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }} />
            </View>
          </View>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 4, height: 50}} >
              <Text>Datenübermittlung</Text>
              <Text style={{fontSize: 12}}>Lokale Speicherung auf deinem iPhone</Text>
            </View>
            <View style={{flex: 1, height: 50}}>
              <Switch value={upload} onValueChange={() => setUpload(!upload)} style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }} />
            </View>
          </View>

          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 5, height: 50}} >
              <Button  style={{backgroundColor: '#007AFF', borderRadius: 15}} onPress={saveData}>
                <Text style={{textAlign: 'center'}}>Speichern</Text>
              </Button>
            </View>
          </View>

        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
              <Text  style={{ fontSize: 10, color: 'blue'}}
                     onPress={() => Linking.openURL('https://covapp.charite.de/')}>
                alternativ spezifischen Fragenkatalog beantworten in Zusammenarbeit mit der Charité
              </Text>
            <ChariteImage style={styles.chariteLogo}/>
          </View>

    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 50,
    marginRight: 50
  },
  hintText: {
    margin: 12,
    marginTop: 30,
    marginBottom: 0,
    fontSize: 13,
    color: Colors.middleText
  },
  submitWrapper: {
    margin: 13,
  },
  inputWrapper: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#CCC",
    backgroundColor: "#fff",
    marginTop: 10
  },
  chariteLogo: {
    width: 150,
    height: 150
  },
});

const mapStateToProps = state => {
  return {
    positions: getAllPositions(state)
  };
};

const mapDispatchToProps = dispatch => ({
  //reportCaseTrigger: data => dispatch(reportCase(data))
  reportCaseTrigger: data => dispatch(reportCase(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportForm);
