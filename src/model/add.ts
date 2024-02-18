import database from "../config/database";
import { Iuser } from "./general";
import { logger } from "./log";

export async function addBonus(student : Iuser, week : number) : Promise<boolean> {
  try{
    const db = await database;
    const command = "INSERT INTO bonus (stuid, name, week) VALUES (?, ?, ?);";
    await db.query(command, [student.id, student.name, week]);
    return true;
  }
  catch(err){
    logger.info(`${err} --${new Date()}`);
    return false;
  }
}

export async function bonusExist(student : Iuser, week : number) : Promise<boolean | undefined> {
  try{
    const db = await database;
    const command = "select grade FROM bonus where stuid = ? AND name = ? AND week = ?";
    const result = await db.query(command, [student.id, student.name, week]);
    if(result.length == 0) return false;
    else if(result[0].grade == 0) return false;
    return true;
  }
  catch(err){
    logger.info(`${err} --${new Date()}`);
    return undefined;
  }
  
}