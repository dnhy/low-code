import type { EditorData, Block, IFoucsData } from "@/types";
import _ from "lodash";
import { computed, type Ref } from "vue";

export function useFocus(
  data: Ref<EditorData>,
  callback: (e: MouseEvent, preBlock: Block[]) => void,
) {
  // 获取哪些元素被选中
  const foucsData = computed<IFoucsData>(() => {
    const foucs: Block[] = [];
    const unFoucs: Block[] = [];

    data.value.blocks.forEach((block: Block) => {
      (block.focus ? foucs : unFoucs).push(block);
    });

    return { foucs, unFoucs };
  });

  function handleMouseDown(e: MouseEvent, block: Block) {
    e.preventDefault();
    e.stopPropagation();
    let preBlocks: Block[] | null = null;

    if (block.focus) {
      preBlocks = _.cloneDeep(data.value.blocks);
    }
    // 按住shift键，不取消其他组件的选中状态
    if (!e.shiftKey) clearAllFocus(data.value.blocks);
    block.focus = !block.focus;

    // if (e.shiftKey) {
    //   if (block.focus) {
    //     preBlocks = _.cloneDeep(data.value.blocks);
    //   }
    //   block.focus = !block.focus;
    // } else {
    //   if (!block.focus) {
    //     clearAllFocus(data.value.blocks);
    //     block.focus = true;
    //   } else {
    //     //维护一个blocks快照
    //     preBlocks = _.cloneDeep(data.value.blocks);

    //     block.focus = false;
    //   }
    // }

    callback(e, preBlocks as Block[]);
  }

  // 清除所有组件的选中状态
  function clearAllFocus(blocks: Block[]) {
    blocks.forEach((block) => (block.focus = false));
  }

  // 点空白处去除所有选中状态
  function containerMousedown(e: MouseEvent) {
    clearAllFocus(data.value.blocks);
  }

  return {
    handleMouseDown,
    containerMousedown,
    foucsData,
  };
}
