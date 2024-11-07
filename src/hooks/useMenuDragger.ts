import type { EditorData } from "@/types";
import type { ELComponent } from "@/utils/type";
import { type Ref } from "vue";

export function useMenuDragger(
  containerRef: Ref<HTMLElement | undefined>,
  data: Ref<EditorData>,
) {
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

  function dragStart(e: DragEvent, component: ELComponent) {
    containerRef.value?.addEventListener("dragenter", dragEnter);
    containerRef.value?.addEventListener("dragover", dragOver);
    containerRef.value?.addEventListener("dragleave", dragLeave);
    containerRef.value?.addEventListener("drop", drop);
    currentDrag = component;
  }

  function dragEnd(e: DragEvent) {
    containerRef.value?.removeEventListener("dragenter", dragEnter);
    containerRef.value?.removeEventListener("dragover", dragOver);
    containerRef.value?.removeEventListener("dragleave", dragLeave);
    containerRef.value?.removeEventListener("drop", drop);
  }

  return {
    dragStart,
    dragEnd,
  };
}
