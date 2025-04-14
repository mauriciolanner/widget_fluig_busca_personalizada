/*
Mauricio Lanner - 2024
Desenvolvido por Mauricio Freitas
mauriciolanner@gmail.com
*/

function defineStructure() {

}
function onSync(lastSyncDate) {

}
function createDataset(fields, constraints, sortFields) {
    log.info("<--- ds_fluig_bs_consulta_pai--->");

    var jndiName = "java:/jdbc/FluigDSRO";
    var tabela = buscaConstraints(constraints, 'tabela', 'initial');
    var fluigInicio = buscaConstraints(constraints, 'fluigInicio', 'initial');
    var fluigFim = buscaConstraints(constraints, 'fluigFim', 'initial');
    var dataInicio = buscaConstraints(constraints, 'dataInicio', 'initial');
    var dataFim = buscaConstraints(constraints, 'dataFim', 'initial');
    var aberta = buscaConstraints(constraints, 'aberta', 'initial');
    var finalizada = buscaConstraints(constraints, 'finalizada', 'initial');
    var cancelada = buscaConstraints(constraints, 'cancelada', 'initial');
    var responsavel = buscaConstraints(constraints, 'responsavel', 'initial');
    var consultaCampo = buscaConstraints(constraints, 'consultaCampo', 'initial');
    var status = '';
    var gerarExcel = buscaConstraints(constraints, 'gerarExcel', 'initial');
    var codUsuario = getValue("WKUser");

    log.info('consultaCampo')
    log.dir(JSON.parse(consultaCampo))

    if (consultaCampo)
        consultaCampo = verificaTabelasFilho(JSON.parse(consultaCampo));



    if (aberta == 'true') status += '0'
    if (finalizada == 'true') {
        if (status == '')
            status += '2'
        else
            status += ',2'
    }
    if (cancelada == 'true') {
        if (status == '')
            status += '1'
        else
            status += ',1'
    }
    //var tabela = 'ML001095'

    try {
        var sql = " SELECT " +
            "   PROCES_WORKFLOW.NUM_PROCES AS 'Solicitação', " +
            "   CONVERT(VARCHAR(10), PROCES_WORKFLOW.START_DATE, 103) AS 'Início', " +
            "   CONVERT(VARCHAR(10), PROCES_WORKFLOW.END_DATE, 103) AS 'Finalização', " +
            "   coalesce(" +
            "       CONVERT(VARCHAR(10), PROCES_WORKFLOW.DEADLINE_DATE, 103)," +
            "       'Sem prazo definido'" +
            "   ) as Prazo," +
            "   CASE " +
            "     WHEN PROCES_WORKFLOW.STATUS = 0 THEN 'Aberta' " +
            "     WHEN PROCES_WORKFLOW.STATUS = 1 THEN 'Cancelada' " +
            "     WHEN PROCES_WORKFLOW.STATUS = 2 THEN 'Finalizada' " +
            "     ELSE '' " +
            "   END AS 'Status', " +
            "   ESTADO_PROCES.DES_ESTADO AS 'Atividade', " +
            "   CASE " +
            "     WHEN FDN_USER.FULL_NAME IS NULL THEN 'SEM RESPONSÁVEL' " +
            "     WHEN FDN_USER.FULL_NAME = 'System:Auto' THEN 'USUÁRIO DO SISTEMA' " +
            "     ELSE UPPER(FDN_USER.FULL_NAME) " +
            "   END AS 'Responsável', " +
            "   TP.* ";

        if (consultaCampo) sql += consultaCampo.camposRetorno;

        sql += " FROM " +
            "   PROCES_WORKFLOW WITH (NOLOCK) " +
            "   LEFT JOIN ( " +
            "     SELECT " +
            "       HISTOR_PROCES.COD_EMPRESA, " +
            "       HISTOR_PROCES.NUM_PROCES, " +
            "       HISTOR_PROCES.NUM_SEQ_ESTADO, " +
            "       HISTOR_PROCES.NUM_SEQ_MOVTO " +
            "     FROM " +
            "       HISTOR_PROCES WITH (NOLOCK) " +
            "     WHERE " +
            "       NUM_SEQ_MOVTO = ( " +
            "         SELECT " +
            "           MAX(NUM_SEQ_MOVTO) " +
            "         FROM " +
            "           HISTOR_PROCES HP WITH (NOLOCK) " +
            "         WHERE " +
            "           HP.COD_EMPRESA = HISTOR_PROCES.COD_EMPRESA " +
            "           AND HP.NUM_PROCES = HISTOR_PROCES.NUM_PROCES " +
            "       ) " +
            "   ) TT_HISTOR_PROCES ON TT_HISTOR_PROCES.COD_EMPRESA = PROCES_WORKFLOW.COD_EMPRESA " +
            "   AND TT_HISTOR_PROCES.NUM_PROCES = PROCES_WORKFLOW.NUM_PROCES " +
            "   LEFT JOIN ESTADO_PROCES WITH (NOLOCK) ON ESTADO_PROCES.COD_EMPRESA = PROCES_WORKFLOW.COD_EMPRESA " +
            "   AND ESTADO_PROCES.COD_DEF_PROCES = PROCES_WORKFLOW.COD_DEF_PROCES " +
            "   AND ESTADO_PROCES.NUM_VERS = PROCES_WORKFLOW.NUM_VERS " +
            "   AND ESTADO_PROCES.NUM_SEQ = TT_HISTOR_PROCES.NUM_SEQ_ESTADO " +
            "   LEFT JOIN ( " +
            "     SELECT " +
            "       TAR_PROCES.COD_EMPRESA, " +
            "       TAR_PROCES.NUM_PROCES, " +
            "       TAR_PROCES.NUM_SEQ_MOVTO, " +
            "       TAR_PROCES.CD_MATRICULA " +
            "     FROM " +
            "       TAR_PROCES WITH (NOLOCK) " +
            "     WHERE " +
            "       ASSIGN_START_DATE = ( " +
            "         SELECT " +
            "           MAX(ASSIGN_START_DATE) " +
            "         FROM " +
            "           TAR_PROCES TP WITH (NOLOCK) " +
            "         WHERE " +
            "           TP.COD_EMPRESA = TAR_PROCES.COD_EMPRESA " +
            "           AND TP.NUM_PROCES = TAR_PROCES.NUM_PROCES " +
            "           AND TP.NUM_SEQ_MOVTO = TAR_PROCES.NUM_SEQ_MOVTO " +
            "       ) " +
            "   ) TT_TAR_PROCES ON TT_TAR_PROCES.COD_EMPRESA = PROCES_WORKFLOW.COD_EMPRESA " +
            "   AND TT_TAR_PROCES.NUM_PROCES = PROCES_WORKFLOW.NUM_PROCES " +
            "   AND TT_TAR_PROCES.NUM_SEQ_MOVTO = TT_HISTOR_PROCES.NUM_SEQ_MOVTO " +
            "   LEFT JOIN FDN_USERTENANT WITH (NOLOCK) ON FDN_USERTENANT.TENANT_ID = TT_TAR_PROCES.COD_EMPRESA " +
            "   AND FDN_USERTENANT.USER_CODE = TT_TAR_PROCES.CD_MATRICULA " +
            "   LEFT JOIN FDN_USER WITH (NOLOCK) ON FDN_USER.USER_ID = FDN_USERTENANT.USER_ID " +
            "   INNER JOIN " + tabela + " TP ON TP.documentid = PROCES_WORKFLOW.NR_DOCUMENTO_CARD " +
            "   INNER JOIN DOCUMENTO ON ( " +
            "     DOCUMENTO.NR_DOCUMENTO = TP.documentid " +
            "     AND DOCUMENTO.NR_VERSAO = TP.version " +
            "     AND DOCUMENTO.VERSAO_ATIVA = 1 " +
            "   )";

        if (consultaCampo) sql += consultaCampo.tabelasJoin;

        sql += "WHERE (1 = 1) ";

        if (fluigInicio) sql += " AND PROCES_WORKFLOW.NUM_PROCES >= " + fluigInicio + " ";

        if (fluigFim) sql += " AND PROCES_WORKFLOW.NUM_PROCES <= " + fluigFim + " ";

        if (dataInicio) sql += " AND PROCES_WORKFLOW.START_DATE >= '" + dataInicio + " 00:00:00.0000000' ";

        if (dataFim) sql += " AND PROCES_WORKFLOW.START_DATE <= '" + dataFim + " 23:59:59.5140000' ";

        if (responsavel) sql += "  AND FDN_USERTENANT.USER_CODE = '" + responsavel + "' ";

        if (status != '') sql += " AND PROCES_WORKFLOW.STATUS in (" + status + ") ";

        if (consultaCampo) sql += consultaCampo.buscaCampos;

        sql += " ORDER BY  PROCES_WORKFLOW.NUM_PROCES ";

        log.info("<--- ds_fluig_bs_consulta_pai--->");
        log.info("<--- CONSULTA SQL--->" + sql);

        log.info("gerarExcel: " + gerarExcel);

        if (gerarExcel == "true") {
            DatasetFactory.getDataset("ds_fluig_sql_excel_email", null, [
                DatasetFactory.createConstraint("sql", sql, null, ConstraintType.MUST),
                DatasetFactory.createConstraint("codUsuario", codUsuario, null, ConstraintType.MUST)
            ], null);
        }

        var dsBusca = DatasetFactory.getDataset("dsSQL", new Array(sql, jndiName), null, null);

    } catch (e) {
        throw e.message;
    }

    return dsBusca;

} function onMobileSync(user) {

}

