import React  from 'react'

export default class Comfirm extends React.Component {
    static PropTypes = {
        title: React.PropTypes.string.isRequired,
        content: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired
    }

    render() {
        const { title, content, toggle, mutil, goto, gotoText, composite} = this.props
        return(
            <div className="dialog-containers">
                <div className="mask"></div>
                {/*对话框之纯文本样式*/}
                <div className="confirm">
                    <h3>{title}</h3>
                    <div className="confirm-text">
                        <p>{content}</p>
                    </div>
                    {/*通栏式按钮*/}
                    { !mutil && !composite && 
                      <div className="confirm-button oneColumn" onTouchEnd={toggle}>
                                          我知道了
                      </div>
                    }
                    {/*两栏式按钮*/}
                    { !!mutil &&
                      <div className="confirm-button oneColumn" onTouchEnd={goto}>
                          {gotoText}
                      </div>
                    }
                    {/*两栏式按钮*/}
                    { !!composite &&
                      <div className="confirm-button twoColumn">
                          <span onTouchEnd={toggle}>取消</span>
                          <span onTouchEnd={goto}>{gotoText}</span>
                      </div>
                    }
                </div>
            </div>
        )
    }
}

export default Comfirm
