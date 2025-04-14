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
    log.info("<--- ds_fluig_bs_processos--->");

    var codusuario = getValue("WKUser");
    var jndiName = "java:/jdbc/FluigDSRO";
    var constraints = [];
    var sortingFields = [];
    var fields = [];
    var usuario = '';

    try {
        constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", codusuario, codusuario, ConstraintType.MUST));
        var datasetUser = DatasetFactory.getDataset("colleague", fields, constraints, sortingFields);
        usuario = datasetUser.getValue(0, "login");

        log.info("<--- ds_fluig_bs_processos | usuario: " + usuario + " |--->");

    } catch (erro) {

    }

    try {
        var sql = " SELECT " +
            "     DEF_PROCES.COD_DEF_PROCES, " +
            "     DEF_PROCES.DES_DEF_PROCES, " +
            "     DEF_PROCES.COD_CATEG " +
            " FROM " +
            "     DEF_PROCES " +
            " WHERE " +
            "     DEF_PROCES.LOG_ATIV = 1 " +
            "     AND DEF_PROCES.COD_DEF_PROCES NOT IN ('FLUIGADHOC', 'FLUIGADHOCPROCESS') " +
            "     AND DEF_PROCES.IDI_FREQ_SNAPSHOT = 0 " +
            "     AND ( " +
            "         ( " +
            "             SELECT " +
            "                 COUNT(*) " +
            "             FROM " +
            "                 FDN_USERROLE " +
            "             WHERE " +
            "                 ROLE_CODE = 'admin' " +
            "                 AND LOGIN = '" + usuario + "' " +
            "         ) > 0 " +
            "         OR DEF_PROCES.COD_DEF_PROCES IN ( " +
            "             SELECT " +
            "                 TT_DEF_PROCES_PERMISS.COD_DEF_PROCES " +
            "             FROM " +
            "                 ( " +
            "                     SELECT " +
            "                         TT_DEF_PROCES.COD_DEF_PROCES " +
            "                     FROM " +
            "                         DEF_PROCES " +
            "                         INNER JOIN ( " +
            "                             SELECT " +
            "                                 COD_DEF_PROCES AS 'COD_DEF_PROCES', " +
            "                                 CASE " +
            "                                     WHEN DEF_PROCES.COD_MECAN_ATRIBUIC_GESTOR = 'Usuário' THEN 'User' " +
            "                                     WHEN DEF_PROCES.COD_MECAN_ATRIBUIC_GESTOR = 'Papel' THEN 'Role' " +
            "                                     WHEN DEF_PROCES.COD_MECAN_ATRIBUIC_GESTOR = 'Grupo' THEN 'Group' " +
            "                                     ELSE NULL " +
            "                                 END AS 'COD_TIPO_GESTOR' " +
            "                             FROM " +
            "                                 DEF_PROCES " +
            "                         ) AS TT_DEF_PROCES ON TT_DEF_PROCES.COD_DEF_PROCES = DEF_PROCES.COD_DEF_PROCES " +
            "                         LEFT JOIN FDN_GROUPUSERROLE ON FDN_GROUPUSERROLE.GROUP_CODE = SUBSTRING( " +
            "                             DSL_CONFIGUR_MECAN_GEST, " +
            "                             CHARINDEX( " +
            "                                 '<' + TT_DEF_PROCES.COD_TIPO_GESTOR + '>', " +
            "                                 DSL_CONFIGUR_MECAN_GEST " +
            "                             ) + LEN('<' + TT_DEF_PROCES.COD_TIPO_GESTOR + '>'), " +
            "                             CHARINDEX( " +
            "                                 '</' + TT_DEF_PROCES.COD_TIPO_GESTOR + '>', " +
            "                                 DSL_CONFIGUR_MECAN_GEST " +
            "                             ) - CHARINDEX( " +
            "                                 '<' + TT_DEF_PROCES.COD_TIPO_GESTOR + '>', " +
            "                                 DSL_CONFIGUR_MECAN_GEST " +
            "                             ) - LEN('</' + TT_DEF_PROCES.COD_TIPO_GESTOR + '') " +
            "                         ) " +
            "                         LEFT JOIN FDN_USERROLE ON FDN_USERROLE.ROLE_CODE = SUBSTRING( " +
            "                             DSL_CONFIGUR_MECAN_GEST, " +
            "                             CHARINDEX( " +
            "                                 '<' + TT_DEF_PROCES.COD_TIPO_GESTOR + '>', " +
            "                                 DSL_CONFIGUR_MECAN_GEST " +
            "                             ) + LEN('<' + TT_DEF_PROCES.COD_TIPO_GESTOR + '>'), " +
            "                             CHARINDEX( " +
            "                                 '</' + TT_DEF_PROCES.COD_TIPO_GESTOR + '>', " +
            "                                 DSL_CONFIGUR_MECAN_GEST " +
            "                             ) - CHARINDEX( " +
            "                                 '<' + TT_DEF_PROCES.COD_TIPO_GESTOR + '>', " +
            "                                 DSL_CONFIGUR_MECAN_GEST " +
            "                             ) - LEN('</' + TT_DEF_PROCES.COD_TIPO_GESTOR + '') " +
            "                         ) " +
            "                         LEFT JOIN FDN_USERTENANT ON FDN_USERTENANT.USER_CODE = SUBSTRING( " +
            "                             DSL_CONFIGUR_MECAN_GEST, " +
            "                             CHARINDEX( " +
            "                                 '<' + TT_DEF_PROCES.COD_TIPO_GESTOR + '>', " +
            "                                 DSL_CONFIGUR_MECAN_GEST " +
            "                             ) + LEN('<' + TT_DEF_PROCES.COD_TIPO_GESTOR + '>'), " +
            "                             CHARINDEX( " +
            "                                 '</' + TT_DEF_PROCES.COD_TIPO_GESTOR + '>', " +
            "                                 DSL_CONFIGUR_MECAN_GEST " +
            "                             ) - CHARINDEX( " +
            "                                 '<' + TT_DEF_PROCES.COD_TIPO_GESTOR + '>', " +
            "                                 DSL_CONFIGUR_MECAN_GEST " +
            "                             ) - LEN('</' + TT_DEF_PROCES.COD_TIPO_GESTOR + '') " +
            "                         ) " +
            "                         LEFT JOIN FDN_GROUPUSERROLE GUR_CHILD_N1 ON GUR_CHILD_N1.GROUP_CODE = FDN_GROUPUSERROLE.CHILD_GROUPCODE " +
            "                         LEFT JOIN FDN_GROUPUSERROLE GUR_CHILD_N2 ON GUR_CHILD_N2.GROUP_CODE = GUR_CHILD_N1.CHILD_GROUPCODE " +
            "                         LEFT JOIN FDN_GROUPUSERROLE GUR_CHILD_N3 ON GUR_CHILD_N3.GROUP_CODE = GUR_CHILD_N2.CHILD_GROUPCODE " +
            "                     WHERE " +
            "                         COALESCE( " +
            "                             FDN_GROUPUSERROLE.LOGIN, " +
            "                             FDN_USERROLE.LOGIN, " +
            "                             FDN_USERTENANT.LOGIN, " +
            "                             GUR_CHILD_N1.LOGIN, " +
            "                             GUR_CHILD_N2.LOGIN, " +
            "                             GUR_CHILD_N3.LOGIN " +
            "                         ) = '" + usuario + "' " +
            "                     UNION " +
            "                     ALL " +
            "                     SELECT " +
            "                         SUBSTRING( " +
            "                             FDN_RESOURCE.RESOURCE_CODE, " +
            "                             5, " +
            "                             LEN(FDN_RESOURCE.RESOURCE_CODE) " +
            "                         ) AS 'COD_DEF_PROCES' " +
            "                     FROM " +
            "                         FDN_RESOURCE " +
            "                         INNER JOIN FDN_PERMISSION ON FDN_PERMISSION.RESOURCE_ID = FDN_RESOURCE.RESOURCE_ID " +
            "                         AND FDN_PERMISSION.TENANT_ID = FDN_RESOURCE.TENANT_ID " +
            "                         LEFT JOIN FDN_GROUPUSERROLE ON FDN_GROUPUSERROLE.GROUP_CODE = FDN_PERMISSION.GROUP_CODE " +
            "                         LEFT JOIN FDN_GROUPUSERROLE GUR_CHILD_N1 ON GUR_CHILD_N1.GROUP_CODE = FDN_GROUPUSERROLE.CHILD_GROUPCODE " +
            "                         LEFT JOIN FDN_GROUPUSERROLE GUR_CHILD_N2 ON GUR_CHILD_N2.GROUP_CODE = GUR_CHILD_N1.CHILD_GROUPCODE " +
            "                         LEFT JOIN FDN_GROUPUSERROLE GUR_CHILD_N3 ON GUR_CHILD_N3.GROUP_CODE = GUR_CHILD_N2.CHILD_GROUPCODE " +
            "                     WHERE " +
            "                         FDN_RESOURCE.RESOURCE_CODE LIKE 'bpm.%' " +
            "                         AND FDN_RESOURCE.RESOURCE_TYPE_ID = 45 " +
            "                         AND FDN_PERMISSION.PERMISSION = 'bpmProcessView' " +
            "                         AND (FDN_PERMISSION.LOGIN IS NULL) " +
            "                         AND (FDN_PERMISSION.ROLE_CODE IS NULL) " +
            "                         AND COALESCE( " +
            "                             FDN_GROUPUSERROLE.LOGIN, " +
            "                             GUR_CHILD_N1.LOGIN, " +
            "                             GUR_CHILD_N2.LOGIN, " +
            "                             GUR_CHILD_N3.LOGIN " +
            "                         ) = '" + usuario + "' " +
            "                     UNION " +
            "                     ALL " +
            "                     SELECT " +
            "                         PROCES_WORKFLOW.COD_DEF_PROCES " +
            "                     FROM " +
            "                         PROCES_WORKFLOW " +
            "                         INNER JOIN TAR_PROCES ON TAR_PROCES.COD_EMPRESA = PROCES_WORKFLOW.COD_EMPRESA " +
            "                         AND PROCES_WORKFLOW.NUM_PROCES = TAR_PROCES.NUM_PROCES " +
            "                         INNER JOIN FDN_USERTENANT ON FDN_USERTENANT.TENANT_ID = 1 " +
            "                         AND FDN_USERTENANT.USER_CODE = TAR_PROCES.CD_MATRICULA " +
            "                     WHERE " +
            "                         TAR_PROCES.CD_MATRICULA <> 'System:Auto' " +
            "                         AND PROCES_WORKFLOW.COD_DEF_PROCES NOT IN ('FLUIGADHOC', 'FLUIGADHOCPROCESS') " +
            "                         AND FDN_USERTENANT.LOGIN = '" + usuario + "' " +
            "                 ) TT_DEF_PROCES_PERMISS " +
            "         ) " +
            "     ) " +
            " ORDER BY " +
            "     DEF_PROCES.COD_CATEG, " +
            "     DEF_PROCES.DES_DEF_PROCES ";

        log.info("<--- ds_fluig_bs_processos--->");
        log.info("<--- CONSULTA SQL--->" + sql);

        var dsBusca = DatasetFactory.getDataset("dsSQL", new Array(sql, jndiName), null, null);
    } catch (e) {
        throw e.message;
    }

    return dsBusca;

} function onMobileSync(user) {

}