function montaConsulta(objeto) {
    var consulta = ''
    for (var i = 0; objeto.length > i; i++) {
        if (objeto[i].tabelaNome == 'Principal') consulta += " AND TP." + objeto[i].campo + " LIKE '%" + objeto[i].busca + "%' "
        else consulta += " AND TF." + objeto[i].campo + " LIKE '%" + objeto[i].busca + "%' "
    }

    return consulta;
}

function verificaTabelasFilho(objeto) {
    var tabelas = [];
    var campos = [];
    var camposRetorno = ' ';
    var tabelasJoin = ' ';
    var buscaCampos = ' ';
    var jndiName = "java:/jdbc/FluigDSRO";

    for (var i = 0; objeto.length > i; i++) {
        if (objeto[i].tabelaNome == 'Principal') buscaCampos += " AND TP." + objeto[i].campo + " LIKE '%" + objeto[i].busca + "%' "


        if (tabelas.indexOf(objeto[i].tabela) == -1) {
            campos = [];

            tabelas.push(objeto[i].tabela)

            if (objeto[i].tabelaNome != 'Principal') {
                tabelasJoin += " JOIN " + objeto[i].tabela + " TF" + i + " ON (TF" + i + ".documentid = TP.documentid AND TF" + i + ".version = TP.version) "

                var buscaCamposOriginais = "select 'TF" + i + ".' + column_name + ' as " + objeto[i].tabelaNome + "_' + column_name  as coluna from Information_Schema.columns where table_name = '" + objeto[i].tabela + "' " +
                    " and column_name not in ('ID','documentid', 'companyid', 'cardid', 'version', 'anonymization_date', 'masterid', 'anonymization_user_id')"

                log.info("buscaCamposOriginais")
                log.info(buscaCamposOriginais)

                var dsBuscaCampos = DatasetFactory.getDataset("dsSQL", new Array(buscaCamposOriginais, jndiName), null, null);


                for (var ii = 0; dsBuscaCampos.rowsCount > ii; ii++) {
                    camposRetorno += " , " + dsBuscaCampos.getValue(ii, 'coluna')
                }


            }

            for (var ii = 0; objeto.length > ii; ii++) {
                if (objeto[i].tabela == objeto[ii].tabela) {
                    campos.push(objeto[ii].campo)
                    if (objeto[i].tabelaNome != 'Principal')
                        buscaCampos += " AND TF" + i + "." + objeto[ii].campo + " LIKE '%" + objeto[ii].busca + "%' "
                }
            }
        }
    }


    return {
        camposRetorno: camposRetorno,
        tabelasJoin: tabelasJoin,
        buscaCampos: buscaCampos
    }
}

function buscaConstraints(constraints, campo, value) {

    if (constraints != null) {
        log.info('<--- buscaConstraints--->')
        log.dir(constraints)
        for (var i = 0; i < constraints.length; i++) {
            if (constraints[i].initialValue != '' && constraints[i].initialValue != null && constraints[i].fieldName == campo) {
                if (value == 'initial')
                    return constraints[i].initialValue;
                if (value == 'final') {
                    return constraints[i].finalValue;
                }
            }
        }
    }

    return null;
}