import { dynamicCreate, destroyDynamicCreate } from "@simple/utils";
import { messageDefault } from "./Message";
import Message from "./Message.vue";
import type { VNode } from "vue";
import type { MessageProps } from "./types";

const instances: VNode[] = [];
let instanceIdx = 0;

export default (options?: MessageProps) => {
  const mergeProps = Object.assign({}, messageDefault, options);
  const vm = dynamicCreate(Message, {
    ...mergeProps,
    onClose: close
  });

  const props = vm.component!.props;
  props.id = instanceIdx;

  instances.forEach(item => ((props.offsetTop as number) += Number(item.el!.offsetHeight + props.eleSpacing)));
  instances.push(vm);

  document.body.appendChild(vm.el as HTMLElement);
  props.visible = true;

  instanceIdx++;

  function close() {
    props.visible = false;

    const instanceIdx = instances.findIndex(item => item.component!.props.id === props.id);
    if (instanceIdx < 0 || !instances.length) return;

    instances[instanceIdx].component!.props.visible = false;
    instances.splice(instanceIdx, 1);

    let verticalOffset = mergeProps.offsetTop;
    instances.forEach((item, idx) => {
      verticalOffset += idx === 0 ? 0 : item.el!.offsetHeight + props.eleSpacing;
      item.component!.props.offsetTop = verticalOffset;
    });

    window.setTimeout(() => {
      destroyDynamicCreate(vm.el as HTMLDivElement);
    }, 1000);
  }
};
