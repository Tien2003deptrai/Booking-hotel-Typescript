import * as _config from "../config";

class CustomerActionsService {
    async getAllCustomers() {
        const sql = 'SELECT * FROM customer';
        return await _config.executeQuery(sql);
    }

    async getAllRoomFacilities() {
        const sql = 'SELECT * FROM facilities';
        return await _config.executeQuery(sql);
    }

    async getRoomDetailsByDate(start_date: string, end_date: string) {
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
        return await _config.executeQuery(sql, [start_date, end_date]);
    }

    async getAllRoomTypes() {
        const sql = 'SELECT * FROM room_type';
        return await _config.executeQuery(sql);
    }

    async orderRevervations() { }

    async editCustomer() { }

    async deleteReservation() { }

}

export default new CustomerActionsService();
