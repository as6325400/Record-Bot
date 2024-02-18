import { Message } from "discord.js";
import { isNumber } from "./model/rg";
// import { searchStudent } from "./model/search"; 

export async function handleMessage(message: Message) {
  const command : string[] = message.content.split(" ");
  console.log(command);
  if (message.author.bot || command[0] != process.env.BOT_PREFIX!) return;
  if (command.length < 2) return;
  if (command[1] == "add"){
    if (command.length <= 2) return;
    if (command.length == 3) {
      if(!isNumber(command[2])) return;
      // const result = await searchStudent(command[2]);
      // if(result != null) {
        
      // }
    }
  }
}