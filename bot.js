const Discord = require('discord.js');
const moment = require("moment");  
const fs = require("fs");      
const dateFormat = require('dateformat');
const client = new Discord.Client(); 
const Canvas = require("canvas"); //npm i canvas
const prefix = "#"
let profile = JSON.parse(fs.readFileSync("profile.json", "utf8"))

///////////////////////////////////

//by : Randy //


//////////////////////////////////////


client.on("message", message => {
    if (message.author.bot || !message.guild) return; 
    let score;
    
    if (message.guild) {
      score = client.getScore.get(message.author.id, message.guild.id);
      if (!score) {
        score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 };
      }
      score.points++;
      const curLevel = Math.floor(0.1 * Math.sqrt(score.points));
      client.setScore.run(score);
    }
    if (message.content.indexOf(prefix) !== 0) return;
  
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    if(command === "points") {
      return message.reply(`You currently have ${score.points} points and are level ${score.level}!`);
    }
    
    if(command === "give") {
      if(!message.author.id === message.guild.owner) return message.reply("You're not the boss of me, you can't do that!");
      const user = message.mentions.users.first() || client.users.get(args[0]);
      if(!user) return message.reply("You must mention someone or give their ID!");
      const pointsToAdd = parseInt(args[1], 10);
      if(!pointsToAdd) return message.reply("You didn't tell me how many points to give...");
          let userscore = client.getScore.get(user.id, message.guild.id);      
      if (!userscore) {
        userscore = { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, points: 0, level: 1 };
      }
      userscore.points += pointsToAdd;
      let userLevel = Math.floor(0.1 * Math.sqrt(score.points));
      userscore.level = userLevel;
      client.setScore.run(userscore);
    
      return message.channel.send(`${user.tag} has received ${pointsToAdd} points and now stands at ${userscore.points} points.`);
    }
    
    if(command === "top") {
      const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);
      const embed = new Discord.RichEmbed()
        .setTitle("**TOP 10 TEXT** :speech_balloon:")
        .setAuthor('ًں“‹ Guild Score Leaderboards', message.guild.iconURL)
        .setColor(0x00AE86);
  
      for(const data of top10) {
        embed.addField(client.users.get(data.user).tag, `XP: \`${data.points}\` | LVL: \`${data.level}\``);
      }
      return message.channel.send({embed});
    }
    
  });



