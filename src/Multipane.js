import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

const LAYOUT_HORIZONTAL = 'horizontal'
const LAYOUT_VERTICAL = 'vertical'

class Multipane extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isResizing: false
    }
  }

  onMouseDown = ({ target: resizer, pageX: initialPageX, pageY: initialPageY }) => {
    console.log('onMouseDown')
    if (resizer.className && resizer.className.match('multipane-resizer')) {
      let self = this;
      let { $el: container, layout } = self;

      let pane = resizer.previousElementSibling;
      let {
        offsetWidth: initialPaneWidth,
        offsetHeight: initialPaneHeight,
      } = pane;

      let usePercentage = !!(pane.style.width + '').match('%');

      const { addEventListener, removeEventListener } = window;

      const resize = (initialSize, offset = 0) => {
        if (layout == LAYOUT_VERTICAL) {
          let containerWidth = container.clientWidth;
          let paneWidth = initialSize + offset;

          return (pane.style.width = usePercentage
            ? paneWidth / containerWidth * 100 + '%'
            : paneWidth + 'px');
        }

        if (layout == LAYOUT_HORIZONTAL) {
          let containerHeight = container.clientHeight;
          let paneHeight = initialSize + offset;

          return (pane.style.height = usePercentage
            ? paneHeight / containerHeight * 100 + '%'
            : paneHeight + 'px');
        }
      };

      // This adds is-resizing class to container
      self.isResizing = true;

      // Resize once to get current computed size
      let size = resize();

      // Trigger paneResizeStart event
      // self.$emit('paneResizeStart', pane, resizer, size);

      const onMouseMove = function({ pageX, pageY }) {
        size =
          layout == LAYOUT_VERTICAL
            ? resize(initialPaneWidth, pageX - initialPageX)
            : resize(initialPaneHeight, pageY - initialPageY);

        // self.$emit('paneResize', pane, resizer, size);
      };

      const onMouseUp = function() {
        // Run resize one more time to set computed width/height.
        size =
          layout == LAYOUT_VERTICAL
            ? resize(pane.clientWidth)
            : resize(pane.clientHeight);

        // This removes is-resizing class to container
        self.isResizing = false;

        removeEventListener('mousemove', onMouseMove);
        removeEventListener('mouseup', onMouseUp);

        // self.$emit('paneResizeStop', pane, resizer, size);
      };

      addEventListener('mousemove', onMouseMove);
      addEventListener('mouseup', onMouseUp);
    }
  }

  render() {
    const { layout, styleName, children } = this.props
    const { isResizing } = this.state
    return (
      <div className={'multipane layout-' + layout.slice(0, 1) + (isResizing ? ' is-resizing' : '') + ' ' + styleName}
        style={{cursor: this.isResizing
          ? layout === LAYOUT_VERTICAL ? 'col-resize' : 'row-resize'
          : '',
          userSelect: isResizing ? 'none' : ''}}
        onMouseDown={this.onMouseDown}>
        {children}
      </div>
    )
  }
}

Multipane.propTypes = {
  layout: PropTypes.string,
  styleName: PropTypes.string,
  children: PropTypes.node
}

Multipane.defaultProps = {
  layout: 'vertical'
}

export default Multipane
