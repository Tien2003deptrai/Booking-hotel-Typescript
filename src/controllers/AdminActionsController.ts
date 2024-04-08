import { RequestHandler } from "express";
import { QueryTypes } from "sequelize";
import * as _model from '../models/config';
import * as _config from "../config";

// ! Admin
// GET
class AdminActions {
    getHotelDetails: RequestHandler = async (request, response) => {
        try {
            const sql = 'SELECT * FROM hotel';
            const results = await _config.executeQuery(sql);
            _config.sendResponseSuccess(response, results)
        } catch (error) {
            _config.sendResponseError(response, 'Internal Server Error');
        }
    }

    getRomeTypes: RequestHandler = async (request, response) => {
        try {
            const sql = 'SELECT * FROM room_type';
            const results = await _config.executeQuery(sql);
            _config.sendResponseSuccess(response, results);
        } catch (error) {
            _config.sendResponseError(response, 'Internal Server Error');
        }
    }

    getFacilities: RequestHandler = async (request, response) => {
        try {
            const sql = 'SELECT * FROM facilities';
            const results = await _config.executeQuery(sql);
            _config.sendResponseSuccess(response, results);
        } catch (error) {
            _config.sendResponseError(response, 'Internal Server Error');
        }
    }

    getReservationsById: RequestHandler = async (request, response) => {
        try {
            const { cust_id } = request.params;
            const sql = 'SELECT * FROM reservation WHERE cust_id = ?';
            const results = await _config.executeQuery(sql, [cust_id]);
            _config.sendResponseSuccess(response, results);
        } catch (error) {
            _config.sendResponseError(response, 'Internal Server Error');
        }
    }

    getBookings: RequestHandler = async (request, response) => {
        try {
            const sql = 'SELECT * FROM reservation ORDER BY booking_date';
            const results = await _config.executeQuery(sql);
            _config.sendResponseSuccess(response, results);
        } catch (error) {
            _config.sendResponseError(response, 'Internal Server Error');
        }
    }

    addNewRoom: RequestHandler = async (request, response) => {
        try {
            const newRoom: _model.Room = request.body;
            const data = [newRoom.type_id, newRoom.facility_id, newRoom.status_id, newRoom.hotel_id, newRoom.images];
            const sql = 'INSERT INTO room (type_id, facility_id, status_id, hotel_id, images) VALUES (?, ?, ?, ?, ?)';
            await _config.executeQuery(sql, data, QueryTypes.INSERT);
            _config.sendResponseSuccess(response, 'Add new room successfully');
        } catch (error) {
            _config.sendResponseError(response, 'Internal Server Error');
        }
    }

    addFacility: RequestHandler = async (request, response) => {
        try {
            const newFacility: _model.Facilities = request.body;
            const data = [newFacility.facility, newFacility.facility_cost];
            const sql = 'INSERT INTO facilities (facility, facility_cost) VALUES (?, ?)';
            await _config.executeQuery(sql, data, QueryTypes.INSERT);
            _config.sendResponseSuccess(response, 'Add facilities successfully');
        } catch (error) {
            _config.sendResponseError(response, 'Internal Server Error');
        }
    }

    addCustomer: RequestHandler = (request, response) => { }

    // PUT
    editHotelById: RequestHandler = async (request, response) => {
        try {
            const { hotel_id } = request.params;
            const updateHotel: _model.Hotel = request.body;
            const data = [
                updateHotel.hotel_name, updateHotel.hotel_addr,
                updateHotel.hotel_email, updateHotel.hotel_phone,
                hotel_id
            ]
            const sql = 'UPDATE hotel SET hotel_name = ?, hotel_addr = ?, hotel_email = ?, hotel_phone = ? WHERE hotel_id = ?';
            await _config.executeQuery(sql, data, QueryTypes.UPDATE);
            _config.sendResponseSuccess(response, 'Update hotel successfully')
        } catch (error) {
            _config.sendResponseError(response, 'Internal Server Error');
        }
    }

    editRoomsCostById: RequestHandler = async (request, response) => {
        try {
            const { type_id } = request.params;
            const updateRoomCost: _model.RoomType = request.body;
            const data = [updateRoomCost.cost, type_id];
            const sql = 'UPDATE room_type SET cost = ? WHERE type_id = ?';
            await _config.executeQuery(sql, data, QueryTypes.UPDATE);
            _config.sendResponseSuccess(response, 'Update room cost successfully');
        } catch (error) {
            _config.sendResponseError(response, 'Internal Server Error');
        }
    }

    // DELETE 
    deleteFacilitiesById: RequestHandler = async (request, response) => {
        try {
            const { facility_id } = request.params;
            const sql = 'DELETE FROM facilities WHERE facility_id = ?';
            await _config.executeQuery(sql, [facility_id], QueryTypes.DELETE);
            _config.sendResponseSuccess(response, 'Delete facility successfully');
        } catch (error) {
            _config.sendResponseError(response, 'Internal Server Error');
        }
    }

}

export default new AdminActions();