client.on('message', message => {
    
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;
 
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
 
  let args = message.content.split(" ").slice(1);
 
  if (command == "ban") {
               if(!message.channel.guild) return message.reply('** This command only for servers**');
         
  if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("**You Don't Have ` BAN_MEMBERS ` Permission**");
  if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
  let user = message.mentions.users.first();
  let reason = message.content.split(" ").slice(2).join(" ");
  /*let b5bzlog = client.channels.find("name", "5bz-log");
 
  if(!b5bzlog) return message.reply("I've detected that this server doesn't have a 5bz-log text channel.");*/
  if (message.mentions.users.size < 1) return message.channel.send(`https://cdn.pg.sa/fjxlms81nk.png`);
  if(!reason) return message.channel.send(`https://cdn.pg.sa/fjxlms81nk.png`);
  if (!message.guild.member(user)
  .bannable) return message.reply(`This User Is Have High Role !`);
 
  message.guild.member(user).ban(7, user);
 
  const banembed = new Discord.RichEmbed()
  .setAuthor(`BANNED!`, user.displayAvatarURL)
  .setColor("RANDOM")
  .setTimestamp()
  .addField("**User:**",  '**[ ' + `${user.tag}` + ' ]**')
  .addField("**By:**", '**[ ' + `${message.author.tag}` + ' ]**')
  .addField("**Reason:**", '**[ ' + `${reason}` + ' ]**')
  message.channel.send({
    embed : banembed
  })
}
});
client.on('message', message => {
if(message.content.startsWith(prefix +"server")){
  if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.reply(`**ظ‡ط°ظ‡ ط§ظ„ط®ط§طµظٹط© ظ„ظ„ط§ط¯ط§ط±ط© ظپظ‚ط·** :negative_squared_cross_mark: `)
if(!message.channel.guild) return message.reply(' ');
const millis = new Date().getTime() - message.guild.createdAt.getTime();
const now = new Date();
dateFormat(now, 'dddd, mmmm dS, yyyy, h:MM:ss TT');
const verificationLevels = ['None', 'Low', 'Medium', 'Insane', 'Extreme'];
const days = millis / 1000 / 60 / 60 / 24;
let roles = client.guilds.get(message.guild.id).roles.map(r => r.name);
var embed  = new Discord.RichEmbed()
.setAuthor(message.guild.name, message.guild.iconURL)
.addField("**ًں†” Server ID:**", message.guild.id,true)
.addField("**ًں“… Created On**", message.guild.createdAt.toLocaleString(),true)
.addField("**ًں‘‘ Owned by**",`${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`)
.addField("ًں‘¥ Members ",`[${message.guild.memberCount}]`,true)
.addField('**ًں’¬ Channels **',`**${message.guild.channels.filter(m => m.type === 'text').size}**` + ' text | Voice  '+ `**${message.guild.channels.filter(m => m.type === 'voice').size}** `,true)
.addField("**ًںŒچ Others **" , message.guild.region,true)
.addField("** ًں”گ Roles **",`**[${message.guild.roles.size}]** Role `,true)
.setColor('#000000')
message.channel.sendEmbed(embed)

}
});
client.on('message', message => {
if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'move')) {
 if (message.member.hasPermission("MOVE_MEMBERS")) {
 if (message.mentions.users.size === 0) {
 return message.channel.send("``ظ„ط§ط³طھط®ط¯ط§ظ… ط§ظ„ط£ظ…ط± ط§ظƒطھط¨ ظ‡ط°ظ‡ ط§ظ„ط£ظ…ط± : " +prefix+ "move [USER]``")
}
if (message.member.voiceChannel != null) {
 if (message.mentions.members.first().voiceChannel != null) {
 var authorchannel = message.member.voiceChannelID;
 var usermentioned = message.mentions.members.first().id;
var embed = new Discord.RichEmbed()
 .setTitle("Succes!")
 .setColor("#000000")
 .setDescription(`ظ„ظ‚ط¯ ظ‚ظ…طھ ط¨ط³ط­ط¨ <@${usermentioned}> ط§ظ„ظ‰ ط§ظ„ط±ظˆظ… ط§ظ„طµظˆطھظٹ ط§ظ„ط®ط§طµ ط¨ظƒâœ… `)
var embed = new Discord.RichEmbed()
.setTitle(`You are Moved in ${message.guild.name}`)
 .setColor("RANDOM")
.setDescription(`**<@${message.author.id}> Moved You To His Channel!\nServer --> ${message.guild.name}**`)
 message.guild.members.get(usermentioned).setVoiceChannel(authorchannel).then(m => message.channel.send(embed))
message.guild.members.get(usermentioned).send(embed)
} else {
message.channel.send("``ظ„ط§ طھط³طھط·ظٹط¹ ط³ط­ط¨ "+ message.mentions.members.first() +" `ظٹط¬ط¨ ط§ظ† ظٹظƒظˆظ† ظ‡ط°ظ‡ ط§ظ„ط¹ط¶ظˆ ظپظٹ ط±ظˆظ… طµظˆطھظٹ`")
}
} else {
 message.channel.send("**``ظٹط¬ط¨ ط§ظ† طھظƒظˆظ† ظپظٹ ط±ظˆظ… طµظˆطھظٹ ظ„ظƒظٹ طھظ‚ظˆظ… ط¨ط³ط­ط¨ ط§ظ„ط¹ط¶ظˆ ط£ظ„ظٹظƒ``**")
}
} else {
message.react("â‌Œ")
}
 }
});
client.on("message", message => {
	var args = message.content.split(' ').slice(1); 
	var msg = message.content.toLowerCase();
	if( !message.guild ) return;
	if( !msg.startsWith( prefix + 'role' ) ) return;
	if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(' **__ظ„ظٹط³ ظ„ط¯ظٹظƒ طµظ„ط§ط­ظٹط§طھ__**');
	if( msg.toLowerCase().startsWith( prefix + 'roleremove' ) ){
		if( !args[0] ) return message.reply( '**:x: ظٹط±ط¬ظ‰ ظˆط¶ط¹ ط§ظ„ط´ط®طµ ط§ظ„ظ…ط±ط§ط¯ ط³ط­ط¨ ظ…ظ†ظ‡ ط§ظ„ط±طھط¨ط©**' );
		if( !args[1] ) return message.reply( '**:x: ظٹط±ط¬ظ‰ ظˆط¶ط¹ ط§ظ„ط±طھط¨ط© ط§ظ„ظ…ط±ط§ط¯ ط³ط­ط¨ظ‡ط§ ظ…ظ† ط§ظ„ط´ط®طµ**' );
		var role = msg.split(' ').slice(2).join(" ").toLowerCase(); 
		var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first(); 
		if( !role1 ) return message.reply( '**:x: ظٹط±ط¬ظ‰ ظˆط¶ط¹ ط§ظ„ط±طھط¨ط© ط§ظ„ظ…ط±ط§ط¯ ط³ط­ط¨ظ‡ط§ ظ…ظ† ط§ظ„ط´ط®طµ**' );if( message.mentions.members.first() ){
			message.mentions.members.first().removeRole( role1 );
			return message.reply('**:white_check_mark: [ '+role1.name+' ] ط±طھط¨ط© [ '+args[0]+' ] طھظ… ط³ط­ط¨ ظ…ظ† **');
		}
		if( args[0].toLowerCase() == "all" ){
			message.guild.members.forEach(m=>m.removeRole( role1 ))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] طھظ… ط³ط­ط¨ ظ…ظ† ط§ظ„ظƒظ„ ط±طھط¨ط©**');
		} else if( args[0].toLowerCase() == "bots" ){
			message.guild.members.filter(m=>m.user.bot).forEach(m=>m.removeRole(role1))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] طھظ… ط³ط­ط¨ ظ…ظ† ط§ظ„ط¨ظˆطھط§طھ ط±طھط¨ط©**');
		} else if( args[0].toLowerCase() == "humans" ){
			message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.removeRole(role1))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] طھظ… ط³ط­ط¨ ظ…ظ† ط§ظ„ط¨ط´ط±ظٹظٹظ† ط±طھط¨ط©**');
		} 	
	} else {
		if( !args[0] ) return message.reply( '**:x: ظٹط±ط¬ظ‰ ظˆط¶ط¹ ط§ظ„ط´ط®طµ ط§ظ„ظ…ط±ط§ط¯ ط§ط¹ط·ط§ط¦ظ‡ط§ ط§ظ„ط±طھط¨ط©**' );
		if( !args[1] ) return message.reply( '**:x: ظٹط±ط¬ظ‰ ظˆط¶ط¹ ط§ظ„ط±طھط¨ط© ط§ظ„ظ…ط±ط§ط¯ ط§ط¹ط·ط§ط¦ظ‡ط§ ظ„ظ„ط´ط®طµ**' );
		var role = msg.split(' ').slice(2).join(" ").toLowerCase(); 
		var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first(); 
		if( !role1 ) return message.reply( '**:x: ظٹط±ط¬ظ‰ ظˆط¶ط¹ ط§ظ„ط±طھط¨ط© ط§ظ„ظ…ط±ط§ط¯ ط§ط¹ط·ط§ط¦ظ‡ط§ ظ„ظ„ط´ط®طµ**' );if( message.mentions.members.first() ){
			message.mentions.members.first().addRole( role1 );
			return message.reply('**:white_check_mark: [ '+role1.name+' ] ط±طھط¨ط© [ '+args[0]+' ] طھظ… ط§ط¹ط·ط§ط، **');
		}
		if( args[0].toLowerCase() == "all" ){
			message.guild.members.forEach(m=>m.addRole( role1 ))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] طھظ… ط§ط¹ط·ط§ط، ط§ظ„ظƒظ„ ط±طھط¨ط©**');
		} else if( args[0].toLowerCase() == "bots" ){
			message.guild.members.filter(m=>m.user.bot).forEach(m=>m.addRole(role1))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] طھظ… ط§ط¹ط·ط§ط، ط§ظ„ط¨ظˆطھط§طھ ط±طھط¨ط©**');
		} else if( args[0].toLowerCase() == "humans" ){
			message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.addRole(role1))
			return	message.reply('**:white_check_mark: [ '+role1.name+' ] طھظ… ط§ط¹ط·ط§ط، ط§ظ„ط¨ط´ط±ظٹظٹظ† ط±طھط¨ط©**');
		} 
	} 
});
var AsciiTable = require('ascii-data-table').default
client.on('message', message =>{

    if(message.content == "#roles"){
        if(message.guild.member(message.author).hasPermission("ADMINISTRATOR"))
        var 
        ros=message.guild.roles.size,
        data = [['Rank', 'RoleName']]
        for(let i =0;i<ros;i++){
            if(message.guild.roles.array()[i].id !== message.guild.id){
         data.push([i,`${message.guild.roles.filter(r => r.position == ros-i).map(r=>r.name)}`])
        }}
        let res = AsciiTable.table(data)

        message.channel.send(`**\`\`\`xl\n${res}\`\`\`**`);
    }
});
client.on('ready', () => {
  console.log('|===================================|');
  console.log(`|  Users Size ${client.users.size}  |`);
  console.log(`| Guilds Size ${client.guilds.size} |`);
  console.log(`|===================================|`);
  console.log(`| Created By إ”Andy آ²آ²,#2292  |`);
  console.log(`|===================================|`);
  console.log(`|        Over Bot Log By You !      |`);
  console.log(`|===================================|`);
});
client.on('message', msg => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(prefix)) return;
  let command = msg.content.split(" ")[0];
  command = command.slice(prefix.length);
  let args = msg.content.split(" ").slice(1);

    if(command === "clear") {
        const emoji = client.emojis.find("name", "wastebasket")
    let textxt = args.slice(0).join("");
    if(msg.member.hasPermission("MANAGE_MESSAGES")) {
    if (textxt == "") {
        msg.delete().then
    msg.channel.send("***```ط¶ط¹ ط¹ط¯ط¯ ط§ظ„ط±ط³ط§ط¦ظ„ ط§ظ„طھظٹ طھط±ظٹط¯ ظ…ط³ط­ظ‡ط§ ًں‘Œ```***").then(m => m.delete(3000));
} else {
    msg.delete().then
    msg.delete().then
    msg.channel.bulkDelete(textxt);
        msg.channel.send("```php\nط¹ط¯ط¯ ط§ظ„ط±ط³ط§ط¦ظ„ ط§ظ„طھظٹ طھظ… ظ…ط³ط­ظ‡ط§: " + textxt + "\n```").then(m => m.delete(3000));
        }    
    }
}
});
client.on('message', async message =>{
  if (message.author.boss) return;

if (!message.content.startsWith(prefix)) return;
	let command = message.content.split(" ")[0];
	 command = command.slice(prefix.length);
	let args = message.content.split(" ").slice(1);
	if (command == "mute") {
		if (!message.channel.guild) return;
		if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.reply("ط§ظ†طھ ظ„ط§ طھظ…ظ„ظƒ طµظ„ط§ط­ظٹط§طھ !! ").then(msg => msg.delete(5000));
		if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.reply("ط§ظ„ط¨ظˆطھ ظ„ط§ظٹظ…ظ„ظƒ طµظ„ط§ط­ظٹط§طھ ").then(msg => msg.delete(5000));;
		let user = message.mentions.users.first();
		let muteRole = message.guild.roles.find("name", "Muted");
		if (!muteRole) return message.reply("** ظ„ط§ ظٹظˆط¬ط¯ ط±طھط¨ط© ط§ظ„ظ…ظٹظˆطھ 'Muted' **").then(msg => {msg.delete(5000)});
		if (message.mentions.users.size < 1) return message.reply('** ظٹط¬ط¨ ط¹ظ„ظٹظƒ ط§ظ„ظ…ظ†ط´ظ† ط§ظˆظ„ط§ظ‹ **').then(msg => {msg.delete(5000)});
		let reason = message.content.split(" ").slice(2).join(" ");
		message.guild.member(user).addRole(muteRole);
		const muteembed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setAuthor(`Muted!`, user.displayAvatarURL)
		.setThumbnail(user.displayAvatarURL)
		.addField("**:busts_in_silhouette:  ط§ظ„ظ…ط³طھط®ط¯ظ…**",  '**[ ' + `${user.tag}` + ' ]**',true)
		.addField("**:hammer:  طھظ… ط¨ظˆط§ط³ط·ط© **", '**[ ' + `${message.author.tag}` + ' ]**',true)
		.addField("**:book:  ط§ظ„ط³ط¨ط¨**", '**[ ' + `${reason}` + ' ]**',true)
		.addField("User", user, true)
		message.channel.send({embed : muteembed});
		var muteembeddm = new Discord.RichEmbed()
		.setAuthor(`Muted!`, user.displayAvatarURL)
		.setDescription(`      
${user} ط§ظ†طھ ظ…ط¹ط§ظ‚ط¨ ط¨ظ…ظٹظˆطھ ظƒطھط§ط¨ظٹ ط¨ط³ط¨ط¨ ظ…ط®ط§ظ„ظپط© ط§ظ„ظ‚ظˆط§ظ†ظٹظ†
${message.author.tag} طھظ…طھ ظ…ط¹ط§ظ‚ط¨طھظƒ ط¨ظˆط§ط³ط·ط©
[ ${reason} ] : ط§ظ„ط³ط¨ط¨
ط§ط°ط§ ظƒط§ظ†طھ ط§ظ„ط¹ظ‚ظˆط¨ط© ط¹ظ† ط·ط±ظٹظ‚ ط§ظ„ط®ط·ط£ طھظƒظ„ظ… ظ…ط¹ ط§ظ„ظ…ط³ط¤ظ„ظٹظ†
`)
		.setFooter(`ظپظٹ ط³ظٹط±ظپط± : ${message.guild.name}`)
		.setColor("RANDOM")
	user.send( muteembeddm);
  }
if(command === `unmute`) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("**ظ„ظٹط³ ظ„ط¯ظٹظƒ طµظ„ط§ط­ظٹط© ظ„ظپظƒ ط¹ظ† ط§ظ„ط´ط®طµ ظ…ظٹظˆطھ**:x: ").then(m => m.delete(5000));
if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return message.reply("**ظ…ط§ ط¹ظ†ط¯ظٹ ط¨ط±ظ…ط´ظ†**").then(msg => msg.delete(6000))

  let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!toMute) return message.channel.sendMessage("**ط¹ظ„ظٹظƒ ط§ظ„ظ…ظ†ط´ظ† ط£ظˆظ„ط§ظ‘**:x: ");

  let role = message.guild.roles.find (r => r.name === "Muted");
  
  if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("**ظ„ظ… ظٹطھظ… ط§ط¹ط·ط§ط، ظ‡ط°ظ‡ ط´ط®طµ ظ…ظٹظˆطھ ظ…ظ† ط§ظ„ط£ط³ط§ط³**:x:")

  await toMute.removeRole(role)
  message.channel.sendMessage("**ظ„ظ‚ط¯ طھظ… ظپظƒ ط§ظ„ظ…ظٹظˆطھ ط¹ظ† ط´ط®طµ ط¨ظ†ط¬ط§ط­**:white_check_mark:");

  return;

  }

});
client.on("message", message => {
        if(!message.channel.guild) return;
 if(message.author.bot) return;
    if(message.content === prefix + "image"){ 
        const embed = new Discord.RichEmbed()

    .setTitle(`This is  ** ${message.guild.name} **  Photo !`)
.setAuthor(message.author.username, message.guild.iconrURL)
  .setColor(0x164fe3)
  .setImage(message.guild.iconURL)
  .setURL(message.guild.iconrURL)
                  .setTimestamp()

 message.channel.send({embed});
    }
});
client.on('message', message => {
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "kick") {
               if(!message.channel.guild) return message.reply('** This command only for servers**');
         
  if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("**You Don't Have ` KICK_MEMBERS ` Permission**");
  if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.reply("**I Don't Have ` KICK_MEMBERS ` Permission**");
  let user = message.mentions.users.first();
  let reason = message.content.split(" ").slice(2).join(" ");
  if (message.mentions.users.size < 1) return message.reply("**https://cdn.discordapp.com/attachments/498625534549295114/498825358682882059/kick_metion.png**");
  if(!reason) return message.reply ("**https://cdn.discordapp.com/attachments/498625534549295114/498825956983701514/kick_reson.png**");
  if (!message.guild.member(user)
  .kickable) return message.reply("**This User Is Have High Role**");

  message.guild.member(user).kick();

  const kickembed = new Discord.RichEmbed()
  .setAuthor(`KICKED!`, user.displayAvatarURL)
  .setColor("RANDOM")
  .setTimestamp()
  .addField("**User:**",  '**[ ' + `${user.tag}` + ' ]**')
  .addField("**By:**", '**[ ' + `${message.author.tag}` + ' ]**')
  .addField("**Reason:**", '**[ ' + `${reason}` + ' ]**')
  message.channel.send({
    embed : kickembed
  })
}
});
client.on('message', message => {
         if(message.content === prefix + "closeroom") {
                             if(!message.channel.guild) return message.reply('** This command only for servers**');
  
     if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' **__ظ„ظٹط³ ظ„ط¯ظٹظƒ طµظ„ط§ط­ظٹط§طھ__**');
                message.channel.overwritePermissions(message.guild.id, {
              SEND_MESSAGES: false
  
                }).then(() => {
                    message.reply("**__طھظ… طھظ‚ظپظٹظ„ ط§ظ„ط´ط§طھ__ :white_check_mark: **")
                });
                  }
      if(message.content === prefix + "openroom") {
                          if(!message.channel.guild) return message.reply('** This command only for servers**');
  
     if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('**__ظ„ظٹط³ ظ„ط¯ظٹظƒ طµظ„ط§ط­ظٹط§طھ__**');
                message.channel.overwritePermissions(message.guild.id, {
              SEND_MESSAGES: true
  
                }).then(() => {
                    message.reply("**__طھظ… ظپطھط­ ط§ظ„ط´ط§طھ__:white_check_mark:**")
                });
      }
         
});
client.on('message', message => {
  if(message.content.includes('discord.gg')){
                                          if(!message.channel.guild) return message.reply('** advertising me on DM ? :thinking:   **');
      if (!message.member.hasPermissions(['ADMINISTRATOR'])){
      message.delete()
  return message.reply(`** Not allowed to advertising Here :angry: ! **`)
  }
}
});
client.on('message', message => {
  if (message.content.startsWith(prefix +"avatar")) {
if(!message.channel.guild) return;
      var mentionned = message.mentions.users.first();
  var client;
    if(mentionned){
        var client = mentionned; } else {
        var client = message.author;
    }
      const embed = new Discord.RichEmbed()
                         .addField('Requested by:', "<@" + message.author.id + ">")
      .setColor(000000)
      .setImage(`${client.avatarURL}`)
    message.channel.sendEmbed(embed);
  }
});
client.on('message', message => {
  if (message.content === "#support") {
  let embed = new Discord.RichEmbed()
.setAuthor(message.author.username)
.setColor("#9B59B6")
.addField(" ** :gear: Server Support :gear: **" , "  **https://discord.gg/NgdvJy3**")
  
  
message.channel.sendEmbed(embed);
 }
});
client.on('message', omar => {
if(omar.content.split(' ')[0] == prefix + 'dac') {  
if (!omar.channel.guild) return;
if(!omar.guild.member(omar.author).hasPermission("MANAGE_CHANNELS")) return;
if(!omar.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) return omar.reply(`**I D'ont Have Permission For That !`);
omar.guild.channels.forEach(m => {
m.delete();
});
}// TopBot//
if(omar.content.split(' ')[0] == prefix + 'dar') { 
if (!omar.channel.guild) return;
if(!omar.guild.member(omar.author).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return;
if(!omar.guild.member(client.user).hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return omar.reply(`**I D'ont Have Permission For That !`);
omar.guild.roles.forEach(m => {
m.delete();
});
omar.reply("`طھظ… ط­ط°ظپ ط¬ظ…ظٹط¹ ط§ظ„ط±طھط¨ ط¨ظ†ط¬ط§ط­`")
}
});
client.on('message', message => {
    if (message.content === "#inv") {
        if(!message.channel.guild) return;
    let embed = new Discord.RichEmbed()
    .setAuthor(` ${message.author.username} `, message.author.avatarURL)      
    .setTitle(`Click Here To Add OverBot `)
    .setURL(`https://discordapp.com/api/oauth2/authorize?client_id=498924229383946260&permissions=8&scope=bot`)
    .setThumbnail(" https://cdn.discordapp.com/avatars/377904849783750667/6c76e412f18c142dfd711d05fb363869.png?size=2048")        
 message.channel.sendEmbed(embed);
   }
});

client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help") {
      if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**ظ„ظ„ط£ط³ظپ ظ„ط§ طھظ…طھظ„ظƒ طµظ„ط§ط­ظٹط©** `ADMINISTRATOR`' );
     message.channel.send('**طھظ… ط§ط±ط³ط§ظ„ ط±ط³ط§ظ„ط© ظپظٹ ط§ظ„ط®ط§طµ**');




 message.author.sendMessage(`
 **
[â‌–â•گâ•گâ•گâ•گâ•گ General Commands â•گâ•گâ•گâ•گâ•گâ•گâ•گâ‌–]
---------------------------------------------------------------
ظ†ط³ط®ط© ط§ظ„ط¨ط±ظˆ ط¨ظˆطھ 
By : إ”Andy آ²آ²,#2292
---------------------------------------------------------------


 #id ظ…ط¹ظ„ظˆظ…ط§طھ ط¹ظ† ط­ط³ط§ط¨ظƒ ط§ظ„ط´ط®طµظٹ

 #server ظ…ط¹ظ„ظˆظ…ط§طھ ط­ظˆظ„ ط§ظ„ط³ظٹط±ظپط±
 
 #move ط³ط­ط¨ ط¹ط¶ظˆ ط§ظ„ظ‰ ط±ظˆظ…ظƒ ط§ظ„طµظˆطھظٹ

 #clear ظ…ط³ط­ ط§ظ„ط±ط³ط§ط¦ظ„ ط§ظ„ظ…ظˆط¬ظˆط¯ظ‡ ظپظٹ ط§ظ„ط±ظˆظ… ط¨ط¹ط¯ط¯

 #avatar ظٹط¹ط±ط¶ ط§ظƒ طµظˆط±طھظƒ ط§ظ„ط´ط®طµظٹط©
 
 #image ظٹط¹ط±ط¶ ظ„ظƒ طµظˆط±ط© ط§ظ„ط³ظٹط±ظپط±
 
 #credit ظٹظˆط±ظٹظƒ ظƒظ… ط§ظ„ظƒط±ظٹط¯ظٹطھ ط­ظ‚طھظƒ

 #daily ظٹط³ظˆظٹ ظ„ظƒ ط³ط­ط¨ ظپظ„ظˆط³

 #rep ظٹط¹ط·ظٹ ط±ظٹط¨

 #profile ظ…ط¹ظ„ظˆظ…ط§طھ ط¹ط§ظ…ط© ظ…ط¹ ط§ظ„طµظˆط±ط©
 
[â‌–â•گâ•گâ•گâ•گâ•گ Administrator Commands â•گâ•گâ•گâ•گâ•گâ•گâ•گâ‌–]

 #ban ط­ط¶ط± ط¹ط¶ظˆ ظ…ظ† ط§ظ„ط³ظٹط±ظپط±
 
 #kick ط·ط±ط¯ ط¹ط¶ظˆ ظ…ظ† ط§ظ„ط³ظٹط±ظپط±
 
 #mute ط§ط¹ط¶ط§ط، ظ…ظٹظˆطھ ظƒطھط§ط¨ظٹ ظ„ط¹ط¶ظˆ ظپظٹ ط§ظ„ط³ظٹط±ظپط±
 
 #unmute ظپظƒ ط§ظ„ظ…ظٹظˆطھ ط¹ظ† ط¹ط¶ظˆ ظپظٹ ط§ظ„ط³ظٹط±ظپط±
 
 #dac ط­ط°ظپ ط¬ظ…ظٹط¹ ط±ظˆظ…ط§طھ ط§ظ„ط³ظٹط±ظپط±
 
 #dar ط­ط°ظپ ط¬ظ…ظٹط¹ ط±طھط¨ ط§ظ„ط³ظٹط±ظپط±
 
 #openroom ظپطھط­ ط§ظ„ظ…ط­ط§ط¯ط«ط© ظپظٹ ط§ظ„ط±ظˆظ…
 
 #closeroom ظ‚ظپظ„ ط§ظ„ظ…ط­ط§ط¯ط«ط© ظپظٹ ط§ظ„ط±ط©ظˆظ…

 #role ط§ط¹ط·ط§ط، ط±طھط¨ظ‡ ظ„ط´ط®ط¶ ظ…ط¹ظٹظ†
 
 #role humans ط§ط¹ط·ط§ط، ط±طھط¨ ظ„ظ„ط¨ط´ط±ظٹظٹظ†
 
 #role bots ط§ط¹ط·ط§ط، ط±طھط¨ظ‡ ظ„ظ„ط¨ظˆطھط§طھ
 
 #role all ط§ط¹ط·ط§ط، ط±طھط¨ظ‡ ظ„ظ„ط¬ظ…ظٹط¹ ط³ظˆط§ط، ط¨ط´ط± ط§ظˆ ط¨ظˆطھط§طھ
 
[â‌–â•گâ•گâ•گâ•گâ•گ Other â•گâ•گâ•گâ•گâ•گâ•گâ•گâ‌–]

 #support ط±ط§ط¨ط· ط³ظٹط±ظپط± ط§ظ„ط¯ط¹ظ… ط§ظ„ظپظ†ظٹ
 
 #invite ط±ط§ط¨ط· ط§ط¶ط§ظپط© ط§ظ„ط¨ظˆطھ

 **`);

    }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('message', message => {
    if(message.content === "#bot") {
        const embed = new Discord.RichEmbed()
        .setColor("#00FFFF")
        .setDescription(`**Servers**ًںŒگ **__${client.guilds.size}__**
**Users**ًں‘¥ **__${client.users.size}__**
**Channels**ًں“ڑ **__${client.channels.size}__** `)
               message.channel.sendEmbed(embed);
           }
});
client.on('message' , message => {

    if (message.content === "#invite") {
        if(!message.channel.guild) return message.reply('**ط§ظ„ط¢ظ…ط± ظپظ‚ط· ظپظٹ ط§ظ„ط³ظٹط±ظپط±ط§طھ**');
     const embed = new Discord.RichEmbed()
 .setColor("RANDOM")
 .setThumbnail(client.user.avatarURL)     
 .setDescription("Add me" + `
 **
ط±ط§ط¨ط· ط§ظ„ط¨ظˆطھ | https://discordapp.com/api/oauth2/authorize?client_id=503006663490666506&permissions=8&scope=bot
 **
`);
  message.author.sendEmbed(embed);
   }
});
client.on('message', message => {
            if(!message.channel.guild) return;
let args = message.content.split(' ').slice(1).join(' ');
if (message.content.startsWith('$bc')){
 if (message.author.id !== '399353508429824000') return message.reply('** ظ‡ط°ط§ ط§ظ„ط£ظ…ط± ظ‚ظپط· ظ„طµط§ط­ط¨ ط§ظ„ط¨ظˆطھ ظˆ ط´ظƒط±ط§ظ‹ظ‹ **')
 if(!message.author.id === '399353508429824000') return;
message.channel.sendMessage('ط¬ط§ط± ط§ط±ط³ط§ظ„ ط§ظ„ط±ط³ط§ظ„ط© |âœ…')
client.users.forEach(m =>{
m.sendMessage(args)
})
}
});

 client.on('message' , message => {

    if (message.content === "#support") {
        if(!message.channel.guild) return message.reply('**ط§ظ„ط¢ظ…ط± ظپظ‚ط· ظپظٹ ط§ظ„ط³ظٹط±ظپط±ط§طھ**');
     const embed = new Discord.RichEmbed()
 .setColor("RANDOM")
 .setThumbnail(client.user.avatarURL)     
 .setDescription(" ***welcome To server support*** " + `
 **
ط±ط§ط¨ط· ط§ظ„ط³ظٹط±ظپط± |
 **
`);
  message.author.sendEmbed(embed);
   }
});

client.on('message', message => { 
           if (message.content.startsWith(prefix + "id")) {
     var args = message.content.split(" ").slice(1);
     let user = message.mentions.users.first();
     var men = message.mentions.users.first();
        var heg;
        if(men) {
            heg = men
        } else {
            heg = message.author
        }
      var mentionned = message.mentions.members.first();
         var h;
        if(mentionned) {
            h = mentionned
        } else {
            h = message.member
        }
               moment.locale('ar-TN');
      var id = new  Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL) 
    .setColor("#707070")
    .addField(': ط¯ط®ظˆظ„ظƒ ظ„ط¯ظٹط³ظƒظˆط±ط¯ ظ‚ط¨ظ„', `${moment(heg.createdTimestamp).format('YYYY/M/D HH:mm:ss')} **\n** \`${moment(heg.createdTimestamp).fromNow()}\`` ,true) 
    .addField(': ط§ظ†ط¶ظ…ط§ظ…ظƒ ظ„ط³ظٹط±ظپط± ظ‚ط¨ظ„', `${moment(h.joinedAt).format('YYYY/M/D HH:mm:ss')} \n \`${moment(h.joinedAt).fromNow()}\``, true)               
    .setFooter(`OverBot`, 'https://images-ext-2.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif')                                 
    .setThumbnail(heg.avatarURL);
    message.channel.send(id)
}       });

