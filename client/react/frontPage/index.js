import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import RadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import { zIndex } from '../../reference/zIndex.js';


import PageOne from './page1';
import PageTwo from './page2';
import PageThree from './page3';
import PageFour from './page4';
import PageFive from './page5';

const pages = [
	<PageOne />,
	<PageTwo />,
	<PageThree />,
	<PageFour />,
	<PageFive />
];

const backgrounds = [
	'white',
	'rgb(1,147,172)',
	'rgb(249,202,120)',
	'rgb(1,147,172)',
	'rgb(249,202,120)'
];

let lock = false;

export default class FrontPage extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			page: 0
		};
	}
	
	_goToPage = id => () => {
		this.setState({
			page: id
		});
	};
	
	_nextPage = () => {
		if (this.state.page < 4) {
			this.setState({
				page: this.state.page + 1
			});
		}
	};
	
	_prevPage = () => {
		if (this.state.page > 0) {
			this.setState({
				page: this.state.page - 1
			});
		}
	};
	
	_handleScroll = event => {
		if (!lock) {
			lock = true;
			
			if (event.deltaY < 0) {
				this._prevPage();
			}
			else {
				this._nextPage();
			}
			
			setTimeout(() => {
				lock = false;
			}, 1000);
		}
	};
	
	render() {
		return (
			<div onWheel={this._handleScroll}>
				<div style={{
					display: 'flex',
					flexDirection: 'column',
					position: 'absolute',
					top: '50%',
					left: '0%',
					transform: 'translateY(-50%)',
					zIndex: zIndex.frontPageNav
				}}>
					{
						[0, 1, 2, 3, 4].map(id => (
							<IconButton onTouchTap={this._goToPage(id)} iconStyle={{ width: 15 }} key={id}>
								{
									this.state.page === id ? <RadioButtonChecked /> : <RadioButtonUnchecked />
								}
							</IconButton>
						))
					}
				</div>
				
				{
					[0, 1, 2, 3, 4].map(id => (
						<div style={{
							position: 'fixed',
							width: '100vw',
							height: '100vh',
							backgroundColor: backgrounds[id],
							zIndex: zIndex.frontPage[id],
							transform: this.state.page <= id ? 'none' : 'translateY(-100vh)',
							transition: 'transform 1s ease-in-out'
						}} key={id}>
							{React.cloneElement(pages[id], {
								nextPage: this._nextPage,
								prevPage: this._prevPage
							})}
						</div>
					))
				}
			</div>
		);
	}
}