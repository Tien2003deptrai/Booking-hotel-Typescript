import { RequestHandler } from "express";
import AdminActionsService from "../services/AdminActions.service";
import * as _model from '../models/config';
import * as _config from "../config";

// ! Admin
// GET
class AdminActionsController {

    getHotelDetails: RequestHandler = async (request, response) => {
        try {
            const results = await AdminActionsService.getAllHotels();
            _config.sendResponseSuccess(response, results)
        } catch (error) {
            _config.sendResponseErrorServer(response);
        }
    }

    getRomeTypes: RequestHandler = async (request, response) => {
        try {
            const results = await AdminActionsService.getAllRoomTypes();
            _config.sendResponseSuccess(response, results);
        } catch (error) {
            _config.sendResponseErrorServer(response);
        }
    }

    getFacilities: RequestHandler = async (request, response) => {
        try {
            const results = await AdminActionsService.getAllFacilities();
            _config.sendResponseSuccess(response, results);
        } catch (error) {
            _config.sendResponseErrorServer(response);
        }
    }

    getReservationsById: RequestHandler = async (request, response) => {
        try {
            const { cust_id } = request.params;
            const results = await AdminActionsService.getReservationsByCustomerId(parseInt(cust_id));
            _config.sendResponseSuccess(response, results);
        } catch (error) {
            _config.sendResponseErrorServer(response);
        }
    }

    getBookings: RequestHandler = async (request, response) => {
        try {
            const results = await AdminActionsService.getAllBookings();
            _config.sendResponseSuccess(response, results);
        } catch (error) {
            _config.sendResponseErrorServer(response);
        }
    }

    addNewRoom: RequestHandler = async (request, response) => {
        try {
            const newRoom: _model.Room = request.body;
            await AdminActionsService.addNewRoom(newRoom);
            _config.sendResponseSuccess(response, 'Add new room successfully');
        } catch (error) {
            _config.sendResponseErrorServer(response);
        }
    }

    addFacility: RequestHandler = async (request, response) => {
        try {
            const newFacility: _model.Facilities = request.body;
            await AdminActionsService.addFacility(newFacility);
            _config.sendResponseSuccess(response, 'Add facilities successfully');
        } catch (error) {
            _config.sendResponseErrorServer(response);
        }
    }

    addCustomer: RequestHandler = (request, response) => { }

    // PUT
    editHotelById: RequestHandler = async (request, response) => {
        try {
            const { hotel_id } = request.params;
            const updateHotel: _model.Hotel = request.body;
            await AdminActionsService.editHotelById(parseInt(hotel_id), updateHotel);
            _config.sendResponseSuccess(response, 'Update hotel successfully');
        } catch (error) {
            _config.sendResponseErrorServer(response);
        }
    }

    editRoomsCostById: RequestHandler = async (request, response) => {
        try {
            const { type_id } = request.params;
            const updateRoomCost: _model.RoomType = request.body;
            await AdminActionsService.editRoomsCostById(parseInt(type_id), updateRoomCost);
            _config.sendResponseSuccess(response, 'Update room cost successfully');
        } catch (error) {
            _config.sendResponseErrorServer(response);
        }
    }

    // DELETE 
    deleteFacilitiesById: RequestHandler = async (request, response) => {
        try {
            const { facility_id } = request.params;
            await AdminActionsService.deleteFacilityById(parseInt(facility_id));
            _config.sendResponseSuccess(response, 'Delete facility successfully');
        } catch (error) {
            _config.sendResponseErrorServer(response);
        }
    }

}

export default new AdminActionsController();