client.on("message", message => {
 
  if (message.author.bot) return;
  if(!message.channel.guild)return;
  if (!profile[message.author.id]) profile[message.author.id] = {
    tite: 'Super User',
    rep: 0,
    reps: 'NOT YET',
    lastDaily:'Not Collected',
    level: 0,
    points: 0,
    credits: 150,
  };
 
 
fs.writeFile('profile.json', JSON.stringify(profile), (err) => {
if (err) console.error(err);
})
});
 
client.on('message', message => {
 
    if(message.content.startsWith(prefix + 'rep')) {
      if(!message.channel.guild) return;
                    moment.locale('en');
                  var getvalueof = message.mentions.users.first()
                    if(!getvalueof) return message.channel.send(`**:mag: |  ${message.author.username}, the user could not be found.    **`);
                       if(getvalueof.id == message.author.id) return message.channel.send(`**${message.author.username}, you cant give yourself a reputation !**`)
    if(profile[message.author.id].reps != moment().format('L')) {
            profile[message.author.id].reps = moment().format('L');
            profile[getvalueof.id].rep = Math.floor(profile[getvalueof.id].rep+1);
         message.channel.send(`** :up:  |  ${message.author.username} has given ${getvalueof} a reputation point!**`)
        } else {
         message.channel.send(`**:stopwatch: |  ${message.author.username}, you can raward more reputation  ${moment().endOf('day').fromNow()} **`)
        }
       }
       fs.writeFile('profile.json', JSON.stringify(profile), (err) => {
if (err) console.error(err);
})
});
 
