#include <WiFiEspClient.h>
#include <WiFiEsp.h>
#include <PubSubClient.h>
#include "SoftwareSerial.h"
#include <dht11.h>
#include <Servo.h>

#define WIFI_AP "Apartamento"
#define WIFI_PASSWORD "gaboselacome"
#define TOKEN "YOUR_ACCESS_TOKEN"

WiFiEspClient espClient;
PubSubClient client(espClient);
SoftwareSerial esp8266(11,12); // make RX Arduino line is pin 2, make TX Arduino line is pin 3.

Servo servoSoap;

dht11 DHT;
#define DHT11_PIN 4
int chk;
char ssid[] = "Apartamento";
char pass[] = "gaboselacome";
char server[] = "m16.cloudmqtt.com";
char srv_user[] = "lnyscicw";
char srv_pass[] = "rp1de-LikTTt";
int port = 12758;

char device_id[] = "device1";

int status = WL_IDLE_STATUS;
unsigned long lastSend;

void(* resetFunc) (void) = 0; //declare reset function @ address 0

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  String entry="";
  String data="";
  String params[3];
  for (int i = 0; i < length; i++) {
    entry=entry+(char)payload[i];
  }
  Serial.println(entry);
  data = entry.substring(entry.indexOf(']')+1, entry.lastIndexOf(' '));
  //Serial.println(data);
  
  int parser1 = data.indexOf(','); //finds location of first 
  int parser2 = data.indexOf(',', parser1+1 ); //finds location of second 
  int parser3 = data.indexOf(',', parser2+1 ); //finds location of third 
  params[0] = data.substring( 0,parser1); //captures water level data 
  params[1] = data.substring( parser1+1,parser2); //captures soap data 
  params[2] = data.substring( parser2+1,parser3); //captures water temp data 

  double openPumpTime;
  if(params[0] == "25"){
    openPumpTime = 10000;
  } else if(params[0] == "50"){
    openPumpTime = 20000;
  } else if(params[0] == "75"){
    openPumpTime = 30000;
  } else {
    openPumpTime = 40000;
    Serial.println(openPumpTime);
  }
  
  if(params[2] == "c"){
    digitalWrite(2, LOW);
    if(params[1] == "t"){
      delay(openPumpTime/2);
      digitalWrite(2, HIGH);
      digitalWrite(10, HIGH);
      //servoSoap.write(25);
      delay(3000);
      //servoSoap.write(90);
      digitalWrite(10, LOW);
      digitalWrite(2, LOW);
      delay(openPumpTime/2);
      digitalWrite(2, HIGH);
    } else{
      delay(openPumpTime);
      digitalWrite(2, HIGH);
    }
  } else if(params[2] == "h"){
    digitalWrite(3, LOW);
    if(params[1] == "t"){
      delay(openPumpTime/2);
      digitalWrite(3, HIGH);
      digitalWrite(10, HIGH);
      //servoSoap.write(25);
      delay(3000);
      //servoSoap.write(90);
      digitalWrite(10, LOW);
      digitalWrite(3, LOW);
      delay(openPumpTime/2);
      digitalWrite(3, HIGH);
    } else{
      delay(openPumpTime);
      digitalWrite(3, HIGH);
    }
  } else if(params[2] == "w"){
    digitalWrite(2, LOW);
    digitalWrite(3, LOW);
    if(params[1] == "t"){
      delay(openPumpTime/2);
      digitalWrite(2, HIGH);
      digitalWrite(3, HIGH);
      digitalWrite(10, HIGH);
      //servoSoap.write(25);
      delay(3000);
      //servoSoap.write(90);
      digitalWrite(10, LOW);
      digitalWrite(2, LOW);
      digitalWrite(3, LOW);
      delay(openPumpTime/2);
      digitalWrite(2, HIGH);
      digitalWrite(3, HIGH);
    } else{
      delay(openPumpTime);
      digitalWrite(2, HIGH);
      digitalWrite(3, HIGH);
    }
  } else{
    modeAuto(params[1], openPumpTime);
  }
}


void setup() {
  esp8266.begin(9600);
  Serial.begin(9600);
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(13, OUTPUT);
  servoSoap.attach(8);
  digitalWrite(2, HIGH);
  digitalWrite(3, HIGH);
  digitalWrite(10, LOW);
  digitalWrite(13, HIGH);
  servoSoap.write(25);
  InitWiFi();
  client.setServer( server, port );
  client.setCallback(callback);
  Serial.println("Configuracion exitosa");
}


