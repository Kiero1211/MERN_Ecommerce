import { Router } from "express";
import { authorize, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { 
    getAllOrders,
    createOrder,
    getCurrentOrder, 
    getTotalNumberOrders,
    getTotalSalesOrders,
    getTotalSalesByDateOrders,
    getOrderById,
    markOrderAsPaid,
    markOrderAsDelivered,
    checkOutOrder,
    getStripeKey,
} from "../controllers/orderController.js";
const router = Router();

router.route("/all").get(authorize, authorizeAdmin, getAllOrders);
router.route("/all/count").get(authorize, authorizeAdmin, getTotalNumberOrders);
router.route("/all/sales").get(authorize, authorizeAdmin, getTotalSalesOrders);
router.route("/all/sales-by-date").get(authorize, authorizeAdmin, getTotalSalesByDateOrders);
router.route("/current").get(authorize, getCurrentOrder);


router.route("/:id").get(authorize, getOrderById);

router.route("/:id/pay").put(authorize, markOrderAsPaid); 
router.route("/:id/deliver").put(authorize, markOrderAsDelivered);
router.route("/:id/checkout").post(authorize, markOrderAsPaid, checkOutOrder);
router.route("/:id/checkout/key").get(authorize, getStripeKey);

router.route("/create").post(authorize, createOrder);

export default router;