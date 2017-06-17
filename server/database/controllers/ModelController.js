import {
	sequelizeAdmin as admin
}
	from '../reference';
import dbUtils from '../utils/dbUtils';
import logger from '../../log/logger';

export default class ModelController {
	/**
	 * The constructor.
	 *
	 * @param {Model} [model] The seuqelize model to use
	 * @param {JSON} [attributes] The attributes that objects of this model should have
	 */
	constructor(model, attributes) {
		this._model = model;
		this._attributes = attributes;
		
		this.onStart();
	}
	
	/**
	 * Executes some actions, mainly updates the model. Should be called on startup.
	 */
	async onStart() {
		await dbUtils.updateTable(this._model, this._attributes, false);
	}
	
	/**
	 * Takes a search parameter and a filter parameter and turns the arguments into a sequelize query where parameter.
	 * When using filters, the object should look like: {key: substring}, where substring is the
	 *
	 * @param {Object} [search] An obejct containing the keys to find the row by; using a falsy object will make the program ignore the parameter
	 *
	 * @return {Object} The where parameter of the sequelize query
	 */
	async _makeWhereParams(search) {
		let where = {};
		
		// Apply basic search parameters.
		if (search) {
			where = search;
		}
		
		return where;
	}
	
	/**
	 * Finds all rows matching the search criteria.
	 *
	 * @param {Object} [search] An object containing the keys to find the row by; using a falsy object will make the function return all rows in the table
	 * @param {Object} [filter] The fields in the database must contain these words for them to be returned; use filter.and to match all conditions, and filter.or to match any condition
	 * @return {Array<Sequelize>} An array of sequelize obejcts matching the search criteria
	 */
	async find(search) {
		// Find by condition
		return await this._model.findAll({
			where: await this._makeWhereParams(search)
		});
	}
	
	/**
	 * Find all the contents that should be displayed on a page. Using database queries will make displaying a portion of a data set more efficient.
	 *
	 * @param {Object} [search] An object containing the keys to find the row by; using a falsy object will make the function return all rows in the table
	 * @param {int} [pageNumber] The current number of the page
	 * @param {int} [pageLimit] The number of entries displayed on a page
	 * @return {Array<Sequelize>} An array of sequelize objects matching the search criteria
	 */
	async findPage(search, pageNumber, pageLimit) {
		// Find offset
		let offset = (pageNumber - 1) * pageLimit;
		
		// Find by condition
		return await this._model.findAll({
			where: await this._makeWhereParams(search),
			limit: pageLimit,
			offset
		});
	}
	
	/**
	 * Gets the first row with the desired attributes
	 *
	 * @param {Object} [target] The target to search for
	 * @return {Sequelize} The first occurrence of the row searched
	 */
	async get(target) {
		return await this._model.findOne({
			where: await this._makeWhereParams(target)
		});
	}
	
	async getOrCreate(target) {
		let results = await this._model.findOrCreate({
			where: await this._makeWhereParams(target),
			limit: 1
		});
		return results[0];
	}
	
	/**
	 * Creates a row in the database using the information given.
	 *
	 * @param {Object} [info] The information used to create a row
	 * @return {Sequelize} The sequelize object for the newly created row
	 */
	async create(info, errorHandler) {
		// Sync the model first
		await this._model.sync();
		
		// Build the row
		let newRow = await this._model.build();
		// Set the fields
		for (let prop in info) {
			await newRow.set(prop, info[prop]);
		}
		// Save
		await newRow.save().catch(errorHandler);
		
		return newRow;
	}
	
	/**
	 * Edits the target using the newly inputted data.
	 *
	 * @param {Object} [target] The row to edit
	 * @param {Object} [newData] An object containing all the information to edit
	 */
	async update(target, newData) {
		let row = await this.get(target);
		
		if (row) {
			// Set the fields
			for (let field in newData) {
				if (field in row) {
					await row.set(field, newData[field]);
				}
			}
			
			// Save
			await row.save();
			return row;
		}
	}
	
	/**
	 * Creates a new row or updates the current row to match the new data.
	 */
	async createOrUpdate(target, newData) {
		let row = await this.get(target);
		
		if (!row) {
			// If the target does not exist, create the row.
			row = await this._model.build();
			// Insert data
			for (let field in target) {
				if (target.hasOwnProperty(field)) {
					await row.set(field, target[field]);
				}
			}
		}
		
		// Update according to input.
		for (let field in newData) {
			if (field in row && newData.hasOwnProperty(field)) {
				await row.set(field, newData[field]);
			}
		}
		
		// Save
		await row.save();
		return row;
	}
	
	/**
	 * Deletes any row matching the target search parameter.
	 * Warning: extemely dangerous. Do no touch unless instructed to do so.
	 *
	 * @param {Object} [target] An object containing the information about the row to destroy
	 */
	async destroy(target) {
		let rows = await this.find(target);
		
		// Destroy all rows
		for (let row of rows) {
			await row.destroy();
		}
	}
}