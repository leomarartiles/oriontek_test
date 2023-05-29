toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": 300,
    "hideDuration": 1000,
    "timeOut": 5000,
    "extendedTimeOut": 1000,
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };

var builFormInput=function(formFields,formFieldsData=null){
    return new Promise(function(resolve, reject){
        let formHTML=''; 
        // console.log('ddasd', formFieldsData);
        formHTML +=`<div class="row mb-3">`;
        formFields.forEach((thisField,index,array) => {
            let form_field_value=''; 
            let form_field_required='';
            let form_field_validation='';
            let form_field_checked='';
            let form_field_radio_checked='';
            if(formFieldsData != null){ 
                form_field_value=formFieldsData[thisField.field_id];
            }
            if( thisField.field_validation){ form_field_validation=thisField.field_validation;}
            if( thisField.field_is_required ===true){ form_field_required=' required ';}
            if( thisField.field_type =='hidden' ){
                formHTML +=`<input class="form-control" type="${thisField.field_type}" value="${form_field_value}" placeholder="${thisField.field_label}" id="${thisField.field_id}" name="${thisField.field_id}">`;
            }else if( thisField.field_type =='section' ){
                formHTML +=`<div class="col-md-12 text-center form-section-title">`;
                formHTML +=`<h4 class="card-title mt-1 mb-1 ">${thisField.field_label}</h4>`;
                formHTML +=`</div>`;
            }else{
                formHTML +=`<div class="col-md-6">`;
                    formHTML +=`<div class="row mb-1">`;
                        if( thisField.field_type !='checkbox' ){  //&& thisField.field_type != 'radiobox'
                            if( thisField.field_type != 'radiobox'){
                                formHTML +=`<label for="${thisField.field_id}" class="col-sm-3 col-form-label">${thisField.field_label}</label>`; 
                                formHTML +=`<div class="col-sm-9">`;    
                            }else{
                                formHTML +=`<label for="${thisField.field_id}" class="col-sm-12 col-form-label">${thisField.field_label}</label>`; 
                                formHTML +=`<div class="col-sm-12">`;
                            }
                            
                        }else{
                            formHTML +=`<div class="col-sm-1">`;
                        }
                        
                        switch (thisField.field_type) {
                            case 'text': case 'tel': case 'email': case 'number':
                                formHTML +=`<input ${form_field_validation} ${form_field_required} class="form-control" type="${thisField.field_type}" value="${form_field_value}" placeholder="${thisField.field_label}" id="${thisField.field_id}" name="${thisField.field_id}">`;
                                break;
                            case 'password':
                                formHTML +=`<input ${form_field_required} class="form-control form-input-password" type="${thisField.field_type}" value="${form_field_value}" placeholder="${thisField.field_label}" id="${thisField.field_id}2" name="${thisField.field_id}2">`;
                                formHTML +=`<input ${form_field_validation} ${form_field_required} class="form-control form-input-password form-input-password-confirm" type="${thisField.field_type}" value="${form_field_value}" placeholder="Confirmar ${thisField.field_label}" id="${thisField.field_id}" name="${thisField.field_id}">`;
                                break;
                            case 'textarea':
                                formHTML +=`<textarea ${form_field_validation} ${form_field_required} class="form-control" type="${thisField.field_type}" placeholder="${thisField.field_label}" id="${thisField.field_id}" name="${thisField.field_id}">${form_field_value}</textarea>`;
                                break;
                            case 'radiobox':
                                if(thisField.field_options){
                                    
                                    thisField.field_options.forEach(thisOpts => {
                                        form_field_radio_checked=''; 
                                        if(form_field_value == thisOpts.value){ form_field_radio_checked=` checked `; }
                                        formHTML +=`<div class="form-group-inline">`;
                                            formHTML +=`<input ${form_field_radio_checked} value="${thisOpts.value}" class="form-check-input input-radio-group" type="radio" id="${thisField.field_id}_${thisOpts.value}" name="${thisField.field_id}">`;
                                            formHTML +=`<label class="form-check-label col-sm-10" for="${thisField.field_id}_${thisOpts.value}">${thisOpts.text}</label>`;
                                        formHTML +=`</div>`;
                                    });
                                }
                                // formHTML +=``;
                                break;
                            case 'checkbox':
                                if(form_field_value ==1){ form_field_checked=` checked `; }
                                formHTML +=`<input ${form_field_checked} value="1" class="form-check-input" type="checkbox" id="${thisField.field_id}" name="${thisField.field_id}">`;
                                break;
                            case 'select':
                                    let optsSelected='',isMulti='',isMultiClass='',isMultiSelector=false;
                                    if(thisField.field_is_multi){
                                        if(thisField.field_is_multi == true){
                                            isMulti=' multiple="multiple"';
                                            isMultiClass='select2 select2-multiple';
                                            isMultiSelector=true;
                                        }
                                    }
                                    
                                    formHTML +=`<select ${isMulti} ${form_field_validation} ${form_field_required} id="${thisField.field_id}" name="${thisField.field_id}" class="form-select${isMultiClass}" aria-label="${thisField.field_label}">`;
                                    if(thisField.field_options){
                                        formHTML +=`<option value="">---</option>`;
                                        thisField.field_options.forEach(thisOpts => {
                                            if(thisOpts.value == form_field_value){ optsSelected=' selected '; }
                                            if(isMultiSelector === true){ optsSelected=''; console.log('isMultiSelector',isMultiSelector,' --> ',thisField.field_id); }
                                            formHTML +=`<option ${optsSelected} value="${thisOpts.value}">${thisOpts.text}</option>`;
                                            optsSelected='';
                                        });
                                    }
                                    formHTML +=`</select>`;
                                    break;
                            default:
                                break;
                        }
                        formHTML +=`</div>`;
                        if( thisField.field_type =='checkbox' ){ //|| thisField.field_type == 'radiobox'
                            formHTML +=`<label for="${thisField.field_id}" class="col-sm-9 form-check-label">${thisField.field_label}</label>`; 
                        }
                        
                    formHTML +=`</div>`;
                formHTML +=`</div>`;
            }
            if (index === array.length - 1) { 
                formHTML +=`</div>`;
                resolve(formHTML); 
            }
        });
    });
    // formHTML +=`</div>`;
    // return formHTML;
}
var buildFormValidation=function(){
    var forms = document.getElementsByClassName('needs-validation');
    
    var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }
        form.classList.add('was-validated');
    }, false);
    });
}
$(document).on('click','.form-submenu-left li',function(){
    let getFormId = $(this).attr('ref-form'),parentId = $(this).attr('ref-parent'),parentContentId = $(this).attr('ref-content');

        $(`.${parentId} li`).removeClass('active');
        $(`.${parentContentId}`).removeClass('active');
        $(this).addClass('active');
        $('#'+getFormId).addClass('active');
});

