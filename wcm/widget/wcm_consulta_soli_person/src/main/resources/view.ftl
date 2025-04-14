<div id="MyWidget_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide"
    data-params="MyWidget.instance()">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <div class="panel panel-default pb-3">
        <div class="panel-heading">
            <h3 class="panel-title"><strong>{{ title }}</strong></h3>
        </div>
        <div class="panel-body" @keyup.enter="buscaDadosPai()" style="padding-bottom: 5px !important;">
            <div class="row">
                <div class="col-md-12">
                    <div class="row">
                        <div class="col-md-12">
                            <label>Processo</label>
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="formBuscaProcesso.processo" readonly>
                                <div class="input-group-btn">
                                    <button type="button" @click="(listaVer = !listaVer); focus()"
                                        class="btn btn-primary btn-custom-zoom" style="opacity: 1;">
                                        <span class="fluigicon fluigicon-user-search icon-sm"
                                            style="pointer-events: auto; opacity: 1;"></span>
                                    </button>
                                </div>
                            </div>

                            <transition>
                                <div id="listaFlut" class="card flutuante" v-if="listaVer">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group has-feedback">
                                                <input class="form-control" ref="campoBusca" @keyup="buscaNodoPocesso"
                                                    v-model="buscaProcesso" type="text" placeholder="buscar...">
                                                <i class="flaticon flaticon-search icon-sm form-control-feedback"
                                                    aria-hidden="true"></i>
                                            </div>
                                        </div>
                                        <div class="col-md-12 flutuante-scroll">
                                            <div v-for="item in dadosFiltroProcessos" class="flutuante-tem">
                                                <div @click="escolheSetor(item)">
                                                    {{ item.DES_DEF_PROCES }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition>

                        </div>

                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">Data de:</label>
                                <input type="date" v-model="formBuscaProcesso.dataInicio" class="form-control"
                                    id="dataInicio">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">até:</label>
                                <input type="date" class="form-control" v-model="formBuscaProcesso.dataFim">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">Processo de:</label>
                                <input type="number" v-model="formBuscaProcesso.fluigInicio" class="form-control"
                                    id="dataInicio">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="control-label">até:</label>
                                <input type="number" class="form-control" v-model="formBuscaProcesso.fluigFim">
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-3">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" v-model="formBuscaProcesso.aberta" checked>
                                    <b>Aberta</b>
                                </label>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" v-model="formBuscaProcesso.finalizada" checked>
                                    <b>Finalizada</b>
                                </label>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" v-model="formBuscaProcesso.cancelada" checked>
                                    <b>Cancelada</b>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <label>Responsável</label>
                            <div class="input-group">
                                <input type="text" class="form-control" v-model="formBuscaProcesso.responsavel"
                                    readonly>
                                <div class="input-group-btn">
                                    <button type="button" @click="(listaVerUsr = !listaVerUsr); focus()"
                                        class="btn btn-primary btn-custom-zoom" style="opacity: 1;">
                                        <span class="fluigicon fluigicon-user-search icon-sm"
                                            style="pointer-events: auto; opacity: 1;"></span>
                                    </button>
                                </div>
                            </div>

                            <transition>
                                <div id="listaFlut" class="card flutuante" v-if="listaVerUsr">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="form-group has-feedback">
                                                <input class="form-control" ref="campoBusca" @keyup="buscaNodousuarios"
                                                    v-model="buscaUsuarios" type="text" placeholder="buscar...">
                                                <i class="flaticon flaticon-search icon-sm form-control-feedback"
                                                    aria-hidden="true"></i>
                                            </div>
                                        </div>
                                        <div class="col-md-12 flutuante-scroll">
                                            <div v-for="item in dadosFiltroUsuarios" class="flutuante-tem">
                                                <div @click="escolheUsuario(item)">
                                                    {{ item.colleagueName }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition>

                        </div>
                    </div>
                </div>


                <div class="col-md-12 mt-3">
                    <fieldset style="padding: 6px !important;" v-for="(busca, index) in formBuscaProcesso.campos">
                        <div class="row">
                            <div class="col-md-12 text-end">
                                <button class="btn btn-close btn-close-inf"
                                    @click="formBuscaProcesso.campos.splice(index, 1)">
                                    <i class="bi bi-x-lg"></i>
                                </button>
                            </div>
                            <div class="col-md-3">
                                <label>Tabelas</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" v-model="busca.tabelaNome" readonly>
                                    <div class="input-group-btn">
                                        <button type="button" @click="(busca.listaVerTab = !busca.listaVerTab); focus()"
                                            class="btn btn-primary btn-custom-zoom" style="opacity: 1;">
                                            <span class="fluigicon fluigicon-user-search icon-sm"
                                                style="pointer-events: auto; opacity: 1;"></span>
                                        </button>
                                    </div>
                                </div>

                                <transition>
                                    <div id="listaFlut" class="card flutuante" v-if="busca.listaVerTab">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group has-feedback">
                                                    <input class="form-control" ref="campoBusca"
                                                        @keyup="buscaNodoPocesso" v-model="buscaTabela" type="text"
                                                        placeholder="buscar...">
                                                    <i class="flaticon flaticon-search icon-sm form-control-feedback"
                                                        aria-hidden="true"></i>
                                                </div>
                                            </div>
                                            <div class="col-md-12 flutuante-scroll">
                                                <div v-for="item in dadosFiltroTabelas" class="flutuante-tem">
                                                    <div @click="escolheTabela(item, index)">
                                                        {{ item.NOME }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </transition>

                            </div>
                            <div class="col-md-3">
                                <label>Campo</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" v-model="busca.campo" readonly>
                                    <div class="input-group-btn">
                                        <button type="button"
                                            @click="(busca.listaVerCampos = !busca.listaVerCampos); focus()"
                                            class="btn btn-primary btn-custom-zoom" style="opacity: 1;">
                                            <span class="fluigicon fluigicon-user-search icon-sm"
                                                style="pointer-events: auto; opacity: 1;"></span>
                                        </button>
                                    </div>
                                </div>

                                <transition>
                                    <div id="listaFlut" class="card flutuante" v-if="busca.listaVerCampos">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group has-feedback">
                                                    <input class="form-control" ref="campoBusca"
                                                        @keyup="buscaNodoCampos" v-model="buscaCampos" type="text"
                                                        placeholder="buscar...">
                                                    <i class="flaticon flaticon-search icon-sm form-control-feedback"
                                                        aria-hidden="true"></i>
                                                </div>
                                            </div>
                                            <div class="col-md-12 flutuante-scroll">
                                                <div v-for="item in dadosFiltroCampos" class="flutuante-tem">
                                                    <div @click="escolheCampo(item, index)">
                                                        {{ item.CAMPO }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </transition>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="processo" class="control-label">Pesquisa</label>
                                    <input type="text" class="form-control"
                                        v-model="formBuscaProcesso.campos[index].busca">
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <button class="btn btn-primary w-100" v-if="tabelas.length > 0" @click="addCampo()">
                        Adcionar outros filtros
                    </button>
                </div>

                <div class="col-md-6 mt-2">
                    <button class="btn btn-warning w-100" v-if="tabelas.length > 0" @click="buscaDadosPai(true)">
                        Gerar Excel para email
                    </button>
                </div>
                <div class="col-md-6 mt-2">
                    <button class="btn btn-success w-100" v-if="tabelas.length > 0"
                        @click="buscaDadosPai()">Buscar</button>
                </div>
            </div>
            <div class="row" v-if="dadosPai.values.length > 0">
                <div class="col-md-12">
                    <div class="panel panel-primary process-search-result mt-3"
                        style="border-color: #d4d4d4; border-radius: 5px;">
                        <div class="panel-heading">
                            <h3 class="panel-title"><strong>Resultados encontrados
                                    <span>({{dadosPai.values.length}})</span></strong></h3>
                        </div>
                        <div class="tab-respon-x-y">
                            <table class="table table-datatable table-hover">
                                <thead>
                                    <tr>
                                        <template v-for="(coluna, index) in dadosPai.columns">
                                            <th v-if="
                                            coluna != 'ID' && 
                                            coluna != 'companyid' && 
                                            coluna != 'cardid' && 
                                            coluna != 'documentid' && 
                                            coluna != 'version' && 
                                            coluna != 'anonymization_user_id' && 
                                            coluna != 'anonymization_date'">
                                                {{coluna}}
                                            </th>
                                        </template>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(valor, indexValor) in dadosPai.values">
                                        <template v-for="(coluna, index) in dadosPai.columns">
                                            <td @click="abrirFormulario(valor.documentid, valor['Solicitação'], valor)"
                                                v-if="
                                            coluna != 'ID' && 
                                            coluna != 'companyid' && 
                                            coluna != 'cardid' && 
                                            coluna != 'documentid' && 
                                            coluna != 'version' && 
                                            coluna != 'anonymization_user_id' && 
                                            coluna != 'anonymization_date'">
                                                <div v-if="valor[coluna] != 'null' && coluna != 'Status'"
                                                    style="white-space: nowrap;">
                                                    {{valor[coluna]}}
                                                </div>
                                                <span style="white-space: nowrap;" v-if="coluna == 'Status'"
                                                    class="label filter-status-label w-100" :class="{
                                                        'label-success' : valor[coluna] == 'Aberta',
                                                        'label-default' : valor[coluna] == 'Finalizada',
                                                        'label-warning' : valor[coluna] == 'Cancelada'
                                                    }">
                                                    {{valor[coluna]}}
                                                </span>
                                            </td>
                                        </template>
                                    </tr>
                                </tbody>
                                <tfoot>
                                </tfoot>
                            </table>
                            <div id="area-nav-button" class="text-right fs-md-margin-bottom" style="display: none;">
                                <button class="btn btn-default" data-nav-prev=""> &lt;&lt; </button>
                                <button class="btn btn-default" data-nav-next="" disabled=""> &gt;&gt; </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</div>

<script>
    const { createApp, ref } = Vue

    const consulta_solicitacoes = createApp({
        mounted() {
            this.buscaProcessos();
            this.buscaUsuariosDs();
            document.addEventListener('mousedown', (event) => {
                if (!event.target.closest('#listaFlut')) {
                    this.listaVer = false
                    this.listaVerUsr = false
                    this.formBuscaProcesso.campos.forEach((e, index) => {
                        this.formBuscaProcesso.campos[index].listaVerTab = false
                        this.formBuscaProcesso.campos[index].listaVerCampos = false
                    })
                }
            })
        },
        data() {
            return {
                title: 'Busca avançada de solicitações Fluig',
                loading: FLUIGC.loading('#MyWidget_${instanceId}'),
                processos: [],
                tabelas: [],
                campos: [],
                buscaProcesso: '',
                semProcesso: false,
                buscaTabela: '',
                buscaCampos: '',
                buscaUsuarios: '',
                dadosFiltroProcessos: [],
                dadosFiltroTabelas: [],
                dadosFiltroCampos: [],
                dadosFiltroUsuarios: [],
                listaVer: false,
                listaVerUsr: false,
                listaVerTab: [],
                usuarios: [],
                submitButton: '',
                listaVerCampos: [],
                dadosPai: [],
                formBuscaProcesso: {
                    responsavel: '',
                    responsavelId: '',
                    company: 1,
                    processo: '',
                    codProcesso: '',
                    dataInicio: new Date(new Date().setMonth(new Date().getMonth() - 1)).toJSON().substring(0, 10),
                    dataFim: new Date().toJSON().substring(0, 10),
                    fluigInicio: 0,
                    fluigFim: 999999,
                    aberta: '',
                    finalizada: '',
                    cancelada: '',
                    tabela: {
                        TABELA: '',
                        NOME: ''
                    },
                    campos: []
                }
            }
        },
        methods: {
            focus() {
                this.$nextTick(() => {
                    // This callback will only be called after the
                    // DOM has been updated
                    this.$refs.campoBusca.focus()
                });

            },
            formataData(dateIni) {
                var tam = dateIni.length;
                if (tam == 0 || tam < 7)
                    return ""

                if ((dateIni).toString().indexOf("-") > 0 && dateIni.indexOf(":") == -1) {
                    dateIni = dateIni + " 00:00:0000";
                }

                var date = new Date(dateIni);
                var mes = "";
                if (date.getMonth() == 0) mes = "Jan";
                if (date.getMonth() == 1) mes = "Fev";
                if (date.getMonth() == 2) mes = "Mar";
                if (date.getMonth() == 3) mes = "Abr";
                if (date.getMonth() == 4) mes = "Mai";
                if (date.getMonth() == 5) mes = "Jun";
                if (date.getMonth() == 6) mes = "Jul";
                if (date.getMonth() == 7) mes = "Ago";
                if (date.getMonth() == 8) mes = "Set";
                if (date.getMonth() == 9) mes = "Out";
                if (date.getMonth() == 10) mes = "Nov";
                if (date.getMonth() == 11) mes = "Dez";

                let diaFim = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
                let mesFim = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);

                if (tam == 7) {
                    return mes + '/' + date.getFullYear();
                }

                return diaFim + "/" + mesFim + "/" + date.getFullYear();
            },
            async buscaProcessos() {
                this.semProcesso = false
                this.loading.show();
                await axios.post(
                    WCMAPI.serverURL + '/api/public/ecm/dataset/datasets/',
                    {
                        name: 'ds_fluig_bs_processos',
                        fields: null,
                        constraints: [{
                            _field: "",
                            _initialValue: "",
                            _finalValue: "",
                            _type: 0,
                            _likeSearch: false
                        }],
                        order: null
                    },
                    {
                        headers: { 'Content-Type': 'application/json; charset=utf-8' }
                    }
                ).then((response) => {
                    if (response.data.content.columns && response.data.content.values)
                        this.processos = response.data.content.values

                    this.loading.hide();
                    this.buscaNodoPocesso()
                }).catch((error) => {
                    this.loading.hide();
                    FLUIGC.modal({
                        title: 'Erro',
                        content: error.response.data.message,
                        id: 'fluig-modal',
                        actions: [{
                            'label': 'Close',
                            'autoClose': true
                        }]
                    }, function (err, data) {
                        if (err) {
                            // do error handling
                        } else {
                            // do something with data
                        }
                    })
                });
            },
            async buscaTabelas() {
                this.loading.show();
                await axios.post(
                    WCMAPI.serverURL + '/api/public/ecm/dataset/datasets/',
                    {
                        name: 'ds_fluig_bs_tabelas_processos',
                        fields: null,
                        constraints: [{
                            _field: "codProcesso",
                            _initialValue: this.formBuscaProcesso.codProcesso,
                            _finalValue: "",
                            _type: 0,
                            _likeSearch: false
                        }],
                        order: null
                    },
                    {
                        headers: { 'Content-Type': 'application/json; charset=utf-8' }
                    }
                ).then((response) => {
                    if (response.data.content.columns && response.data.content.values)
                        this.tabelas = response.data.content.values

                    this.loading.hide();
                    this.buscaNodoTabelas()
                }).catch((error) => {
                    this.loading.hide();
                    FLUIGC.modal({
                        title: 'Erro',
                        content: error.response.data.message,
                        id: 'fluig-modal',
                        actions: [{
                            'label': 'Close',
                            'autoClose': true
                        }]
                    }, function (err, data) {
                        if (err) {
                            // do error handling
                        } else {
                            // do something with data
                        }
                    })
                });
            },
            async buscaFCampos(index) {
                this.loading.show();
                await axios.post(
                    WCMAPI.serverURL + '/api/public/ecm/dataset/datasets/',
                    {
                        name: 'ds_fluig_bs_tabelas_campos',
                        fields: null,
                        constraints: [{
                            _field: "tabela",
                            _initialValue: this.formBuscaProcesso.campos[index].tabela,
                            _finalValue: "",
                            _type: 0,
                            _likeSearch: false
                        }],
                        order: null
                    },
                    {
                        headers: { 'Content-Type': 'application/json; charset=utf-8' }
                    }
                ).then((response) => {
                    if (response.data.content.columns && response.data.content.values)
                        this.campos = response.data.content.values

                    this.loading.hide();
                    this.buscaNodoCampos()
                }).catch((error) => {
                    this.loading.hide();
                    FLUIGC.modal({
                        title: 'Erro',
                        content: error.response.data.message,
                        id: 'fluig-modal',
                        actions: [{
                            'label': 'Close',
                            'autoClose': true
                        }]
                    }, function (err, data) {
                        if (err) {
                            // do error handling
                        } else {
                            // do something with data
                        }
                    })
                });
            },
            async buscaUsuariosDs() {
                this.loading.show();

                await axios.post(
                    WCMAPI.serverURL + '/api/public/ecm/dataset/datasets/',
                    {
                        name: 'colleague',
                        fields: null,
                        constraints: [{
                            _field: "active",
                            _initialValue: true,
                            _finalValue: true,
                            _type: 0,
                            _likeSearch: false
                        }],
                        order: null
                    },
                    {
                        headers: { 'Content-Type': 'application/json; charset=utf-8' }
                    }
                ).then((response) => {
                    if (response.data.content.columns && response.data.content.values)
                        this.usuarios = response.data.content.values

                    this.loading.hide();
                    this.buscaNodousuarios()
                }).catch((error) => {
                    this.loading.hide();
                    FLUIGC.modal({
                        title: 'Erro',
                        content: "Erro não localizado. Entre em contato com o TI",
                        id: 'fluig-modal',
                        actions: [{
                            'label': 'Close',
                            'autoClose': true
                        }]
                    }, function (err, data) {
                        if (err) {
                            // do error handling
                        } else {
                            // do something with data
                        }
                    })
                });
            },
            async buscaDadosPai(geraExcel = null) {
                this.semProcesso = false
                this.loading.show();

                if (geraExcel != null) {
                    FLUIGC.toast({
                        title: '',
                        message: 'Exportação iniciada! Assim que finalizado, você será notificado por e-mail.',
                        type: 'success'
                    });
                    this.loading.hide();
                    this.buscaNodoPocesso()
                }

                await axios.post(
                    WCMAPI.serverURL + '/api/public/ecm/dataset/datasets/',
                    {
                        name: 'ds_fluig_bs_consulta_pai',
                        fields: null,
                        constraints: [{
                            _field: "tabela",
                            _initialValue: this.tabelas[0].TABELA,
                            _finalValue: "",
                            _type: 0,
                            _likeSearch: false
                        }, {
                            _field: "fluigInicio",
                            _initialValue: this.formBuscaProcesso.fluigInicio,
                            _finalValue: "",
                            _type: 0,
                            _likeSearch: false
                        }, {
                            _field: "fluigFim",
                            _initialValue: this.formBuscaProcesso.fluigFim,
                            _finalValue: "",
                            _type: 0,
                            _likeSearch: false
                        }, {
                            _field: "dataInicio",
                            _initialValue: this.formBuscaProcesso.dataInicio,
                            _finalValue: "",
                            _type: 0,
                            _likeSearch: false
                        }, {
                            _field: "dataFim",
                            _initialValue: this.formBuscaProcesso.dataFim,
                            _finalValue: "",
                            _type: 0,
                            _likeSearch: false
                        }, {
                            _field: "aberta",
                            _initialValue: this.formBuscaProcesso.aberta,
                            _finalValue: "",
                            _type: 0,
                            _likeSearch: false
                        }, {
                            _field: "finalizada",
                            _initialValue: this.formBuscaProcesso.finalizada,
                            _finalValue: "",
                            _type: 0,
                            _likeSearch: false
                        }, {
                            _field: "cancelada",
                            _initialValue: this.formBuscaProcesso.cancelada,
                            _finalValue: "",
                            _type: 0,
                            _likeSearch: false
                        }, {
                            _field: "responsavel",
                            _initialValue: this.formBuscaProcesso.responsavelId,
                            _finalValue: "",
                            _type: 0,
                            _likeSearch: false
                        }, {
                            _field: "consultaCampo",
                            _initialValue: JSON.stringify(this.formBuscaProcesso.campos),
                            _finalValue: "",
                            _type: 0,
                            _likeSearch: false
                        }, {
                            _field: "gerarExcel",
                            _initialValue: geraExcel,
                            _finalValue: "",
                            _type: 0,
                            _likeSearch: false
                        }],
                        order: null
                    },
                    {
                        headers: { 'Content-Type': 'application/json; charset=utf-8' }
                    }
                ).then((response) => {
                    if (response.data.content.columns && response.data.content.values)
                        this.dadosPai = response.data.content

                    this.loading.hide();
                    this.buscaNodoPocesso()
                }).catch((error) => {
                    this.loading.hide();
                    FLUIGC.modal({
                        title: 'Erro',
                        content: error.response.data.message,
                        id: 'fluig-modal',
                        actions: [{
                            'label': 'Close',
                            'autoClose': true
                        }]
                    }, function (err, data) {
                        if (err) {
                            // do error handling
                        } else {
                            // do something with data
                        }
                    })
                });
            },
            buscaNodoPocesso() {
                this.semProcesso = false
                this.dadosFiltroProcessos = [];
                this.processos.filter((item, index) => {
                    if (item.DES_DEF_PROCES.toUpperCase().indexOf(this.buscaProcesso.toUpperCase()) >= 0) {
                        this.dadosFiltroProcessos.push(item)
                    }
                });
            },
            buscaNodoTabelas() {
                this.dadosFiltroTabelas = [];
                this.tabelas.filter((item, index) => {
                    if (item.NOME.toUpperCase().indexOf(this.buscaTabela.toUpperCase()) >= 0) {
                        this.dadosFiltroTabelas.push(item)
                    }
                });
            },
            buscaNodoCampos() {
                this.dadosFiltroCampos = [];
                this.campos.filter((item, index) => {
                    if (item.CAMPO.toUpperCase().indexOf(this.buscaCampos.toUpperCase()) >= 0) {
                        this.dadosFiltroCampos.push(item)
                    }
                });
            },
            buscaNodousuarios() {
                this.dadosFiltroUsuarios = [];
                this.usuarios.filter((item, index) => {
                    if (item.colleagueName.toUpperCase().indexOf(this.buscaUsuarios.toUpperCase()) >= 0) {
                        this.dadosFiltroUsuarios.push(item)
                    }
                });
            },
            escolheSetor(item) {
                this.dadosPai = []
                this.semProcesso = false
                this.formBuscaProcesso.campos = []
                this.listaVer = false;
                this.buscaProcesso = '';
                this.formBuscaProcesso.processo = item.DES_DEF_PROCES;
                this.formBuscaProcesso.codProcesso = item.COD_DEF_PROCES;
                this.buscaNodoPocesso();
                this.buscaTabelas();
            },
            escolheTabela(item, index) {
                this.formBuscaProcesso.campos[index].listaVerTab = false;
                this.buscaTabela = '';
                this.formBuscaProcesso.campos[index].campo = '';
                this.formBuscaProcesso.campos[index].tabelaNome = item.NOME;
                this.formBuscaProcesso.campos[index].tabela = item.TABELA;
                this.buscaNodoPocesso();
                this.buscaFCampos(index);
            },
            escolheCampo(item, index) {
                this.formBuscaProcesso.campos[index].listaVerCampos = false;
                this.buscaCampos = '';
                this.formBuscaProcesso.campos[index].campo = item.CAMPO;
                this.buscaNodoCampos();
            },
            escolheUsuario(item) {
                this.buscaUsuarios = ''
                this.formBuscaProcesso.responsavel = item.colleagueName
                this.formBuscaProcesso.responsavelId = item['colleaguePK.colleagueId']
                this.buscaNodousuarios()
                this.listaVerUsr = false
            },
            addCampo() {
                if (this.formBuscaProcesso.processo != '') {
                    this.formBuscaProcesso.campos.push({
                        tabelaNome: '',
                        tabela: '',
                        campo: '',
                        busca: '',
                        listaVerTab: false,
                        listaVerCampos: false
                    });
                } else {
                    FLUIGC.modal({
                        title: 'Erro',
                        content: 'Precisa selecionar um processo',
                        id: 'fluig-modal',
                        actions: [{
                            'label': 'Close',
                            'autoClose': true
                        }]
                    }, function (err, data) {
                        if (err) {
                            // do error handling
                        } else {
                            // do something with data
                        }
                    })
                }
            },
            abrirFormulario(id, fluig, obj) {
                var arrayDados = ''
                axios.post(
                    WCMAPI.serverURL + '/api/public/ecm/dataset/datasets/',
                    {
                        name: 'ds_fluig_bs_hist_processos',
                        fields: null,
                        constraints: [{
                            _field: "processo",
                            _initialValue: fluig,
                            _finalValue: "",
                            _type: 0,
                            _likeSearch: false
                        }],
                        order: null
                    },
                    { headers: { 'Content-Type': 'application/json; charset=utf-8' } }
                ).then((response) => {
                    if (response.data.content.columns && response.data.content.values)
                        response.data.content.values.forEach((dado) => {
                            arrayDados += `<li class="list-group-item">
                                            <div class="row">
                                            <div class="col-md-3">
                                                <b>Responsável:</b> ` + dado.NOME + `
                                            </div>
                                            <div class="col-md-2">
                                                <b>Status:</b> ` + dado.STATUS + `
                                            </div>
                                            <div class="col-md-2">
                                                <b>Inicio:</b> ` + dado.STARTDATE + `
                                            </div>
                                            <div class="col-md-2">
                                                <b>Fim:</b> ` + dado.ENDDATE + `
                                            </div>
                                            <div class="col-md-2">
                                                <b>Atraso:</b> ` + dado.EM_ATRASO + `
                                            </div>
                                            <div class="col-md-12">
                                                <b>Obs:</b> ` + dado.OBSERVACAO + `
                                            </div>
                                            </div>
                                        </li>`
                        })

                    FLUIGC.modal({
                        title: 'Solicitação ' + fluig,
                        content: `<ul class="nav nav-tabs" role="tablist">
                                <li class="active"><a href="#formulario" role="tab" data-toggle="tab">Formulário</a></li>
                                <li><a href="#historico" role="tab" data-toggle="tab">Histórico</a></li>
                                <li><a href="` + WCMAPI.serverURL + `/portal/p/1/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=` + fluig + `" target="_blank">
                                    Ir para o formulário</a>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane active" id="formulario">
                                    <iframe width="100%" height="850px" 
                                        src="` + WCMAPI.serverURL + `/webdesk/streamcontrol/0/` + id + `/` + obj.version + `/?WDCompanyId=1&WKNumProces=` + fluig + `&WDNrVersao=` + obj.version + `&WDCompanyId=1&WDNrDocto=` + obj.documentid + `" 
                                        frameborder="0">
                                    </iframe>    
                                </div>
                                <div class="tab-pane" id="historico">
                                    <div class="row">
                                        <div class="col-xs-12">
                                            <ul class="list-group">
                                            `+ arrayDados + `
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>`,
                        id: 'fluig-modal',
                        size: 'full',
                        actions: [{
                            'label': 'Fechar',
                            'autoClose': true
                        }]
                    }, function (err, data) {
                        if (err) {
                            // do error handling
                        } else {
                            // do something with data
                        }
                    });

                }).catch((error) => {
                    FLUIGC.modal({
                        title: 'Erro',
                        content: error.response.data.message,
                        id: 'fluig-modal',
                        actions: [{
                            'label': 'Close',
                            'autoClose': true
                        }]
                    }, function (err, data) {
                        if (err) {
                            // do error handling
                        } else {
                            // do something with data
                        }
                    })
                });

            }
        }
    })
    consulta_solicitacoes.mount('#MyWidget_${instanceId}');
</script>