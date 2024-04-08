import { Router } from "express";
import AdminRouter from "./AdminRouter";
import CustomerRouter from "./CustomerRouter";


const router = Router();

export default (): Router => {

    router.use('/admin', AdminRouter);

    router.use('/customer', CustomerRouter);

    return router;
}