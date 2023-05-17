from flask import Flask, request
from flask_mqtt import Mqtt
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
lista = [];

app.config['MQTT_BROKER_URL'] = 'broker.emqx.io'
app.config['MQTT_BROKER_PORT'] = 1883
app.config['MQTT_USERNAME'] = ''  
app.config['MQTT_PASSWORD'] = ''  
app.config['MQTT_KEEPALIVE'] = 5  
app.config['MQTT_TLS_ENABLED'] = False  
topic = 'test'

mqtt_client = Mqtt(app)

@mqtt_client.on_connect()
def handle_connect(client, userdata, flags, rc):
   if rc == 0:
      print('Connected successfully')
      mqtt_client.subscribe(topic) # subscribe topic
   else:
      print('Bad connection. Code:', rc)

@mqtt_client.on_message()
def handle_mqtt_message(client, userdata, message):
   data = dict(
      topic=message.topic,
      payload=message.payload.decode()
  )
   print('Received message on topic: {topic} with payload: {payload}'.format(**data))
   mensagem = '{payload}'.format(**data)
   lista.append(mensagem)

@app.route('/getMessage', methods=['GET'])
def get_message():
   return lista
 
@app.route('/publish', methods=['POST'])
def publish_message():
   request_data = request.get_json()
   publish_result = mqtt_client.publish(request_data['topic'], request_data['msg'])
   print({request_data['topic'], request_data['msg']}, publish_result)
   return request_data['msg']

if __name__ == '__main__':
   app.run(host='0.0.0.0', port=5000, debug=True)

