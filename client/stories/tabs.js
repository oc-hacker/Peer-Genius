import React, { Component, Children } from 'react';

import { Tabs, tab, tabControl } from '../react/components/tabs/index';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withRedux, withTheme } from './decorators';

@tab('Hello')
class Tab1 extends Component {
	render() {
		let { tabIndex, currentTab, ...others } = this.props;
		return <div {...others}>
			Hello
		</div>;
	}
}

@tabControl
class Control extends Component {
	render() {
		return (
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				{this.props.tabTitles.map((title, index) => (
					<div onClick={() => this.props.setTab(index)}>
						{title}
					</div>
				))}
			</div>
		);
	}
}

@tab()
class Tab2 extends Component {
	render() {
		let { tabIndex, currentTab, ...others } = this.props;
		return <div {...others}>
			World
		</div>;
	}
}

storiesOf('Tabs', module)
	.add('tabs', () => {
		return <Tabs>
			<Control/>
			<Tab1 />
			<Tab2 title="world" />
		</Tabs>;
	});