let SetdataTableLanguage={
    "processing": "Procesando...",
    "lengthMenu": "Mostrar _MENU_ registros",
    "zeroRecords": "No se encontraron resultados",
    "emptyTable": "Ningún dato disponible en esta tabla",
    "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "infoFiltered": "(filtrado de un total de _MAX_ registros)",
    "search": "Buscar:",
    "infoThousands": ",",
    "loadingRecords": "Cargando...",
    "paginate": {
        "first": "Primero",
        "last": "Último",
        "next": "Siguiente",
        "previous": "Anterior"
    },
    "aria": {
        "sortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sortDescending": ": Activar para ordenar la columna de manera descendente"
    },
    "buttons": {
        "copy": "Copiar",
        "colvis": "Visibilidad",
        "collection": "Colección",
        "colvisRestore": "Restaurar visibilidad",
        "copyKeys": "Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br \/> <br \/> Para cancelar, haga clic en este mensaje o presione escape.",
        "copySuccess": {
            "1": "Copiada 1 fila al portapapeles",
            "_": "Copiadas %ds fila al portapapeles"
        },
        "copyTitle": "Copiar al portapapeles",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Mostrar todas las filas",
            "_": "Mostrar %d filas"
        },
        "pdf": "PDF",
        "print": "Imprimir",
        "renameState": "Cambiar nombre",
        "updateState": "Actualizar",
        "createState": "Crear Estado",
        "removeAllStates": "Remover Estados",
        "removeState": "Remover",
        "savedStates": "Estados Guardados",
        "stateRestore": "Estado %d"
    },
    "autoFill": {
        "cancel": "Cancelar",
        "fill": "Rellene todas las celdas con <i>%d<\/i>",
        "fillHorizontal": "Rellenar celdas horizontalmente",
        "fillVertical": "Rellenar celdas verticalmentemente"
    },
    "decimal": ",",
    "searchBuilder": {
        "add": "Añadir condición",
        "button": {
            "0": "Constructor de búsqueda",
            "_": "Constructor de búsqueda (%d)"
        },
        "clearAll": "Borrar todo",
        "condition": "Condición",
        "conditions": {
            "date": {
                "after": "Despues",
                "before": "Antes",
                "between": "Entre",
                "empty": "Vacío",
                "equals": "Igual a",
                "notBetween": "No entre",
                "notEmpty": "No Vacio",
                "not": "Diferente de"
            },
            "number": {
                "between": "Entre",
                "empty": "Vacio",
                "equals": "Igual a",
                "gt": "Mayor a",
                "gte": "Mayor o igual a",
                "lt": "Menor que",
                "lte": "Menor o igual que",
                "notBetween": "No entre",
                "notEmpty": "No vacío",
                "not": "Diferente de"
            },
            "string": {
                "contains": "Contiene",
                "empty": "Vacío",
                "endsWith": "Termina en",
                "equals": "Igual a",
                "notEmpty": "No Vacio",
                "startsWith": "Empieza con",
                "not": "Diferente de",
                "notContains": "No Contiene",
                "notStarts": "No empieza con",
                "notEnds": "No termina con"
            },
            "array": {
                "not": "Diferente de",
                "equals": "Igual",
                "empty": "Vacío",
                "contains": "Contiene",
                "notEmpty": "No Vacío",
                "without": "Sin"
            }
        },
        "data": "Data",
        "deleteTitle": "Eliminar regla de filtrado",
        "leftTitle": "Criterios anulados",
        "logicAnd": "Y",
        "logicOr": "O",
        "rightTitle": "Criterios de sangría",
        "title": {
            "0": "Constructor de búsqueda",
            "_": "Constructor de búsqueda (%d)"
        },
        "value": "Valor"
    },
    "searchPanes": {
        "clearMessage": "Borrar todo",
        "collapse": {
            "0": "Paneles de búsqueda",
            "_": "Paneles de búsqueda (%d)"
        },
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "Sin paneles de búsqueda",
        "loadMessage": "Cargando paneles de búsqueda",
        "title": "Filtros Activos - %d",
        "showMessage": "Mostrar Todo",
        "collapseMessage": "Colapsar Todo"
    },
    "select": {
        "cells": {
            "1": "1 celda seleccionada",
            "_": "%d celdas seleccionadas"
        },
        "columns": {
            "1": "1 columna seleccionada",
            "_": "%d columnas seleccionadas"
        },
        "rows": {
            "1": "1 fila seleccionada",
            "_": "%d filas seleccionadas"
        }
    },
    "thousands": ".",
    "datetime": {
        "previous": "Anterior",
        "next": "Proximo",
        "hours": "Horas",
        "minutes": "Minutos",
        "seconds": "Segundos",
        "unknown": "-",
        "amPm": [
            "AM",
            "PM"
        ],
        "months": {
            "0": "Enero",
            "1": "Febrero",
            "10": "Noviembre",
            "11": "Diciembre",
            "2": "Marzo",
            "3": "Abril",
            "4": "Mayo",
            "5": "Junio",
            "6": "Julio",
            "7": "Agosto",
            "8": "Septiembre",
            "9": "Octubre"
        },
        "weekdays": [
            "Dom",
            "Lun",
            "Mar",
            "Mie",
            "Jue",
            "Vie",
            "Sab"
        ]
    },
    "editor": {
        "close": "Cerrar",
        "create": {
            "button": "Nuevo",
            "title": "Crear Nuevo Registro",
            "submit": "Crear"
        },
        "edit": {
            "button": "Editar",
            "title": "Editar Registro",
            "submit": "Actualizar"
        },
        "remove": {
            "button": "Eliminar",
            "title": "Eliminar Registro",
            "submit": "Eliminar",
            "confirm": {
                "_": "¿Está seguro que desea eliminar %d filas?",
                "1": "¿Está seguro que desea eliminar 1 fila?"
            }
        },
        "error": {
            "system": "Ha ocurrido un error en el sistema (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\">Más información&lt;\\\/a&gt;).<\/a>"
        },
        "multi": {
            "title": "Múltiples Valores",
            "info": "Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.",
            "restore": "Deshacer Cambios",
            "noMulti": "Este registro puede ser editado individualmente, pero no como parte de un grupo."
        }
    },
    "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
    "stateRestore": {
        "creationModal": {
            "button": "Crear",
            "name": "Nombre:",
            "order": "Clasificación",
            "paging": "Paginación",
            "search": "Busqueda",
            "select": "Seleccionar",
            "columns": {
                "search": "Búsqueda de Columna",
                "visible": "Visibilidad de Columna"
            },
            "title": "Crear Nuevo Estado",
            "toggleLabel": "Incluir:"
        },
        "emptyError": "El nombre no puede estar vacio",
        "removeConfirm": "¿Seguro que quiere eliminar este %s?",
        "removeError": "Error al eliminar el registro",
        "removeJoiner": "y",
        "removeSubmit": "Eliminar",
        "renameButton": "Cambiar Nombre",
        "renameLabel": "Nuevo nombre para %s",
        "duplicateError": "Ya existe un Estado con este nombre.",
        "emptyStates": "No hay Estados guardados",
        "removeTitle": "Remover Estado",
        "renameTitle": "Cambiar Nombre Estado"
    }
};
let getFormData=function(formId){
    let myForm = document.getElementById(formId); 
    let formData = new FormData(myForm);
    const data = {}; 
    for (let [key, val] of formData.entries()) {
        Object.assign(data, {[key]: val})
    }
    return data;
}
var app_fields_data={
    companies:[],
    clients:[],
};

