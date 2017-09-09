"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const randomstring = require("randomstring");
const reference_1 = require("../reference");
const user_1 = require("./user");
const errors_1 = require("../errors");
const attributes = {
    user: {
        type: Sequelize.UUID,
        references: {
            model: user_1.default,
            key: 'id',
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },
        primaryKey: true,
    },
    verifyEmailKey: {
        type: Sequelize.CHAR(32),
        allowNull: true,
        unique: true
    },
    nextEmail: {
        type: Sequelize.STRING,
        allowNull: true
    }
};
const blockUserEdit = (instance) => {
    if (instance.changed('user')) {
        throw new errors_1.ProhibitedEditError('Editing the user FK of keys table is prohibited.');
    }
};
const model = reference_1.sequelizeAdmin.define('keys', attributes);
model.beforeUpdate(blockUserEdit);
// Extra utility methods
/**
 * Generates a key that is guaranteed to be unique for the specified field.
 * TODO test the method
 * @param column The column of the database to generate the key for. It should be a CHAR(32) column.
 * @return {Promise.<string>}
 */
exports.uniqueRandom = (column) => __awaiter(this, void 0, void 0, function* () {
    let key;
    do {
        key = randomstring.generate();
    } while ((yield model.find({ where: { [column]: key } })));
    return key;
});
user_1.default.hasOne(model, { foreignKey: 'user' });
model.sync();
exports.default = model;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL21udC9jL1VzZXJzL0plZmYvUGVlci1HZW5pdXMvc2VydmVyL2RhdGFiYXNlL21vZGVscy9rZXkudHMiLCJzb3VyY2VzIjpbIi9tbnQvYy9Vc2Vycy9KZWZmL1BlZXItR2VuaXVzL3NlcnZlci9kYXRhYmFzZS9tb2RlbHMva2V5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx1Q0FBdUM7QUFDdkMsNkNBQTZDO0FBRTdDLDRDQUF1RDtBQUN2RCxpQ0FBMEI7QUFDMUIsc0NBQWdEO0FBaUJoRCxNQUFNLFVBQVUsR0FBRztJQUNsQixJQUFJLEVBQUU7UUFDTCxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUk7UUFDcEIsVUFBVSxFQUFFO1lBQ1gsS0FBSyxFQUFFLGNBQUk7WUFDWCxHQUFHLEVBQUUsSUFBSTtZQUNULFFBQVEsRUFBRSxTQUFTO1lBQ25CLFFBQVEsRUFBRSxTQUFTO1NBQ25CO1FBQ0QsVUFBVSxFQUFFLElBQUk7S0FDaEI7SUFDRCxjQUFjLEVBQUU7UUFDZixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDeEIsU0FBUyxFQUFFLElBQUk7UUFDZixNQUFNLEVBQUUsSUFBSTtLQUNaO0lBQ0QsU0FBUyxFQUFFO1FBQ1YsSUFBSSxFQUFFLFNBQVMsQ0FBQyxNQUFNO1FBQ3RCLFNBQVMsRUFBRSxJQUFJO0tBQ2Y7Q0FDRCxDQUFDO0FBRUYsTUFBTSxhQUFhLEdBQUcsQ0FBQyxRQUFxQjtJQUMzQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixNQUFNLElBQUksNEJBQW1CLENBQUMsa0RBQWtELENBQUMsQ0FBQztJQUNuRixDQUFDO0FBQ0YsQ0FBQyxDQUFDO0FBRUYsTUFBTSxLQUFLLEdBQWdELDBCQUFLLENBQUMsTUFBTSxDQUE2QixNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDeEgsS0FBSyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUVsQyx3QkFBd0I7QUFDeEI7Ozs7O0dBS0c7QUFDVSxRQUFBLFlBQVksR0FBRyxDQUFPLE1BQWM7SUFDaEQsSUFBSSxHQUFHLENBQUM7SUFDUixHQUFHLENBQUM7UUFDSCxHQUFHLEdBQUcsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9CLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDM0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztBQUNaLENBQUMsQ0FBQSxDQUFDO0FBRUYsY0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztBQUUzQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDYixrQkFBZSxLQUFLLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBTZXF1ZWxpemUgZnJvbSAnc2VxdWVsaXplJztcbmltcG9ydCAqIGFzIHJhbmRvbXN0cmluZyBmcm9tICdyYW5kb21zdHJpbmcnO1xuXG5pbXBvcnQgeyBzZXF1ZWxpemVBZG1pbiBhcyBhZG1pbiB9IGZyb20gJy4uL3JlZmVyZW5jZSc7XG5pbXBvcnQgdXNlciBmcm9tICcuL3VzZXInO1xuaW1wb3J0IHsgUHJvaGliaXRlZEVkaXRFcnJvciB9IGZyb20gJy4uL2Vycm9ycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgS2V5QXR0cmlidXRlcyB7XG5cdHVzZXI/OiBzdHJpbmc7XG5cdHZlcmlmeUVtYWlsS2V5Pzogc3RyaW5nO1xuXHRuZXh0RW1haWw/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgS2V5SW5zdGFuY2UgZXh0ZW5kcyBTZXF1ZWxpemUuSW5zdGFuY2U8S2V5QXR0cmlidXRlcz4ge1xuXHRjcmVhdGVkQXQ6IERhdGU7XG5cdHVwZGF0ZWRBdDogRGF0ZTtcblx0XG5cdHVzZXI6IHN0cmluZztcblx0dmVyaWZ5RW1haWxLZXk6IHN0cmluZztcblx0bmV4dEVtYWlsOiBzdHJpbmc7XG59XG5cbmNvbnN0IGF0dHJpYnV0ZXMgPSB7XG5cdHVzZXI6IHtcblx0XHR0eXBlOiBTZXF1ZWxpemUuVVVJRCxcblx0XHRyZWZlcmVuY2VzOiB7XG5cdFx0XHRtb2RlbDogdXNlcixcblx0XHRcdGtleTogJ2lkJyxcblx0XHRcdG9uVXBkYXRlOiAnY2FzY2FkZScsXG5cdFx0XHRvbkRlbGV0ZTogJ2Nhc2NhZGUnXG5cdFx0fSxcblx0XHRwcmltYXJ5S2V5OiB0cnVlLFxuXHR9LFxuXHR2ZXJpZnlFbWFpbEtleToge1xuXHRcdHR5cGU6IFNlcXVlbGl6ZS5DSEFSKDMyKSxcblx0XHRhbGxvd051bGw6IHRydWUsXG5cdFx0dW5pcXVlOiB0cnVlXG5cdH0sXG5cdG5leHRFbWFpbDoge1xuXHRcdHR5cGU6IFNlcXVlbGl6ZS5TVFJJTkcsXG5cdFx0YWxsb3dOdWxsOiB0cnVlXG5cdH1cbn07XG5cbmNvbnN0IGJsb2NrVXNlckVkaXQgPSAoaW5zdGFuY2U6IEtleUluc3RhbmNlKSA9PiB7XG5cdGlmIChpbnN0YW5jZS5jaGFuZ2VkKCd1c2VyJykpIHtcblx0XHR0aHJvdyBuZXcgUHJvaGliaXRlZEVkaXRFcnJvcignRWRpdGluZyB0aGUgdXNlciBGSyBvZiBrZXlzIHRhYmxlIGlzIHByb2hpYml0ZWQuJyk7XG5cdH1cbn07XG5cbmNvbnN0IG1vZGVsOiBTZXF1ZWxpemUuTW9kZWw8S2V5SW5zdGFuY2UsIEtleUF0dHJpYnV0ZXM+ID0gYWRtaW4uZGVmaW5lPEtleUluc3RhbmNlLCBLZXlBdHRyaWJ1dGVzPigna2V5cycsIGF0dHJpYnV0ZXMpO1xubW9kZWwuYmVmb3JlVXBkYXRlKGJsb2NrVXNlckVkaXQpO1xuXG4vLyBFeHRyYSB1dGlsaXR5IG1ldGhvZHNcbi8qKlxuICogR2VuZXJhdGVzIGEga2V5IHRoYXQgaXMgZ3VhcmFudGVlZCB0byBiZSB1bmlxdWUgZm9yIHRoZSBzcGVjaWZpZWQgZmllbGQuXG4gKiBUT0RPIHRlc3QgdGhlIG1ldGhvZFxuICogQHBhcmFtIGNvbHVtbiBUaGUgY29sdW1uIG9mIHRoZSBkYXRhYmFzZSB0byBnZW5lcmF0ZSB0aGUga2V5IGZvci4gSXQgc2hvdWxkIGJlIGEgQ0hBUigzMikgY29sdW1uLlxuICogQHJldHVybiB7UHJvbWlzZS48c3RyaW5nPn1cbiAqL1xuZXhwb3J0IGNvbnN0IHVuaXF1ZVJhbmRvbSA9IGFzeW5jIChjb2x1bW46IHN0cmluZykgPT4ge1xuXHRsZXQga2V5O1xuXHRkbyB7XG5cdFx0a2V5ID0gcmFuZG9tc3RyaW5nLmdlbmVyYXRlKCk7XG5cdH0gd2hpbGUgKChhd2FpdCBtb2RlbC5maW5kKHsgd2hlcmU6IHsgW2NvbHVtbl06IGtleSB9IH0pKSk7XG5cdHJldHVybiBrZXk7XG59O1xuXG51c2VyLmhhc09uZShtb2RlbCwgeyBmb3JlaWduS2V5OiAndXNlcicgfSk7XG5cbm1vZGVsLnN5bmMoKTtcbmV4cG9ydCBkZWZhdWx0IG1vZGVsO1xuIl19