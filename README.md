
# Atividade - Aplicação com Mqtt

***

### Sobre a aplicação

- O Flask dispõe de uma biblioteca chamada **flask_mqtt**
para criar uma comunicação com o protocolo MQTT. Nossa 
API foi criada a partir dessa, estabelecendo uma conexão via 
método **@mqtt_client.on_connect()** e exibindo as mensagens via
**@mqtt_client.on_message()**.

- Como extra, exibimos as mensagens recebidas na tela da aplicação
com **Javascript** e **React Native**, na qual puxava os dados
com o método **getMessage**. 

- Além de públicar as mensagens através da inscrição em um tópico
do broker escolhido, criamos um método **publish** para públicar
da nossa aplicação para as demais que estavam conectadas.


***
### Gráfico

- Abaixo um pequeno esquema de como funciona a configuração básica do Mqtt na nossa aplicação.

```mermaid

    graph TB

    subgraph Connection Mqqt
        config(Flask Api Config Mqtt) --> 
        connection(Connection) --> Topic:test
        connection(Connection) --> RequestCode:0
        connection(Connection) --> Broker:'broker.emqx.io'
        connection(Connection) --> Port:1883
    end

    subgraph Client Communication
        client(Client Subscribe) --> Topic:test
        client(Client Subscribe) --> send
        send(Send Message) --> Payload
        Payload --> message(Message)
    end

    subgraph FrontEnd
        header(Header - Mqtt)
        message --> screen(Show received messages)    
    end

```

***
### Imagens

- Abaixo algumas imagens dos resultados obtidos

***

- Capturando as mensagens 

![imagem](img/show-messages-get.PNG)

- Publicação com a API

![imagem](img/publish.PNG)

- Desconhecidos conectados ao tópico e broker atuais

![imagem](img/messages-another-client.PNG)


- Frontend
![imagem](img/mensagens-frontend.PNG)