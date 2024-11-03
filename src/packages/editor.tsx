import {
  ref,
  computed,
  defineComponent,
  inject,
  PropType,
  onMounted,
  onUpdated,
} from "vue";
import "./css/editor.scss";
import EditorBlock from "./editor-block";
import type { EditorConfig, ELComponent } from "@/utils/type";
import type { EditorData } from "@/types";
import _ from "lodash";

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
    const config = inject("config") as EditorConfig;

    const contanerRef = ref<HTMLElement>();
    let currentDrag: ELComponent | null;

    function dragEnter(e: DragEvent) {
      e.dataTransfer!.dropEffect = "move";
    }
    function dragOver(e: DragEvent) {
      e.preventDefault();
    }
    function dragLeave(e: DragEvent) {
      e.dataTransfer!.dropEffect = "none";
    }

    function drop(e: DragEvent) {
      const block = {
        top: e.offsetY,
        left: e.offsetX,
        zIdnex: 1,
        key: currentDrag!.key,
        alignCenter: true,
      };

      data.value = {
        ...data.value,
        blocks: [...data.value.blocks, block],
      };

      currentDrag = null;
    }

    onUpdated(() => {
      console.log("child1 updated");
    });

    function dragStart(e: Event, component: ELComponent) {
      contanerRef.value?.addEventListener("dragenter", dragEnter);
      contanerRef.value?.addEventListener("dragover", dragOver);
      contanerRef.value?.addEventListener("dragleave", dragLeave);
      contanerRef.value?.addEventListener("drop", drop);
      currentDrag = component;
    }

    return () => (
      <div class="editor">
        <div class="editor-left">
          {config.componentList.map((component) => (
            <div
              class="editor-left-item"
              draggable
              onDragstart={(e) => dragStart(e, component)}
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
              ref={contanerRef}
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