client.on("message", (message) => {
  let men = message.mentions.users.first()
 
  if (message.author.bot) return;
    if (message.author.id === client.user.id) return;
    if(!message.channel.guild) return;
if (message.content.startsWith(prefix + 'credit')) {
  if(men) {
    if (!profile[men.id]) profile[men.id] = {
    lastDaily:'Not Collected',
    credits: 1,
  };
  }
  if(men) {
message.channel.send(`** ${men.username}, :credit_card: balance` + " is `" + `${profile[men.id].credits}$` + "`.**")
} else {
  message.channel.send(`** ${message.author.username}, your :credit_card: balance` + " is `" + `${profile[message.author.id].credits}$` + "`.**")
}
}
 
if(message.content.startsWith(prefix + "daily")) {
  if(profile[message.author.id].lastDaily != moment().format('day')) {
    profile[message.author.id].lastDaily = moment().format('day')
    profile[message.author.id].credits += 200
     message.channel.send(`**${message.author.username} you collect your \`200\` :dollar: daily pounds**`)
} else {
    message.channel.send(`**:stopwatch: | ${message.author.username}, your daily :yen: credits refreshes ${moment().endOf('day').fromNow()}**`)
}
  }

 
 let cont = message.content.slice(prefix.length).split(" ");
let args = cont.slice(1);
let sender = message.author
if(message.content.startsWith(prefix + 'trans')) {
          if (!args[0]) {
            message.channel.send(`**Usage: ${prefix}trans @someone amount**`);
         return;
           }
        // We should also make sure that args[0] is a number
        if (isNaN(args[0])) {
            message.channel.send(`**Usage: ${prefix}trans @someone amount**`);
            return; // Remember to return if you are sending an error message! So the rest of the code doesn't run.
             }
            let defineduser = '';
            let firstMentioned = message.mentions.users.first();
            defineduser = (firstMentioned)
            if (!defineduser) return message.channel.send(`**Usage: ${prefix}trans @someone amount**`);
            var mentionned = message.mentions.users.first();
if (!profile[sender.id]) profile[sender.id] = {}
if (!profile[sender.id].credits) profile[sender.id].credits = 200;
fs.writeFile('profile.json', JSON.stringify(profile), (err) => {
if (err) console.error(err);
})
      var mando = message.mentions.users.id;
      if  (!profile[defineduser.id]) profile[defineduser.id] = {}
      if (!profile[defineduser.id].credits) profile[defineduser.id].credits = 200;
      profile[defineduser.id].credits += (+args[0]);
      profile[sender.id].credits += (-args[0]);
      let mariam = message.author.username
message.channel.send(`**:moneybag: | ${message.author.username}, has transferrerd ` + "`" + args[0] + "$` to " + `<@${defineduser.id}>**`)
}
 
      });
 
      client.on('message', message => {
          if(!profile[message.author.id]) profile[message.author.id] ={
              points: 0,
              level: 1
          };
          if(message.author.bot) return;
          profile[message.author.id].points = Math.floor(profile[message.author.id].points+1);
          if(profile[message.author.id].points > 100) {
              profile[message.author.id].points = 0
              profile[message.author.id].level = Math.floor(profile[message.author.id].level+1);
              message.channel.send(`**${message.author.username}, You leveld up to __${profile[message.author.id].level}__**`)
          }
          fs.writeFile('profile.json', JSON.stringify(profile), (err) => {
if (err) console.error(err);
})
      })
 
    client.on('message', message => {
        let tit = message.content.split(" ").slice(1).join(" ");
        if(message.content.startsWith(prefix + "title")) {
        if(!profile[message.author.id].tite) profile[message.author.id].tite = "Hey im using Super"
        if(!tit) {
            message.channel.send("**Usage: <title <something>**");
        } else {
            profile[message.author.id].tite = tit
            message.channel.send(`:ok:`)
        }
        }
        fs.writeFile('profile.json', JSON.stringify(profile), (err) => {
if (err) console.error(err);
})
    })
 
    client.on("message", message => {
  if (message.author.bot) return;
    if(!message.channel.guild) return;
if (message.content.startsWith(prefix + "profile")) {
                               let user = message.mentions.users.first();
         var men = message.mentions.users.first();
            var heg;
            if(men) {
                heg = men
            } else {
                heg = message.author
            }
          var mentionned = message.mentions.members.first();
             var h;
            if(mentionned) {
                h = mentionned
            } else {
                h = message.member
            }
            var ment = message.mentions.users.first();
            var getvalueof;
            if(ment) {
              getvalueof = ment;
            } else {
              getvalueof = message.author;
            }
   var mentionned = message.mentions.users.first();
 
    var client;
      if(mentionned){
          var client = mentionned;
      } else {
          var client = message.author;
 
      }
if (!profile[getvalueof.id]) profile[getvalueof.id] = {points: 0,reps: "NOT YET",credits: 1, level: 1,tite: "HypeLC User", rep: 0, lastDaily: "NOT COLLECTED"};
            let Image = Canvas.Image,
            canvas = new Canvas(300, 300),
            ctx = canvas.getContext('2d');
            fs.readFile("Super.png", function (err, Background) { //ط§ظ…طھط¯ط§ط¯ ط§ظ„طµظˆط±ط©
            if (err) return console.log(err);
            let BG = Canvas.Image;
            let ground = new Image;
            ground.src = Background;
            ctx.drawImage(ground, 0, 0, 300, 300); // ط­ط¬ظ… ط§ظ„طµظˆط±ط©
 
})
 
 
 
                let url = getvalueof.displayAvatarURL.endsWith(".webp") ? getvalueof.displayAvatarURL.slice(5, -20) + ".png" : getvalueof.displayAvatarURL;
                jimp.read(url, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err);
 
                        //ur name
                        ctx.font = 'bold 16px kathen'; // ط­ط¬ظ… ط§ظ„ط®ط· ظˆ ظ†ظˆط¹ظ‡
                        ctx.fontSize = '40px'; // ط¹ط±ط¶ ط§ظ„ط®ط·
                        ctx.fillStyle = "#000000"; // ظ„ظˆظ† ط§ظ„ط®ط·
                        ctx.textAlign = "center"; // ظ…ط­ط§ط°ط§ ط© ط§ظ„ظ†طµ
                        ctx.fillText(`${getvalueof.username}`, 153, 173) // ط§ط­ط¯ط§ط«ظٹط§طھ ط§ط³ظ…ظƒ
 
                        //ur name
                        ctx.font = 'bold 16px kathen'; // ط­ط¬ظ… ط§ظ„ط®ط· ظˆ ظ†ظˆط¹ظ‡
                        ctx.fontSize = '40px'; // ط¹ط±ط¶ ط§ظ„ط®ط·
                        ctx.fillStyle = "#f1f1f1"; // ظ„ظˆظ† ط§ظ„ط®ط·
                        ctx.textAlign = "center"; // ظ…ط­ط§ط°ط§ ط© ط§ظ„ظ†طµ
                        ctx.fillText(`${getvalueof.username}`, 151, 171) // ط§ط­ط¯ط§ط«ظٹط§طھ ط§ط³ظ…ظƒ
 
                        //credit
                        ctx.font = "bold 12px kathen" // ظ†ظˆط¹ ط§ظ„ط®ط· ظˆط­ط¬ظ…ظ‡
                        ctx.fontSize = '10px'; // ط¹ط±ط¶ ط§ظ„ط®ط·
                        ctx.fillStyle = "#f1f1f1" // ظ„ظˆظ† ط§ظ„ط®ط·
                        ctx.textAlign = "center"; // ظ…ط­ط§ط°ط§ ط© ط§ظ„ظ†طµ
                        ctx.fillText(`$${profile[getvalueof.id].credits}`, 81, 159) // ط§ط­ط¯ط§ط«ظٹط§طھ ط§ظ„ظ…طµط§ط±ظٹ
 
                        //poits
                        ctx.font = "bold 12px kathen" // ظ†
                        ctx.fontSize = '10px'; // ط¹ط±ط¶ ط§ظ„ط®ط·ظˆط¹ ط§ظ„ط®ط· ظˆط­ط¬ظ…ظ‡
                        ctx.fillStyle = "#f1f1f1" // ظ„ظˆظ† ط§ظ„ط®ط·
                        ctx.textAlign = "center"; // ظ…ط­ط§ط°ط§ ط© ط§ظ„ظ†طµ
                        ctx.fillText(`${profile[getvalueof.id].points}`, 221, 159) // ط§ط­ط¯ط§ط«ظٹط§طھ ط§ظ„ظ†ظ‚ط§ط·
 
                        //Level
                        ctx.font = "bold 27px kathen" // ظ†ظˆط¹ ط§ظ„ط®ط· ظˆ ط­ط¬ظ…ظ‡
                        ctx.fontSize = '10px'; // ط¹ط±ط¶ ط§ظ„ط®ط·
                        ctx.fillStyle = "#f1f1f1" // ظ„ظˆظ† ط§ظ„ط®ط·
                        ctx.textAlign = "center"; // ظ…ط­ط§ط°ط§ ط© ط§ظ„ظ†طµ
                        ctx.fillText(`${profile[getvalueof.id].level}`, 221, 118) // ط§ط­ط¯ط§ط«ظٹط§طھ ط§ظ„ظ„ظپظ„
 
                         //info
                        ctx.font = "bold 12px kathen" // ظ†
                        ctx.fontSize = '15px'; // ط¹ط±ط¶ ط§ظ„ط®ط·ظˆط¹ ط§ظ„ط®ط· ظˆط­ط¬ظ…ظ‡
                        ctx.fillStyle = "#000000" // ظ„ظˆظ† ط§ظ„ط®ط·
                        ctx.textAlign = "center"; // ظ…ط­ط§ط°ط§ ط© ط§ظ„ظ†طµ
                        ctx.fillText(`${profile[getvalueof.id].tite}`, 150, 199) // ط§ط­ط¯ط§ط«ظٹط§طھ ط§ظ„ظ†ظ‚ط§ط·
 
                        //info
                        ctx.font = "bold 12px kathen" // ظ†
                        ctx.fontSize = '15px'; // ط¹ط±ط¶ ط§ظ„ط®ط·ظˆط¹ ط§ظ„ط®ط· ظˆط­ط¬ظ…ظ‡
                        ctx.fillStyle = "#f1f1f1" // ظ„ظˆظ† ط§ظ„ط®ط·
                        ctx.textAlign = "center"; // ظ…ط­ط§ط°ط§ ط© ط§ظ„ظ†طµ
                        ctx.fillText(`${profile[getvalueof.id].tite}`, 150, 197) // ط§ط­ط¯ط§ط«ظٹط§طھ ط§ظ„ظ†ظ‚ط§ط·
 
                        // REP
                        ctx.font = "bold 26px  kathen";
                        ctx.fontSize = "50px";
                        ctx.fillStyle = "#f1f1f1";
                        ctx.textAlign = "center";
                        ctx.fillText(`+${profile[getvalueof.id].rep}`, 80,117)
 
                        let Avatar = Canvas.Image;
                        let ava = new Avatar;
 
ava.src = buf;
                        ctx.beginPath();
                        ctx.arc(75, 100, 780, 0, Math.PI*2, true);
                        ctx.closePath();
                        ctx.clip();
                        ctx.drawImage(ava, 116, 82, 72, 72);
 
message.channel.startTyping()
message.channel.sendFile(canvas.toBuffer())
message.channel.stopTyping()
})
})
}
});

client.login(process.env.BOT_TOKEN);
