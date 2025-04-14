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
    log.info("<--- ds_fluig_sql_excel_email --->");
    var dataset = DatasetBuilder.newDataset();
    dataset.addColumn("RETORNO");
    var retorno = '';
    var sql = buscaConstraints(constraints, 'sql', 'initial');
    var codUsuario = buscaConstraints(constraints, 'codUsuario', 'initial');
    var alertService = fluigAPI.getAlertService();



    if (!codUsuario) throw 'ERRO - O usuário é obrigatório';

    var dsColleague = DatasetFactory.getDataset('colleague', null, [
        DatasetFactory.createConstraint('colleaguePK.colleagueId', codUsuario, codUsuario, ConstraintType.MUST)
    ], null);

    log.info("<--- ds_fluig_sql_excel_email Retorno do usuário --->");
    log.dir(dsColleague);
    log.log(dsColleague.rowsCount);

    if (dsColleague.rowsCount == 0) throw 'ERRO - Usuário não encontrado';
    if (!sql) throw 'ERRO - A query é obrigatório';

    var email = dsColleague.getValue(0, 'mail');

    try {
        var calendar = java.util.Calendar.getInstance();
        var file = java.lang.System.getProperty('jboss.server.temp.dir') + '/' + calendar.get(5) + calendar.get(2) + calendar.get(1) + '_export.xls';
        var fileOutput = new java.io.FileOutputStream(new java.io.File(file));
        var workbook = new org.apache.poi.hssf.usermodel.HSSFWorkbook();
        var Planilha = workbook.createSheet('Export');
        var jndiName = "java:/jdbc/FluigDSRO";

        var dsBusca = DatasetFactory.getDataset("dsSQL", new Array(sql, jndiName), null, null);
        log.info("<--- ds_fluig_sql_excel_email QUERY--->");
        log.dir(dsBusca);

        Planilha.createRow(0);

        for (var col = 0; col < dsBusca.columnsCount; col++) {
            Planilha.getRow(0).createCell(col).setCellValue(dsBusca.columnsName[col])
        }

        for (var values = 0; values < dsBusca.rowsCount; values++) {
            Planilha.createRow(values + 1);

            for (var col = 0; col < dsBusca.columnsCount; col++) {
                Planilha.getRow(values + 1).createCell(col).setCellValue(dsBusca.getValue(values, dsBusca.columnsName[col]));
            }
        }

        workbook.write(fileOutput);
        fileOutput.close();

        log.info('<--- ds_fluig_sql_excel_email filePath: ' + file + ' --->');

        var enviaEmail = sendEmail(email, new java.io.File(file));

        if (enviaEmail != 'OK') {
            retorno = 'Erro ao enviar o e-mail, ' + enviaEmail;
        } else {
            retorno = 'E-mail enviado com sucesso.';
        }
    }
    catch (e) {
        log.info('<--- ds_fluig_sql_excel_email Cai em erro --->');
        log.dir(e)
        dataset.addRow([e.message]);

        var objeto = new com.totvs.technology.foundation.alert.GenericAlertObject(
            -1,
            "PROCESS_SEARCH_ERROR",
            "exportação com erro, contate a equipe de TI.",
            null,
            null,
            null
        );

        alertService.sendNotification(
            "PROCESS_SEARCH_ERROR",
            null,
            dsColleague.getValue(0, 'login'),
            objeto,
            null,
            null,
            null
        );
    }
    dataset.addRow([retorno]);
    return dataset;

} function onMobileSync(user) {

}
function buscaConstraints(constraints, campo, value) {
    if (constraints != null) {
        log.info('<--- buscaConstraints ds_fluig_sql_excel_email--->')
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

function sendEmail(email, attach) {

    var retorno = 'OK';

    try {

        //define parâmetros de envio do e-mail
        var servidorMail = 'cloud77.mailgrid.net.br';
        var portaMail = '587';
        var authMail = 'true';  //true para autenticar usuário e senha, senão false
        var usuarioMail = 'teste@email.com';
        var senhaMail = '123';

        var mailSender = 'teste@email.com'; //remetente
        var assuntoMail = 'Seu relatório de consulta de processos já está pronto';
        var mensagemMail = 'Olá!'
            + '<br><br>'
            + 'O relatório de consulta de processos solicitado já está pronto.';

        //cria a sessão de e-mail
        var props = new java.util.Properties();
        props.put('mail.transport.protocol', 'smtp');
        props.put('mail.smtp.host', servidorMail);
        props.put('mail.smtp.port', portaMail);
        props.put('mail.smtp.auth', authMail);

        var session = javax.mail.Session.getInstance(props, null);
        var message = new javax.mail.internet.MimeMessage(session);
        var multipart = new javax.mail.internet.MimeMultipart();

        //define o assunto do e-mail	    
        message.setSubject(assuntoMail);

        //define corpo da mensagem	
        var body = new javax.mail.internet.MimeBodyPart();
        body.setContent(mensagemMail, ('text/html; charset=UTF-8'));
        multipart.addBodyPart(body);

        //adiciona anexos
        var fileDataSource = new javax.activation.FileDataSource(attach);
        var attachment = new javax.mail.internet.MimeBodyPart();
        attachment.setDataHandler(new javax.activation.DataHandler(fileDataSource));
        attachment.setFileName(fileDataSource.getName());
        multipart.addBodyPart(attachment);

        //adiciona destinatário
        message.addRecipients(
            javax.mail.Message.RecipientType.TO,
            new javax.mail.internet.InternetAddress(email)
        );

        //salva definições de e-mail
        message.setFrom(new javax.mail.internet.InternetAddress(mailSender));
        message.setContent(multipart);
        message.saveChanges();

        log.info('<--- ds_fluig_sql_excel_email saveChanges --->');

        try {

            //envia mensagem
            var transport = session.getTransport('smtp');

            log.info('<--- ds_fluig_sql_excel_email before connect --->');
            log.dir(transport);

            if (authMail == 'true') {
                transport.connect(servidorMail, usuarioMail, senhaMail);
            } else {
                transport.connect();
            }

            log.info('<--- ds_fluig_sql_excel_email after connect --->');

            transport.sendMessage(message, message.getAllRecipients());	//envia mensagem        
            log.info('<--- ds_fluig_sql_excel_email sendMessage --->');
            log.info('<--- ds_fluig_sql_excel_email Email eviado com sucesso --->');

            var alertService = fluigAPI.getAlertService();

            var objeto = new com.totvs.technology.foundation.alert.GenericAlertObject(
                -1,
                "PROCESS_SEARCH_RESULT_PUBLISHED",
                "Arquivo disponível no seu email.",
                null,
                null,
                null
            );

            alertService.sendNotification(
                "PROCESS_SEARCH_RESULT_PUBLISHED",
                null,
                dsColleague.getValue(0, 'login'),
                objeto,
                null,
                null,
                null
            );
        } catch (e) {
            log.info('<--- ds_fluig_sql_excel_email error ERRO AO EVIAR O EMAIL --->');
            log.dir(e);

            var objeto = new com.totvs.technology.foundation.alert.GenericAlertObject(
                -1,
                "PROCESS_SEARCH_ERROR",
                "exportação com erro, contate a equipe de TI.",
                null,
                null,
                null
            );

            alertService.sendNotification(
                "PROCESS_SEARCH_ERROR",
                null,
                dsColleague.getValue(0, 'login'),
                objeto,
                null,
                null,
                null
            );

            retorno = e.message;
        }
        finally {

            //fecha a sessão
            transport.close();
        }
    }
    catch (e) {

        var objeto = new com.totvs.technology.foundation.alert.GenericAlertObject(
            -1,
            "PROCESS_SEARCH_ERROR",
            "exportação com erro, contate a equipe de TI.",
            null,
            null,
            null
        );

        alertService.sendNotification(
            "PROCESS_SEARCH_ERROR",
            null,
            dsColleague.getValue(0, 'login'),
            objeto,
            null,
            null,
            null
        );

        retorno = e.message;
    }

    return retorno;
}