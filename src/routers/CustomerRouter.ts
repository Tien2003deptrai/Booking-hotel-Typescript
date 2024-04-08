import { Router } from "express";
import CustomerController from "../controllers/CustomerController";
import CustomerActionsController from "../controllers/CustomerActionsController";
import AuthMiddleware from "../middlewares/AuthMiddleware";

const router = Router();

// Router GET 
router.get('/', AuthMiddleware.verifyToken, CustomerActionsController.getCustomers);

router.get('/rooms/facilities', AuthMiddleware.verifyToken, CustomerActionsController.getRoomsFacilities);

router.get('/rooms/details/:start_date/:end_date', AuthMiddleware.verifyToken, CustomerActionsController.getRoomsDetailByDate);

router.get('/room/types', AuthMiddleware.verifyToken, CustomerActionsController.getRoomTypes);

// Router POST
router.post('/login', AuthMiddleware.verifyToken, CustomerController.customerLogin);

router.post('/register', AuthMiddleware.verifyToken, CustomerController.customerRegister);

export default router;