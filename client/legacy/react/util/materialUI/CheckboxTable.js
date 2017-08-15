import React from 'react';
import PropTypes from 'prop-types'
import update from 'react-addons-update';
import { connect } from 'react-redux';

import { sendFormVar } from '../../../redux/actions/forms.js';

import Paper from 'material-ui/Paper'
import Checkbox from 'material-ui/Checkbox';
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui/Table';

const style = {
	checkbox: {
		display: 'inline-block',
		width: '50px'
	}
};

/**
 * @classdesc Wrapper component for tables of checkboxes.
 */
@connect((state, ownProps) => {
	let form = state.forms[ownProps.formName];
	if (form) {
		return {
			data: form[ownProps.varName],
			checkErrors: form.check
		};
	} else {
		return {
			data: null,
			checkErrors: false
		};
	}
}, {
	sendFormVar
})
export default class CheckboxTable extends React.Component {
	static propTypes = {
		varName: PropTypes.string.isRequired,								// The variable name stored in the Redux store.
		rowHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,	// The array of row headers to display.
		colHeaders: PropTypes.arrayOf(PropTypes.string).isRequired	// The array of columne headers to display.
	};

	/** @class */
	constructor(props) {
		super(props);

		// If no data exists, initialize it to all false (array of 0s).
		let data = this.props.data;
		if (!data || !data.map) {
			data = new Array(this.props.rowHeaders.length);
			for (let i = 0; i < this.props.rowHeaders.length; i++) {
				data[i] = 0;
			}
		}

		// Set the state.
		this.state = {
			data
		};
	}

	shouldComponentUpdate = (nextProps, nextState) => {
		// No errors; send an empty string as the error when checking.
		if (nextProps.checkErrors && !this.props.checkErrors) {
			this.props.sendFormVar(nextProps.formName, nextProps.varName, this.state.data, '');
			return false;
		}
		return true;
	}

	/**
	 * Generates an event handler for clicking the table at the given row and column.
	 * 
	 * @param {Number} row
	 * @param {Number} col
	 * @return {Function} The event handler
	 */
	_onClick = (row, col) => {
		return (event => {
			// Bitmask for each row
			let rowData = this.state.data[row];
			if ((rowData >> col) % 2) {
				rowData -= (1 << col);
			} else {
				rowData += (1 << col);
			}

			// Update only the changed row
			this.setState({
				data: update(this.state.data, {[row]: {$set: rowData}})
			});
		});
	}

	render = () => {
		return (
			<Table selectable={false} fixedHeader={false}>
				<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
					<TableRow>
						<TableHeaderColumn />
						{
							// Map each column header to a 
							this.props.colHeaders.map((header, col) => {
								return <TableHeaderColumn key={col}>{header}</TableHeaderColumn>;
							})
						}
					</TableRow>
				</TableHeader>

				{/* Do not diplay row checkboxes */}
				<TableBody displayRowCheckbox={false}>
					{
						// Map each row bitmask to a row of checkboxes
						this.state.data.map((rowData, row) => {
							return (
								<TableRow key={row}>
									{/* Row header */}
									<TableRowColumn>{this.props.rowHeaders[row]}</TableRowColumn>

									{
										// Map each column to a checkbox
										this.props.colHeaders.map((_, col) => {
											return (
												<TableRowColumn key={col}>
													{/* Calculate whether the checkbox is true or false from bitmask, and set it in-line */}
													<Checkbox checked={(rowData >> col) % 2 === 1} key={col} onClick={this._onClick(row, col)}
														style={style.checkbox} />
												</TableRowColumn>
											);
										})
									}
								</TableRow>
							);
						})
					}
				</TableBody>
			</Table>
		)
	}
};