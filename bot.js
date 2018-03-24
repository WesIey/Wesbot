/*To-do:
	- rob players
	- upgradable farm
	- hm against someone <player chooses word
	- blackjack
	- eco set
	- bal <player
	- level <player
	- leveltop
	- shop? <level/bal required
	- combine bal and level into !stats
	- xp till level up
	- quiz
	- total messages server/person
	- randomfacts
	- now playing <
*/

var mongoose = require('mongoose');
  
db = mongoose.connect("mongodb://userone:" + process.env.MONGOPASS + "@ds223019.mlab.com:23019/discordbot");

//UserSchema
var UserSchema = mongoose.Schema({
  UserID: String,
  Name: String,
  Balance: Number,
  Level: Number,
  Xp: Number
});
var User = mongoose.model('User', UserSchema);

//SettingsSchema
var SettingSchema = mongoose.Schema({
	UserCount: Number,
	Words: Number
});
var Setting = mongoose.model('Setting', SettingSchema);

//WordSchema
var WordSchema = mongoose.Schema({
	Wordd: String,
	WordNr: Number
});
var Word = mongoose.model('Word', WordSchema);

const Discord = require('discord.js');
const client = new Discord.Client();

var hfrequest;
var hf;
var hfbet;
var hfplayer1;
var hfplayer2;
var stringarray;
var HigherLowerNr1;
var HigherLowerNr2;
var hl;
var hlAuthor;
var hlmsg;
var hlbet;
var testmsg;
var insult;
var test;
var emoji = [":white_check_mark:", ":x:", ""]
var insults = ["If laughter is the best medicine, your face must be curing the world.", "You're so ugly, you scared the crap out of the toilet.", "Your family tree must be a cactus because everybody on it is a prick.", "It's better to let someone think you are an Idiot than to open your mouth and prove it.", "If I had a face like yours, I'd sue my parents.", "Your birth certificate is an apology letter from the condom factory.", "I guess you prove that even god makes mistakes sometimes.", "The only way you'll ever get laid is if you crawl up a chicken's ass and wait.", "You're so fake, Barbie is jealous.", "I’m jealous of people that don’t know you!", "You're so ugly, when your mom dropped you off at school she got a fine for littering.", "If I wanted to kill myself I'd climb your ego and jump to your IQ.", "You must have been born on a highway because that's where most accidents happen.", "Brains aren't everything. In your case they're nothing.", "I don't know what makes you so stupid, but it really works.", "I can explain it to you, but I can’t understand it for you.", "Roses are red violets are blue, God made me pretty, what happened to you?", "Behind every fat woman there is a beautiful woman. No seriously, your in the way.", "Calling you an idiot would be an insult to all the stupid people.", "You, sir, are an oxygen thief!", "Some babies were dropped on their heads but you were clearly thrown at a wall.", "Don't like my sarcasm, well I don't like your stupid.", "Why don't you go play in traffic.", "Please shut your mouth when you’re talking to me.", "I'd slap you, but that would be animal abuse.", "They say opposites attract. I hope you meet someone who is good-looking, intelligent, and cultured.", "Stop trying to be a smart ass, you're just an ass.", "The last time I saw something like you, I flushed it.", "'m busy now. Can I ignore you some other time?", "If ugly were a crime, you'd get a life sentence.", "Your mind is on vacation but your mouth is working overtime.", "Why don't you slip into something more comfortable... like a coma.", "Shock me, say something intelligent.", "If your gonna be two faced, honey at least make one of them pretty.", "Keep rolling your eyes, perhaps you'll find a brain back there.", "You are not as bad as people say, you are much, much worse.", "I don't know what your problem is, but I'll bet it's hard to pronounce.", "There is no vaccine against stupidity.", "You're the reason the gene pool needs a lifeguard.", "Sure, I've seen people like you before - but I had to pay an admission.", "How old are you? - Wait I shouldn't ask, you can't count that high.", "Have you been shopping lately? They're selling lives, you should go get one.", "You're like Monday mornings, nobody likes you.", "All day I thought of you... I was at the zoo.", "You're so fat, you could sell shade.", "I'd like to see things from your point of view but I can't seem to get my head that far up my ass.", "Don't you need a license to be that ugly?", "Your house is so dirty you have to wipe your feet before you go outside.", "If you really spoke your mind, you'd be speechless.", "Stupidity is not a crime so you are free to go.", "You are so old, when you were a kid rainbows were black and white.", "If I told you that I have a piece of dirt in my eye, would you move?", "You so dumb, you think Cheerios are doughnut seeds.", "So, a thought crossed your mind? Must have been a long and lonely journey.", "You are so old, your birth-certificate expired.", "Every time I'm next to you, I get a fierce desire to be alone.", "You're so dumb that you got hit by a parked car.", "Keep talking, someday you'll say something intelligent!", "You're so fat, you leave footprints in concrete.", "How did you get here? Did someone leave your cage open?", "Pardon me, but you've obviously mistaken me for someone who gives a damn.", "Wipe your mouth, there's still a tiny bit of bullshit around your lips.", "Don't you have a terribly empty feeling - in your skull?", "As an outsider, what do you think of the human race?", "Just because you have one doesn't mean you have to act like one.", "Are you always this stupid or is today a special occasion?"];
var hm = ["https://i.imgur.com/S4gcxd1.png", "https://i.imgur.com/xF1qUoN.png", "https://i.imgur.com/jZM7V3E.png", "https://i.imgur.com/1rLTWlH.png", "https://i.imgur.com/9OS5Ijn.png", "https://i.imgur.com/0Ya931J.png", "https://i.imgur.com/3h9k90J.png"]
var hmword;
var hmactive;
var hmchannel;
var hmguess = ["default"]
var mistakes;
var hmmsg;
var channel;
var hmfullword;

