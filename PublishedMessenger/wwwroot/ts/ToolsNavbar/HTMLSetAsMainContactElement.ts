import { HTMLNewMessageToolsElement } from "./HTMLNewMessageToolsElement.js";
import { HTMLSetAsMainContactIconElement } from "./HTMLSetAsMainContactIconElement.js";
import { HTMLSetAsMainContactTextElement } from "./HTMLSetAsMainContactTextElement.js";

export class HTMLSetAsMainContactElement extends HTMLElement {

    private readonly _newMessageTools: HTMLNewMessageToolsElement;
    private readonly _setAsMainContactIcon: HTMLSetAsMainContactIconElement;
    private readonly _setAsMainContactText: HTMLSetAsMainContactTextElement;

    private _enabality: boolean;
    private _functionName: string;

    constructor(newMessageTools: HTMLNewMessageToolsElement) {
        super();

        this.attachShadow({ mode: 'open' });

        this._newMessageTools = newMessageTools;

        this._setAsMainContactIcon = new HTMLSetAsMainContactIconElement(this);
        this._setAsMainContactText = new HTMLSetAsMainContactTextElement(this);

        this._enabality = false;

        this.setElement();
    }

    private setElement(): void {
        this.setStyle();
        this.createElements();
        this.setEvents();
    }

    private setStyle(): void {
        this.style.position = "absolute";
        this.style.display = "inline-block";
        this.style.overflow = "hidden";
        this.style.width = "167px";
        this.style.height = "30px";
        this.style.borderRadius = "5px";
        this.style.borderStyle = "solid";
        this.style.borderWidth = "1px";
        this.style.backgroundColor = "transparent";
        this.style.borderColor = "transparent";
        this.style.right = "338px";
        this.style.top = "4px";
    }

    private createElements(): void {
        this.shadowRoot.appendChild(this._setAsMainContactIcon);
        this.shadowRoot.appendChild(this._setAsMainContactText);
    }

    private setEvents(): void {
        this.addEventListener("mouseover", function (this: HTMLSetAsMainContactElement, event: MouseEvent) {
            if (this._enabality) {
                this.style.backgroundColor = "rgb(250, 250, 250)";
                this.style.borderColor = "rgb(229, 229, 229)";
            }
        });

        this.addEventListener("mouseleave", function (this: HTMLSetAsMainContactElement, event: MouseEvent) {
            if (this._enabality) {
                this.setEnabalityStyle();
            }
        });

        this.addEventListener("mousedown", function (this: HTMLSetAsMainContactElement, event: MouseEvent) {
            if (this._enabality) {
                this.style.borderColor = "transparent";
                this.style.backgroundColor = "transparent";
                eval(this._functionName + "()");
            }
        });
    }

    public getEnabality(): boolean {
        return this._enabality;
    }

    public setEnabality(value: boolean): void {
        this._enabality = value;
        this._setAsMainContactIcon.setEnabality(value);
        this._setAsMainContactText.setEnabality(value);
        this.setEnabalityStyle();
    }

    public setFunctionName(functionName: string) {
        this._functionName = functionName;
    }

    private setEnabalityStyle(): void {
        this.style.backgroundColor = "transparent";
        this.style.borderColor = "transparent";
    }

}

window.customElements.define("set-as-main-contact", HTMLSetAsMainContactElement)


