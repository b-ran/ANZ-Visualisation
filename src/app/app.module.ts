import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BubbleVisComponent} from './components/bubble-vis/bubble-vis.component';
import {AppMaterialModule} from './app-material.module';
import {MatSidenavModule, MatCheckboxModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RangeSliderComponent } from './components/range-slider/range-slider.component';

@NgModule({
  declarations: [
    AppComponent,
    BubbleVisComponent,
    RangeSliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    MatSidenavModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
