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
    log.info("<--- ds_fluig_bs_tabelas_campos--->");

    var jndiName = "java:/jdbc/FluigDSRO";
    var tabela = buscaConstraints(constraints, 'tabela', 'initial');

    try {
        var sql = "SELECT COLUMN_NAME as CAMPO " +
            " FROM INFORMATION_SCHEMA.COLUMNS " +
            " WHERE TABLE_NAME = '" + tabela + "' " +
            " AND ORDINAL_POSITION > 8";

        log.info("<--- ds_fluig_bs_tabelas_campos--->");
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
        log.info('<--- buscaConstraints ds_fluig_bs_tabelas_campos--->')
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