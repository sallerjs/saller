import React from 'react'

class Tips extends React.Component {

  render() {
    const { content } = this.props
    const visible = !!content
    return (
        <div className='error' style={{'display': !!visible ? 'block' : 'none'}}>
            { !!visible && <span>{content}</span>}
        </div>
    )
  }
}

export default Tips
