import { Message } from "discord.js";
import { isNumber } from "./model/rg";
import { searchStudent, searchGradeByWeek, searchGradeByStudent, searchStudentById } from "./model/search"; 
import { dateToWeek } from "./model/general";
import { logger } from "./model/log";
import { addBonus, bonusExist } from "./model/add";
import { deleteAllStudentByWeek, deleteOneStudentByWeek} from "./model/update";

export async function handleMessage(message: Message) {
  const command : string[] = message.content.split(" ");
  if (message.author.bot || command[0] != process.env.BOT_PREFIX!) return;
  if (command.length < 2) return;
  if (command[1] == "add"){
    if (command.length <= 2) return;
    if (command.length == 3) {
      const nowDate = new Date();

      // 只有上課日能新增
      if(nowDate.getDay() != Number(process.env.CLASS_DAY)){
        message.reply("Today is not class day!");
        return;
      }
      if(!isNumber(command[2])) return;
      
      const student = await searchStudent(command[2]);
      if(student!= null) {
        // month 是 0 index
        const month = Number(nowDate.getMonth() + 1);
        const day = nowDate.getDate();
        
        // 學期結束
        if(dateToWeek[month]?.[day] === undefined){
          logger.info(`semester ending! --${nowDate}`);
          return;
        }
        
        if(await bonusExist(student, dateToWeek[month][day])){
          message.reply("This student already get bonus in this week");
          return;
        }

        if(await addBonus(student, dateToWeek[month][day])){
          message.reply(`Success add ${student.id} ${student.name} this week!`);
          return;
        }

        else{
          message.reply("add bonus error!");
        }
        
      }

      else{
        message.reply("No search this student in database, Please check Student Id is correct!");
      }
    }
  }
  else if(command[1] == "show"){
    if(command.length == 3) {
      if(command[2] == "date") {
        let mes = "";
        for(const month in dateToWeek){
          for(const date in dateToWeek[month]){
            mes += `${month}/${date} is week ${dateToWeek[month][date]}\n`;
          }
        }

        message.reply(mes);
        return;
      }

    }
    else if(command.length >= 4){
      if(command[2] == "-t"){
        if(command.length != 4) return;
        if(isNumber(command[3])){
          const result = await searchGradeByWeek(Number(command[3]));
          if(result.length == 0){
            message.reply(`week${command[3]}\nNone student all problems accept this week!`);
          }
          else{
            let mes = `week${command[3]}\n`;
            for(const student of result){
              const date = student.date;
              mes += `${date.getFullYear()}-${Number(date.getMonth()) + 1}-${date.getDate()}  ${student.id}  ${student.name}\n`;
            }
            message.reply(mes);
          }
        }
      }

      else if(command[2] == "-s"){
        // 查這位學生總共加分次數
        if(command.length != 4) return;
        if(isNumber(command[3])){
          const name = await searchStudentById(command[3]);
          if(name == null){
            message.reply("Student id not found!");
            return;
          }
          const result = await searchGradeByStudent(command[3]);
          message.reply(`${command[3]} ${name} total get ${result} times!\n`);
        }
      }
    }
  }
  else if(command[1] == "remove"){
    if(command[2] == "-r"){
      // month 是 0 index
      const nowDate = new Date();
      const month = Number(nowDate.getMonth() + 1);
      const day = nowDate.getDate();
      if(isNumber(command[3])){
        await deleteOneStudentByWeek(dateToWeek[month][day], command[3]);
      }
      else if(command[3] == "all"){
        if(command[4] == "-f"){
          await deleteAllStudentByWeek(dateToWeek[month][day]);
        }
      }
    }
  }
}