import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { FormsModule,
         ReactiveFormsModule } from '@angular/forms'

import { RouterModule,
         Routes } from '@angular/router'

import { SharedMaterialModule } from './shared-material.module'
// import { MatCardModule } from '@angular/material/card'
// import { MatButtonModule } from '@angular/material/button'



// Modules
// import { ReCaptchaModule } from 'angular2-recaptcha'
// import { RecaptchaModule } from 'ng-recaptcha'
// import { LeafletModule } from './leaflet-module/index'
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'


// Guards
// import { AdminGuard } from './_guards/admin.guard'
// import { LoggedInGuard } from './_guards/logged-in.guard'
// import { LoggedOutGuard } from './_guards/logged-out.guard'

// Directives
// import { AutofocusDirective } from './_directives/autofocus.directive'
// import { AutosaveDirective } from './_directives/autosave.directive'
// import { AutosizeDirective } from './_directives/autosize.directive'
// import { DragScrollDirective } from './_directives/drag-scroll/drag-scroll.directive'
// import { FadeDirective } from './_directives/fade.directive'
// import { HoverableDirective } from './_directives/hoverable.directive'
// import { LoadedDirective } from './_directives/loaded.directive'
// import { OnSelectDirective } from './_directives/on-select.directive'
// import { OnSelectOtherDirective } from './_directives/on-select-other.directive'
// import { NearViewDirective } from './_directives/near-view.directive'
// import { ShowIfDirective } from './_directives/show-if.directive'
// import { StickyDirective } from './_directives/sticky.directive'
// import { ScrollTriggerDirective } from './_directives/scroll-trigger.directive'
// import { TooltipDirective } from './_directives/tooltip.directive'
// import { ParallaxDirective } from './_directives/parallax.directive'

// Pipes
// import { BytesPipe } from './_pipes/bytes.pipe'
// import { EllipsisPipe } from './_pipes/ellipsis.pipe'
// import { InlineAddressPipe } from './_pipes/inline-address.pipe'
// import { OrdinalPipe } from './_pipes/ordinal.pipe'
// import { RelativeDatePipe } from './_pipes/relative-date.pipe'
// import { SafePipe } from './_pipes/safe.pipe'
// import { SmartDatePipe } from './_pipes/smart-date.pipe'

// Cookie Components
// import { CookieConsentFormComponent } from './cookie-consent/cookie-consent-form/cookie-consent-form.component'
// import { CookieConsentPopupComponent } from './cookie-consent/cookie-consent-popup/cookie-consent-popup.component'

// Form Components
// import { RecaptchaInputComponent } from './form/recaptcha-input/recaptcha-input.component'
// import { StatusControlComponent } from './form/status-control/status-control.component'
// import { VisibilityControlComponent } from './form/visibility-control/visibility-control.component'

// Icon Components
// import { PointIconComponent } from './icons/point-icon/point-icon.component'

