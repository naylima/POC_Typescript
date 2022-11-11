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
        while (_) try {
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
import { MovieSchema } from "../schemas/movie.schema.js";
import * as moviesRepository from "../repositories/movies.repository.js";
import { checkGenre } from "../repositories/genres.repository.js";
import { checkPlatform } from "../repositories/platforms.repository.js";
var insertMovie = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var movie, error, genre, platform, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                movie = req.body;
                error = MovieSchema.validate(movie).error;
                if (error) {
                    return [2 /*return*/, res.status(422).send({
                            message: error.message
                        })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, checkGenre(movie.genreId)];
            case 2:
                genre = _a.sent();
                return [4 /*yield*/, checkPlatform(movie.platformId)];
            case 3:
                platform = _a.sent();
                if (genre.rowCount === 0 || platform.rowCount === 0) {
                    return [2 /*return*/, res.sendStatus(400)];
                }
                return [4 /*yield*/, moviesRepository.insertUnique(movie)];
            case 4:
                _a.sent();
                return [2 /*return*/, res.sendStatus(201)];
            case 5:
                error_1 = _a.sent();
                console.log(error_1.message);
                return [2 /*return*/, res.sendStatus(500)];
            case 6: return [2 /*return*/];
        }
    });
}); };
var listMovies = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, moviesRepository.listMany()];
            case 1:
                response = _a.sent();
                return [2 /*return*/, res.status(200).send(response.rows)];
            case 2:
                error_2 = _a.sent();
                console.log(error_2.message);
                return [2 /*return*/, res.sendStatus(500)];
            case 3: return [2 /*return*/];
        }
    });
}); };
var updateStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, status, checkMovie, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = Number(req.params.id);
                status = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, moviesRepository.listUnique(id)];
            case 2:
                checkMovie = _a.sent();
                if (checkMovie.rowCount === 0) {
                    return [2 /*return*/, res.sendStatus(400)];
                }
                return [4 /*yield*/, moviesRepository.updateStatus(status, id)];
            case 3:
                _a.sent();
                return [2 /*return*/, res.sendStatus(200)];
            case 4:
                error_3 = _a.sent();
                console.log(error_3.message);
                return [2 /*return*/, res.sendStatus(500)];
            case 5: return [2 /*return*/];
        }
    });
}); };
var updateMovie = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, movie, error, checkMovie, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = Number(req.params.id);
                movie = req.body;
                error = MovieSchema.validate(movie).error;
                if (error) {
                    return [2 /*return*/, res.status(422).send({
                            message: error.message
                        })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, moviesRepository.listUnique(id)];
            case 2:
                checkMovie = _a.sent();
                if (checkMovie.rowCount === 0) {
                    return [2 /*return*/, res.sendStatus(404)];
                }
                if (!(checkMovie.rows[0].status === "watched")) return [3 /*break*/, 4];
                return [4 /*yield*/, moviesRepository.updateUnique(movie, id)];
            case 3:
                _a.sent();
                return [2 /*return*/, res.sendStatus(200)];
            case 4: return [2 /*return*/, res.sendStatus(401)];
            case 5:
                error_4 = _a.sent();
                console.log(error_4.message);
                return [2 /*return*/, res.sendStatus(500)];
            case 6: return [2 /*return*/];
        }
    });
}); };
var deleteMovie = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, checkMovie, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = Number(req.params.id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, moviesRepository.listUnique(id)];
            case 2:
                checkMovie = _a.sent();
                if (checkMovie.rowCount === 0) {
                    return [2 /*return*/, res.sendStatus(404)];
                }
                return [4 /*yield*/, moviesRepository.deleteUnique(id)];
            case 3:
                _a.sent();
                return [2 /*return*/, res.sendStatus(200)];
            case 4:
                error_5 = _a.sent();
                console.log(error_5.message);
                return [2 /*return*/, res.sendStatus(500)];
            case 5: return [2 /*return*/];
        }
    });
}); };
export { insertMovie, listMovies, updateStatus, updateMovie, deleteMovie, };
