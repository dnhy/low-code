import type { Block, EditorData, IFoucsData } from "@/types";
import type { Ref } from "vue";

export function useMove(data: Ref<EditorData>, foucsData: Ref<IFoucsData>) {
  // 获取点击取消选中前的blocks
  let preBlockArr: Block[] | null;

  let moveState = {
    startX: 0,
    startY: 0,
    currPos: [{ top: 0, left: 0 }],
  };

  function mouseDown(e: MouseEvent, preBlocks: Block[] | null) {
    moveState = {
      startX: e.clientX,
      startY: e.clientY,
      currPos: foucsData.value.foucs.map(({ left, top }) => ({
        left,
        top,
      })),
    };

    preBlockArr = preBlocks;

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  }

  function mouseMove(e: MouseEvent) {
    const { clientX: nowX, clientY: nowY } = e;
    const durX = nowX - moveState.startX;
    const durY = nowY - moveState.startY;

    // 处理取消选中点击时鼠标小幅移动判断为拖拽
    if (Math.abs(durX) < 0.1 && Math.abs(durY) < 0.1) return;

    //处理多个拖拽问题自动取消鼠标点击位置组件选中状态的问题,拖动时列表还原为之前的状态
    if (preBlockArr) {
      data.value = {
        ...data.value,
        blocks: [...preBlockArr],
      };

      moveState.currPos = preBlockArr
        .filter((item: Block) => item.focus)
        .map(({ left, top }) => ({
          left,
          top,
        }));

      preBlockArr = null;
    }

    // 拖拽逻辑
    foucsData.value.foucs.forEach((item, idx) => {
      item.top = moveState.currPos[idx]?.top + durY;
      item.left = moveState.currPos[idx]?.left + durX;
    });
  }

  function mouseUp(e: MouseEvent) {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  }

  return { mouseDown };
}
