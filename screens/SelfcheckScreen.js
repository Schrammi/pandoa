import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

import { Button, CheckBox, Icon, Switch, Text } from "native-base";
import Colors from "../constants/Colors";

export default class ReportAddScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: 36.5,
      fieber: false,
      husten: false,
      covidTest: false,
      transfer: false
    };
  }
  
  handleSubmit() {
    console.log(this.state)
  }
  
  
  componentDidMount() {
  
  }
  
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={[styles.textView, { fontWeight: "bold", textAlign: 'center', marginTop: 20 }]}>
            Führe einen{"\n"}
            Selbstcheck durch
          </Text>
          
          <Text style={[styles.textView, { marginTop: 30, marginBottom: 15 }]}>
            Körpertemperatur
          </Text>
          <View style={{ flex: 1, flexDirection: 'row', marginBottom: 40 }}>
            <View style={{ flex: 1, height: 50 }}>
              <Button
                transparent
                onPress={() => this.setState((state) => {
                  return { temperature: state.temperature - 0.1 }
                })}
              >
                <Icon
                  type="AntDesign"
                  name='minuscircle'
                  style={{ color: Colors.tintColor, transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                />
              </Button>
            </View>
            <View style={{ flex: 3, height: 50 }}>
              <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>
                {this.state.temperature.toFixed(1)} °C
              </Text>
            </View>
            <View style={{ flex: 1, height: 50 }}>
              <Button
                transparent
                onPress={() => this.setState((state) => {
                  return { temperature: state.temperature + 0.1 }
                })}
              >
                <Icon
                  type="AntDesign"
                  name='pluscircle'
                  style={{ color: Colors.tintColor, transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                />
              </Button>
            </View>
          </View>
          
          <View style={{ flex: 1, flexDirection: 'row', marginBottom: 15 }}>
            <View style={{ flex: 14, height: 50 }}>
              <Text style={styles.textView}>Hast du Fieber?</Text>
            </View>
            <View style={{ flex: 1, height: 50 }}>
              <Switch
                value={this.state.fieber}
                thumbColor={this.state.fieber ? "#007AFF" : null}
                trackColor={{ true: "#007AFFAA", false: null }}
                onValueChange={(val) => this.setState({ fieber: val })}
                style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
              />
            </View>
          </View>
          
          <View style={{ flex: 1, flexDirection: 'row', marginBottom: 15 }}>
            <View style={{ flex: 14, height: 50 }}>
              <Text style={styles.textView}>Hast du Husten?</Text>
              <Text style={{ fontSize: 15 }}>(trockener Husten)</Text>
            </View>
            <View style={{ flex: 1, height: 50 }}>
              <Switch
                value={this.state.husten}
                thumbColor={this.state.husten ? "#007AFF" : null}
                trackColor={{ true: "#007AFFAA", false: null }}
                onValueChange={(val) => this.setState({ husten: val })}
                style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
              />
            </View>
          </View>
          
          <View style={{ flex: 1, flexDirection: 'row', marginBottom: 15 }}>
            <View style={{ flex: 14, height: 50 }}>
              <Text style={styles.textView}>
                COVID-19 Test{"\n"}
                durchgeführt?
              </Text>
            </View>
            <View style={{ flex: 1, height: 50 }}>
              <Switch
                value={this.state.covidTest}
                thumbColor={this.state.covidTest ? "#007AFF" : null}
                trackColor={{ true: "#007AFFAA", false: null }}
                onValueChange={(val) => this.setState({ covidTest: val })}
                style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
              />
            </View>
          </View>
          
          <View style={{ flex: 1, flexDirection: 'row', marginTop: 15, marginBottom: 25 }}>
            <View style={{ flex: 1 }}>
              <CheckBox
                checked={this.state.transfer}
                onPress={() => {
                  this.setState({ transfer: !this.state.transfer })
                }}
              />
            </View>
            <View style={{ flex: 8 }}>
              <Text style={{ fontSize: 14 }}>
                Ich bin mit einer anonymisierter Übermittlung meiner Daten einverstanden, es werden keine
                personenbezogenen Daten in PANDOA zugänglich für andere Nutzer gemacht.
              </Text>
            </View>
          </View>
          
          <Button
            style={{ marginBottom: 50, textAlign: 'center' }}
            onPress={() => this.handleSubmit()}
          >
            <Text>Übermitteln</Text>
          </Button>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingRight: 40,
    paddingLeft: 40
  },
  textView: {
    fontSize: 20
  }
});
