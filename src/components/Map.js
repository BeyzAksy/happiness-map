import React, { Component } from 'react';
import { View, Text } from 'react-native';

import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

class Map extends Component {
    state= {
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
    }

    componentWillMount(){
        console.log(this.props.data);
        const { yourLangLat } = this.props.data;

        this.setState({
            region: {
                latitude: yourLangLat[0],
                longitude: yourLangLat[1],
                latitudeDelta: 7,
                longitudeDelta: 7,
            },
        })
    }
    render() {
        const { yourLangLat, loveLangLat } = this.props.data;

        const origin = { latitude: yourLangLat[0], longitude: yourLangLat[1] };
        const destination = { latitude: loveLangLat[0], longitude: loveLangLat[1] };
        const GOOGLE_MAPS_APIKEY = 'AIzaSyAXoWKPTU-dgr9SzSFQoH_ts6oPEqW7F2I ';
        return(
            <View style={{ flex:1, backgroundColor:'green' }} >
                <MapView
                    style={{ flex:1 }}
                    region={this.state.region}
                >
                    <Marker coordinate={ origin } />
                    <Marker coordinate={ destination } />
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={6}
                        strokeColor="hotpink"
                    />
                </MapView>
            </View>
        );
    }
}

export default Map;