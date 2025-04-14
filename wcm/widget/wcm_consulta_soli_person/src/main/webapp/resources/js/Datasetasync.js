var DatasetAsync = {

    createContraint: function (field = null, initialValue = null, finalValue = null, type = 0, likeSearch = false) {
        return {
            _field: field,
            _initialValue: initialValue,
            _finalValue: finalValue,
            _type: type,
            _likeSearch: likeSearch
        }
    },
    consult: async function (dataset, contraints = null, fields = null, order = null) {
        var load = FLUIGC.loading(window);
        load.show();

        var retorno = null;

        await axios.post('/api/public/ecm/dataset/datasets/',
            {
                name: dataset,
                fields: fields,
                constraints: contraints,
                order: order
            },
            {
                headers: { 'Content-Type': 'application/json; charset=utf-8' }
            }
        ).then((response) => {
            load.hide()
            retorno = response.data.content;
        }).catch(function (error) {
            load.hide()
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
        load.hide();

        return retorno;
    }
}