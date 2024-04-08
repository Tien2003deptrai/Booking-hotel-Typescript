import { Router } from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import AdminController from "../controllers/AdminController";
import AdminActions from "../controllers/AdminActionsController";

const router = Router();

// Router GET
router.get('/hotel/details', AuthMiddleware.verifyToken, AdminActions.getHotelDetails);

router.get('/room_types', AuthMiddleware.verifyToken, AdminActions.getRomeTypes);

router.get('/facilities', AuthMiddleware.verifyToken, AdminActions.getFacilities);

router.get('/reservations/:cust_id', AuthMiddleware.verifyToken, AdminActions.getReservationsById);

router.get('/bookings/', AuthMiddleware.verifyToken, AdminActions.getBookings);

// Router POST
router.post('/login', AdminController.adminLogin);

router.post('/register', AdminController.adminRegister);

router.post('/addnewroom', AuthMiddleware.verifyToken, AdminActions.addNewRoom);

router.post('/addfacility', AuthMiddleware.verifyToken, AdminActions.addFacility);

// Router PUT
router.put('/edithotel/:hotel_id', AuthMiddleware.verifyToken, AdminActions.editHotelById);

router.put('/editroomscost/:type_id', AuthMiddleware.verifyToken, AdminActions.editRoomsCostById);

export default router;