void loop(){
  status = WiFi.status();
  if ( status != WL_CONNECTED) {
    while ( status != WL_CONNECTED) {
      Serial.print("Attempting to connect to WPA SSID: ");
      Serial.println(WIFI_AP);
      // Connect to WPA/WPA2 network
      status = WiFi.begin(WIFI_AP, WIFI_PASSWORD);
      delay(500);
    }
    Serial.println("Connected to AP");
  }
 
  if ( !client.connected() ) {
    reconnect();
  }

//  if ( millis() - lastSend > 2000 ) { // Update and send only after 1 seconds
//    pub();
//    lastSend = millis();
//  }
  delay(1000);

  client.loop();
}

void InitWiFi(){
  // initialize serial for ESP module
  esp8266.begin(9600);
  // initialize ESP module
  WiFi.init(&esp8266);
  // check for the presence of the shield
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    // don't continue
    Serial.println("resetting");
    resetFunc();  //call reset
  }

  Serial.println("Connecting to AP ...");
  // attempt to connect to WiFi network
  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to WPA SSID: ");
    Serial.println(WIFI_AP);
    // Connect to WPA/WPA2 network
    status = WiFi.begin(WIFI_AP, WIFI_PASSWORD);
    delay(500);
  }
  Serial.println("Connected to AP");
}

void pub(){
  String payload = "{";
  payload += "\"pump1\":"; payload += "ON";
  payload += "}";

  // Send payload
  char attributes[100];
  payload.toCharArray( attributes, 100 );
  client.publish( "/home/smartshower", attributes );
  Serial.println( attributes );
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Connecting to CloudMQTT node ...");
    // Attempt to connect (clientId, username, password)
    if ( client.connect("device1", "device1", "12345") ) {
      client.subscribe("/home/smartshower");
      Serial.println( "[DONE]" );
    } else {
      Serial.print( "[FAILED] [ rc = " );
      Serial.print( client.state() );
      Serial.println( " : retrying in 5 seconds]" );
      // Wait 5 seconds before retrying
      delay( 5000 );
    }
  }
}

void modeAuto(String soap, double openPumpTime){
  int temp = 0;
  for(int i = 0; i < 10; i++){
    chk = DHT.read(DHT11_PIN);
    //Serial.println("Temperature is ");
    //Serial.println(DHT.temperature,1);
    temp = temp + DHT.temperature;
    delay(200);
  }
  int avgTemp = temp/10;
  Serial.print("Temperature: ");
  Serial.print(avgTemp);
  Serial.println("°C");
  if(avgTemp < 15){
    Serial.println( "Hot water" );
    digitalWrite(3, LOW);
    if(soap == "t"){
      delay(openPumpTime/2);
      digitalWrite(3, HIGH);
      digitalWrite(10, HIGH);
      //servoSoap.write(25);
      delay(3000);
      //servoSoap.write(90);
      digitalWrite(10, LOW);
      digitalWrite(3, LOW);
      delay(openPumpTime/2);
      digitalWrite(3, HIGH);
    } else{
      delay(openPumpTime);
      digitalWrite(3, HIGH);
    }
  } else if(avgTemp >= 15 && avgTemp<25){
    Serial.println( "Warm water" );
    digitalWrite(2, LOW);
    digitalWrite(3, LOW);
    if(soap == "t"){
      delay(openPumpTime/2);
      digitalWrite(2, HIGH);
      digitalWrite(3, HIGH);
      digitalWrite(10, HIGH);
      //servoSoap.write(25);
      delay(3000);
      //servoSoap.write(90);
      digitalWrite(10, LOW);
      digitalWrite(2, LOW);
      digitalWrite(3, LOW);
      delay(openPumpTime/2);
      digitalWrite(2, HIGH);
      digitalWrite(3, HIGH);
    } else{
      delay(openPumpTime);
      digitalWrite(2, HIGH);
      digitalWrite(3, HIGH);
    }
  } else{
    Serial.println( "Cold water" );
    digitalWrite(2, LOW);
    if(soap == "t"){
      delay(openPumpTime/2);
      digitalWrite(2, HIGH);
      digitalWrite(10, HIGH);
      //servoSoap.write(25);
      delay(3000);
      //servoSoap.write(90);
      digitalWrite(10, LOW);
      digitalWrite(2, LOW);
      delay(openPumpTime/2);
      digitalWrite(2, HIGH);
    } else{
      delay(openPumpTime);
      digitalWrite(2, HIGH);
    }
  }
}
