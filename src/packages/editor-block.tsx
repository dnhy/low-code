import { computed, defineComponent, inject, PropType } from "vue";
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
      left: props.block.top + "px",
      zIdnex: props.block.zIdnex,
      key: props.block.key,
    }));

    const config = inject("config") as EditorConfig;
    console.log("config :", config);

    return () => {
      const component = config.componentMap[props.block.key];

      return (
        <div class="editor-block" style={blockStyles.value}>
          <component />
        </div>
      );
    };
  },
});