var getAppFieldsDT=function(){
    return new Promise(function(resolve, reject){
        var settings = {
            "url": '/app-fields',
            "method": "GET",
            "timeout": 0,
            "headers": { "Content-Type": "application/json" },
        };
        
        $.ajax(settings).done(function (response) {
            if (response) {
                app_fields_data.companies=response.data.companies;
                app_fields_data.clients=response.data.clients;
                resolve(); 
                console.log(response);
            }
        });
    });
}

var appRenderSelect2=function(form_select){
    $(form_select).select2();
}
// getAppFieldsDT();

class FormAppHelper {

    constructor(a,b,c) {}
  
    static getStatus = function(setStatus){
        if(setStatus == 0){
            return 'Inactivo';
        }else{
            return 'Activo';
        }
    }
    static fillCompaniesListByID=function(record_id,form_select,optionSelected){
        return new Promise(function(resolve, reject){
            var settings = {
                "url": '/vehicle/cia/list',
                "method": "POST",
                "timeout": 0,
                "headers": { "Content-Type": "application/json" },
                "data": JSON.stringify({ "record_id": record_id }),
            };
    
            $.ajax(settings).done(function (response) {
                if (response.data) {
                    $(form_select).empty();
                    $(form_select).append($('<option>', {value:'', text:'---'}));
                    response.data.forEach((thisSection,index,array) => {
                    $(form_select).append($('<option>', {value:thisSection.value, text:thisSection.text}));
                    if (index === array.length - 1) { 
                        $(form_select).select2();
                        if( optionSelected != 0){ 
                        if( optionSelected != null){
                            let strOptionsGroups = optionSelected.split(',');
                            $(form_select).select2().val(strOptionsGroups).trigger('change');
                        }
                        }
                        resolve(); 
                    }
                    });
                }else{
                    $(form_select).select2();
                    resolve(); 
                }
            });
        });
    }
    

