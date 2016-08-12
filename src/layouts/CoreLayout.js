import React from 'react'
import { connect } from 'react-redux'

@connect(
    state => ({
        title: state.helper.title
    })
)
export class CoreLayout extends React.Component {
    static propTypes = {
        children: React.PropTypes.element,
        title: React.PropTypes.string
    }

    render() {
        const { title, history } = this.props
        return (
            <div className='page-container'>
                <hearder className="healthcard-header">
                    <a href="javascript: void(0)" onTouchEnd={history.goBack} className="healthcard-header-back"></a>
                    <div className="healthcard-header-title">{!!title ? title : '' }</div>
                </hearder>
                <div className='view-container'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default CoreLayout
