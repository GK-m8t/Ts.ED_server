"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const tslib_1 = require("tslib");
const di_1 = require("@tsed/di");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const types_1 = require("../../types");
const utils_1 = require("../../utils");
let log = console.log;
let OrderService = class OrderService {
    service;
    orderBook;
    constructor(service //private helper: PrintRequestServiceHelpers
    ) {
        this.service = service;
    }
    async createOrder(tokenId, account, shipping) {
        try {
            const order = await this.orderBook.findOne({
                tokenId: tokenId
            });
            if (order instanceof types_1.Order && order.status) {
                if (order.status.payment) {
                    throw new Error("Payment pending or completed.");
                }
                else if (order.account.address.toLowerCase() === account.address.toLowerCase()) {
                    throw new Error("Order exists.");
                }
                else {
                    await this.orderBook.deleteOne({ tokenId: tokenId });
                }
            }
            const res = await this.service.validateAddress(shipping.address);
            console.log("Address val result ", res);
            if (res.data) {
                return res.data;
            }
            else if (res.code === "ERROR") {
                throw new Error("Invalid address");
            }
            else {
                //const cost: Cost = this.helper.calculateCost(shipping.address);
                const cost = { print: 50.0, ship: 5.0 };
                const newOrder = new this.orderBook({
                    tokenId: tokenId,
                    account: account,
                    cost: cost,
                    shipping: shipping,
                    payment: null,
                    status: null
                });
                await newOrder.save();
                return newOrder._doc;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getOrder(tokenId, account) {
        try {
            const order = await this.orderBook.findOne({
                tokenId: tokenId
            });
            if (!order) {
                throw new Error("Order doesn't exist.");
            }
            else if (order.account.address.toLowerCase() === account.address.toLowerCase()) {
                return order;
            }
            else if (order.status && order.status.payment) {
                throw new Error("Payment pending or completed.");
            }
            else {
                await this.orderBook.deleteOne({ tokenId: tokenId });
                throw new Error("Order doesn't exist.");
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getOrders() {
        try {
            const orders = await this.orderBook.find();
            if (!orders || orders.length <= 0) {
                throw new Error("Collection empty.");
            }
            return orders;
        }
        catch (error) {
            console.error("Error fetching data for the tokens:", error);
            throw error;
        }
    }
    async updateOrder(tokenId, account, shipping) {
        try {
            const dbURL = mongoose_1.default.connections;
            const order = await this.orderBook.findOne({ tokenId: tokenId });
            console.log(`Checking update order \n`, tokenId);
            if (!order) {
                throw new Error("Order doesn't exist.");
            }
            else if (order.status && order.status.payment) {
                // CONSIDER: ShippingStatus
                throw new Error("Payment pending or completed.");
            }
            else if (order.account.address.toLowerCase() !== account.address.toLowerCase()) {
                throw new Error("Create new order.");
            }
            else {
                const res = await this.service.validateAddress(shipping.address);
                console.log("Address val result ", res);
                if (res.data) {
                    return { data: res.data, isOrder: false };
                }
                else if (res.code === "ERROR") {
                    throw new Error("Invalid address");
                }
                else {
                    order.shipping = shipping;
                    // await order.save();
                    await this.orderBook.updateOne({ tokenId: tokenId }, {
                        $set: {
                            shipping: shipping
                        }
                    });
                    return { data: order, isOrder: true };
                    //return order.toObject;
                }
            }
        }
        catch (error) {
            throw error;
        }
    }
    async updateStatus(tokenId, shippingStatus) {
        try {
            const dbURL = mongoose_1.default.connections;
            const order = await this.orderBook.findOne({ tokenId: tokenId });
            if (!order) {
                throw new Error("Order doesn't exist.");
            }
            else if (order.status &&
                order.status.payment !== types_1.PaymentStatus.completed) {
                // CONSIDER: ShippingStatus
                throw new Error("Payment pending");
            }
            else {
                if (order.status) {
                    order.status.shipping = shippingStatus;
                    // await order.save();
                    await this.orderBook.updateOne({ tokenId: tokenId }, {
                        $set: {
                            "status.shipping": shippingStatus
                        }
                    });
                    return order;
                }
                else {
                    throw new Error("Status object is not set");
                }
            }
        }
        catch (error) {
            throw error;
        }
    }
};
exports.OrderService = OrderService;
tslib_1.__decorate([
    (0, di_1.Inject)(types_1.Order),
    tslib_1.__metadata("design:type", Object)
], OrderService.prototype, "orderBook", void 0);
exports.OrderService = OrderService = tslib_1.__decorate([
    (0, di_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [utils_1.AddressValidationUtil //private helper: PrintRequestServiceHelpers
    ])
], OrderService);
//# sourceMappingURL=OrderService.js.map