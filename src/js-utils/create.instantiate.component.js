export default function instantiateComponent(Vue, Component, data, renderFn) {
  let renderData
  let childrenRenderFn
  const instance = new Vue({
    render(createElement) {
      let children = childrenRenderFn && childrenRenderFn(createElement);
      if (children && !Array.isArray(children)) {
        children = [children]
      }

      // {...renderData}: fix #128, caused by vue modified the parameter in the version of 2.5.14+, which related to vue issue #7294.
      return createElement(Component, {...renderData}, children || [])
    },
    methods: {
      init() {
        document.body.appendChild(this.$el)
      },
      destroy() {

        setTimeout(()=>{
          this.$destroy();
        },50);
        let popup = document.getElementsByClassName('van-popup');
        for(let n = 0 ; n < popup.length;n++){
          document.body.removeChild(popup[n]);
        }

      }
    }
  })
  instance.updateRenderData = function (data, render) {
    renderData = data;
    childrenRenderFn = render
  }
  instance.updateRenderData(data, renderFn)
  instance.$mount();
  instance.init();
  const component = instance.$children[0];
  component.$updateProps = function (props) {
    Object.assign(renderData.props, props);
    instance.$forceUpdate()
  }
  return component
}
