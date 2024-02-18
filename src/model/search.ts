import database from "../config/database";
import { logger } from "./log";
import { Iuser } from "./Interface";

export async function searchStudent (id : string) : Promise<Iuser | null>{
  const db = await database;
  const command = "SELECT username as id, name FROM `user` WHERE username = ?;";
  const result : Iuser[] = await db.query<Iuser[]>(command, [id]);
  if(result.length != 1){
    if (result.length > 1) logger.info("database error, more than one student have common studentId!");
    else if (result.length == 0) logger.info("No search this student in database, Please check Student Id is correct!");
    return null;
  }
  return result[0];
}

