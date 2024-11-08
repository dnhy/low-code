import {
  ref,
  computed,
  defineComponent,
  inject,
  PropType,
  onUpdated,
  Ref,
} from "vue";
import _ from "lodash";
import "./css/editor.scss";
import EditorBlock from "./editor-block";
import type { EditorConfig } from "@/utils/type";
import type { Block, EditorData, IFoucsData } from "@/types";
import { useMenuDragger } from "@/hooks/useMenuDragger";
import { useFocus } from "@/hooks/useFocus";
import { useMove } from "@/hooks/useMove";

export default defineComponent({
  props: {
    modelValue: { type: Object as PropType<EditorData>, required: true },
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const data = computed<EditorData>({
      get() {
        return props.modelValue;
      },
      set(val) {
        ctx.emit("update:modelValue", _.cloneDeep(val));
      },
    });

    const containerStyles = computed(() => ({
      width: data.value.container.width + "px",
      height: data.value.container.height + "px",
    }));

    const containerRef = ref<HTMLElement>();
    const config = inject("config") as EditorConfig;

    // 拖拽物料列表组件
    const { dragStart, dragEnd } = useMenuDragger(containerRef, data);

    // 选择内容区组件
    const { handleMouseDown, containerMousedown, foucsData } = useFocus(
      data,
      (e, preBlocks) => {
        mouseDown(e, preBlocks);
      },
    );

    // 拖动内容区组件
    const { mouseDown } = useMove(data, foucsData);

    return () => (
      <div class="editor">
        <div class="editor-left">
          {config.componentList.map((component) => (
            <div
              class="editor-left-item"
              draggable
              onDragstart={(e) => dragStart(e, component)}
              onDragend={(e) => dragEnd(e)}
            >
              <span>{component.label}</span>
              <div>{component.preview()}</div>
            </div>
          ))}
        </div>
        <div class="editor-top">顶部菜单栏</div>
        <div class="editor-right">
          右侧属性控制栏目
          <div class="test"></div>
        </div>
        <div class="editor-container">
          {/* 产生滚动条 */}
          <div class="editor-container-canvas">
            {/* 产生内容区域 */}
            <div
              class="editor-container-canvas__content"
              style={containerStyles.value}
              ref={containerRef}
              onMousedown={(e) => containerMousedown(e)}
            >
              {data.value.blocks.map((block) => (
                <EditorBlock
                  block={block}
                  class={block.focus ? "block-focus" : ""}
                  onMousedown={(e: MouseEvent) => handleMouseDown(e, block)}
                ></EditorBlock>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
});