// Other Components
// import { AddItemReferenceComponent } from './add-item-reference/add-item-reference.component'
// import { AutocompleteComponent } from './autocomplete/autocomplete.component'
// import { AutocompleteSuggestionComponent } from './autocomplete/autocomplete-suggestion/autocomplete-suggestion.component'
// import { AutocompleteExplorationComponent } from './autocomplete/autocomplete-exploration/autocomplete-exploration.component'
// import { ButtonComponent } from './button/button.component'
// import { CarouselCardComponent } from './carousel/carousel-card/carousel-card.component'
// import { CarouselComponent } from './carousel/carousel.component'
// import { CollectionLightbox } from './lightbox/collection-lightbox/collection-lightbox.component'
// import { CollapsableControlComponent } from './collapsable/collapsable-control/collapsable-control.component'
// import { CollapsableContentComponent } from './collapsable/collapsable-content/collapsable-content.component'
// import { CollectionListenerComponent } from './collection/collection-listener/collection-listener.component'
// import { CollectionPreviewComponent } from './collection/collection-preview/collection-preview.component'
// import { CollectionMapComponent } from './collection/collection-map/collection-map.component'
// import { ContainerComponent } from './container-old/container.component'
// import { ControlButtonsComponent } from './control-buttons/control-buttons.component'
// import { ControlButtonComponent } from './control-buttons/control-button/control-button.component'
// import { EditableDisplayComponent } from './editable-display/editable-display.component'
// import { EditableMarkerMapComponent } from './editable-map/editable-marker-map/editable-marker-map.component'
// import { EntryShowComponent } from './entry-show/entry-show.component'
// import { FadeContainerComponent } from './fade-container/fade-container.component'
// import { FooterComponent } from './footer/footer.component'
// import { HeaderComponent } from './header/header.component'
// import { HeaderRightComponent } from './header/header-right/header-right.component'
// import { HyperlinkFormComponent } from './hyperlink-form/hyperlink-form.component'
// import { InfiniteListComponent } from './infinite-list/infinite-list.component'
// import { InfiniteCardListComponent } from './infinite-list/infinite-card-list/infinite-card-list.component'
// import { InfiniteTableListComponent } from './infinite-list/infinite-table-list/infinite-table-list.component'
// import { InfiniteTableRowComponent } from './infinite-list/infinite-table-list/infinite-table-row/infinite-table-row.component'
// import { ItemCardComponent } from './item/item-card/item-card.component'
// import { ItemLabelComponent } from './item/item-label/item-label.component'
// import { ItemShowComponent } from './item/item-show/item-show.component'
// import { ItemShowContentComponent } from './item/item-show/item-show-content/item-show-content.component'
// import { ItemShowControlsHComponent } from './item/item-show/item-show-controls/item-show-controls-h.component'
// import { ItemShowControlsVComponent } from './item/item-show/item-show-controls/item-show-controls-v.component'
// import { ItemInfoBarComponent } from './item/item-info-bar/item-info-bar.component'
// import { ItemShowTitleComponent } from './item/item-show/item-show-title/item-show-title.component'
// import { ItemStatusComponent } from './item/item-status/item-status.component'
// import { ImageProgressiveComponent } from './image/image-progressive/image-progressive.component'
// import { ImageThumbnailComponent } from './image/image-thumbnail/image-thumbnail.component'
// import { LeftBarComponent } from './left-bar/left-bar.component'
// import { LightboxComponent } from './lightbox/lightbox/lightbox.component'
// import { LightboxControlComponent } from './lightbox/lightbox-control/lightbox-control.component'
// import { LightboxHeaderComponent } from './lightbox/lightbox-header/lightbox-header.component'
// import { LightboxResponsiveImageComponent } from './lightbox/lightbox-responsive-image/lightbox-responsive-image.component'
import { LoadingComponent } from './loading/loading.component'
// import { MapComponent } from './map/map.component'
// import { MapControlComponent } from './map-control/map-control.component'
// import { MyPositionComponent } from './my-position/my-position.component'
// import { Pager1Component } from './pager/pager-1/pager-1.component'
// import { Pager2Component } from './pager/pager-2/pager-2.component'
// import { PaginatedItemsListComponent } from './paginated-items-list/paginated-items-list.component'
// import { PolicyCurrentComponent } from './policy-current/policy-current.component'
// import { PolicyShowComponent } from './policy-show/policy-show.component'
// import { PopupComponent } from './popup/popup/popup.component'
// import { ProfileAssociationPageComponent } from './profile-association-page/profile-association-page.component'
// import { ProfileAboutComponent } from './profile-about/profile-about.component'
// import { PopupConfirmComponent } from './popup/popup-confirm/popup-confirm.component'
// import { PopupMenuControlComponent } from './popup/popup-menu-control/popup-menu-control.component'
// import { ProgressComponent } from './progress/progress.component'
// import { PathNotFoundComponent } from './path-not-found/path-not-found.component'
// import { QuillDisplayComponent } from './quill/quill-display/quill-display.component'
// import { QuillEditorComponent } from './quill/quill-editor/quill-editor.component'
// import { RegisterFormComponent } from './register-form/register-form.component'
// import { RowComponent } from './row/row.component'
// import { SharedListenerComponent } from './shared-listener/shared-listener.component'
// import { ServerBarComponent } from './server-bar/server-bar.component'
// import { StickyControlComponent } from './sticky-controls/sticky-control/sticky-control.component'
// import { StickyControlsHComponent } from './sticky-controls/sticky-controls-h/sticky-controls-h.component'
// import { StickyControlsVComponent } from './sticky-controls/sticky-controls-v/sticky-controls-v.component'
// import { StickyCloseComponent } from './sticky-close/sticky-close.component'
// import { TabsComponent } from './tabs/tabs.component'
// import { ToggleComponent } from './toggle/toggle.component'
import { TooltipComponent } from './tooltip/tooltip.component'
// import { UploadListComponent } from './upload/upload-list/upload-list.component'
// import { UploadListenerComponent } from './upload/upload-listener/upload-listener.component'
// import { WindowRulerComponent } from './window-ruler/window-ruler.component'

