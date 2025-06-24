export interface TableDataModel{
 
  header: string;   // What is shown in the <th>
  contentKey: string;      // Property key in the data (e.g., "firstName")
  isImage?: boolean; // Optional → if true, renders as <img> tag
  isArray?: boolean; // Optional → if true, joins arrays (e.g., roles)
  isDate?: boolean;  // Optional → for date formatting
  isImportant?:boolean; // this are the columns that are displayed on the top in Accordian in MobileView.
  highlightColumn?: boolean; // highlights  the whole column
}