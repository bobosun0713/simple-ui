import { dynamicCreate, destroyDynamicCreate } from "@simple/utils";
import { notificationDefault } from "./props";
import Notification from "./Notification.vue";
import type { VNode } from "vue";
import type { NotificationProps } from "./types";

type Instances = {
  [key: string]: VNode[];
};
const instances: Instances = {
  left: [],
  right: [],
  bottomleft: [],
  bottomright: []
};
let instanceUid = 0;

function notification(options?: NotificationProps) {
  instanceUid += 1;

  const mergeProps = { ...notificationDefault, ...options, uid: instanceUid };
  const uid = mergeProps.uid;
  const position = mergeProps.position || "top";

  const vnode = dynamicCreate(Notification, {
    ...mergeProps,
    onClose: () => {
      close(uid, position);
    },
    onClosed: () => {
      onClosed(vnode);
    }
  });

  const vm = vnode.component!;

  instances[position].forEach(
    item => ((vm.props.offsetTop as number) += Number(item.el!.offsetHeight + vnode.props!.eleSpacing))
  );
  instances[position].push(vnode);

  document.body.appendChild(vnode.el as HTMLElement);

  return {
    instance: vm,
    close: () => close(uid, position)
  };
}

function close(uid: number, position: string) {
  const vm = instances[position].find(item => item.props!.uid === uid);
  if (!vm) return;

  vm.component!.exposed!.visible.value = false;

  const instanceIdx = instances[position].indexOf(vm);
  if (instanceIdx < 0 && !instances.length) return;
  instances[position].splice(instanceIdx, 1);

  const eleSpacing = vm.props!.eleSpacing;
  let offsetTop = vm.props!.offsetTop;
  instances[position].forEach((item, idx) => {
    offsetTop += idx === 0 ? 0 : item.el!.offsetHeight + eleSpacing;
    item.component!.props.offsetTop = offsetTop;
  });
}

function closeAll() {
  Object.values(instances).forEach(instance => {
    instance.forEach(vnode => (vnode.component!.exposed!.visible.value = false));
    instance.length = 0;
  });
}

function onClosed(vnode: VNode) {
  destroyDynamicCreate(vnode.el as HTMLDivElement);
}

notification.closeAll = closeAll;

export default notification;
