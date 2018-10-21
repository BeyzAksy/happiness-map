import React, { Component } from 'react';
import { View, Text, ImageBackground, Dimensions, Image, TouchableOpacity } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

import Button from '../commons/Button';

const { width, height } = Dimensions.get('window');

class Form extends Component {

  renderSection(text, onPress) {
    return (
        <TouchableOpacity
        onPress={ onPress }
        >
          <View style={styles.section}>
            <View style={{ flex: 1, justifyContent: 'space-between',
              flexDirection: 'row', alignItems: 'center' }}>

              <Text style={{ flex: 9, textAlign: 'center' }}>{text}</Text>
              <Image source={require('../img/ok.png')} />

            </View>
        </View>
        </TouchableOpacity>
      
    );
  }
  renderPickerButton(text){
    return (
      <View>

        <View style={styles.pickerButtonStyle}>
          <Image source={require('../img/add.png')} />
        </View>

        <Text style={styles.pickerTextStyle}>{text}</Text>

      </View>
     
    );
  }

  openSearchModal(type) {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        console.log(place);
        // place represents user's selection from the
        // suggestions and it is a simplified Google Place object.
      })
      .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  render() {
    return (
      <ImageBackground
        source={require('../img/bg.png')} 
        style={{ width, height, alignItems: 'center',
        justifyContent: 'center' }}
      >
      <Image source={require('../img/logo.png')} />

      {this.renderSection('konumunuz',
          () => this.openSearchModal('my'))}
      {this.renderSection('sevdiceğin konumu',
          () => this.openSearchModal('love'))}
      
      <View style={styles.PickerMainViewStyle}>
        {this.renderPickerButton(' senin fotoğrafın')}
        {this.renderPickerButton('sevdiceğin fotoğrafı')}
      </View>
      
      <Button text='Yol Haritası Oluştur' />

      </ImageBackground>
    );
  }
}
const styles = {
  section: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: width*0.59,
    height: height*0.05,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  PickerMainViewStyle: {
    flexDirection: 'row',
    marginTop: 20,
    width: width * 0.59,
    justifyContent: 'space-between'
  },
  pickerButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: width*0.24,
    height: width*0.24,
    borderRadius: (width * 0.24)/2
  },
  pickerTextStyle: { 
    marginTop: 10, 
    color: 'white', 
    width: width * 0.24, 
    textAlign: 'center' 
  }
};

export default Form;