    static fillCompaniesList=function(form_select,optionSelected){
        return new Promise(function(resolve, reject){
                $(form_select).empty();
                $(form_select).append($('<option>', {value:'', text:'---'}));
                app_fields_data.companies.forEach((thisSection,index,array) => {
                    $(form_select).append($('<option>', {value:thisSection.id_reg, text:thisSection.cia_name}));
                    if (index === array.length - 1) { 
                        $(form_select).select2();
                        if( optionSelected != 0){ 
                        if( optionSelected != null){
                            let strOptionsGroups = optionSelected.split(',');
                            $(form_select).select2().val(strOptionsGroups).trigger('change');
                        }
                        }
                        resolve(); 
                    }
                });
        });
    }
    static fillClientsList=function(form_select,optionSelected){
        return new Promise(function(resolve, reject){
                $(form_select).empty();
                $(form_select).append($('<option>', {value:'', text:'---'}));
                app_fields_data.clients.forEach((thisSection,index,array) => {
                    $(form_select).append($('<option>', {value:thisSection.id_reg, text:thisSection.client_name}));
                    if (index === array.length - 1) { 
                        $(form_select).select2();
                        if( optionSelected != 0){ 
                        if( optionSelected != null){
                            let strOptionsGroups = optionSelected.split(',');
                            $(form_select).select2().val(strOptionsGroups).trigger('change');
                        }
                        }
                        resolve(); 
                    }
                });
        });
    }

