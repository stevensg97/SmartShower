#include <WiFiEspClient.h>
#include <WiFiEsp.h>
#include <PubSubClient.h>
#include "SoftwareSerial.h"

#define WIFI_AP "Presion"
#define WIFI_PASSWORD "nigguplease"
#define TOKEN "YOUR_ACCESS_TOKEN"

WiFiEspClient espClient;
PubSubClient client(espClient);
SoftwareSerial esp8266(11,12); // make RX Arduino line is pin 2, make TX Arduino line is pin 3.


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
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  // Switch on the LED if an 1 was received as first character
  if ((char)payload[0] == '1') {
    digitalWrite(2, LOW);   // Turn the LED on (Note that LOW is the voltage level
    delay(10000);
    Serial.println("resetting");
    delay(200);
    digitalWrite(13, LOW);
    resetFunc();  //call reset
  } else if((char)payload[0] == '2'){
    digitalWrite(2, HIGH);  // Turn the LED off by making the voltage HIGH
  } else if((char)payload[0] == '3'){
    digitalWrite(3, LOW);  // Turn the LED off by making the voltage HIGH
    delay(10000);
    Serial.println("resetting");
    delay(200);
    digitalWrite(13, LOW);
    resetFunc();  //call reset
  } else if((char)payload[0] == 'h'){
    digitalWrite(10, HIGH);
  } else if((char)payload[0] == 'l'){
    digitalWrite(10, LOW);
  } else{
    digitalWrite(2, LOW);
    digitalWrite(3, LOW);
    delay(10000);
    digitalWrite(2, HIGH);
    digitalWrite(3, HIGH);
    Serial.println("resetting");
    delay(200);
    digitalWrite(13, LOW);
    resetFunc();  //call reset
  }

}


void setup() {
  esp8266.begin(9600);
  Serial.begin(9600);
  pinMode(2, OUTPUT);
  pinMode(3, OUTPUT);
  pinMode(10, OUTPUT);
  pinMode(13, OUTPUT);
  digitalWrite(2, HIGH);
  digitalWrite(3, HIGH);
  digitalWrite(10, LOW);
  digitalWrite(13, HIGH);
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
