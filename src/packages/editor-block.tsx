/* eslint-disable vue/no-mutating-props */
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  PropType,
  ref,
  onUpdated,
} from "vue";
import type { EditorConfig } from "@/utils/type";
import type { Block } from "@/types";

export default defineComponent({
  props: {
    block: {
      type: Object as PropType<Block>,
      required: true,
    },
  },
  setup(props) {
    const blockStyles = computed(() => ({
      top: props.block.top + "px",
      left: props.block.left + "px",
      zIdnex: props.block.zIdnex,
      key: props.block.key,
    }));

    onUpdated(() => {
      console.log("child2 updated");
    });

    const config = inject("config") as EditorConfig;

    const editorBlock = ref<HTMLElement>();

    onMounted(() => {
      const { offsetWidth, offsetHeight } = editorBlock.value as HTMLElement;

      if (props.block.alignCenter) {
        props.block.top = props.block.top - offsetHeight / 2;
        props.block.left = props.block.left - offsetWidth / 2;
        props.block.alignCenter = false;
      }
    });

    return () => {
      const component = config.componentMap[props.block.key];

      return (
        <div class="editor-block" style={blockStyles.value} ref={editorBlock}>
          <component />
        </div>
      );
    };
  },
});
