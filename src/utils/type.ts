import { type VNode } from "vue";
export interface ELComponent {
  label: string;
  preview: () => VNode | string;
  render: () => VNode | string;
  key: string;
}

export type ComponentList = ELComponent[];

export interface ComponentMap {
  [idx: string]: ELComponent;
}

export interface EditorConfig {
  componentList: ComponentList;
  componentMap: ComponentMap;
  register: (component: ELComponent) => void;
}
