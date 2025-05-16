import mysql2, { PoolOptions, QueryError, QueryResult } from "mysql2";
import { appConfig } from "./app-config";

class Dal {
  private options: PoolOptions = {
    host: appConfig.mySqlHost,
    user: appConfig.mySqlUser,
    password: appConfig.mySqlPassword,
    database: appConfig.mySqlDatabase,
  };

  private readonly connection = mysql2.createPool(this.options);

  public execute(sql: string, values?: any[]) {
    return new Promise<any>((resolve, reject) => {
      // To Promisify
      this.connection.query(sql, values, (err: QueryError, result: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

export const dal = new Dal();