//Ready event
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	var timertest = setInterval(myTimer, 10000);
	function myTimer() {
		client.user.setGame('with Wesleu');
		clearInterval(timertest);
	}
	//client.user.setGame("with Wesleu");
});

//NewMember event
client.on('guildMemberAdd', member => {
	// Send the message to a designated channel on a server:
	const channel = member.guild.channels.find('name', 'welcome');
	// Do nothing if the channel wasn't found on this server
	if (!channel) return;
	// Send the message, mentioning the member
	channel.send(`Welcome to the bestest discord server, ${member}`);
	var newuser = new User({ UserID: member.id, Name: member.displayName, Balance: 100, Level: 0, Xp: 0 });
	newuser.save(function (err, newuser) {
		if (err) return console.error(err);
	});
	Setting.findOne({}, function (err, setting) {
		if (err) return handleError(err);
		setting.UserCount = Number(setting.UserCount) + 1;
		setting.save();
	});
});

/*message.reply example
client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});*/

//NewMesage event
client.on('message', msg => {
	channel = msg.channel;
	var strmsg = msg.content.toLowerCase();
	
	//Xpgain
	if (msg.author.username != 'Wesbot') {
		User.findOne({ 'UserID': msg.author.id }, function (err, user) {
			if (err) return handleError(err);
			user.Xp = Number(user.Xp) + 1;
			user.save();
			//Check for levelup
			var xp = Number(user.Xp);
			//levels: 1, 10, 50, 100, 200, 300, ...1000
			var level;
			if (xp >=1000) {
				level = 13;
			}
			else if (xp >= 900) {
				level = 12;
			}
			else if (xp >= 800) {
				level = 11;
			}
			else if (xp >= 700) {
				level = 10;
			}
			else if (xp >= 600) {
				level = 9;
			}
			else if (xp >= 500) {
				level = 8;
			}
			else if (xp >= 400) {
				level = 7;
			}
			else if (xp >= 300) {
				level = 6;
			}
			else if (xp >= 200) {
				level = 5;
			}
			else if (xp >= 100) {
				level = 4;
			}
			else if (xp >= 50) {
				level = 3;
			}
			else if (xp >= 10) {
				level = 2;
			}
			else if (xp >= 1) {
				level = 1;
			}
			if (user.Level < level) {
				user.Level = Number(level);
				user.save();
				channel.send({embed: {
					color: 3447003,
					author: {
						name: msg.author.username,
						icon_url: msg.author.avatarURL
					},
					title: ":arrow_up: Level up!",
					description: "New level: " + level
				}});
			}
		});
		
	}
	
	//Find money
	if ((msg.author.username != 'Wesbot') && (Math.floor((Math.random() * 100) + 0) < 2)) {
		User.findOne({ 'UserID': msg.author.id }, function (err, user) {
		if (err) return handleError(err);
			var money = Math.floor((Math.random() * 50) + 20);
			user.Balance = user.Balance + money;
			user.save();
			Setting.findOne({}, function (err, setting) {
				if (err) return handleError(err);
				if (setting.Baltop1Bal < user.Balance) {
					setting.Baltop1Bal = user.Balance;
					setting.Baltop1Name = user.Name;
					setting.save();
				}
			});
			channel.send({embed: {
				color: 3447003,
				title: ':moneybag: ' + user.Name + " Got lucky and found $" + money
			}});
		});
	}
	
	//Higher-lower
	var res = strmsg.match('!hl');
	if (hl) {
		if (msg.author === hlAuthor) {
			if (strmsg === 'higher') {
				HigherLowerNr2 = Math.floor((Math.random() * 10) + 1);
				if (HigherLowerNr2 > HigherLowerNr1) {
					hlmsg.edit({embed: {
						color: 3447003,
						author: {
							name: msg.author.username,
							icon_url: msg.author.avatarURL
						},
						title: "Higher/lower",
						description: "Bet: $" + Number(hlbet).toLocaleString(),
						fields: [{
							name: "First number",
							value: HigherLowerNr1
							},
							{
							name: "Second number",
							value: HigherLowerNr2
							},
							{
							name: "Your answer",
							value: "Higher"
							},
							{
							name: HigherLowerNr2 + ' is higher than ' + HigherLowerNr1,
							value: ":white_check_mark: **You win!** +$" + Number(hlbet).toLocaleString()
							}
						]
					}});
					hl = false;
					User.findOne({ 'UserID': msg.author.id }, function (err, user) {
						if (err) channel.send('Error');
						user.Balance = Number(user.Balance) + Number(hlbet);
						user.save();
					});
				}
				else if (HigherLowerNr2 < HigherLowerNr1) {
					hlmsg.edit({embed: {
						color: 3447003,
						author: {
							name: msg.author.username,
							icon_url: msg.author.avatarURL
						},
						title: "Higher/lower",
						description: "Bet: $" + Number(hlbet).toLocaleString(),
						fields: [{
							name: "First number",
							value: HigherLowerNr1
							},
							{
							name: "Second number",
							value: HigherLowerNr2
							},
							{
							name: "Your answer",
							value: "Higher"
							},
							{
							name: HigherLowerNr2 + ' is lower than ' + HigherLowerNr1,
							value: ":x: **You lose!** -$" + Number(hlbet).toLocaleString()
							}
						]
					}});
					hl = false;
					User.findOne({ 'UserID': msg.author.id }, function (err, user) {
						if (err) return handleError(err);
						user.Balance = Number(user.Balance) - Number(hlbet);
						user.save();
						
					});
				}
				else if (HigherLowerNr2 === HigherLowerNr1) {
					hlmsg.edit({embed: {
						color: 3447003,
						author: {
							name: msg.author.username,
							icon_url: msg.author.avatarURL
						},
						title: "Higher/lower",
						description: "Bet: $" + Number(hlbet).toLocaleString(),
						fields: [{
							name: "First number",
							value: HigherLowerNr1
							},
							{
							name: "Second number",
							value: HigherLowerNr2
							},
							{
							name: "Your answer",
							value: "Higher"
							},
							{
							name: HigherLowerNr2 + ' equals ' + HigherLowerNr1,
							value: "**Draw**"
							}
						]
					}});
					hl = false;
				}
			}
			else if (strmsg === 'lower') {
				HigherLowerNr2 = Math.floor((Math.random() * 10) + 1);
				if (HigherLowerNr2 < HigherLowerNr1) {
					hlmsg.edit({embed: {
						color: 3447003,
						author: {
							name: msg.author.username,
							icon_url: msg.author.avatarURL
						},
						title: "Higher/lower",
						description: "Bet: $" + Number(hlbet).toLocaleString(),
						fields: [{
							name: "First number",
							value: HigherLowerNr1
							},
							{
							name: "Second number",
							value: HigherLowerNr2
							},
							{
							name: "Your answer",
							value: "Lower"
							},
							{
							name: HigherLowerNr2 + ' is lower than ' + HigherLowerNr1,
							value: ":white_check_mark: **You win!** +$" + Number(hlbet).toLocaleString()
							}
						]
					}});
					hl = false;
					User.findOne({ 'UserID': msg.author.id }, function (err, user) {
						if (err) return handleError(err);
						user.Balance = Number(user.Balance) + Number(hlbet);
						user.save();
						
					});
				}
				else if (HigherLowerNr2 > HigherLowerNr1) {
					hlmsg.edit({embed: {
						color: 3447003,
						author: {
							name: msg.author.username,
							icon_url: msg.author.avatarURL
						},
						title: "Higher/lower",
						description: "Bet: $" + Number(hlbet).toLocaleString(),
						fields: [{
							name: "First number",
							value: HigherLowerNr1
							},
							{
							name: "Second number",
							value: HigherLowerNr2
							},
							{
							name: "Your answer",
							value: "Lower"
							},
							{
							name: HigherLowerNr2 + ' is higher than ' + HigherLowerNr1,
							value: ":x: **You lose!** -$" + Number(hlbet).toLocaleString()
							}
						]
					}});
					hl = false;
					User.findOne({ 'UserID': msg.author.id }, function (err, user) {
		if (err) return handleError(err);
			user.Balance = Number(user.Balance) - Number(hlbet);
			user.save();
		});
				}
				else if (HigherLowerNr2 === HigherLowerNr1) {
					hlmsg.edit({embed: {
						color: 3447003,
						author: {
							name: msg.author.username,
							icon_url: msg.author.avatarURL
						},
						title: "Higher/lower",
						description: "Bet: $" + Number(hlbet).toLocaleString(),
						fields: [{
							name: "First number",
							value: HigherLowerNr1
							},
							{
							name: "Second number",
							value: HigherLowerNr2
							},
							{
							name: "Your answer",
							value: "Lower"
							},
							{
							name: HigherLowerNr2 + ' equals ' + HigherLowerNr1,
							value: "**Draw**"
							}
						]
					}});
					hl = false;
				}
			}
			else {
				//Wrong answer, has to be higher lower
			}
		}
		else {
			//Already someone playing
		}
	}
	else if (res == '!hl') {
		if (msg.content === '!hl') {
			channel.send("Please enter a bet when using this command");
		}
		else {
			var thing = strmsg.match('l (.+)');
			if (msg.author.username == "Wesbot") {
			}
			else {
				const splitAt = index => x => [x.slice(0, index), x.slice(index)]
				var newthing = splitAt(1)(thing);
				hlbet = newthing[1];
			}
			if (hlbet >= 1) {
				if (hlbet <= 100) {
					User.findOne({ 'UserID': msg.author.id }, function (err, user) {
						if (err) return handleError(err);
						if(user.Balance >= hlbet) {
							HigherLowerNr1 = Math.floor((Math.random() * 10) + 1);
							hl = true;
							hlAuthor = msg.author;
							hlmsg = {embed: {
								color: 3447003,
								author: {
									name: msg.author.username,
									icon_url: msg.author.avatarURL
								},
								title: "Higher/lower",
								description: "Bet: $" + Number(hlbet).toLocaleString(),
								fields: [{
									name: "First number",
									value: HigherLowerNr1
								}, {
									name: "Will the next number be higher or lower?",
									value: "Answer by typing higher or lower"
								}]
							}};
							channel.send(hlmsg).then((editthis)=>{
								hlmsg = editthis;
							});
						}
						else {
							channel.send(":x: You can't afford this bet");
						}
					});
				}
				else {
					channel.send(":x: Max. bet is $100");
				}
			}
			else {
				channel.send(":x: Bet has to be $1+");
			}
		}
	}
	
	//Insult
	res = strmsg.match('!insult');
	if (res == '!insult') {
		var mentions = msg.mentions.users.array();
		if (mentions[0] == undefined) {
			channel.send(":x: Please mention someone when executing this command");
		}
		else {
			var userid = mentions[0].id;
			insult = mentions[0].username;
			if (insult === 'Wesbot') {
				channel.send("So that's how much you like me :thinking:");
			}
			else {
				var randomnr = Math.floor((Math.random() * insults.length) + 0);
				channel.send('<@' + userid + '> ' + insults[randomnr] + ' :point_right::ok_hand:');
			}
		}
	}
	
	//Headflip
	res = strmsg.match('!hf');
	if (hf) {
		//Put hf event here
	}
	else if (hfrequest) {
		//Accept/decline here
		if (msg.author.username == hfplayer2) {
			if (msg.content == 'accept') {
				hfrequest = false;
				hf = true;
				//hf event
				var rand = Math.floor((Math.random() * 2) + 0)
				if (rand >= 1) {
					//Player1 won
					channel.send({embed: {
		color: 3447003,
		author: {
		name: "Headflip",
		},
		title: hfplayer1 + ' Won!',
		fields: [{
        name: ':white_check_mark: ' + hfplayer1 + ' + $' + Number(hfbet).toLocaleString(),
        value: ":x: " + hfplayer2 + ' - $' + Number(hfbet).toLocaleString()
		}
		]
		}});
		//change bals
					User.findOne({ 'Name': hfplayer1 }, function (err, user) {
		if (err) return handleError(err);
			user.Balance = Number(user.Balance) + Number(hfbet);
			user.save();
		});
					User.findOne({ 'Name': hfplayer2 }, function (err, user) {
		if (err) return handleError(err);
			user.Balance = Number(user.Balance) - Number(hfbet);
			user.save();
		});
					hf =false;
				}
				else {
					//Player2 won
					channel.send({embed: {
		color: 3447003,
		author: {
		name: "Headflip",
		},
		title: hfplayer2 + ' Won!',
		fields: [{
        name: ':white_check_mark: ' + hfplayer2 + ' + $' + Number(hfbet).toLocaleString(),
        value: ":x: " + hfplayer1 + ' - $' + Number(hfbet).toLocaleString()
		}
		]
		}});
		//change bals
					User.findOne({ 'Name': hfplayer1 }, function (err, user) {
		if (err) return handleError(err);
			user.Balance = Number(user.Balance) - Number(hfbet);
			user.save();
		});
					User.findOne({ 'Name': hfplayer2 }, function (err, user) {
		if (err) return handleError(err);
			user.Balance = Number(user.Balance) + Number(hfbet);
			user.save();
		});
					hf = false;
				}
			}
			else if (msg.content == 'decline') {
				hfrequest = false;
				hf = false;
			}
			else {
				//Has to reply with accept/decline
			}
		}
	}
	else if (res == '!hf') {
		//Request a hf here
		var mentions = msg.mentions.users.array();
		if (mentions[0] == undefined) {
			channel.send(":x: Please mention someone when executing this command");
		}
		else if (mentions[0].username == msg.author.username) {
			channel.send(":x: You can't hf yourself...");
		}
		else if ((mentions[0].username != 'Wesbot')) {
			hfplayer1 = msg.author.username;
			hfplayer2 = mentions[0].username;
			var thing = strmsg.match('> (.+)');
			const splitAt = index => x => [x.slice(0, index), x.slice(index)]
			var newthing = splitAt(1)(thing);
			thing = newthing[1];
			if (thing >= 1) {
				User.findOne({ 'UserID': msg.author.id }, function (err, user) {
					if (err) return handleError(err);
					if (user.Balance >= thing) {
						User.findOne({ 'Name': hfplayer2 }, function (err, user2) {
							if (err) return handleError(err);
							if (user2.Balance >= thing) {
								hfrequest = true;
								hfbet = thing;
								channel.send('<@' + user2.UserID + '>, ' + hfplayer1 + ' wants to hf you for $' + Number(hfbet).toLocaleString() + '. Accept/decline?');
								//Add a timeout to this
							}
							else {
								channel.send('<@' + user2.UserID + "> Can't afford this bet");
							}
						});
					}
				});
			}
			else {
				channel.send(":x: You can't afford this bet");
			}
		}
		else {
			channel.send(":x: You can't hf against me...");
		}
	}
	
	//Daddy
	res = strmsg.match('i am |I am |im |Im ')
	if (res == 'i am ' || res == 'I am ' || res == 'im ' || res == 'Im ') {
		var thing = strmsg.match('m (.+)');
		if (msg.author.username == "Wesbot") {
		}
		else {
			const splitAt = index => x => [x.slice(0, index), x.slice(index)]
			var newthing = splitAt(1)(thing);
			channel.send('Hello ' + newthing[1] + ', I am daddy');
		}
	}
	
	//Register
	res = strmsg.match('!register');
	if (res == '!register') {
		if (msg.author == '<@323890009696370688>') {
		var mentions = msg.mentions.users.array();
		if (mentions[0] == undefined) {
			channel.send(":x: Please mention someone when executing this command");
		}
		
		else {
			var userid = mentions[0].id;
			var name = mentions[0].username;
			var newuser = new User({ UserID: userid, Name: name, Balance: 100 });
			newuser.save(function (err, newuser) {
				if (err) return console.error(err);
				channel.send(":white_check_mark: User " + mentions[0].username + " has been registered!");
			});
			Setting.findOne({}, function (err, setting) {
				if (err) return handleError(err);
				setting.UserCount = Number(setting.UserCount) + 1;
				setting.save();
			});
		}
		}
		else { channel.send("No permission");}
	}
	
	//Bal
	if (strmsg === '!bal') {
		User.findOne({ 'UserID': msg.author.id }, function (err, user) {
		if (err) return handleError(err);
			channel.send({embed: {
				color: 3447003,
				author: {
					name: user.Name,
					icon_url: msg.author.avatarURL
				},
				title: ':moneybag: Balance: $' + user.Balance.toLocaleString()
			}});
		});
	}
	
	//Baltop
	if (strmsg === '!baltop') {
		User.find({}, function (err, users) {
			Setting.findOne({}, function (err, setting) {
				if (err) return handleError(err);
				var balances = [1];
				var balnames = ["default"];
				for (var i = 0, len = setting.UserCount; i < len; i++) {
					balances[i] = Number(users[i].Balance);
					balnames[i] = String(users[i].Name);
				}
				for (var i = 1; i < balances.length; i++) {
					for (var j = 0; j < i; j++) {
						if (balances[i] < balances[j]) {
							var x = balances[i];
							var y = balnames[i];
							balances[i] = balances[j];
							balnames[i] = balnames[j];
							balances[j] = x;
							balnames[j] = y;
						}
					}
				}
				var loopc = 1;
				var baltopstring = ["default"];
				channel.send({embed: {
					color: 3447003,
					title: ":moneybag: Baltop",
					description: "Top 5 balances",
					fields: [{
						name: '#1 ' + balnames[balances.length - 1],
						value: 'Balance: $' + balances[balances.length - 1].toLocaleString()
					},
					{
						name: '#2 ' + balnames[balances.length - 2],
						value: 'Balance: $' + balances[balances.length - 2].toLocaleString()
					},
					{
						name: '#3 ' + balnames[balances.length - 3],
						value: 'Balance: $' + balances[balances.length - 3].toLocaleString()
					},
					{
						name: '#4 ' + balnames[balances.length - 4],
						value: 'Balance: $' + balances[balances.length - 4].toLocaleString()
					},
					{
						name: '#5 ' + balnames[balances.length - 5],
						value: 'Balance: $' + balances[balances.length - 5].toLocaleString()
					}
					]
				}});
			});
		});
	}
	
	//Level
	if (strmsg === '!level') {
		User.findOne({ UserID: msg.author.id }, function (err, user) {
			if (err) return handleError(err);
			channel.send({embed: {
				color: 3447003,
				author: {
					name: msg.author.username,
					icon_url: msg.author.avatarURL
				},
				title: "Level: " + user.Level
			}});
		});
	}
	
	//Hangman
	res = strmsg.match('[a-z]');
	if (hmactive && hmchannel == channel && msg.author.username != 'Wesbot' && res == strmsg) {
		var stringske = "";
		var correct = false;
		var allSolved = true;
		for (i = 0; i < hmword.length; i++) {
			if (hmguess[i] == "-") {
				if (strmsg == hmword[i]) {
					//Correct guess
					hmguess[i] = hmword[i];
					stringske += hmword[i] + " ";
					correct = true;
				}
				else {
					stringske += "- ";
					allSolved = false;
				}
			}
			else {
				stringske += hmword[i] + " ";
			}
		}
		if (allSolved) {
			hmactive = false;
			hmmsg.edit({embed: {
				color: 3447003,
				author: {
					name: "Hangman"
				},
				title: ":white_check_mark: You guessed the word: " + hmfullword
			}});
		}
		if (!correct) {
			mistakes++;
		}
		if (mistakes == 6 && !allSolved) {
			const embed = new Discord.RichEmbed()
			.setTitle(":x: RIP, you failed to guess the word: " + hmfullword)
			.setAuthor("Hangman", "")
			.setColor(3447003)
			.setImage(hm[mistakes])
			hmmsg.edit({embed});
			hmactive = false;
		}
		else if (mistakes >= 0 && !allSolved) {
			const embed = new Discord.RichEmbed()
			.setTitle("Guess: " + String(stringske))
			.setAuthor("Hangman", "")
			.setColor(3447003)
			.setImage(hm[mistakes])
			hmmsg.edit({embed});
		}
		else if (mistakes == -1 && !allSolved) {
			hmmsg.edit({embed: {
				color: 3447003,
				author: {
					name: "Hangman"
				},
				title: "Guess: " + stringske
			}});
		}
		msg.delete(3000);
	}
	else if (hmactive && hmchannel == channel && msg.author.username != 'Wesbot' && strmsg == hmfullword) {
		hmactive = false;
		hmmsg.edit({embed: {
			color: 3447003,
			author: {
				name: "Hangman"
			},
			title: ":white_check_mark: You guessed the word: " + hmfullword
		}});
	}
	if (strmsg === '!hm') {
		if (!hmactive) {
			hmactive = true;
			Setting.findOne({}, function (err, setting) {
				if (err) return handleError(err);
				var randIndex = Math.floor((Math.random() * setting.Words) + 0);
				Word.findOne({ 'WordNr': randIndex }, function (err, word) {
					hmfullword = word.Wordd;
					hmword = word.Wordd.split("");
					hmactive = true;
					hmchannel = channel;
					mistakes = -1;
					var showthis = "";
					for (i = 0; i < hmword.length; i++) {
						hmguess[i] = "-";
						showthis += "- ";
					}
					hmmsg = {embed: {
						color: 3447003,
						author: {
							name: "Hangman"
						},
						title: "Guess: " + String(showthis)
					}};
					channel.send(hmmsg).then((editthis)=>{
						hmmsg = editthis;
					});
				});
			});
		}
		else {
			//already active
		}
	}
	
	//Help
	if (strmsg === '!help') {
		channel.send({embed: {
		color: 3447003,
		author: {
		name: client.user.username,
		icon_url: client.user.avatarURL
		},
		title: "Commands",
		fields: [{
			name: "!hl <bet>",
			value: "Activates the higher lower minigame"
		}, {
			name: "!insult <@user>",
			value: "Insults the mentioned user"
		}, {
			name: "!bal",
			value: "Returns your balance"
		}, {
			name: "!baltop",
			value: "Returns top 5 balances"
		}, {
			name: "!hf <@user> <bet>",
			value: "Requests a headflip against the mentioned player"
		}, {
			name: "!level",
			value: "Returns your current level"
		}, {
			name: "!hm",
			value: "Starts a game of hangman"
		}
		]
		}});
	}
	
	//Add hangmanword
	res = strmsg.match('!addword');
	if (res == '!addword') {
		if (msg.author.username == 'Wesleu') {
			var addWord = strmsg.match('!addword (.+)');
			const splitAt = index => x => [x.slice(0, index), x.slice(index)]
			var temp = splitAt(1)(addWord);
			addWord = temp[1];
			Setting.findOne({}, function (err, setting) {
				if (err) return handleError(err);
				var newword = new Word({ Wordd: addWord, WordNr: setting.Words });
				newword.save(function (err, newword) {
				if (err) return console.error(err);
				});
				setting.Words = Number(setting.Words) + 1;
				setting.save();
			});
			channel.send("Added \"" + addWord + "\"");
			
		}
		else {
			channel.send(":x: Permission denied");
		}
	}
	
	//Users
	if (strmsg === '!users') {
		Setting.findOne({}, function (err, setting) {
			if (err) return handleError(err);
			channel.send(setting.UserCount);
		});
	}
	
	//Ping
	if (strmsg === '!ping') {
		channel.send(client.ping + "ms");
	}
	
	//Test
	res = strmsg.match('!test');
	if (res == '!test') {
		channel.send('test');
		/*var testmen = strmsg.match('!test (.+)');
		const splitAt = index => x => [x.slice(0, index), x.slice(index)]
			var newthing = splitAt(1)(testmen);
			testmen = newthing[1];
		channel.send(testmen);*/
		//channel.send('https://imgur.com/a/qRRBF');
		/*var testmen = strmsg.match('> (.+)');
		const splitAt = index => x => [x.slice(0, index), x.slice(index)]
			var newthing = splitAt(1)(testmen);
			testmen = newthing[1];
		channel.send(testmen);*/
		/*test = setInterval(myTimer, 1000);
		testmsg = emoji[0] + emoji[1] + emoji[0] + emoji[1] + emoji[0] + emoji[1];
		var turn = true;
		channel.send(testmsg).then((editthis)=>{
			testmsg = editthis;
		});
		function myTimer() {
			if (turn) {
				testmsg.edit(emoji[1] + emoji[0] + emoji[1] + emoji[0] + emoji[1] + emoji[0]);
			}
			else {
				testmsg.edit(emoji[0] + emoji[1] + emoji[0] + emoji[1] + emoji[0] + emoji[1]);
			}
			turn = !turn;
		}*/
		/*var newsetting = new Setting({ UserCount: 5 });
		newsetting.save(function (err, newsetting) {
		if (err) return console.error(err);
		});*/	
	}
	
	//Farm
	if (strmsg == '!farm') {
		/*if (msg.author.username == 'Wesleu') {
			channel.send({embed: {
		color: 3447003,
		author: {
		name: msg.author.username
		},
		title: "Farm",
		fields: [{
        name: "Now farming",
		value: "Farm will earn 1b per 10s"
		}
		]
		}});
		
			farm = setInterval(myTimer, 10000);
			function myTimer() {
				var gain = 1000000000;
				User.findOne({ 'Name': "Wesleu" }, function (err, user) {
		if (err) return handleError(err);
			user.Balance = Number(user.Balance) + Number(gain);
			user.save();
		});
				channel.send({embed: {
		color: 3447003,
		author: {
		name: msg.author.username
		},
		title: "Farm",
		fields: [{
        name: "Earned $" + gain + ' from farm',
		value: ":white_check_mark:"
		}
		]
		}});
		User.findOne({ 'Name': "Wesleu" }, function (err, user) {
		if (err) return handleError(err);
			user.Balance = Number(user.Balance) + Number(gain);
			user.save();
		});
			}
		}
		else {
			channel.send(":x: permission denied");
		}*/
	}
	
	//Stop
	if (strmsg === '!stop') {
		//clearInterval(test);
	}

});

client.login(process.env.CLIENT_TOKEN);