import React  from 'react'

export default class Modal extends React.Component {
    static PropTypes = {
        title: React.PropTypes.string.isRequired,
        content: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired
    }

    render() {
        const { title, content, toggle, again } = this.props
        return(
            <div className="dialog-containers">
                <div className="mask"></div>
                {/*对话框之纯文本样式*/}
                <div className="confirm">
                    <h3>{title}</h3>
                    <div className="confirm-text">
                        <p>{content}</p>
                    </div>
                    {/*两栏式按钮*/}
                    <div className="confirm-button twoColumn">
                        <span onTouchEnd={toggle}>取消</span>
                        <span onTouchEnd={again}>重新输入</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal
