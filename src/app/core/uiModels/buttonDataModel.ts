export interface ButtonDataModel{

    buttonLabel ?: string , //THIS IS THE LABEL THAT WILL BE DISPLAYED INSIDE THE BUTTON.
    buttonValue : string,  // TO show which button is pressed (update, delete, restore, insert, other)
    includeLabel ?:boolean,// TO show the button Label inside Button
    isRoleAdmin  ?:boolean,

    // isDeleteButton ?: boolean,
    // isUpdateButton ?: boolean,
    // isRestoreButton ?: boolean,
    // isInsertButton ?:boolean,




}