import React,{Component}from "react"
import { 
    View,
    Text,
    Alert,
    StyleSheetProperties,
    FlatList,
    SafeAreaView,
    Platform,
    StatusBar,
    ImageBackground,
    Image,
    Dimensions
 } from "react-native"
import axios from 'axios';
import { Dimensions } from "react-native";
export default class MeteorScreen extends Component{
 constructor(){
    super();
    this.state = {
        meteors:{}
    }
 }

 getMeteors =() => {
    axios.get('https://api.nasa.gov/neo/rest/v1/feed?api_key=aafX3wmvDL6nf8bH7t3t4ZRNeeul1rb7QojBTBqC')
    .then(response => {
        this.setState({
            meteors: response.data.near_earth_objects
        })
    }).catch(error =>{
        Alert.alert(error.message)
    })
 };

 keyExtractor = (item,index) => {
   index.toString()
 }

 renderItem = ({item})=>{
  var bgImg,gifSpeed,size;
  if(item.threat_score){
    bgImage = require('../assets/meteor-bg1.png')
    gifSpeed = require('../assets/meteor_speed1.gif')
    size = 100
  }else if(item.threat_score <=75){
    bgImage = require('../assets/meteor-bg2.png')
    gifSpeed = require('../assets/meteor_speed2.gif')
    size = 150
  }else{
    bgImage = require('../assets/meteor-bg3.png')
    gifSpeed = require('../assets/meteor_speed3.gif')
    size = 200
  }

return(
    <View>
        <ImageBackground source = {bgImg} style={styles.bgStyle}>
            <View style={styles.gifContainer}>
                <Image source = {gifSpeed} style ={{width:size,height:size,alignSelf:'center'}}/>
            </View>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardText}>Mais próximo da Terra:{item.close_approach_data[0].close_approach_date_full}</Text>
            <Text style={styles.cardText}>Diâmetro mínimo(KM):{item.estimated_diameter.kilometers.estimated_diameter_min}</Text>
            <Text style={styles.cardText}>Diâmetro máximo(KM):{item.estimated_diameter.kilometers.estimated_diameter_max}</Text>
            <Text style={styles.cardText}>Velocidade (KM/H):{item.close_approach_data[0].relative_velocity.kilometers_per_hour}</Text>
            <Text style={styles.cardText}>Distância da Terra (KM):{item.close_approach_data[0].miss_distance.kilometers}</Text>
        </ImageBackground>
    </View>

)

 }

 componentDidMount(){
    this.getMeteors()
 }
    render(){
       if(Object.keys(this.state.meteors).length === 0){
        return(
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text>Carregando os dados dos meteoros...</Text>
            </View>
        )
       }else{
       var meteorArray = Object.keys(this.state.meteors).map(meteor_date =>{
        return this.state.meteors[meteor_date]
       })

       var meteors = [].concat.apply([],meteorArray)

       meteors.forEach(function(element){
        var diameter = (element.estimated_diameter.kilometers.estimated_diameter_max + element.estimated_diameter.kilometers.estimated_diameter_min)/2
        var threatScore = (diameter/element.close_approach_data[0].miss_distance.kilometers)*1000000000
        element.threat_score=threatScore;
       });

       meteors.sort(function(a,b){
        return b.threat_score - a.threat_score
       })

       meteors = meteors.slice(0,5)

        return(
            <View style={StyleSheet.container}>
                <SafeAreaView style={styles.droidSafeArea}/>
                <FlatList
                data = {meteors}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                horizontal = {true}
                />
            </View>
        )
       }
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        
    },
    droidSafeArea: {
        marginTop: Platform.O5 === "android" ? StatusBar.currenHeight : 0,
      },
    bgStyle:{
        flex:1,
        resizeMode:'cover',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height
    },
    gifContainer: { 
        justifyContent: "center", 
        alignItems: "center", 
        flex: 1 
    },
    cardTitle: { 
        fontSize: 20, 
        marginBottom: 10, 
        fontWeight: "bold", 
        color: "white", 
        marginTop: 400, 
        marginLeft: 50 
    },
    cardText: { 
        color: "white", 
        marginTop: 5, 
        marginLeft: 50 
    },
})