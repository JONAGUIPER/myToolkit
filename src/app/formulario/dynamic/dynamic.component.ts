import { Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef, Injector, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'kc-dynamic',
  template: `<ng-template #dynamicComponentContainer></ng-template>`,
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent {

  currentComponent = null;
  // componentFactoryResolver: ComponentFactoryResolver;
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef, static: true }) dynamicComponentContainer: ViewContainerRef;
  @Input() formulario: FormGroup;
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
      inputProviders.push({ provide: 'formulario', useValue: this.formulario });
    }
    // const resolvedInputs = ReflectiveInjector.resolve(inputProviders);

    // const injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);

    const injector = Injector.create({ providers: inputProviders, parent: this.dynamicComponentContainer.parentInjector });
    console.log('resolviendo: ' + data.inputs.dataElemento.name);
    const factory = this.componentFactoryResolver.resolveComponentFactory(data.component);

    const component = factory.create(injector);

    this.dynamicComponentContainer.insert(component.hostView);

    if (this.currentComponent) {
      this.currentComponent.destroy();
    }

    this.currentComponent = component;
  }

  // constructor(@Inject(ComponentFactoryResolver) componentFactoryResolver: ComponentFactoryResolver) {
  //   this.componentFactoryResolver = componentFactoryResolver;
  // }
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }
}
