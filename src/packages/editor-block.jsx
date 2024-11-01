import { computed, defineComponent, inject } from "vue";

export default defineComponent({
  props: {
    block: {
      type: Object,
    },
  },
  setup(props) {
    const blockStyles = computed(() => ({
      top: props.block.top + "px",
      left: props.block.top + "px",
      zIdnex: props.block.zIdnex,
      key: props.block.key,
    }));

    const config = inject("config");
    console.log("config :", config);
    return () => {
      const component = config.componentMap[props.block.key];
      return (
        <div className="editor-block" style={blockStyles.value}>
          <component />
        </div>
      );
    };
  },
});
