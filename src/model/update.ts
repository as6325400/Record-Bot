import database from "../config/database";

export async function deleteAllStudentByWeek(week : number) : Promise<void> {
  const db = await database;
  const command = "UPDATE `bonus` SET `grade` = '0' WHERE week = ?";
  await db.query(command, [week]);
  return;
}


export async function deleteOneStudentByWeek(week : number, stuid : string) : Promise<void> {
  const db = await database;
  const command = "UPDATE `bonus` SET `grade` = '0' WHERE week = ? AND stuid = ?";
  await db.query(command, [week, stuid]);
  return;
}