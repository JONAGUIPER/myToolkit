import { Component, ComponentFactoryResolver, Input, ReflectiveInjector, ViewChild, ViewContainerRef, Injector } from '@angular/core';

@Component({
  selector: 'kc-dynamic',
  template: `<ng-template #dynamicComponentContainer></ng-template>`,
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent {

  currentComponent = null;

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef, static: true }) dynamicComponentContainer: ViewContainerRef;

  @Input() set componentData(data: { component: any, inputs: any }) {
    if (!data) {
      return;
    }

    let inputProviders = [];
    if (data.inputs) {
      inputProviders = Object.keys(data.inputs)
        .map((inputName) => {
          return {
            provide: inputName,
            useValue: data.inputs[inputName]
          };
        });
    }
    // const resolvedInputs = ReflectiveInjector.resolve(inputProviders);

    // const injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);

    const injector = Injector.create({ providers: inputProviders, parent: this.dynamicComponentContainer.parentInjector });

    const factory = this.componentFactoryResolver.resolveComponentFactory(data.component);

    const component = factory.create(injector);

    this.dynamicComponentContainer.insert(component.hostView);

    if (this.currentComponent) {
      this.currentComponent.destroy();
    }

    this.currentComponent = component;
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }
}
