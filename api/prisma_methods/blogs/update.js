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
exports.removeComment = exports.addComment = exports.removeLike = exports.addLike = exports.removeCategory = exports.addCategory = exports.updateTitleAndContent = exports.removeImage = exports.addImage = void 0;
var dropbox_1 = require("../../dropbox/dropbox");
var prisma_object_1 = require("../../../lib/prisma_object");
//Image ADDING && REMOVING
function addImage(postID, imgData, imgLocation) {
    return __awaiter(this, void 0, void 0, function () {
        var existing_img, i, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, prisma_object_1.default.$connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma_object_1.default.post.findFirst({
                            where: {
                                id: postID
                            },
                            select: {
                                images: {
                                    select: {
                                        location: true
                                    }
                                }
                            }
                        })];
                case 2:
                    existing_img = _a.sent();
                    if (existing_img) {
                        for (i = 0; i < existing_img.images.length; i++) {
                            if (existing_img.images[i].location === imgLocation) {
                                return [2 /*return*/, "Image already exists on that location"];
                            }
                        }
                    }
                    return [4 /*yield*/, prisma_object_1.default.post.update({
                            where: {
                                id: postID
                            },
                            data: {
                                images: {
                                    create: {
                                        url: imgData,
                                        location: imgLocation
                                    }
                                }
                            },
                            select: {
                                images: {
                                    select: {
                                        url: true,
                                        location: true
                                    }
                                }
                            }
                        })];
                case 3:
                    result = _a.sent();
                    return [4 /*yield*/, prisma_object_1.default.post.update({
                            where: {
                                id: postID
                            },
                            data: {
                                modifiedAt: new Date()
                            }
                        })];
                case 4:
                    _a.sent();
                    return [2 /*return*/, result.images[0]];
                case 5:
                    error_1 = _a.sent();
                    if (error_1)
                        return [2 /*return*/, "error"];
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/, "Still an error"];
            }
        });
    });
}
exports.addImage = addImage;
function removeImage(imgURL) {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    dropbox_1.dropbox.filesDeleteV2({
                        path: imgURL
                    });
                    return [4 /*yield*/, prisma_object_1.default.$connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma_object_1.default.image.delete({
                            where: {
                                url: imgURL
                            }
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, "image removed"];
                case 3:
                    error_2 = _a.sent();
                    return [2 /*return*/, "error"];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.removeImage = removeImage;
//Updating title and content
function updateTitleAndContent(id, title, content) {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, prisma_object_1.default.post.update({
                            where: {
                                id: id
                            },
                            data: {
                                title: title
                            }
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma_object_1.default.post.update({
                            where: {
                                id: id
                            },
                            data: {
                                content: content
                            }
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma_object_1.default.post.update({
                            where: {
                                id: id
                            },
                            data: {
                                modifiedAt: new Date()
                            }
                        })];
                case 3:
                    _a.sent();
                    return [2 /*return*/, "Done"];
                case 4:
                    err_1 = _a.sent();
                    return [2 /*return*/, "error"];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateTitleAndContent = updateTitleAndContent;
//Category ADDING && REMOVING
function addCategory(id, category) {
    return __awaiter(this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, prisma_object_1.default.$connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma_object_1.default.post.update({
                            where: {
                                id: id
                            },
                            data: {
                                categories: {
                                    connectOrCreate: {
                                        where: {
                                            name: category
                                        },
                                        create: {
                                            name: category
                                        }
                                    }
                                }
                            }
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma_object_1.default.post.update({
                            where: {
                                id: id
                            },
                            data: {
                                modifiedAt: new Date()
                            }
                        })];
                case 3:
                    _a.sent();
                    return [2 /*return*/, "category added"];
                case 4:
                    error_3 = _a.sent();
                    if (error_3)
                        return [2 /*return*/, "error"];
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.addCategory = addCategory;
function removeCategory(id, category) {
    return __awaiter(this, void 0, void 0, function () {
        var error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, prisma_object_1.default.$connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma_object_1.default.post.update({
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
                    return [4 /*yield*/, prisma_object_1.default.post.update({
                            where: {
                                id: id
                            },
                            data: {
                                modifiedAt: new Date()
                            }
                        })];
                case 3:
                    _a.sent();
                    return [2 /*return*/, "removed"];
                case 4:
                    error_4 = _a.sent();
                    if (error_4)
                        return [2 /*return*/, "error"];
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.removeCategory = removeCategory;
//Adding Like and REMOVING 
function addLike(postID, id) {
    return __awaiter(this, void 0, void 0, function () {
        var existing_user, result, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, prisma_object_1.default.reaction.findFirst({
                            where: {
                                postID: postID,
                                reactor: {
                                    every: {
                                        id: id
                                    }
                                }
                            },
                            select: {
                                id: true
                            }
                        })];
                case 1:
                    existing_user = _a.sent();
                    if (existing_user)
                        return [2 /*return*/, "already given"];
                    return [4 /*yield*/, prisma_object_1.default.$connect()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma_object_1.default.reaction.create({
                            data: {
                                post: {
                                    connect: {
                                        id: postID
                                    }
                                },
                                reactor: {
                                    connect: {
                                        id: id
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
                case 4:
                    error_5 = _a.sent();
                    if (error_5)
                        return [2 /*return*/, "error"];
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.addLike = addLike;
function removeLike(reactionID) {
    return __awaiter(this, void 0, void 0, function () {
        var error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, prisma_object_1.default.$connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma_object_1.default.reaction.delete({
                            where: {
                                id: reactionID
                            }
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, "removed"];
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
exports.removeLike = removeLike;
//Comments ADDING && REMOVING
function addComment(postID, CMTContent, username) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, prisma_object_1.default.$connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma_object_1.default.post.update({
                            where: {
                                id: postID
                            },
                            data: {
                                comments: {
                                    create: {
                                        content: CMTContent,
                                        commentedBy: {
                                            connect: {
                                                username: username
                                            }
                                        },
                                    }
                                }
                            },
                            select: {
                                comments: {
                                    select: {
                                        id: true
                                    }
                                }
                            }
                        })];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, result.comments[0].id];
                case 3:
                    error_7 = _a.sent();
                    if (error_7)
                        return [2 /*return*/, "error"];
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.addComment = addComment;
function removeComment(postID, cmtID) {
    return __awaiter(this, void 0, void 0, function () {
        var error_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, prisma_object_1.default.$connect()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma_object_1.default.comment.delete({
                            where: {
                                postID: postID,
                                id: cmtID
                            }
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, "comment removed"];
                case 3:
                    error_8 = _a.sent();
                    if (error_8)
                        return [2 /*return*/, "error"];
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.removeComment = removeComment;
//npx tsc api/prisma_methods/blogs/update.ts
