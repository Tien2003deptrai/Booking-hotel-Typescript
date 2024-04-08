import { Sequelize } from "sequelize-typescript";
import { Admin } from "../models/Admin";
import { Hotel } from "../models/Hotel";
import { Servents } from "../models/Servents";
import { Room } from "../models/Room";
import { RoomStatus } from "../models/RoomStatus";
import { RoomType } from "../models/RoomType";
import { Reservation } from "../models/Reservation";
import { Facilities } from "../models/Facilities";
import { Customer } from "../models/Customer";
import { QueryTypes } from "sequelize";

export const connection = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'Tien2003@',
    database: 'pj_hotel_booking',
    port: 3306,
    logging: false,
    define: {
        timestamps: false
    },
    models: [
        Admin, Hotel, Servents,
        Room, RoomStatus,
        RoomType, Reservation,
        Facilities, Customer
    ]
});

export const executeQuery = (query: string, params?: any, queryType: QueryTypes = QueryTypes.SELECT): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        connection.query(query, { replacements: params, type: queryType })
            .then((result: any) => {
                resolve(result);
            })
            .catch((err: any) => {
                reject(err);
            });
    });
};
