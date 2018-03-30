/*To-do:
	- rob players
	- upgradable farm
	- hm against someone <player chooses word
	- blackjack
	- bal <player
	- level <player
	- leveltop, messagetop
	- shop? <level/bal required
	- xp till level up
	- quiz
	- total messages server/person
	- randomfacts
	- games reaction selection
	- hl emoji numbers
	- bank
	- multiple instances games (array)
	- xplevel switch case
	- timeout games
	- remaining convo calls, add to settings
	- health
	- skill points
	- add ID's to crate items (for invs)
	- use gifs for animated decals
	- kits
	- split up help
	- spawn crates
*/

//Cleverbot source: cleverbot.com

var Cleverbot = require('cleverbot-node');
    cleverbot = new Cleverbot;
    cleverbot.configure({botapi: process.env.CLEVERBOT_KEY});
	
var mongoose = require('mongoose');
  
db = mongoose.connect("mongodb://userone:" + process.env.MONGOPASS + "@ds223019.mlab.com:23019/discordbot");

//UserSchema
var UserSchema = mongoose.Schema({
  UserID: String,
  Name: String,
  Balance: Number,
  Level: Number,
  Xp: Number,
  Keys: Number,
  CCones: Number,
  CCtwos: Number,
  CCthrees: Number,
  CCfours: Number
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

//CconeSchema
var CconeSchema = mongoose.Schema({
	Name: String,
	Icon: String,
	Rarity: String,
	Type: String,
	Vehicle: String
});
var Ccone = mongoose.model('Ccone', CconeSchema);

//CctwoSchema
var CctwoSchema = mongoose.Schema({
	Name: String,
	Icon: String,
	Rarity: String,
	Type: String,
	Vehicle: String
});
var Cctwo = mongoose.model('Cctwo', CctwoSchema);

//CcthreeSchema
var CcthreeSchema = mongoose.Schema({
	Name: String,
	Icon: String,
	Rarity: String,
	Type: String,
	Vehicle: String
});
var Ccthree = mongoose.model('Ccthree', CcthreeSchema);

//CcfourSchema
var CcfourSchema = mongoose.Schema({
	Name: String,
	Icon: String,
	Rarity: String,
	Type: String,
	Vehicle: String
});
var Ccfour = mongoose.model('Ccfour', CcfourSchema);

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
var emoji = [":white_check_mark:", ":x:", ""];
var insults = ["If laughter is the best medicine, your face must be curing the world.", "You're so ugly, you scared the crap out of the toilet.", "Your family tree must be a cactus because everybody on it is a prick.", "It's better to let someone think you are an Idiot than to open your mouth and prove it.", "If I had a face like yours, I'd sue my parents.", "Your birth certificate is an apology letter from the condom factory.", "I guess you prove that even god makes mistakes sometimes.", "The only way you'll ever get laid is if you crawl up a chicken's ass and wait.", "You're so fake, Barbie is jealous.", "I’m jealous of people that don’t know you!", "You're so ugly, when your mom dropped you off at school she got a fine for littering.", "If I wanted to kill myself I'd climb your ego and jump to your IQ.", "You must have been born on a highway because that's where most accidents happen.", "Brains aren't everything. In your case they're nothing.", "I don't know what makes you so stupid, but it really works.", "I can explain it to you, but I can’t understand it for you.", "Roses are red violets are blue, God made me pretty, what happened to you?", "Behind every fat woman there is a beautiful woman. No seriously, your in the way.", "Calling you an idiot would be an insult to all the stupid people.", "You, sir, are an oxygen thief!", "Some babies were dropped on their heads but you were clearly thrown at a wall.", "Don't like my sarcasm, well I don't like your stupid.", "Why don't you go play in traffic.", "Please shut your mouth when you’re talking to me.", "I'd slap you, but that would be animal abuse.", "They say opposites attract. I hope you meet someone who is good-looking, intelligent, and cultured.", "Stop trying to be a smart ass, you're just an ass.", "The last time I saw something like you, I flushed it.", "'m busy now. Can I ignore you some other time?", "If ugly were a crime, you'd get a life sentence.", "Your mind is on vacation but your mouth is working overtime.", "Why don't you slip into something more comfortable... like a coma.", "Shock me, say something intelligent.", "If your gonna be two faced, honey at least make one of them pretty.", "Keep rolling your eyes, perhaps you'll find a brain back there.", "You are not as bad as people say, you are much, much worse.", "I don't know what your problem is, but I'll bet it's hard to pronounce.", "There is no vaccine against stupidity.", "You're the reason the gene pool needs a lifeguard.", "Sure, I've seen people like you before - but I had to pay an admission.", "How old are you? - Wait I shouldn't ask, you can't count that high.", "Have you been shopping lately? They're selling lives, you should go get one.", "You're like Monday mornings, nobody likes you.", "All day I thought of you... I was at the zoo.", "You're so fat, you could sell shade.", "I'd like to see things from your point of view but I can't seem to get my head that far up my ass.", "Don't you need a license to be that ugly?", "Your house is so dirty you have to wipe your feet before you go outside.", "If you really spoke your mind, you'd be speechless.", "Stupidity is not a crime so you are free to go.", "You are so old, when you were a kid rainbows were black and white.", "If I told you that I have a piece of dirt in my eye, would you move?", "You so dumb, you think Cheerios are doughnut seeds.", "So, a thought crossed your mind? Must have been a long and lonely journey.", "You are so old, your birth-certificate expired.", "Every time I'm next to you, I get a fierce desire to be alone.", "You're so dumb that you got hit by a parked car.", "Keep talking, someday you'll say something intelligent!", "You're so fat, you leave footprints in concrete.", "How did you get here? Did someone leave your cage open?", "Pardon me, but you've obviously mistaken me for someone who gives a damn.", "Wipe your mouth, there's still a tiny bit of bullshit around your lips.", "Don't you have a terribly empty feeling - in your skull?", "As an outsider, what do you think of the human race?", "Just because you have one doesn't mean you have to act like one.", "Are you always this stupid or is today a special occasion?"];
var hm = ["https://i.imgur.com/S4gcxd1.png", "https://i.imgur.com/xF1qUoN.png", "https://i.imgur.com/jZM7V3E.png", "https://i.imgur.com/1rLTWlH.png", "https://i.imgur.com/9OS5Ijn.png", "https://i.imgur.com/0Ya931J.png", "https://i.imgur.com/3h9k90J.png"]
var hmword;
var hmactive;
var hmchannel;
var hmguess = ["default"];
var mistakes;
var hmmsg;
var channel;
var hmfullword;
var cs;
var convo = false;

//Ready event
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setPresence({ status: 'online', game: { name: 'with Wesleu' } });
});

