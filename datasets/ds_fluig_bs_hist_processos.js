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
    log.info("<--- ds_fluig_bs_hist_processos--->");

    var jndiName = "java:/jdbc/FluigDSRO";
    var processo = buscaConstraints(constraints, 'processo', 'initial');


    try {
        var sql = " SELECT " +
            "     NUM_PROCES as FLUIG, " +
            "     CD_MATRICULA as MATRICULA, " +
            "     DSL_OBS_TAR AS OBSERVACAO, " +
            "     CASE " +
            "         TAR_PROCES.IDI_STATUS " +
            "         WHEN 0 THEN 'Não completada' " +
            "         WHEN 1 THEN 'Pendente de consenso' " +
            "         WHEN 2 THEN 'Concluída' " +
            "         WHEN 3 THEN 'Transferida' " +
            "         WHEN 4 THEN 'Cancelada' " +
            "         ELSE '' " +
            "     END AS 'STATUS', " +
            "     CASE " +
            "         WHEN TAR_PROCES.END_DATE > TAR_PROCES.DEADLINE " +
            "         OR ( " +
            "             TAR_PROCES.END_DATE IS NULL " +
            "             AND GETDATE() > TAR_PROCES.DEADLINE " +
            "         ) THEN 'Sim' " +
            "         ELSE 'Não' " +
            "     END AS 'EM_ATRASO', " +
            "     FDN_USER.FULL_NAME AS 'NOME', " +
            "     CONVERT(VARCHAR, TAR_PROCES.START_DATE, 103) + ' ' + CONVERT(VARCHAR, TAR_PROCES.START_DATE, 108) AS 'STARTDATE', " +
            "     CONVERT(VARCHAR, TAR_PROCES.END_DATE, 103) + ' ' + CONVERT(VARCHAR, TAR_PROCES.END_DATE, 108) AS 'ENDDATE' " +
            " from " +
            "     TAR_PROCES WITH (NOLOCK) " +
            "     LEFT JOIN FDN_USERTENANT WITH (NOLOCK) ON FDN_USERTENANT.TENANT_ID = 1 " +
            "     AND FDN_USERTENANT.USER_CODE = TAR_PROCES.CD_MATRICULA " +
            "     LEFT JOIN FDN_USER WITH (NOLOCK) ON FDN_USER.USER_ID = FDN_USERTENANT.USER_ID " +
            " WHERE " +
            "     NUM_PROCES = '" + processo + "' " +
            " ORDER BY " +
            "     NUM_SEQ_MOVTO ";


        log.info("<--- ds_fluig_bs_hist_processos--->");
        log.info("<--- CONSULTA SQL--->" + sql);

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