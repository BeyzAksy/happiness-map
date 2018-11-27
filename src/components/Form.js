import React, { Component } from 'react';
import { View, Text, ImageBackground, Dimensions, Image, TouchableOpacity } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import ImagePicker from 'react-native-image-picker';

import Button from '../commons/Button';

const { width, height } = Dimensions.get('window');

class Form extends Component {

  state = {
    yourLocation: '',
    loveLocaiton: '',
    yourimgOk: require('../img/ok.png'),
    loveimgOk: require('../img/ok.png'),
    yourLangLat: [],
    loveLangLat: [],
    myPhoto: '',
    lovePhoto: ''
  }

  componentWillMount(){
      this.setState({
        yourLocation: 'konumunuz',
        loveLocaiton: 'sevdiceğin konumu',
        yourimgOk: require('../img/ok.png'),
        loveimgOk: require('../img/ok.png')
        
      })
  }

  renderSection(text, onPress, img) {
    return (
        <TouchableOpacity
        onPress={ onPress }
        >
          <View style={styles.section}>
            <View style={{ flex: 1, justifyContent: 'space-between',
              flexDirection: 'row', alignItems: 'center' }}>

              <Text style={{ flex: 9, textAlign: 'center' }}>{text}</Text>
              <Image source={ img } />

            </View>
        </View>
        </TouchableOpacity>
      
    );
  }

  showPhoto(type, text, onPress){
    return(
      <TouchableOpacity
        onPress={onPress}
      >
        <Image
          source={type === 'my'? this.state.myPhoto : this.state.lovePhoto}
          style={styles.photoStyle} />

        <Text style={styles.pickerTextStyle}>{text}</Text>

      </TouchableOpacity>     
    )
  }

  renderPickerButton(text, onPress){
    return (
      <TouchableOpacity
      onPress={ onPress }
      >

        <View style={styles.pickerButtonStyle}>
          <Image source={require('../img/add.png')} />
        </View>

        <Text style={styles.pickerTextStyle}>{text}</Text>

      </TouchableOpacity>
     
    );
  }

  openSearchModal(type) {
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        console.log(place);
        if(type === 'my') {
          this.setState({ 
            yourLocation: place.name,
            yourimgOk: require('../img/check.png'),
            yourLangLat: [place.latitude, place.longitude]})
        } else {
          this.setState({ 
            loveLocaiton: place.name,
            loveimgOk: require('../img/check.png'),
            loveLangLat: [place.latitude, place.longitude]})
        }
      })
      .catch(error => console.log(error.message));  // error is a Javascript Error object
  }

  openImagePicker(type){
    const options = {
      title: 'Fotoğraf Seç',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      takePhotoButtonTitle: 'Fotoğraf Çek',
      chooseFromLibraryButtonTitle: 'Galeriden Seç',
      cancelButtonTitle: 'Kapat',
      maxWidth:500,
      maxHeight:500,
      quality:0.5
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {  

        const source = { uri: response.uri };

        if(type === 'my'){
          this.setState({
            myPhoto: source,
          });
        }else {
          this.setState({
            lovePhoto: source,
          });
        }
      }
    });

  }

  render() {
    return (
      <ImageBackground
        source={require('../img/bg.png')} 
        style={{ width, height, alignItems: 'center',
        justifyContent: 'center' }}
      >
      <Image source={require('../img/logo.png')} />

      {this.renderSection(this.state.yourLocation,
          () => this.openSearchModal('my'),
          this.state.yourimgOk)}
      {this.renderSection(this.state.loveLocaiton,
          () => this.openSearchModal('love'),
          this.state.loveimgOk)}
      
      <View style={styles.PickerMainViewStyle}>

        {this.state.myPhoto !== '' ?
          this.showPhoto('my',' senin fotoğrafın',
          () => this.openImagePicker('my')) :         
          this.renderPickerButton(' senin fotoğrafın',
          () => this.openImagePicker('my'))
        }

        {this.state.lovePhoto !== '' ?
          this.showPhoto('love','sevdiceğin fotoğrafı',
          () => this.openImagePicker('love')) :
          this.renderPickerButton('sevdiceğin fotoğrafı',
          () => this.openImagePicker('love'),)
        }

      </View>
      
      <Button text='Yol Haritası Oluştur' />

      </ImageBackground>
    );
  }
}
const styles = {
  photoStyle:{
    width: width * 0.24,
    height: width * 0.24,
    borderRadius: (width * 0.24) / 2
  },
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
