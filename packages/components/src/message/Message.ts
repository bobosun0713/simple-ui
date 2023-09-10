import { dynamicCreate, destroyDynamicCreate } from "@simple/utils";
import { messageDefault } from "./props";
import Message from "./Message.vue";
import type { VNode } from "vue";
import type { MessageProps } from "./types";

const instances: VNode[] = [];
let instanceUid = 0;

function message(options?: MessageProps) {
  instanceUid += 1;

  const mergeProps = { ...messageDefault, ...options, uid: instanceUid };
  const uid = mergeProps.uid;

  const vnode = dynamicCreate(Message, {
    ...mergeProps,
    onClose: () => {
      close(uid);
    },
    onClosed: () => {
      closed(vnode);
    }
  });

  const vm = vnode.component!;

  instances.forEach(
    item => ((vm.props.offsetTop as number) += Number(item.el!.offsetHeight + vnode.props!.eleSpacing))
  );
  instances.push(vnode);

  document.body.appendChild(vnode.el as HTMLElement);

  return {
    instance: vm,
    close: () => close(uid)
  };
}

function close(uid: number) {
  const vm = instances.find(item => item.props!.uid === uid);
  if (!vm) return;

  vm.component!.exposed!.visible.value = false;

  const instanceIdx = instances.indexOf(vm);
  if (instanceIdx < 0 || !instances.length) return;
  instances.splice(instanceIdx, 1);

  const eleSpacing = vm.props!.eleSpacing;
  let verticalOffset = vm.props!.offsetTop;
  instances.forEach((item, idx) => {
    verticalOffset += idx === 0 ? 0 : item.el!.offsetHeight + eleSpacing;
    item.component!.props.offsetTop = verticalOffset;
  });
}

function closeAll() {
  for (const instance of instances) {
    instance.component!.exposed!.visible.value = false;
  }
  instances.length = 0;
}

function closed(vnode: VNode) {
  destroyDynamicCreate(vnode.el as HTMLDivElement);
}

message.closeAll = closeAll;

export default message;
