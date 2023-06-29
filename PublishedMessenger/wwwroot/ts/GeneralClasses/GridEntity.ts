import { Entity } from "./Entity.js";

export class GridEntity extends Entity {
    public image: string
    public hasBeenSeen: boolean
    public hasBeenPinned: boolean
}