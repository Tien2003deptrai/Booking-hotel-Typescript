import { RequestHandler } from "express";
import * as _config from "../config";


class CustomerActions {
    // ! Customer
    // GET
    getCustomers: RequestHandler = async (request, response) => {
        try {
            const sql = 'SELECT * FROM customer';
            const results = await _config.executeQuery(sql);
            _config.sendResponseSuccess(response, results);
        } catch (error) {
            _config.sendResponseError(response, 'Internal Server Error');
        }
    }

    getRoomsFacilities: RequestHandler = async (request, response) => {
        try {
            const sql = 'SELECT * FROM facilities';
            const results = await _config.executeQuery(sql);
            _config.sendResponseSuccess(response, results);
        } catch (error) {
            _config.sendResponseError(response, 'Internal Server Error');
        }
    }

    getRoomsDetailByDate: RequestHandler = async (request, response) => {
        try {
            const { start_date, end_date } = request.body;
            const sql = `
                    SELECT 
                    r.room_id, r.images, 
                    rt.type_name, rt.cost, 
                    rs.availability, 
                    f.facility, f.facility_cost
                FROM  
                    room r 
                JOIN
                    room_type rt ON r.type_id = rt.type_id
                JOIN 
                    room_status rs ON r.status_id = rs.status_id
                JOIN 
                    facilities f ON r.facility_id = f.facility_id
                LEFT JOIN
                    reservation res ON r.room_id = res.room_id
                WHERE 
                    (res.room_id IS NULL OR NOT (res.start_date BETWEEN ? AND ? OR res.end_date BETWEEN ? AND ?))
            `;
            const results = _config.executeQuery(sql, [start_date, end_date]);
            _config.sendResponseSuccess(response, results)
        } catch (error) {
            _config.sendResponseError(response, 'Internal Server Error');
        }
    }

    getRoomTypes: RequestHandler = async (request, response) => {
        try {
            const sql = 'SELECT *FROM room_type';
            const results = await _config.executeQuery(sql);
            _config.sendResponseSuccess(response, results);
        } catch (error) {
            _config.sendResponseError(response, 'Internal Server Error');
        }
    }

    // POST
    orderRevervations: RequestHandler = async (request, response) => { }

    // PUT 
    editCustomer: RequestHandler = async (request, response) => { }

    // DELTE
    deleteReservation: RequestHandler = async (request, response) => { }
}

export default new CustomerActions();