import { Router } from "express";
import CustomerController from "../controllers/CustomerController";
import CustomerActions from "../controllers/CustomerActionsController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = Router();

// Router GET 
router.get('/', AuthMiddleware.verifyToken, CustomerActions.getCustomers);

router.get('/rooms/facilities', AuthMiddleware.verifyToken, CustomerActions.getRoomsFacilities);

router.get('/rooms/details/:start_date/:end_date', AuthMiddleware.verifyToken, CustomerActions.getRoomsDetailByDate);

router.get('/room/types', AuthMiddleware.verifyToken, CustomerActions.getRoomTypes);

// Router POST
router.post('/login', AuthMiddleware.verifyToken, CustomerController.customerLogin);

router.post('/register', AuthMiddleware.verifyToken, CustomerController.customerRegister);

export default router;