    static selectCompany=function(optionSelected){
        let ciaReturn = '';
        return new Promise(function(resolve, reject){
            app_fields_data.companies.forEach((thisSection,index,array) => {
                if( thisSection.id_reg == optionSelected){ 
                    ciaReturn = thisSection.cia_name; 
                }
                if (index === array.length - 1) { 
                    resolve(ciaReturn);
                    
                }
            });
        });
    }

    static selectClient=function(optionSelected){
        let ciaReturn = ''; 
        return new Promise(function(resolve, reject){
            app_fields_data.clients.forEach((thisSection,index,array) => {
                if( thisSection.id_reg == optionSelected){ 
                    ciaReturn = thisSection.client_name; 
                }
                if (index === array.length - 1) { 
                    resolve(ciaReturn);
                }
            });
        });
    }

    static isOkPass(p){
        var anUpperCase = /[A-Z]/;
        var aLowerCase = /[a-z]/; 
        var aNumber = /[0-9]/;
        var aSpecial = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
        var obj = {};
        obj.result = true;
    
        if(p.length < 8){
            obj.result=false;
            obj.error="Muy pocos caracteres!"
            return obj;
        }
    
        var numUpper = 0;
        var numLower = 0;
        var numNums = 0;
        var numSpecials = 0;
        for(var i=0; i<p.length; i++){
            if(anUpperCase.test(p[i]))
                numUpper++;
            else if(aLowerCase.test(p[i]))
                numLower++;
            else if(aNumber.test(p[i]))
                numNums++;
            else if(aSpecial.test(p[i]))
                numSpecials++;
        }
        
        // if(numUpper < 2 || numLower < 2 || numNums < 2 || numSpecials <1){
        //     obj.result=false;
        //     obj.error="Contraseña poco compleja!";
        //     return obj;
        // }
        return obj;
    }
}