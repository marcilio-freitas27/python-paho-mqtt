/* react */
import * as React from 'react';
import { Text, View, ScrollView } from 'react-native';

/* styles*/
import { styles } from './components/AssetExample';

export default function ListScreen() {
  const [mqtt, setMqtt] = React.useState([]);
  const conn = async () => {
    const res = await fetch('http://127.0.0.1:5000/getMessage');
    const data = await res.json();
    setMqtt(data);
  };

  // const conpost = async (topic, msg) => {
  //   const res2 = await fetch('http://127.0.0.1:5000/publish', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     topic : topic,
  //     msg : msg
  //   }),
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-type': 'application/json',
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((json) => console.log(json))
  //   .then(async () =>  {
  //     const data2 = await res2.json();
  //     setEmpresa(data2);
  //     }
  //   )
  // }

  React.useEffect(() => {
    conn();
    // conpost('/flas/mqtt', 'Oi flask mqtt');
  }, []);
  return (
    <View style={styles.container}>
      <Text>Mqtt - Message</Text>
      <ScrollView>
        {mqtt.map((msg) => {
          return (
            <>
              <View>
                <Text>
                  {'\n'}
                  Message: {msg}
                </Text>
                <Text></Text>
                <Text></Text>
              </View>
            </>
          );
        })}
      </ScrollView>
    </View>
  );
}
