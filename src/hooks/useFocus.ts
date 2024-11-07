import type { EditorData, Block } from "@/types";
import { computed, type Ref } from "vue";

export function useFocus(data: Ref<EditorData>) {
  function handleMouseDown(e: MouseEvent, block: Block) {
    console.log("handleMouseDown :");
    e.preventDefault();
    e.stopPropagation();
    // 按住shift键，不取消其他组件的选中状态
    if (!e.shiftKey) clearAllFocus(data.value.blocks);
    block.focus = !block.focus;
  }

  // 清除所有组件的选中状态
  function clearAllFocus(blocks: Block[]) {
    blocks.forEach((block) => (block.focus = false));
  }

  // 点空白处去除所有选中状态
  function containerMousedown(e: MouseEvent) {
    clearAllFocus(data.value.blocks);
  }

  // 获取哪些元素被选中
  const foucsData = computed(() => {
    const foucs: Block[] = [];
    const unFoucs: Block[] = [];

    data.value.blocks.forEach((block: Block) => {
      (block.focus ? foucs : unFoucs).push(block);
    });

    return { foucs, unFoucs };
  });

  return { handleMouseDown, containerMousedown, foucsData };
}