// import { LoginFormComponent } from './login-form/login-form.component'


// import { MainContainerComponent } from './main-container/main-container.component'
// import { RootContainerComponent } from './root/sidebar-container/sidebar-container.component'




@NgModule({
  imports: [
    CommonModule,
    // DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedMaterialModule,
    // MatCardModule,
    // RecaptchaModule,
    // LeafletModule,
    // ScrollingModule,
    // FontAwesomeModule
  ],
  declarations: [
    // AutofocusDirective,
    // AutosaveDirective,
    // AutosizeDirective,
    // DragScrollDirective,
    // FadeDirective,
    // HoverableDirective,
    // LoadedDirective,
    // OnSelectDirective,
    // OnSelectOtherDirective,
    // NearViewDirective,
    // ShowIfDirective,
    // StickyDirective,
    // ScrollTriggerDirective,
    // TooltipDirective,
    // ParallaxDirective,

    // BytesPipe,
    // EllipsisPipe,
    // InlineAddressPipe,
    // OrdinalPipe,
    // RelativeDatePipe,
    // SmartDatePipe,
    // SafePipe,

    // CookieConsentFormComponent,
    // CookieConsentPopupComponent,

    // RecaptchaInputComponent,
    // VisibilityControlComponent,
    // StatusControlComponent,

    // PointIconComponent,

    // ProfileAboutComponent,
    // ProfileAssociationPageComponent,

    // AddItemReferenceComponent,
    // AutocompleteComponent,
    // AutocompleteSuggestionComponent,
    // AutocompleteExplorationComponent,
    // ButtonComponent,
    // CollapsableControlComponent,
    // CollapsableContentComponent,
    // CollectionListenerComponent,
    // CollectionPreviewComponent,
    // CollectionMapComponent,
    // ContainerComponent,
    // // ContainerSeoComponent,
    // ControlButtonsComponent,
    // ControlButtonComponent,
    // EditableDisplayComponent,
    // EditableMarkerMapComponent,
    // EntryShowComponent,
    // FadeContainerComponent,
    // FooterComponent,
    // HeaderComponent,
    // HeaderRightComponent,
    // HyperlinkFormComponent,
    // InfiniteListComponent,
    // InfiniteCardListComponent,
    // InfiniteTableListComponent,
    // InfiniteTableRowComponent,
    // ItemCardComponent,
    // ItemLabelComponent,
    // ItemShowComponent,
    // ItemShowContentComponent,
    // ItemShowControlsHComponent,
    // ItemShowControlsVComponent,
    // ItemInfoBarComponent,
    // ItemShowTitleComponent,
    // ItemStatusComponent,
    // ImageProgressiveComponent,
    // ImageThumbnailComponent,
    // CarouselCardComponent,
    // CarouselComponent,
    // LeftBarComponent,
    // LightboxComponent,
    // LoginFormComponent,
    // CollectionLightbox,
    // LightboxControlComponent,
    // LightboxHeaderComponent,
    // LightboxResponsiveImageComponent,
    LoadingComponent,
    // MapComponent,
    // MapControlComponent,
    // MyPositionComponent,
    // Pager1Component,
    // Pager2Component,
    // PaginatedItemsListComponent,
    // PathNotFoundComponent,
    // QuillDisplayComponent,
    // QuillEditorComponent,
    // PolicyCurrentComponent,
    // PolicyShowComponent,
    // PopupComponent,
    // PopupConfirmComponent,
    // PopupMenuControlComponent,
    // ProgressComponent,
    // RegisterFormComponent,
    // RowComponent,
    // SharedListenerComponent,
    // ServerBarComponent,
    // StickyControlComponent,
    // StickyControlsHComponent,
    // StickyControlsVComponent,
    // StickyCloseComponent,
    // TabsComponent,
    // ToggleComponent,
    TooltipComponent,
    // UploadListComponent,
    // UploadListenerComponent,
    // WindowRulerComponent,

    // MainContainerComponent,
    // RootContainerComponent,
  ],
  providers: [
    // AdminGuard,
    // CanDeactivateGuard,
    // LocationEditGuard,
    // LoggedInGuard,
    // LoggedOutGuard,
    // BytesPipe,
    // EllipsisPipe,
    // InlineAddressPipe,
    // OrdinalPipe,
    // RelativeDatePipe,
    // SmartDatePipe,
    // SafePipe
  ],
  exports: [
    CommonModule,
    // DragDropModule,
    FormsModule,
    // LeafletModule, // note: LeafletModule.forRoot() ??? see ToastrModule
    ReactiveFormsModule,
    RouterModule,
    SharedMaterialModule,
    // MatCardModule,
    // ScrollingModule,
    // FontAwesomeModule,

    // AutofocusDirective,
    // AutosaveDirective,
    // AutosizeDirective,
    // DragScrollDirective,
    // HoverableDirective,
    // FadeDirective,
    // LoadedDirective,
    // OnSelectDirective,
    // OnSelectOtherDirective,
    // NearViewDirective,
    // ShowIfDirective,
    // StickyDirective,
    // ScrollTriggerDirective,
    // TooltipDirective,
    // ParallaxDirective,

    // BytesPipe,
    // EllipsisPipe,
    // InlineAddressPipe,
    // OrdinalPipe,
    // RelativeDatePipe,
    // SmartDatePipe,
    // SafePipe,

    // CookieConsentFormComponent,
    // CookieConsentPopupComponent,

    // RecaptchaInputComponent,
    // VisibilityControlComponent,
    // StatusControlComponent,

    // PointIconComponent,

    // ProfileAboutComponent,
    // ProfileAssociationPageComponent,

    // AddItemReferenceComponent,
    // AutocompleteComponent,
    // AutocompleteSuggestionComponent,
    // AutocompleteExplorationComponent,
    // ButtonComponent,
    // CollapsableControlComponent,
    // CollapsableContentComponent,
    // CollectionListenerComponent,
    // CollectionPreviewComponent,
    // CollectionMapComponent,
    // ContainerComponent,
    // // ContainerSeoComponent,
    // ControlButtonsComponent,
    // ControlButtonComponent,
    // EditableDisplayComponent,
    // EditableMarkerMapComponent,
    // EntryShowComponent,
    // FadeContainerComponent,
    // FooterComponent,
    // HeaderComponent,
    // HeaderRightComponent,
    // HyperlinkFormComponent,
    // InfiniteListComponent,
    // InfiniteCardListComponent,
    // InfiniteTableListComponent,
    // InfiniteTableRowComponent,
    // ItemCardComponent,
    // ItemLabelComponent,
    // ItemShowComponent,
    // ItemShowContentComponent,
    // ItemShowControlsHComponent,
    // ItemShowControlsVComponent,
    // ItemInfoBarComponent,
    // ItemShowTitleComponent,
    // ItemStatusComponent,
    // ImageThumbnailComponent,
    // ImageProgressiveComponent,
    // CarouselCardComponent,
    // CarouselComponent,
    // LeftBarComponent,
    // LightboxComponent,
    // LoginFormComponent,
    // CollectionLightbox,
    // LightboxControlComponent,
    // LightboxHeaderComponent,
    // LightboxResponsiveImageComponent,
    // LoadingComponent,
    // MapComponent,
    // MapControlComponent,
    // MyPositionComponent,
    // Pager1Component,
    // Pager2Component,
    // PaginatedItemsListComponent,
    // PathNotFoundComponent,
    // QuillDisplayComponent,
    // QuillEditorComponent,
    // PolicyCurrentComponent,
    // PolicyShowComponent,
    // PopupComponent,
    // PopupConfirmComponent,
    // PopupMenuControlComponent,
    // ProgressComponent,
    // RegisterFormComponent,
    // RowComponent,
    // SharedListenerComponent,
    // ServerBarComponent,
    // StickyControlComponent,
    // StickyControlsHComponent,
    // StickyControlsVComponent,
    // StickyCloseComponent,
    // TabsComponent,
    // ToggleComponent,
    // UploadListComponent,
    // UploadListenerComponent,
    // WindowRulerComponent,

    // MainContainerComponent,
    // RootContainerComponent,
  ],
  entryComponents: [
    TooltipComponent,
  ]
})

export class SharedModule {}
