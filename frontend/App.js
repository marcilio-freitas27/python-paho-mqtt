/* react */
import * as React from 'react';
import { Text, View, ScrollView, StatusBar } from 'react-native';
import {useEffect,useState} from 'react'

/* styles*/
import { styles } from './components/AssetExample';

export default function ListScreen() {
  const [mqtt, setMqtt] = React.useState([]);
  const conn = async () => {
    const res = await fetch('/getMessage');
    const data = await res.json();
    setMqtt(data);
  };

  const [data, setData] = useState('Initializing...')

  useEffect(() => {
    
    const sse = new EventSource('/stream')

    function handleStream(e){
      console.log(e)
      setData(e.data)
    }

    sse.onmessage = e =>{handleStream(e)}

    sse.onerror = e => {
      //GOTCHA - can close stream and 'stall'
      sse.close()
    }

    return () => {
      sse.close()
      
    }
  }, )  

  React.useEffect(() => {
    conn();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Mqtt - Message</Text>
      <Text>data: {data}</Text>
      <ScrollView>
        {mqtt.map((msg) => {
          return (
            <>
              <View>
                <Text>
                  {'\n'}
                  Message: {msg}
                </Text>
              </View>
            </>
          );
        })}
      </ScrollView>
    </View>
  );
}
