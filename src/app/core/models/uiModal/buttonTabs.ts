export class ButtonTabs{

    constructor(
        public buttonName : string = "",
        public routerLink : string = "",
    ){}



    public getButtonName() : string{
        return this.buttonName;
    }

    public setButtonName(buttonName : string) : void{
        this.buttonName = buttonName;
    }

    public getRouterLink(): string{
        return this.routerLink;
    }

    public setRouterLink(routerLink : string): void{
        this.routerLink = routerLink;
    }


}//ends class.