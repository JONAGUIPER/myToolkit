import { TestBed, fakeAsync, flush, async, tick } from '@angular/core/testing';
import { CargarValoresService } from './cargar-valores.service';
import { CargarValores } from '../modelos/interfaces';
import { Observable } from 'rxjs';


describe('CargarValoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });
  it('se puede instanciar el servicio', () => {
    const service: CargarValoresService = TestBed.get(CargarValoresService);
    expect(service).toBeTruthy();
  });
  it('se devuelven opciones configuradas como valor fijo',fakeAsync (() => {
    const service: CargarValoresService = TestBed.get(CargarValoresService);
    const definicionCargaValores: CargarValores = {
      valoresFijos: [
        {
          value: 'valor1',
          texto: [
            { idioma: "es", value: "caption para valor1 ES" },
            { idioma: "en", value: "caption para valor1 EN" },
          ]
        },
        {
          value: 'valor2',
          texto: [
            { idioma: "es", value: "caption para valor2 ES" },
            { idioma: "en", value: "caption para valor2 EN" },
          ]
        },
        {
          value: 'valor3',
          texto: [
            { idioma: "es", value: "caption para valor3 ES" },
            { idioma: "en", value: "caption para valor3 EN" },
          ]
        }
      ]
    };
    const opciones$ = service.execute(definicionCargaValores);
    tick();
    opciones$.subscribe((valores) => {
      expect(valores.length).toEqual(3);
      expect(valores[2].value).toEqual(definicionCargaValores.valoresFijos[2].value);
    });
  }));
});
