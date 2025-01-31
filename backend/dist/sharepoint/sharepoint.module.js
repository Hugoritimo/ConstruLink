"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharePointModule = void 0;
const common_1 = require("@nestjs/common");
const sharepoint_service_1 = require("./sharepoint.service");
const sharepoint_controller_1 = require("./sharepoint.controller");
let SharePointModule = class SharePointModule {
};
exports.SharePointModule = SharePointModule;
exports.SharePointModule = SharePointModule = __decorate([
    (0, common_1.Module)({
        controllers: [sharepoint_controller_1.SharePointController],
        providers: [sharepoint_service_1.SharePointService],
    })
], SharePointModule);
//# sourceMappingURL=sharepoint.module.js.map