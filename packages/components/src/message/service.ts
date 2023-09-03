import { dynamicCreate, destroyDynamicCreate } from "@simple/utils";
import { messageDefault } from "./Message";
import Message from "./Message.vue";
import type { VNode } from "vue";
import type { MessageProps } from "./types";

const instances: VNode[] = [];
let instanceIdx = 0;

function message(options?: MessageProps) {
  const mergeProps = Object.assign({}, messageDefault, options);
  const vnode = dynamicCreate(Message, {
    ...mergeProps,
    onClose: close,
    onClear: clear
  });

  const vm = vnode.component!;
  const props = vm.props;

  props.id = instanceIdx;

  instances.forEach(item => ((props.offsetTop as number) += Number(item.el!.offsetHeight + props.eleSpacing)));
  instances.push(vnode);

  document.body.appendChild(vnode.el as HTMLElement);

  instanceIdx++;

  function close() {
    vm.exposed!.visible.value = false;

    const instanceIdx = instances.indexOf(vnode);
    if (instanceIdx < 0 || !instances.length) return;
    instances.splice(instanceIdx, 1);

    let verticalOffset = mergeProps.offsetTop;
    instances.forEach((item, idx) => {
      verticalOffset += idx === 0 ? 0 : item.el!.offsetHeight + props.eleSpacing;
      item.component!.props.offsetTop = verticalOffset;
    });
  }

  function clear() {
    destroyDynamicCreate(vnode.el as HTMLDivElement);
  }

  return {
    instance: vm,
    close
  };
}

function closeAll() {
  for (const instance of instances) {
    instance.component!.exposed!.visible.value = false;
  }
  instances.length = 0;
}

message.closeAll = closeAll;

export default message;
