const Discord = require("discord.js");
const client = new Discord.Client();
const Prefix = ".";

client.on('ready', () => {
    console.log('╔[════════════════════════════════════]╗');
    console.log('')
    console.log('            ╔[════════════]╗')
    console.log('              Bot Is Online')
    console.log('            ╚[════════════]╝')
    console.log('')
    console.log(`Logged in as ${client.user.tag}!`);
    console.log('')
    console.log(`servers! [ " ${client.guilds.size} " ]`);
    console.log('')
    console.log(`Users! [ " ${client.users.size} " ]`);
    console.log('')
    console.log('╚[════════════════════════════════════]╝')
          client.user.setActivity(".help | By: YodaBrro#4557",{type: 'STREAMING'});          
});

client.on('message', message => {
    if (message.content.startsWith(".new")) {
        const reason = message.content.split(" ").slice(1).join(" ");
        if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`This server doesn't have a \`Support Team\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
        if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`You already have a ticket open.`);
        message.guild.createChannel(`ticket-${message.author.username- + message.author.discriminator}`, "text").then(c => {
            let role = message.guild.roles.find("name", "Support Team");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            message.channel.send(`:white_check_mark: Your ticket has been created, #${c.name}`);
            const embed = new Discord.RichEmbed()
                .setColor(0xCF40FA)
                .addField(`Hey ${message.author.username}!`, `Please try explain why you opened this ticket with as much detail as possible. Our **Support Staff** will be here soon to help.`)
                .setTimestamp();
            c.send({
                embed: embed
            });
        }).catch(console.error); 
    }


    if (message.content.startsWith(".close")) {
        if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);

        message.channel.send(`Are you sure? Once confirmed, you cannot reverse this action!\nTo confirm, type \`.close\`. This will time out in 10 seconds and be cancelled.`)
            .then((m) => {
                message.channel.awaitMessages(response => response.content === '.close', {
                        max: 1,
                        time: 10000,
                        errors: ['time'],
                    })
                    .then((collected) => {
                        message.channel.delete();
                    })
                    .catch(() => {
                        m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
                            m2.delete();
                        }, 3000);
                    });
            });
    }

});

client.on('message', msg => { 
    if (msg.content.startsWith(`.report`)) {
    
       let args = msg.content.split(" ").slice(1);
    
      if (!msg.mentions.members.first()) return msg.reply(`Mention Someone`)
    
      if (!args[1]) return msg.reply(`What is the Report ؟؟`)
    
      if (msg.guild.channels.find('name', 'logs')) {
    
        msg.guild.channels.find('name', 'logs').send(`
      Report On : ${msg.mentions.members.first()}
      Reported By : ${msg.member}
      Reason : **${args.join(" ").split(msg.mentions.members.first()).slice(' ')}**
      `)
      }
    }
});

var prefix = ".";
client.on('message', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if(!message.channel.guild) return;
  if(!message.member.hasPermission('MANAGE_MESSAGES')) return;
  if (message.mentions.users.size < 1) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);
  
 

if (command == ".warn") {
    let say = new Discord.RichEmbed()
    .setDescription(args.join("  "))
    .setColor(0x831f18)
    message.channel.sendEmbed(say);
    client.channels.get("477492653886406681").send(`**=========================================**`)
    client.channels.get("477492653886406681").send(`**New Warn !**`)
    client.channels.get("477492653886406681").send({embed : say})
    client.channels.get("477492653886406681").send(`**Admin : ${message.author.username}#${message.author.discriminator}**`)
    client.channels.get("477492653886406681").send(`**In Channel : ${message.channel}**`)
    message.delete();
  }


});

client.on('message', message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(".announce")) return;
  
    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
  
    let args = message.content.split(" ").slice(1);

  let rank = message.guild.member(message.author).roles.find('name', 'Executive' , 'Manager');
  if (!rank) return message.reply('You Do not Have the Role to Execute The Command')
    message.channel.send(args.join("  "))
      message.delete();
    
    
  
  
});

