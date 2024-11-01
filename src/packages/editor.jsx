import { computed, defineComponent, inject } from "vue";
import "./css/editor.scss";
import EditorBlock from "./editor-block";

export default defineComponent({
  props: {
    modelValue: { type: Object },
  },
  setup(props, context) {
    const data = computed({
      get() {
        return props.modelValue;
      },
    });
    const containerStyles = computed(() => ({
      width: data.value.container.width + "px",
      height: data.value.container.height + "px",
    }));
    const config = inject("config");
    return () => (
      <div className="editor">
        <div className="editor-left">
          {config.componentList.map((component) => (
            <div className="editor-left-item">
              <span>{component.label}</span>
              <div>{component.preview()}</div>
            </div>
          ))}
        </div>
        <div className="editor-top">菜单栏</div>
        <div className="editor-right">
          右侧属性控制栏目
          <div className="test"></div>
        </div>
        <div className="editor-container">
          {/* 产生滚动条 */}
          <div className="editor-container-canvas">
            {/* 产生内容区域 */}
            <div
              className="editor-container-canvas__content"
              style={containerStyles.value}
            >
              {data.value.blocks.map((block) => (
                <EditorBlock block={block}></EditorBlock>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
});
