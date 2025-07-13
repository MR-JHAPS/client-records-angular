import { ButtonVariant } from "../uiEnums/buttonVariants"

export interface ButtonDataModel{

    buttonLabel ?: string , //THIS IS THE LABEL THAT WILL BE DISPLAYED INSIDE THE BUTTON.
    action: string,
    icon?: string,
    isRoleAdmin  ?:boolean,
    variant ?: ButtonVariant
}