client.on('message',function(message) {
    let w = ['Rock','Paper','Scissors'];
   if(message.content.startsWith(prefix + "rps")) {
       message.channel.send(`\`\`\`css
Choose one of the following.
#1 ( Rock )
#2 ( Paper )
#3 ( Scissors )
\`\`\`

__You Have 5 Seconds To Choose__`)
.then(() => {
  message.channel.awaitMessages(response => response.content === '1', {
    max: 1,
    time: 5000,
    errors: ['time'],
  })
  .then((collected) => {
      if(message.author !== message.author)return;
     message.channel.send('🏵 ' + w[Math.floor(Math.random() * w.length)]);
    });
});
  message.channel.awaitMessages(response => response.content === '2', {
    max: 1,
    time: 5000,
    errors: ['time'],
  })
  .then((collected) => {
     message.channel.send('🏵 ' + w[Math.floor(Math.random() * w.length)]);
    });
      message.channel.awaitMessages(response => response.content === '3', {
    max: 1,
    time: 5000,
    errors: ['time'],
  })
  .then((collected) => {
     message.channel.send('🏵 ' + w[Math.floor(Math.random() * w.length)]);
    });
   } 
});

client.on('message', message => {
    if(message.content.startsWith(".invites")) {
     message.guild.fetchInvites().then(invs => {
       let user = message.mentions.users.first() || message.author
       let personalInvites = invs.filter(i => i.inviter.id === user.id);
       let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
 message.channel.send(`${user} has __${inviteCount}__ **invites.**`);
 });
   }
});

var request = require('request');

var mcCommand = '.mc'; // Command for triggering

var mcIP = 'cmblock.net'; // Your MC server IP

var mcPort = 26613; // Your MC server port


client.on('message', message => {

    if (message.content === mcCommand) {

        var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort;

        request(url, function(err, response, body) {

            if(err) {

                console.log(err);

                return message.reply('Error getting Minecraft server status...');

            }

            body = JSON.parse(body);

            var status = '*cmblock is currently offline* - **IP: cmblock.net     Version(1.12.2)**';

            if(body.online) {

                status = '**cmblock** is **online** - **IP: cmblock.net   Version (1.12.2)**';

                if(body.players.now) {

                    status += '**' + body.players.now + '** people are playing! - **IP: cmblock.net     Version(1.12.2)**';

                } else {

                    status += ' - Nobody is playing!';

                }

            }

            message.reply(status);

        });

    }

});

client.on('message' , async (message) => {
    var prefix = "-"
        if(message.content.startsWith(".topinvites")) {
    if(message.author.bot) return;
    if(!message.channel.guild) return message.reply(' Error : \` Guild Command \`');
      var invites = await message.guild.fetchInvites();
        invites = invites.array();
        arraySort(invites, 'uses', { reverse: true });
        let possibleInvites = ['User Invited |  Uses '];
        invites.forEach(i => {
            if (i.uses === 0) { 
                return;
            }
          possibleInvites.push(['\n\ ' +'<@'+ i.inviter.id +'>' + '  :  ' +   i.uses]);
          if (i.uses === 10) {//يمديك تعدل رقم وصول العدد حق الانفايت الى اأقل أو أكثر
              message.member.addRole(message.member.guild.roles.find("name",""))//هنآ أسم ألرتبه اللي تجيهه
    .catch(RebeL =>{
    console.log('`Error`: ' + RebeL);
    });
    }
    if (i.uses === 20) {
    message.member.addRole(message.member.guild.roles.find("name",""))
    .catch(RebeL =>{
    console.log('`Error`: ' + RebeL);
    });
    }
    if (i.uses === 30) {
    message.member.addRole(message.member.guild.roles.find("name",""))
    .catch(RebeL =>{
    console.log('`Error`: ' + RebeL);
    });
          }//معلومه بسيطه يمديك تكرر العمليهه أكثر من مره
        })
        const embed = new Discord.RichEmbed()
     .setColor('#36393e')
        .addField("Top Invites." ,`${(possibleInvites)}`)
    
        message.channel.send(embed)
        }
});

client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === ".help") {
		 message.channel.send('**The Message Was Sent On Private**');
            
	
		 


 message.author.sendMessage(`
 **
__Cm-Bot__
╔[❖════════════❖]╗
             Prefix = ' . '
╚[❖════════════❖]╝

╔[❖════════════❖]╗
             Admin Commands
╚[❖════════════❖]╝

 ❖ .new ➾ Open a New Ticket
 
 ❖ .close ➾ close your Ticket

 ❖ .report <mention> <reason> ➾ Repote a Player

 ❖ .announce <message> (Admin Only) ➾ Send a Message

 ❖ .invites or .invites <@mentions> ➾ Know How many Players Joined from your Invite
  
 ❖ .mc ➾ Know the MC Server Status

 ❖ Note: Make Sure to __Enable__ Direct Messages

`);

    }
});

client.login(process.env.BOT_TOKEN);
