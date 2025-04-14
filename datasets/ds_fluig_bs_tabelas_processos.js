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
    log.info("<--- ds_fluig_bs_tabelas_processos--->");

    var jndiName = "java:/jdbc/FluigDSRO";
    var codProcesso = buscaConstraints(constraints, 'codProcesso', 'initial');

    try {

        var sql = "SELECT TOP 1 ISNULL( " +
            "            CASE " +
            "                WHEN META_LISTA_REL.COD_LISTA_PAI IS NULL THEN 'ML001' + REPLICATE('0', 3 - LEN(DOCUMENTO.COD_LISTA)) + CONVERT(VARCHAR(10), DOCUMENTO.COD_LISTA) " +
            "                ELSE 'ML001' + REPLICATE('0', 3 - LEN(META_LISTA_REL.COD_LISTA_PAI)) + CONVERT(VARCHAR(10), META_LISTA_REL.COD_LISTA_PAI) " +
            "            END, " +
            "            '' " +
            "        ) AS 'TABELA', " +
            "        'Principal' as NOME " +
            "        FROM " +
            "        DEF_PROCES " +
            "        LEFT JOIN VERS_DEF_PROCES ON VERS_DEF_PROCES.COD_DEF_PROCES = DEF_PROCES.COD_DEF_PROCES " +
            "        AND VERS_DEF_PROCES.LOG_ATIV = 1 " +
            "        LEFT JOIN DOCUMENTO ON DOCUMENTO.NR_DOCUMENTO = VERS_DEF_PROCES.NUM_PASTA_FORM " +
            "        AND DOCUMENTO.VERSAO_ATIVA = 1 " +
            "        LEFT JOIN SERV_DATASET ON SERV_DATASET.COD_DATASET = DOCUMENTO.NM_DATASET " +
            "        LEFT JOIN META_LISTA_REL ON META_LISTA_REL.COD_LISTA_PAI = DOCUMENTO.COD_LISTA " +
            "    WHERE " +
            "        DEF_PROCES.COD_DEF_PROCES = '" + codProcesso + "' " +
            "        AND DOCUMENTO.COD_LISTA > 0 " +
            "     " +
            "    union " +
            "     " +
            "    SELECT " +
            "        ISNULL( " +
            "            'ML001' + REPLICATE('0', 3 - LEN(META_LISTA_REL.COD_LISTA_FILHO)) + CONVERT(VARCHAR(10), META_LISTA_REL.COD_LISTA_FILHO), " +
            "            '' " +
            "        ) AS 'TABELA', " +
            "        META_LISTA_REL.COD_TABELA as NOME " +
            "    FROM " +
            "        DEF_PROCES " +
            "        LEFT JOIN VERS_DEF_PROCES ON VERS_DEF_PROCES.COD_DEF_PROCES = DEF_PROCES.COD_DEF_PROCES " +
            "        AND VERS_DEF_PROCES.LOG_ATIV = 1 " +
            "        LEFT JOIN DOCUMENTO ON DOCUMENTO.NR_DOCUMENTO = VERS_DEF_PROCES.NUM_PASTA_FORM " +
            "        AND DOCUMENTO.VERSAO_ATIVA = 1 " +
            "        LEFT JOIN SERV_DATASET ON SERV_DATASET.COD_DATASET = DOCUMENTO.NM_DATASET " +
            "        LEFT JOIN META_LISTA_REL ON META_LISTA_REL.COD_LISTA_PAI = DOCUMENTO.COD_LISTA " +
            "    WHERE " +
            "        DEF_PROCES.COD_DEF_PROCES = '" + codProcesso + "' " +
            "        AND DOCUMENTO.COD_LISTA > 0 AND META_LISTA_REL.COD_TABELA IS NOT NULL  ";

        log.info("<--- ds_fluig_bs_tabelas_processos--->");
        log.info("<--- CONSULTA SQL--->" + sql);

        var dsBusca = DatasetFactory.getDataset("dsSQL", new Array(sql, jndiName), null, null);
    } catch (e) {
        throw e.message;
    }

    return dsBusca;

} function onMobileSync(user) {

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