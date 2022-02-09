import { Params } from "./params";

export type Action = {
    commandId: string;
    params: Params;
}

export interface Button {
    name: string;
    icon: string;
    color: string;
    steps: Action[];
}
