"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const reference_1 = require("../reference");
const user_1 = require("./user");
const errors_1 = require("../errors");
const attributes = {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    from: {
        type: Sequelize.UUID,
        references: {
            model: user_1.default,
            key: 'id',
            onUpdate: 'cascade',
            onDelete: 'cascade'
        }
    },
    to: {
        type: Sequelize.UUID,
        references: {
            model: user_1.default,
            key: 'id',
            onUpdate: 'cascade',
            onDelete: 'cascade'
        }
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false
    }
};
const blockUserEdit = (instance) => {
    if (instance.changed('user')) {
        throw new errors_1.ProhibitedEditError('Editing the user FK of messages table is prohibited.');
    }
};
const model = reference_1.sequelizeAdmin.define('messages', attributes);
model.beforeUpdate(blockUserEdit);
model.sync(); // Alter when in development mode
exports.default = model;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL21udC9jL1VzZXJzL0plZmYvUGVlci1HZW5pdXMvc2VydmVyL2RhdGFiYXNlL21vZGVscy9tZXNzYWdlLnRzIiwic291cmNlcyI6WyIvbW50L2MvVXNlcnMvSmVmZi9QZWVyLUdlbml1cy9zZXJ2ZXIvZGF0YWJhc2UvbW9kZWxzL21lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBdUM7QUFFdkMsNENBQXVEO0FBQ3ZELGlDQUEwQjtBQUMxQixzQ0FBZ0Q7QUFtQmhELE1BQU0sVUFBVSxHQUFHO0lBQ2xCLEVBQUUsRUFBRTtRQUNILElBQUksRUFBRSxTQUFTLENBQUMsSUFBSTtRQUNwQixZQUFZLEVBQUUsU0FBUyxDQUFDLE1BQU07UUFDOUIsVUFBVSxFQUFFLElBQUk7S0FDaEI7SUFDRCxJQUFJLEVBQUU7UUFDTCxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUk7UUFDcEIsVUFBVSxFQUFFO1lBQ1gsS0FBSyxFQUFFLGNBQUk7WUFDWCxHQUFHLEVBQUUsSUFBSTtZQUNULFFBQVEsRUFBRSxTQUFTO1lBQ25CLFFBQVEsRUFBRSxTQUFTO1NBQ25CO0tBQ0Q7SUFDRCxFQUFFLEVBQUU7UUFDSCxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUk7UUFDcEIsVUFBVSxFQUFFO1lBQ1gsS0FBSyxFQUFFLGNBQUk7WUFDWCxHQUFHLEVBQUUsSUFBSTtZQUNULFFBQVEsRUFBRSxTQUFTO1lBQ25CLFFBQVEsRUFBRSxTQUFTO1NBQ25CO0tBQ0Q7SUFDRCxPQUFPLEVBQUU7UUFDUixJQUFJLEVBQUUsU0FBUyxDQUFDLE1BQU07UUFDdEIsU0FBUyxFQUFFLEtBQUs7S0FDaEI7Q0FDRCxDQUFDO0FBRUYsTUFBTSxhQUFhLEdBQUcsQ0FBQyxRQUF5QjtJQUMvQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QixNQUFNLElBQUksNEJBQW1CLENBQUMsc0RBQXNELENBQUMsQ0FBQztJQUN2RixDQUFDO0FBQ0YsQ0FBQyxDQUFDO0FBRUYsTUFBTSxLQUFLLEdBQXdELDBCQUFLLENBQUMsTUFBTSxDQUFxQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDNUksS0FBSyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNsQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxpQ0FBaUM7QUFFL0Msa0JBQWUsS0FBSyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgU2VxdWVsaXplIGZyb20gJ3NlcXVlbGl6ZSc7XG5cbmltcG9ydCB7IHNlcXVlbGl6ZUFkbWluIGFzIGFkbWluIH0gZnJvbSAnLi4vcmVmZXJlbmNlJztcbmltcG9ydCB1c2VyIGZyb20gJy4vdXNlcic7XG5pbXBvcnQgeyBQcm9oaWJpdGVkRWRpdEVycm9yIH0gZnJvbSAnLi4vZXJyb3JzJztcblxuZXhwb3J0IGludGVyZmFjZSBNZXNzYWdlQXR0cmlidXRlcyB7XG5cdGlkPzogc3RyaW5nO1xuXHRmcm9tPzogc3RyaW5nO1xuXHR0bz86IHN0cmluZztcblx0bWVzc2FnZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZXNzYWdlSW5zdGFuY2UgZXh0ZW5kcyBTZXF1ZWxpemUuSW5zdGFuY2U8TWVzc2FnZUF0dHJpYnV0ZXM+IHtcblx0Y3JlYXRlZEF0OiBEYXRlO1xuXHR1cGRhdGVkQXQ6IERhdGU7XG5cdFxuXHRpZDogc3RyaW5nO1xuXHRmcm9tOiBzdHJpbmc7XG5cdHRvOiBzdHJpbmc7XG5cdG1lc3NhZ2U6IHN0cmluZztcbn1cblxuY29uc3QgYXR0cmlidXRlcyA9IHtcblx0aWQ6IHtcblx0XHR0eXBlOiBTZXF1ZWxpemUuVVVJRCxcblx0XHRkZWZhdWx0VmFsdWU6IFNlcXVlbGl6ZS5VVUlEVjQsXG5cdFx0cHJpbWFyeUtleTogdHJ1ZVxuXHR9LFxuXHRmcm9tOiB7XG5cdFx0dHlwZTogU2VxdWVsaXplLlVVSUQsXG5cdFx0cmVmZXJlbmNlczoge1xuXHRcdFx0bW9kZWw6IHVzZXIsXG5cdFx0XHRrZXk6ICdpZCcsXG5cdFx0XHRvblVwZGF0ZTogJ2Nhc2NhZGUnLFxuXHRcdFx0b25EZWxldGU6ICdjYXNjYWRlJ1xuXHRcdH1cblx0fSxcblx0dG86IHtcblx0XHR0eXBlOiBTZXF1ZWxpemUuVVVJRCxcblx0XHRyZWZlcmVuY2VzOiB7XG5cdFx0XHRtb2RlbDogdXNlcixcblx0XHRcdGtleTogJ2lkJyxcblx0XHRcdG9uVXBkYXRlOiAnY2FzY2FkZScsXG5cdFx0XHRvbkRlbGV0ZTogJ2Nhc2NhZGUnXG5cdFx0fVxuXHR9LFxuXHRtZXNzYWdlOiB7XG5cdFx0dHlwZTogU2VxdWVsaXplLlNUUklORyxcblx0XHRhbGxvd051bGw6IGZhbHNlXG5cdH1cbn07XG5cbmNvbnN0IGJsb2NrVXNlckVkaXQgPSAoaW5zdGFuY2U6IE1lc3NhZ2VJbnN0YW5jZSkgPT4ge1xuXHRpZiAoaW5zdGFuY2UuY2hhbmdlZCgndXNlcicpKSB7XG5cdFx0dGhyb3cgbmV3IFByb2hpYml0ZWRFZGl0RXJyb3IoJ0VkaXRpbmcgdGhlIHVzZXIgRksgb2YgbWVzc2FnZXMgdGFibGUgaXMgcHJvaGliaXRlZC4nKTtcblx0fVxufTtcblxuY29uc3QgbW9kZWw6IFNlcXVlbGl6ZS5Nb2RlbDxNZXNzYWdlSW5zdGFuY2UsIE1lc3NhZ2VBdHRyaWJ1dGVzPiA9IGFkbWluLmRlZmluZTxNZXNzYWdlSW5zdGFuY2UsIE1lc3NhZ2VBdHRyaWJ1dGVzPignbWVzc2FnZXMnLCBhdHRyaWJ1dGVzKTtcbm1vZGVsLmJlZm9yZVVwZGF0ZShibG9ja1VzZXJFZGl0KTtcbm1vZGVsLnN5bmMoKTsgLy8gQWx0ZXIgd2hlbiBpbiBkZXZlbG9wbWVudCBtb2RlXG5cbmV4cG9ydCBkZWZhdWx0IG1vZGVsO1xuIl19