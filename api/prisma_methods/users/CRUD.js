"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.removeCategoryFromUser = exports.addCategoryToUser = exports.updateUsername = exports.updateName = exports.updatePhone = exports.updateEmail = exports.readUserbyEmail = exports.readUserbyUsername = exports.readUserbyID = exports.createUser = void 0;
var prisma_object_1 = require("../../../lib/prisma_object");
//CREATE USER
function createUser(name, username, phone, email, photoURL, id) {
    return __awaiter(this, void 0, void 0, function () {
        var result, userCheck, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, prisma_object_1.default.$connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma_object_1.default.user.findFirst({
                            where: {
                                username: username
                            }
                        })];
                case 2:
                    userCheck = _a.sent();
                    if (userCheck)
                        return [2 /*return*/, "user exists"];
                    if (!(photoURL && id)) return [3 /*break*/, 4];
                    return [4 /*yield*/, prisma_object_1.default.user.create({
                            data: {
                                id: id,
                                name: name,
                                username: username,
                                phone: '09-1234567',
                                email: email,
                                profile: {
                                    create: {
                                        url: photoURL
                                    }
                                }
                            },
                            select: {
                                id: true
                            }
                        })];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, result.id];
                case 4: return [4 /*yield*/, prisma_object_1.default.user.create({
                        data: {
                            name: name,
                            username: username,
                            phone: '09-1234567',
                            email: email
                        },
                        select: {
                            id: true
                        }
                    })];
                case 5:
                    result = _a.sent();
                    return [2 /*return*/, result.id];
                case 6:
                    error_1 = _a.sent();
                    if (error_1)
                        return [2 /*return*/, "error"];
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.createUser = createUser;
;
function readUserbyID(id) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, prisma_object_1.default.$connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma_object_1.default.user.findFirst({
                            where: {
                                id: id
                            },
                            select: {
                                id: true,
                                name: true,
                                username: true,
                                email: true,
                                phone: true,
                                posts: {
                                    select: {
                                        categories: {
                                            select: {
                                                name: true
                                            }
                                        }
                                    }
                                },
                                _count: {
                                    select: {
                                        posts: true,
                                        comments: true,
                                        reactions: true
                                    }
                                },
                                categories: {
                                    select: {
                                        name: true
                                    }
                                },
                                profile: {
                                    select: {
                                        url: true
                                    }
                                }
                            }
                        })];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 3:
                    error_2 = _a.sent();
                    return [2 /*return*/, "error"];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.readUserbyID = readUserbyID;
function readUserbyUsername(username) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, prisma_object_1.default.$connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma_object_1.default.user.findFirst({
                            where: {
                                username: username
                            },
                            select: {
                                id: true,
                                name: true,
                                username: true,
                                email: true,
                                phone: true,
                                posts: {
                                    select: {
                                        categories: {
                                            select: {
                                                name: true
                                            }
                                        }
                                    }
                                },
                                _count: {
                                    select: {
                                        posts: true,
                                        comments: true,
                                        reactions: true
                                    }
                                }
                            }
                        })];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 3:
                    error_3 = _a.sent();
                    return [2 /*return*/, "error"];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.readUserbyUsername = readUserbyUsername;
function readUserbyEmail(email) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, prisma_object_1.default.$connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma_object_1.default.user.findFirst({
                            where: {
                                email: email
                            }
                        })];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 3:
                    err_1 = _a.sent();
                    return [2 /*return*/, 'error'];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.readUserbyEmail = readUserbyEmail;
//UPDATING USER DATA
function updateEmail(username, email) {
    return __awaiter(this, void 0, void 0, function () {
        var error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, prisma_object_1.default.$connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma_object_1.default.user.update({
                            where: {
                                username: username
                            },
                            data: {
                                email: email
                            }
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, "email updated"];
                case 3:
                    error_4 = _a.sent();
                    if (error_4)
                        return [2 /*return*/, "error"];
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateEmail = updateEmail;
function updatePhone(username, phone) {
    return __awaiter(this, void 0, void 0, function () {
        var error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, prisma_object_1.default.$connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma_object_1.default.user.update({
                            where: {
                                username: username
                            },
                            data: {
                                phone: phone
                            }
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, "phone updated"];
                case 3:
                    error_5 = _a.sent();
                    if (error_5)
                        return [2 /*return*/, "error"];
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updatePhone = updatePhone;
function updateName(id, name) {
    return __awaiter(this, void 0, void 0, function () {
        var error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, prisma_object_1.default.$connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma_object_1.default.user.update({
                            where: {
                                id: id
                            },
                            data: {
                                name: name
                            }
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, "name updated"];
                case 3:
                    error_6 = _a.sent();
                    if (error_6)
                        return [2 /*return*/, "error"];
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateName = updateName;
function updateUsername(id, username) {
    return __awaiter(this, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, prisma_object_1.default.$connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma_object_1.default.user.update({
                            where: {
                                id: id
                            },
                            data: {
                                username: username
                            }
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, 'Username updated'];
                case 3:
                    err_2 = _a.sent();
                    if (err_2)
                        return [2 /*return*/, 'error'];
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateUsername = updateUsername;
//Add interested categories
function addCategoryToUser(id, category) {
    return __awaiter(this, void 0, void 0, function () {
        var err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, prisma_object_1.default.$connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma_object_1.default.user.update({
                            where: {
                                id: id
                            },
                            data: {
                                categories: {
                                    connect: {
                                        name: category
                                    }
                                }
                            }
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, 'added'];
                case 3:
                    err_3 = _a.sent();
                    return [2 /*return*/, 'error'];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.addCategoryToUser = addCategoryToUser;
//Remove interested categories
function removeCategoryFromUser(id, category) {
    return __awaiter(this, void 0, void 0, function () {
        var err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, prisma_object_1.default.$connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma_object_1.default.user.update({
                            where: {
                                id: id
                            },
                            data: {
                                categories: {
                                    disconnect: {
                                        name: category
                                    }
                                }
                            }
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, 'added'];
                case 3:
                    err_4 = _a.sent();
                    return [2 /*return*/, 'error'];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.removeCategoryFromUser = removeCategoryFromUser;
//DELETING USER
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function () {
        var user, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, prisma_object_1.default.$connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, readUserbyID(id)];
                case 2:
                    user = _a.sent();
                    if (!(user !== null && typeof user !== 'string')) return [3 /*break*/, 4];
                    if (!(user.profile !== null)) return [3 /*break*/, 4];
                    return [4 /*yield*/, prisma_object_1.default.profileImg.delete({
                            where: {
                                userID: id
                            }
                        })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, prisma_object_1.default.user.delete({
                        where: {
                            id: id
                        }
                    })];
                case 5:
                    _a.sent();
                    return [2 /*return*/, 'done'];
                case 6:
                    error_7 = _a.sent();
                    return [2 /*return*/, "error"];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.deleteUser = deleteUser;
//npx tsc api/prisma_methods/users/CRUD.ts
