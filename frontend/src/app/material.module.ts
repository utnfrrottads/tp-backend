import { NgModule } from "@angular/core";
import { MatSelectModule } from "@angular/material/select";
 import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
    imports: [
        MatSelectModule,
        MatDialogModule
    ],
    exports: [
        MatSelectModule,
        MatDialogModule
    ]
})


export class MaterialModule {

}