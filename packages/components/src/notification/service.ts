import { dynamicCreate, destroyDynamicCreate } from "@simple/utils";
import { notificationDefault } from "./Notification";
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
let instanceIdx = 0;

function notification(options?: NotificationProps) {
  const mergeProps = Object.assign({}, notificationDefault, options);
  const vnode = dynamicCreate(Notification, {
    ...mergeProps,
    onClose: close,
    onClear: clear
  });

  const vm = vnode.component!;
  const props = vm.props;
  const position = props.position as string;

  props.id = instanceIdx;

  instances[position].forEach(
    item => ((props.offsetTop as number) += Number(item.el!.offsetHeight + props.eleSpacing))
  );
  instances[position].push(vnode);

  document.body.appendChild(vnode.el as HTMLElement);

  instanceIdx++;

  function close() {
    vm.exposed!.visible.value = false;

    const instanceIdx = instances[position].indexOf(vnode);
    if (instanceIdx < 0 && !instances.length) return;
    instances[position].splice(instanceIdx, 1);

    let verticalOffset = mergeProps.offsetTop;
    instances[position].forEach((item, idx) => {
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
  Object.values(instances).forEach(instance => {
    instance.forEach(vnode => (vnode.component!.exposed!.visible.value = false));
  });
  Object.values(instances).forEach(instance => (instance.length = 0));
}

notification.closeAll = closeAll;

export default notification;
