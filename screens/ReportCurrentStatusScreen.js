import React, { Component } from "react";
import { Linking, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { Text } from "react-native-elements";
import { Button, CheckBox, Form, Icon, Switch } from "native-base";
import Colors from "../constants/Colors";
import { ScrollView } from "react-native-gesture-handler";

class ReportCurrentStatusScreen extends Component {
  constructor(props) {
    super(props);
  }
  
  state = {
    temperature: 36.0
  };
  
  componentDidMount() {
  
  }
  
  render() {
    const { detail } = this.props;
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.wrapper}>
          <Form>
            
            <Text style={{ marginBottom: 20 }}>
              Trage hier deinen aktuellen Gesundheitsstatus ein
            </Text>
            
            <Text>Körpertemperatur</Text>
            <CheckBox />
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1, height: 50 }}>
                {<Button transparent onPress={() => this.setState((state) => {
                  return { temperature: state.temperature - 0.1 }
                })}>
                  <Icon type="AntDesign" name='minuscircle' style={{ color: '#007AFF' }} />
                </Button>}
              </View>
              <View style={{ flex: 3, height: 50 }}>
                <Text
                  style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold' }}>
                  {this.state.temperature.toFixed(1)} °C
                </Text>
              </View>
              <View style={{ flex: 1, height: 50 }}>
                <Button transparent onPress={() => this.setState((state) => {
                  return { temperature: state.temperature + 0.1 }
                })}>
                  <Icon type="AntDesign" name='pluscircle' style={{ color: '#007AFF' }} />
                </Button>
              </View>
            </View>
            
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 4, height: 50 }}>
                <Text>Bist du in Quarantäne?</Text>
              </View>
              <View style={{ flex: 1, height: 50 }}>
                <Switch value={false} style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }} />
              </View>
            </View>
            
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 4, height: 50 }}>
                <Text>Datenübermittlung</Text>
                <Text style={{ fontSize: 12 }}>
                  Lokale Speicherung auf deinem iPhone
                </Text>
              </View>
              <View style={{ flex: 1, height: 50 }}>
                <Switch value={false} style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }} />
              </View>
            </View>
            
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 5, height: 50 }}>
                <Button
                  style={{ backgroundColor: '#007AFF', borderRadius: 15 }}
                  // onPress={handleSubmit(onSubmit)}
                >
                  <Text style={{ width: '100%', textAlign: 'center', color: '#fff' }}>
                    Speichern
                  </Text>
                </Button>
              </View>
            </View>
            
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Text
                style={{ fontSize: 10, color: 'blue' }}
                onPress={() => Linking.openURL('https://covapp.charite.de/')}
              >
                Alternativ spezifischen Fragenkatalog beantworten in Zusammenarbeit mit der Charité
              </Text>
              {/*<ChariteImage style={styles.chariteLogo} />*/}
            </View>
          
          </Form>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 50,
    marginRight: 50,
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
  container: {
    flex: 1,
    backgroundColor: "#fdfdfd"
  },
  contentContainer: {
    paddingTop: 15
  },
  optionIconContainer: {
    marginRight: 12
  },
  option: {
    backgroundColor: "#fdfdfd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: "#ededed"
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  optionText: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 1
  }
});

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(ReportCurrentStatusScreen);
