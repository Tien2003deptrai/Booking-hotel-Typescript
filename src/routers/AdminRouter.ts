import { Router } from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import AdminController from "../controllers/AdminController";
import AdminActionsController from "../controllers/AdminActionsController";

const router = Router();

// Router GET
/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     description: Authenticate admin.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Login"
 *     responses:
 *       "200":
 *         description: OK
 */
router.get('/hotel/details', AuthMiddleware.verifyToken, AdminActionsController.getHotelDetails);

router.get('/room_types', AuthMiddleware.verifyToken, AdminActionsController.getRomeTypes);

router.get('/facilities', AuthMiddleware.verifyToken, AdminActionsController.getFacilities);

router.get('/reservations/:cust_id', AuthMiddleware.verifyToken, AdminActionsController.getReservationsById);

router.get('/bookings/', AuthMiddleware.verifyToken, AdminActionsController.getBookings);

// Router POST
router.post('/login', AdminController.adminLogin);

router.post('/register', AdminController.adminRegister);

// Security token 
router.post('/refresh_token', AdminController.refreshToken);


router.post('/addnewroom', AuthMiddleware.verifyToken, AdminActionsController.addNewRoom);

router.post('/addfacility', AuthMiddleware.verifyToken, AdminActionsController.addFacility);

// Router PUT
router.put('/edithotel/:hotel_id', AuthMiddleware.verifyToken, AdminActionsController.editHotelById);

router.put('/editroomscost/:type_id', AuthMiddleware.verifyToken, AdminActionsController.editRoomsCostById);

export default router;