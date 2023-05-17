/* react */
import * as React from 'react';
import { Text, View, ScrollView, StatusBar } from 'react-native';

/* styles*/
import { styles } from './components/AssetExample';

export default function ListScreen() {
  const [mqtt, setMqtt] = React.useState([]);
  const conn = async () => {
    const res = await fetch('http://127.0.0.1:5000/getMessage');
    const data = await res.json();
    setMqtt(data);
  };

  React.useEffect(() => {
    conn();
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
              </View>
            </>
          );
        })}
      </ScrollView>
    </View>
  );
}
