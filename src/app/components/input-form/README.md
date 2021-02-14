v 1.1.4
importa��o no modulo da p�gina

    "@ckeditor/ckeditor5-build-classic": "github:ckeditor/ckeditor5-build-classic",

**Novo Colocado o tipo html

vers�o do plugin da mascara 8.1.3
 "ngx-mask": "8.1.3",

 entryComponents: [InputFormComponent],
 imports: [
  ]


  ],
.ts uso normal


	formGroup: FormGroup;
	submitted=false;
	error='';
	submitting=false;

 constructor(
    private formBuilder: FormBuilder,
	)
  async ngOnInit() {
    this.formGroup = this.formBuilder.group({

      cliente_id: [''],
	  cpf: [null, GenericValidator.CPF],
  cnpj: ['',GenericValidator.CNPJ],
   });



Uso


 <form class="needs-validation" [formGroup]="formGroup" (ngSubmit)="onSubmit()" novalidate *ngIf="!loading">
  <div class="row">
 <div class="form-group mb-3">
            <input-form type="select" (change)="change()" [items]="allCliente" label='Selecione o cliente'
              name='cliente_id' selectLabel="nome_fantasia" selectId="id" notFoundText='Item n�o encontrado'
              [submitted]='submitted' [formGroup]="formGroup">
            </input-form>
          </div>
 <div class=" col-6 form-group mb-3">
              <input-form  label='Visualizar demais produtos' name='visualiza_demais_produtos'
                [submitted]='submitted' [formGroup]="formGroup"></input-form>
            </div>

  <div class="col-6 form-group mb-3">
              <input-form type="select" [items]="l_tipoPessoa" label='Tipo de pessoa' name='tipo_pessoa_id'
                [submitted]='submitted' [formGroup]="formGroup"></input-form>
            </div>
 </div>
  <div class="row">
      <div class="col-12">
        <div class="text-right mb-3">
          <a href="javascript:history.back()" class="btn w-sm btn-light waves-effect">Voltar</a>
          <button type="submit" class="btn btn-blue block waves-effect waves-ligh" [disabled]="submitting">
            <span class="spinner-grow spinner-grow-sm mr-1" *ngIf="submitting"></span>
            Salvar
          </button>
        </div>
      </div>
    </div>
 </form>

Aten��o no uso do data
  <div class="col-6 form-group mb-3">
              <input-form type="date" label='Data da funda�ao' name='data_fundacao' [submitted]='submitted'
                [formGroup]="formGroup"></input-form>
            </div>
exemplo
.ts{



	//na hora de pegar
	 if (userId) {
      try {
        this.data = await this._boxer.getById(id);

        this.formGroup.patchValue(this.data);
        if (this.data.registrationExpirationDate) {
          this.f.registrationExpirationDate.setValue(formatDateNgb(this.data.registrationExpirationDate));
        }
      } catch (e) {
        this.location.back();
        Swal.fire('Erro!', 'A categoria n�o existe!', 'error');
        return;
      }
    }
	}
	//na hora de salvar


	 Object.assign(this.data, this.formGroup.value);
    if (this.data.registrationExpirationDate) {
      this.data.registrationExpirationDate = formatStringNbg(this.data.registrationExpirationDate);
    }


}

 async onSubmit() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      return;
    }
    this.submitting = true;
    this.error = '';
    Object.assign(this.centro, this.formGroup.value);
    try {
      if (this.centro.id) {
        await this._centro.alterar(this.centro);
      } else {
        await this._centro.adicionar(this.centro);
      }
      await Swal.fire('Sucesso!', 'O centro de custo foi salvo', 'success');
      this.location.back();
    } catch (error) {
      this.error = error;
      this.submitting = false;
    }
  }


      data Range colocar no 'index.html'
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
  <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
  <script src="https://npmcdn.com/flatpickr/dist/l10n/pt.js"></script>
  https://flatpickr.js.org/examples/

