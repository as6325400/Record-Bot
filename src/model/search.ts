import database from "../config/database";
import { logger } from "./log";
import { Iuser, Igrade } from "./general";

export async function searchStudent (id : string) : Promise<Iuser | null>{
  const db = await database;
  const command = "SELECT username as id, name FROM `user` WHERE username = ?;";
  const result : Iuser[] = await db.query<Iuser[]>(command, [id]);
  if(result.length != 1){
    if (result.length > 1) logger.info(`database error, more than one student have common studentId!  --${new Date()}`);
    else if (result.length == 0) logger.info(`No search this student in database, Please check Student Id is correct!  --${new Date()}`);
    return null;
  }
  return result[0];
}

export async function searchGradeByWeek (week : number) : Promise<Igrade[]>{
  const db = await database;
  const command = "SELECT name, stuid as id, date FROM `bonus` where week = ?;";
  const result : Igrade[] = await db.query<Igrade[]>(command, [week]);
  return result;
}



export async function searchGradeByStudent (stuid : string) : Promise<number>{
  const db = await database;
  const command = "SELECT COUNT(*) as num FROM `bonus` WHERE stuid = ? AND grade = 1;";
  const result = await db.query(command, [stuid]);
  return Number(result[0].num);
}

export async function searchStudentById (stuid : string) : Promise<string | null>{
  const db = await database;
  const command = "SELECT name FROM `user` WHERE username = ?;";
  const result = await db.query(command, [stuid]);
  if(result.length != 0) return null; 
  return result[0].name;
}


