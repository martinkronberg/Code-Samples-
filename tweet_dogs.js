/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
//Type Node.js Here :)

//Load twit module
var Twit = require('twit');

//create connection to the twitter api - enter your token info below!
var T = new Twit({
  consumer_key:  'CONSUMER KEY HERE',
  consumer_secret:  'CONSUMER SECRET KEY HERE',
  access_token: 'ACCESS TOKEN HERE',
  access_token_secret: 'SECRET ACCESS TOKEN HERE'
});

//Load servo module.
var servoModule = require("jsupm_servo");

//Instantiate ES08A Servo module on GPIO 5
var servo = new servoModule.ES08A(5);

//Instantiate ES08A Servo module on GPIO 6
var servo2 = new servoModule.ES08A(6);

//Load lcd module
var lcd = require('jsupm_i2clcd');

//Instantiate LCD JHD1313 module on the i2c bus
var display = new lcd.Jhd1313m1(0, 0x3E, 0x62);
	

//dog name twitter hashtags that the code will monitor for
var dog1 = '#fluffythedog';
var dog2 = '#rickthedog';

//begin twitter stream tracking the hashtags specified above 
var stream = T.stream('statuses/filter', { track: [dog1, dog2] })

var dog1_tweets = 0;
var dog2_tweets = 0;

//Servo angles that the dogs will tilit their heads to  
var angle1=0;
var angle2=150;

//begin code block that will run when the stream registers a tweet 
stream.on('tweet', function (tweet) {
    var text_body = tweet['text'];
	
	//if the tweet contains hashtag for dog1:
	if (text_body.search(dog1) != -1){
	
	dog1_tweets = dog1_tweets + 1;
    console.log(tweet['text'])
    console.log('dog 1 tweets: ' + dog1_tweets);

	//LCD controls 
	display.setColor(225, 60, 0);	
	display.setCursor(0,0);
    display.write(dog1_tweets + ' <3 Me! RUFF!');;
	display.setCursor(1,0);
	display.write('TY ' + tweet.user['name'] + '         ');
	
	//Servo controls 
	setTimeout(function() {
	servo.setAngle(0);
	},0);

	setTimeout(function() {
	servo.setAngle(150);
	},500);

	setTimeout(function() {
	servo.setAngle(0);
	},1000);

	setTimeout(function() {
	servo.setAngle(150);
	},1500);
	}

	//if the tweet contains hashtag for dog2:
	else if (text_body.search(dog2) != -1){
	
	dog2_tweets = dog2_tweets + 1;
    console.log(tweet['text'])
    console.log(dog2 + ' tweets: ' + dog2_tweets);

	//LCD controls
	display.setColor(0, 60, 255);	
	display.setCursor(0,0);
    display.write(dog2_tweets + ' <3 Me! RUFF!');
	display.setCursor(1,0);
	display.write('TY ' + tweet.user['name'] + '         ');

	//servo controls 
	setTimeout(function() {
	servo2.setAngle(0);
	},0);

	setTimeout(function() {
	servo2.setAngle(150);
	},500);

	setTimeout(function() {
	servo2.setAngle(0);
	},1000);

	setTimeout(function() {
	servo2.setAngle(150);
	},1500);
	};
	}); 




