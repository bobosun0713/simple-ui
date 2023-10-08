import { withInstall } from "@simple/utils";
import Table from "./Table.vue";
import TableColumn from "./TableColumn.vue";

export const STable = withInstall(Table);
export const STableColumn = withInstall(TableColumn);
export default { STable, STableColumn };
