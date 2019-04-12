//#include <WiFiEspClient.h>
//#include <WiFiEsp.h>
#include "WiFiEsp.h"

#ifndef HAVE_HWSERIAL1
#include "SoftwareSerial.h"
SoftwareSerial Serial1(11, 12);//esp8266(11,12); // make RX Arduino line is pin 2, make TX Arduino line is pin 3.
#endif

#include <dht11.h>
#include <Servo.h>
#include <PubSubClient.h>

#define WIFI_AP "Apartamento"
#define WIFI_PASSWORD "gaboselacome"
#define TOKEN "YOUR_ACCESS_TOKEN"

WiFiEspClient client;//espClient;
PubSubClient clientMQTT(client);


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

char URL[] = "worldclockapi.com";
String message = "";

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
  }
  
  if(params[2] == "c"){
    httpPost(openPumpTime);
    digitalWrite(2, LOW);
    if(params[1] == "t"){
      delay(openPumpTime/2);
      digitalWrite(2, HIGH);
      digitalWrite(10, HIGH);
      //servoSoap.write(25);
      servoMove(25);
      delay(3000);
      servoMove(90);
      //servoSoap.write(90);
      digitalWrite(10, LOW);
      digitalWrite(2, LOW);
      delay(openPumpTime/2);
      digitalWrite(2, HIGH);
    } else{
      delay(openPumpTime);
      digitalWrite(2, HIGH);
    }
    Serial.println("resetting");
    digitalWrite(13, LOW);
    resetFunc();  //call reset
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
  } else if(params[2] == "a"){
    modeAuto(params[1], openPumpTime);
  }
}


void setup() {
  Serial.begin(9600);
  Serial1.begin(9600);
  //esp8266.begin(9600);
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(13, OUTPUT);
  pinMode(9, OUTPUT);
  digitalWrite(9, LOW);
  digitalWrite(2, HIGH);
  digitalWrite(3, HIGH);
  digitalWrite(10, LOW);
  digitalWrite(13, HIGH);
  servoMove(10);
  InitWiFi();
  clientMQTT.setServer( server, port );
  clientMQTT.setCallback(callback);
  Serial.println("Configuracion exitosa");
  getDate();
  httpPost(40000.0);
}


void loop(){
  
  //Serial.println(message);
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

  
 
  if ( !clientMQTT.connected() && !client.connected()) {
    reconnect();
  }
  delay(1000);
  clientMQTT.loop();
}

void InitWiFi(){
  // initialize serial for ESP module
  //Serial1.begin(9600);
  // initialize ESP module
  WiFi.init(&Serial1);
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
  clientMQTT.publish( "/home/smartshower", attributes );
  Serial.println( attributes );
}

void reconnect() {
  // Loop until we're reconnected
  while (!clientMQTT.connected()) {
    Serial.print("Connecting to CloudMQTT node ...");
    // Attempt to connect (clientId, username, password)
    if ( clientMQTT.connect("device1", "device1", "12345") ) {
      clientMQTT.subscribe("/home/smartshower");
      Serial.println( "[DONE]" );
    } else {
      Serial.print( "[FAILED] [ rc = " );
      Serial.print( clientMQTT.state() );
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

void servoMove(int ang){
  for(int i = 0; i < 180; i++){
    float pause;
    pause = ang*2000.0/180.0 + 700;
    digitalWrite(9, HIGH);
    delayMicroseconds(pause);
    digitalWrite(9, LOW);
    delayMicroseconds(25000-pause);
  }
}

String getDate(){
  clientMQTT.disconnect();
  int index = 0;
  if(client.connect(URL, 80)){
    Serial.println("Connected to URL");
    client.println("GET /api/json/est/now HTTP/1.1");
    client.println("Host: worldclockapi.com");
    client.println("Connection: close");
    client.println();
    while (client.available()) {
      char c = client.read();
      if (c == '$' || message!=""){
        message += c;
        index+=1;
      }
    }
    message=message.substring(28, 38);
    Serial.println(message);
  }
  return message;
}
void httpPost(double timeInUse){
  double liters = (100*timeInUse)/(1000*3600);
  String strLiters = String(liters); 

  clientMQTT.disconnect();
  String content = "date=11-04-2019&liters=4";
  Serial.println(content);
  char server[] = "quiet-snake-88.localtunnel.me";
  if(client.connect(server, 80)){
    Serial.println("Connected to URL");
    client.println("POST /api/v1/statistics HTTP/1.1");
    client.println("Host: quiet-snake-88.localtunnel.me");
    client.println("Content-Type: application/x-www-form-urlencoded");
    client.println();
    client.println("date=11-04-2019&liters=4");
  }
  
  
}
