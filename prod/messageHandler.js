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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessage = void 0;
const rg_1 = require("./model/rg");
const search_1 = require("./model/search");
function handleMessage(message) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = message.content.split(" ");
        console.log(command);
        if (message.author.bot || command[0] != process.env.BOT_PREFIX)
            return;
        if (command.length < 2)
            return;
        if (command[1] == "add") {
            if (command.length <= 2)
                return;
            if (command.length == 3) {
                if (!(0, rg_1.isNumber)(command[2]))
                    return;
                (0, search_1.searchStudent)(command[2]);
            }
        }
    });
}
exports.handleMessage = handleMessage;
