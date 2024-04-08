import { RequestHandler } from "express";
import * as _config from "../config";
import CustomerActionsService from "../services/CustomerActions.service";

class CustomerActionsController {

    // ! Customer
    // GET
    getCustomers: RequestHandler = async (request, response) => {
        try {
            const results = await CustomerActionsService.getAllCustomers();
            _config.sendResponseSuccess(response, results);
        } catch (error) {
            _config.sendResponseError(response, 'Internal Server Error');
        }
    }

    getRoomsFacilities: RequestHandler = async (request, response) => {
        try {
            const results = await CustomerActionsService.getAllRoomFacilities();
            _config.sendResponseSuccess(response, results);
        } catch (error) {
            _config.sendResponseError(response, 'Internal Server Error');
        }
    }

    getRoomsDetailByDate: RequestHandler = async (request, response) => {
        try {
            const { start_date, end_date } = request.body;
            const results = await CustomerActionsService.getRoomDetailsByDate(start_date, end_date);
            _config.sendResponseSuccess(response, results)
        } catch (error) {
            _config.sendResponseError(response, 'Internal Server Error');
        }
    }

    getRoomTypes: RequestHandler = async (request, response) => {
        try {
            const results = await CustomerActionsService.getAllRoomTypes();
            _config.sendResponseSuccess(response, results);
        } catch (error) {
            _config.sendResponseError(response, 'Internal Server Error');
        }
    }

    // POST
    orderRevervations: RequestHandler = async (request, response) => { }

    // PUT 
    editCustomer: RequestHandler = async (request, response) => { }

    // DELETE
    deleteReservation: RequestHandler = async (request, response) => { }
}

export default new CustomerActionsController(); 
