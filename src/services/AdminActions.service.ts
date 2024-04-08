import { QueryTypes } from "sequelize";
import * as _model from '../models/config';
import * as _config from "../config";

class AdminActionsService {
    async getAllHotels() {
        const sql = 'SELECT * FROM hotel';
        return await _config.executeQuery(sql);
    }

    async getAllRoomTypes() {
        const sql = 'SELECT * FROM room_type';
        return await _config.executeQuery(sql);
    }

    async getAllFacilities() {
        const sql = 'SELECT * FROM facilities';
        return await _config.executeQuery(sql);
    }

    async getReservationsByCustomerId(cusId: number) {
        const sql = 'SELECT * FROM reservation WHERE cust_id = ?';
        return await _config.executeQuery(sql, [cusId]);
    }

    async getAllBookings() {
        const sql = 'SELECT * FROM reservation ORDER BY booking_date';
        return await _config.executeQuery(sql);
    }

    async addNewRoom(newRoom: _model.Room) {
        const data = [newRoom.type_id, newRoom.facility_id, newRoom.status_id, newRoom.hotel_id, newRoom.images];
        const sql = 'INSERT INTO room (type_id, facility_id, status_id, hotel_id, images) VALUES (?, ?, ?, ?, ?)';
        return await _config.executeQuery(sql, data, QueryTypes.INSERT);
    }

    async addFacility(newFacility: _model.Facilities) {
        const data = [newFacility.facility, newFacility.facility_cost];
        const sql = 'INSERT INTO facilities (facility, facility_cost) VALUES (?, ?)';
        return await _config.executeQuery(sql, data, QueryTypes.INSERT);
    }

    async addCustomer(customer: _model.Customer) {
        // Thực hiện thêm khách hàng vào cơ sở dữ liệu
    }

    async editHotelById(hotelId: number, updateHotel: _model.Hotel) {
        const data = [
            updateHotel.hotel_name, updateHotel.hotel_addr,
            updateHotel.hotel_email, updateHotel.hotel_phone,
            hotelId
        ]
        const sql = 'UPDATE hotel SET hotel_name = ?, hotel_addr = ?, hotel_email = ?, hotel_phone = ? WHERE hotel_id = ?';
        return await _config.executeQuery(sql, data, QueryTypes.UPDATE);
    }

    async editRoomsCostById(typeId: number, updateRoomCost: _model.RoomType) {
        const data = [updateRoomCost.cost, typeId];
        const sql = 'UPDATE room_type SET cost = ? WHERE type_id = ?';
        return await _config.executeQuery(sql, data, QueryTypes.UPDATE);
    }

    async deleteFacilityById(facilityId: number) {
        const sql = 'DELETE FROM facilities WHERE facility_id = ?';
        return await _config.executeQuery(sql, [facilityId], QueryTypes.DELETE);
    }
}

export default new AdminActionsService();