//NewMember event
client.on('guildMemberAdd', member => {
	// Send the message to a designated channel on a server:
	const channel = member.guild.channels.find('name', 'welcome');
	// Do nothing if the channel wasn't found on this server
	if (!channel) return;
	// Send the message, mentioning the member
	channel.send(`Welcome to the bestest discord server, ${member}`);
	var newuser = new User({ UserID: member.id, Name: member.displayName, Balance: 100, Level: 0, Xp: 0 , Keys: 0, CCones: 0, CCtwos: 0, CCthrees: 0, CCfours: 0});
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
	User.findOne({ 'UserID': msg.author.id }, function (err, user) {
		if (err) return handleError(err);
		user.Xp = Number(user.Xp) + 1;
		user.save();
		if (!msg.author.bot) {
			//Check for levelup
			var xp = Number(user.Xp);
			var level;
			if (xp >= 2000) {
				level = 17;
			}
			else if (xp >= 1750) {
				level = 16;
			}
			else if (xp >= 1500) {
				level = 15;
			}
			else if (xp >= 1250) {
				level = 14;
			}
			else if (xp >=1000) {
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
				var lvlupmsg = {embed: {
					color: 3447003,
					author: {
						name: msg.author.username,
						icon_url: msg.author.avatarURL
					},
					title: ":arrow_up: Level up!",
					description: "New level: " + level
				}};
				channel.send(lvlupmsg).then(errmsg => {
					errmsg.delete(3000)
				})
			}
		}
	});
	
	if (msg.author.bot) return;
	
	//Find money
	if (Math.floor((Math.random() * 100) + 0) < 2) {
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
			var findmsg = {embed: {
				color: 3447003,
				title: ':moneybag: ' + user.Name + " Got lucky and found $" + money
			}};
			channel.send(findmsg).then(errmsg => {
				errmsg.delete(3000)
			})
		});
	}
	
	//Find crates
	if (Math.floor((Math.random() * 100) + 0) < 2) {
		var cratech = Math.floor((Math.random() * 4) + 1);
		User.findOne({ 'UserID': msg.author.id }, function (err, user) {
			if (err) return handleError(err);
			var cratetype = "";
			if (cratech == 1) {
				user.CCones = user.CCones + 1;
				user.save();
				cratetype = "CC1";
			}
			else if (cratech == 2) {
				user.CCtwos = user.CCtwos + 1;
				user.save();
				cratetype = "CC2";
			}
			else if (cratech == 3) {
				user.CCthrees = user.CCthrees + 1;
				user.save();
				cratetype = "CC3";
			}
			else if (cratech == 4) {
				user.CCfours = user.CCfours + 1;
				user.save();
				cratetype = "CC4";
			}
			var findmsg = {embed: {
				color: 3447003,
				title: ':card_box: ' + user.Name + " Got lucky and found a " + cratetype + " crate"
			}};
			channel.send(findmsg).then(errmsg => {
				errmsg.delete(3000)
			})
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
							name: "Your guess",
							value: "Higher"
							},
							{
							name: "Second number",
							value: HigherLowerNr2
							},
							{
							name: HigherLowerNr2 + ' is higher than ' + HigherLowerNr1,
							value: ":white_check_mark: **You win!** +$" + Number(hlbet).toLocaleString()
							}
						]
					}});
					msg.delete();
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
							name: "Your guess",
							value: "Higher"
							},
							{
							name: "Second number",
							value: HigherLowerNr2
							},
							{
							name: HigherLowerNr2 + ' is lower than ' + HigherLowerNr1,
							value: ":x: **You lose!** -$" + Number(hlbet).toLocaleString()
							}
						]
					}});
					msg.delete();
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
							name: "Your guess",
							value: "Higher"
							},
							{
							name: "Second number",
							value: HigherLowerNr2
							},
							{
							name: HigherLowerNr2 + ' equals ' + HigherLowerNr1,
							value: "**Draw**"
							}
						]
					}});
					msg.delete();
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
							name: "Your guess",
							value: "Lower"
							},
							{
							name: "Second number",
							value: HigherLowerNr2
							},
							{
							name: HigherLowerNr2 + ' is lower than ' + HigherLowerNr1,
							value: ":white_check_mark: **You win!** +$" + Number(hlbet).toLocaleString()
							}
						]
					}});
					msg.delete();
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
							name: "Your guess",
							value: "Lower"
							},
							{
							name: "Second number",
							value: HigherLowerNr2
							},
							{
							name: HigherLowerNr2 + ' is higher than ' + HigherLowerNr1,
							value: ":x: **You lose!** -$" + Number(hlbet).toLocaleString()
							}
						]
					}});
					msg.delete();
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
							name: "Your guess",
							value: "Lower"
							},
							{
							name: "Second number",
							value: HigherLowerNr2
							},
							{
							name: HigherLowerNr2 + ' equals ' + HigherLowerNr1,
							value: "**Draw**"
							}
						]
					}});
					msg.delete();
					hl = false;
				}
			}
			else {
				//Wrong answer, has to be higher lower
			}
		}
		else {
			var errormsg = ":x: Someone else is playing!";
			channel.send(errormsg).then(errmsg => {
				errmsg.delete(3000)
			})
			msg.delete(3000);
		}
	}
	else if (res == '!hl') {
		if (strmsg === '!hl') {
			var errormsg = ":x: Please enter a bet when using this command";
			channel.send(errormsg).then(errmsg => {
				errmsg.delete(3000)
			})
			msg.delete(3000);
		}
		else {
			var thing = strmsg.match('l (.+)');
			const splitAt = index => x => [x.slice(0, index), x.slice(index)]
			var newthing = splitAt(1)(thing);
			hlbet = newthing[1];
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
							var errormsg = ":x: You can't afford this bet";
							channel.send(errormsg).then(errmsg => {
								errmsg.delete(3000)
							})
							msg.delete(3000);
						}
					});
				}
				else {
					var errormsg = ":x: Max. bet is $100";
					channel.send(errormsg).then(errmsg => {
						errmsg.delete(3000)
					})
					msg.delete(3000);
				}
			}
			else {
				var errormsg = ":x: Bet has to be $1+";
				channel.send(errormsg).then(errmsg => {
					errmsg.delete(3000)
				})
				msg.delete(3000);
			}
		}
	}
	
	//Insult
	res = strmsg.match('!insult');
	if (res == '!insult') {
		var mentions = msg.mentions.users.array();
		if (mentions[0] == undefined) {
			var errormsg = ":x: Please mention someone when executing this command";
			channel.send(errormsg).then(errmsg => {
				errmsg.delete(3000)
			})
			msg.delete(3000);
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
	if (hfrequest && !hf) {
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
						}]
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
						}]
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
			var errormsg = ":x: Please mention someone when executing this command";
			channel.send(errormsg).then(errmsg => {
				errmsg.delete(3000)
			})
			msg.delete(3000);
		}
		else if (mentions[0].username == msg.author.username) {
			var errormsg = ":x: You can't hf yourself...";
			channel.send(errormsg).then(errmsg => {
				errmsg.delete(3000)
			})
			msg.delete(3000);
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
								var errormsg = '<@' + user2.UserID + "> Can't afford this bet";
								channel.send(errormsg).then(errmsg => {
									errmsg.delete(3000)
								})
								msg.delete(3000);
							}
						});
					}
				});
			}
			else {
				var errormsg = ":x: You can't afford this bet";
				channel.send(errormsg).then(errmsg => {
					errmsg.delete(3000)
				})
				msg.delete(3000);
			}
		}
		else {
			var errormsg = ":x: You can't hf against me...";
			channel.send(errormsg).then(errmsg => {
				errmsg.delete(3000)
			})
			msg.delete(3000);
		}
	}
	
	//Daddy
	res = strmsg.match('i am |I am |im |Im ')
	if (res == 'i am ' || res == 'I am ' || res == 'im ' || res == 'Im ') {
		var thing = strmsg.match('m (.+)');
		const splitAt = index => x => [x.slice(0, index), x.slice(index)]
		var newthing = splitAt(1)(thing);
		channel.send('Hello ' + newthing[1] + ', I am daddy');
	}
	
	//Register
	res = strmsg.match('!register');
	if (res == '!register') {
		if (msg.author == '<@323890009696370688>') {
			var mentions = msg.mentions.users.array();
			if (mentions[0] == undefined) {
				var errormsg = ":x: Please mention someone when executing this command";
				channel.send(errormsg).then(errmsg => {
					errmsg.delete(3000)
				})
				msg.delete(3000);
			}
			else {
				var userid = mentions[0].id;
				var name = mentions[0].username;
				var newuser = new User({ UserID: userid, Name: name, Balance: 100, Level: 0, Xp: 0, Keys: 0, CCones: 0, CCtwos: 0, CCthrees: 0, CCfours: 0 });
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
		else { 
			var errormsg = "No permission";
			channel.send(errormsg).then(errmsg => {
				errmsg.delete(3000)
			})
			msg.delete(3000);
		}
	}
	
	//Stats
	if (strmsg === '!stats') {
		User.findOne({ 'UserID': msg.author.id }, function (err, user) {
			channel.send({embed: {
				color: 3447003,
				author: {
					name: user.Name,
					icon_url: msg.author.avatarURL
				},
				title: ':moneybag: Balance',
				description: '$' + user.Balance.toLocaleString(),
				fields: [{
					name: 'Level',
					value: user.Level
				}, {
					name: ':e_mail: Messages',
					value: user.Xp
				}
				]
			}});
		});
	}
	
	//Bal
	res = strmsg.match('!bal');
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
	}/*
	else if (res == '!bal') {
		var thing = strmsg.match('!bal (.+)');
		const splitAt = index => x => [x.slice(0, index), x.slice(index)]
		var newthing = splitAt(1)(thing);
		var value = newthing[1];
		User.findOne({ 'Name': String(value) }, function (err, user) {
			channel.send({embed: {
				color: 3447003,
				author: {
					name: user.Name
				},
				title: ':moneybag: Balance: $' + user.Balance.toLocaleString()
			}});
		});
	}*/
	
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
	if (hmactive && hmchannel == channel && res == strmsg) {
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
	else if (hmactive && hmchannel == channel && strmsg == hmfullword) {
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
			var errormsg = ":x: Someone else is playing!";
			channel.send(errormsg).then(errmsg => {
				errmsg.delete(3000)
			})
			msg.delete(3000);
		}
	}
	
	//Eco
	res = strmsg.match('!eco');
	if (res == '!eco') {
		if (msg.author == '<@323890009696370688>') {
			if (strmsg == '!eco set') {
				var errormsg = ":x: Please enter a value";
				channel.send(errormsg).then(errmsg => {
					errmsg.delete(3000)
				})
				msg.delete(3000);
			}
			else {
				var mentions = msg.mentions.users.array();
				if (mentions[0] == undefined) {
					var thing = strmsg.match('!eco set (.+)');
					const splitAt = index => x => [x.slice(0, index), x.slice(index)]
					var newthing = splitAt(1)(thing);
					var value = newthing[1];
					//Set everyones balance to value
					User.find({}, function (err, users) {
						for (var i = 0, len = users.length; i < len; i++) {
							users[i].Balance = Number(value);
							users[i].save();
						}
						channel.send(":white_check_mark: All balances set to $" + value);
					});
				}
				else {
					var thing = strmsg.match('set (.+)');
					const splitAt = index => x => [x.slice(0,index), x.slice(index)]
					var newthing = splitAt(1)(thing);
					var value = newthing[1];
					for (var i = 0; i < mentions.length; i++) {
						var reqid = String(mentions[i].id);
						User.findOne({ 'UserID': reqid }, function (err, user) {
							user.Balance = Number(value);
							user.save();
						});
					}
					channel.send(":white_check_mark: Done");
				}
			}
		}
		else {
			var errormsg = ":x: Permission denied";
			channel.send(errormsg).then(errmsg => {
				errmsg.delete(3000)
			})
			msg.delete(3000);
		}
	}
	
	//Crates
	if (strmsg === '!crate open cc1') {
		var sellmoney = 0;
		User.findOne({ 'UserID': msg.author.id }, function (err, user) {
			if (err) return handleError(err);
			if (user.Keys >= 1) {
				if (user.CCones >= 1) {
		//CC1
		var rand = Math.floor((Math.random() * 1000) + 1);
		var rarity = "";
		//Random rarity
		if (rand <= 542) {
			rarity = "Rare";
			sellmoney = 50;
		}
		else if (rand <= 820) {
			rarity = "Very Rare";
			sellmoney = 100;
		}
		else if (rand <= 945) {
			rarity = "Import";
			sellmoney = 300;
		}
		else if (rand <= 986) {
			rarity = "Exotic";
			sellmoney = 500;
		}
		else {
			rarity = "Black Market";
			sellmoney = 1500;
		}
		Ccone.find({ 'Rarity': rarity }, function (err, ccones) {
			var choose = Math.floor((Math.random() * ccones.length) + 0);
			//Show vehicle (if "") don't show
			const embed = new Discord.RichEmbed()
			.setTitle("You got: " + ccones[choose].Name)
			.setAuthor("CC1 Crate", msg.author.avatarURL)
			.setColor(3447003)
			.addField("Rarity", ccones[choose].Rarity)
			.addField("Type", ccones[choose].Type)
			.addField("Sold for", "$" + sellmoney.toLocaleString())
			.setImage(ccones[choose].Icon)
			channel.send({embed});
		});
		user.Keys = user.Keys - 1;
		user.CCones = user.CCones - 1;
		user.Balance = user.Balance + sellmoney;
		user.save();
			}
			else {
				var errormsg = ":x: You don't have any CC1 crates!";
				channel.send(errormsg).then(errmsg => {
					errmsg.delete(3000)
				})
				msg.delete(3000);
			}
			}
			else {
				var errormsg = ":x: You don't have any keys!";
				channel.send(errormsg).then(errmsg => {
					errmsg.delete(3000)
				})
				msg.delete(3000);
			}
		});
	}
	else if (strmsg === '!crate open cc2') {
		var sellmoney = 0;
		User.findOne({ 'UserID': msg.author.id }, function (err, user) {
			if (err) return handleError(err);
			if (user.Keys >= 1) {
				if (user.CCtwos >= 1) {
		//CC2
		var rand = Math.floor((Math.random() * 1000) + 1);
		var rarity = "";
		//Random rarity
		if (rand <= 542) {
			rarity = "Rare";
			sellmoney = 50;
		}
		else if (rand <= 820) {
			rarity = "Very Rare";
			sellmoney = 100;
		}
		else if (rand <= 945) {
			rarity = "Import";
			sellmoney = 300;
		}
		else if (rand <= 986) {
			rarity = "Exotic";
			sellmoney = 500;
		}
		else {
			rarity = "Black Market";
			sellmoney = 1500;
		}
		Cctwo.find({ 'Rarity': rarity }, function (err, cctwos) {
			var choose = Math.floor((Math.random() * cctwos.length) + 0);
			//Show vehicle (if "") don't show
			const embed = new Discord.RichEmbed()
			.setTitle("You got: " + cctwos[choose].Name)
			.setAuthor("CC2 Crate", msg.author.avatarURL)
			.setColor(3447003)
			.addField("Rarity", cctwos[choose].Rarity)
			.addField("Type", cctwos[choose].Type)
			.addField("Sold for", "$" + sellmoney.toLocaleString())
			.setImage(cctwos[choose].Icon)
			channel.send({embed});
		});
		user.Keys = user.Keys - 1;
		user.CCtwos = user.CCtwos - 1;
		user.Balance = user.Balance + sellmoney;
		user.save();
		}
			else {
				var errormsg = ":x: You don't have any CC2 crates!";
				channel.send(errormsg).then(errmsg => {
					errmsg.delete(3000)
				})
				msg.delete(3000);
			}
			}
			else {
				var errormsg = ":x: You don't have any keys!";
				channel.send(errormsg).then(errmsg => {
					errmsg.delete(3000)
				})
				msg.delete(3000);
			}
		});
	}
	else if (strmsg === '!crate open cc3') {
		var sellmoney = 0;
		User.findOne({ 'UserID': msg.author.id }, function (err, user) {
			if (err) return handleError(err);
			if (user.Keys >= 1) {
				if (user.CCthrees >= 1) {
		//CC3
		var rand = Math.floor((Math.random() * 1000) + 1);
		var rarity = "";
		//Random rarity
		if (rand <= 573) {
			rarity = "Rare";
			sellmoney = 50;
		}
		else if (rand <= 868) {
			rarity = "Very Rare";
			sellmoney = 100;
		}
		else if (rand <= 959) {
			rarity = "Import";
			sellmoney = 300;
		}
		else if (rand <= 988) {
			rarity = "Exotic";
			sellmoney = 500;
		}
		else {
			rarity = "Black Market";
			sellmoney = 1500;
		}
		Ccthree.find({ 'Rarity': rarity }, function (err, ccthrees) {
			var choose = Math.floor((Math.random() * ccthrees.length) + 0);
			//Show vehicle (if "") don't show
			const embed = new Discord.RichEmbed()
			.setTitle("You got: " + ccthrees[choose].Name)
			.setAuthor("CC3 Crate", msg.author.avatarURL)
			.setColor(3447003)
			.addField("Rarity", ccthrees[choose].Rarity)
			.addField("Type", ccthrees[choose].Type)
			.addField("Sold for", "$" + sellmoney.toLocaleString())
			.setImage(ccthrees[choose].Icon)
			channel.send({embed});
		});
		user.Keys = user.Keys - 1;
		user.CCthrees = user.CCthrees - 1;
		user.Balance = user.Balance + sellmoney;
		user.save();
		}
			else {
				var errormsg = ":x: You don't have any CC3 crates!";
				channel.send(errormsg).then(errmsg => {
					errmsg.delete(3000)
				})
				msg.delete(3000);
			}
			}
			else {
				var errormsg = ":x: You don't have any keys!";
				channel.send(errormsg).then(errmsg => {
					errmsg.delete(3000)
				})
				msg.delete(3000);
			}
		});
	}
	else if (strmsg === '!crate open cc4') {
		var sellmoney = 0;
		User.findOne({ 'UserID': msg.author.id }, function (err, user) {
			if (err) return handleError(err);
			if (user.Keys >= 1) {
				if (user.CCfours >= 1) {
		//CC4
		var rand = Math.floor((Math.random() * 1000) + 1);
		var rarity = "";
		//Random rarity
		if (rand <= 557) {
			rarity = "Rare";
			sellmoney = 50;
		}
		else if (rand <= 826) {
			rarity = "Very Rare";
			sellmoney = 100;
		}
		else if (rand <= 958) {
			rarity = "Import";
			sellmoney = 300;
		}
		else if (rand <= 994) {
			rarity = "Exotic";
			sellmoney = 500;
		}
		else {
			rarity = "Black Market";
			sellmoney = 1500;
		}
		Ccfour.find({ 'Rarity': rarity }, function (err, ccfours) {
			var choose = Math.floor((Math.random() * ccfours.length) + 0);
			//Show vehicle (if "") don't show
			const embed = new Discord.RichEmbed()
			.setTitle("You got: " + ccfours[choose].Name)
			.setAuthor("CC4 Crate", msg.author.avatarURL)
			.setColor(3447003)
			.addField("Rarity", ccfours[choose].Rarity)
			.addField("Type", ccfours[choose].Type)
			.addField("Sold for", "$" + sellmoney.toLocaleString())
			.setImage(ccfours[choose].Icon)
			channel.send({embed});
		});
		user.Keys = user.Keys - 1;
		user.CCfours = user.CCfours - 1;
		user.Balance = user.Balance + sellmoney;
		user.save();
		}
			else {
				var errormsg = ":x: You don't have any CC4 crates!";
				channel.send(errormsg).then(errmsg => {
					errmsg.delete(3000)
				})
				msg.delete(3000);
			}
			}
			else {
				var errormsg = ":x: You don't have any keys!";
				channel.send(errormsg).then(errmsg => {
					errmsg.delete(3000)
				})
				msg.delete(3000);
			}
		});
	}
	if (strmsg === '!crates') {
		User.findOne({ 'UserID': msg.author.id }, function (err, user) {
			channel.send({embed: {
				color: 3447003,
				author: {
					name: user.Name,
					icon_url: msg.author.avatarURL
				},
				title: 'Crates',
				fields: [{
					name: 'CC1',
					value: ':card_box: ' + user.CCones
				}, {
					name: 'CC2',
					value: ':card_box: ' + user.CCtwos
				}, {
					name: 'CC3',
					value: ':card_box: ' + user.CCthrees
				}, {
					name: 'CC4',
					value: ':card_box: ' + user.CCfours
				}]
			}});
		});
	}
	
	//Keys
	res = strmsg.match('!keys buy');
	if (res == '!keys buy') {
		var thing = strmsg.match('!keys buy (.+)');
		const splitAt = index => x => [x.slice(0, index), x.slice(index)]
		var newthing = splitAt(1)(thing);
		var value = Number(newthing[1]);
		var price = value * 100;
		if (value >= 1) {
			User.findOne({ 'UserID': msg.author.id }, function (err, user) {
				if (err) return handleError(err);
				if (user.Balance >= price) {
					user.Keys = user.Keys + value;
					user.Balance = user.Balance - price;
					user.save();
					channel.send(":white_check_mark: Bought " + value + " keys");
				}
				else {
					var errormsg = ":x: You don't have enough money to afford this purchase ($100 per key)";
					channel.send(errormsg).then(errmsg => {
						errmsg.delete(3000)
					})
					msg.delete(3000);
				}
			});
		}
		else {
			var errormsg = ":x: You have to buy at least 1 key";
			channel.send(errormsg).then(errmsg => {
				errmsg.delete(3000)
			})
			msg.delete(3000);
		}
	}
	if (strmsg === '!keys') {
		User.findOne({ 'UserID': msg.author.id }, function (err, user) {
			channel.send({embed: {
				color: 3447003,
				author: {
					name: user.Name,
					icon_url: msg.author.avatarURL
				},
				title: ':key: Keys: ' + user.Keys
			}});
		});
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
				name: ":arrow_up::arrow_down: !hl <bet>",
				value: "Starts a game of higher-lower"
			}, {
				name: ":point_right::ok_hand: !insult <@user>",
				value: "Insults the mentioned user"
			}, {
				name: ":moneybag: !bal",
				value: "Displays your balance"
			}, {
				name: ":moneybag: !baltop",
				value: "Displays top 5 balances"
			}, {
				name: "!hf <@user> <bet>",
				value: "Requests a headflip against the mentioned user"
			}, {
				name: "!level",
				value: "Displays your level"
			}, {
				name: "!hm",
				value: "Starts a game of hangman"
			}, {
				name: "!stats",
				value: "Displays your stats"
			}, {
				name: ":card_box: !help crates",
				value: "Displays commands regarding crates"
			}]
		}});
	}
	
	//Crates help
	if (strmsg === '!help crates') {
		channel.send({embed: {
			color: 3447003,
			author: {
				name: client.user.username,
				icon_url: client.user.avatarURL
			},
			title: "Crate commands",
			fields: [{
				name: ":card_box: !crates",
				value: "Displays your crates"
			}, {
				name: ":outbox_tray: !crate open <name>",
				value: "Opens crate"
			}, {
				name: ":key: !keys",
				value: "Displays your keys"
			}, {
				name: ":key: !keys buy <amount>",
				value: "Buys keys"
			}]
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
			var errormsg = ":x: Permission denied";
			channel.send(errormsg).then(errmsg => {
				errmsg.delete(3000)
			});
			msg.delete(3000);
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
		channel.send('Pinging...').then(pingms => {
			pingms.edit('Ping: ' + (pingms.createdTimestamp - msg.createdTimestamp) + "ms, API ping: " + client.ping + "ms");
		});
	}
	
	//Test
	res = strmsg.match('!test');
	if (res == '!test') {
		channel.send('test');
	}
	
	//OP
	if (strmsg === '!op') {
		if (msg.author == '<@323890009696370688>') {
			User.find({}, function (err, users) {
				for (var i = 0, len = users.length; i < len; i++) {
					users[i].Keys = 0;
					users[i].CCones = 0;
					users[i].CCtwos = 0;
					users[i].CCthrees = 0;
					users[i].CCfours = 0;
					users[i].save();
				}
				channel.send(":white_check_mark: Done");
			});
		}
		else {
			var errormsg = ":x: Permission denied";
			channel.send(errormsg).then(errmsg => {
				errmsg.delete(3000)
			})
			msg.delete(3000);
		}
	}
	
	//Convo
	if (strmsg == '!convo') {
		convo = !convo;
		channel.send("Convo: " + convo);
	}
	
	//AI
	if (convo && strmsg != '!convo') {
		var cleverMessage = "";
		cleverbot.write(strmsg, function (response) {
			channel.send(response.output);
		});
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