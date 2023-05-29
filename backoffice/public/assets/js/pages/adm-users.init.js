/*
Template Name: Nazox -  Admin & Dashboard Template
Author: Themesdesign
Contact: themesdesign.in@gmail.com
File: Datatables Js File
*/

$(document).ready(function() {

  let formFieldEdit,formFieldDataEdit;
  let formFieldsAddValidation;
  let formFieldsEditValidation;
  var groupFieldUsers = function(){
    this.formfieldUser=
      [
          {
            field_label: 'id',
            field_placeholder: 'id',
            field_type: 'hidden',
            field_id: 'id',
            name: 'id',
            customClass:'col-md-4',
            field_value:""
          },
          {
            field_label: 'Email',
            field_placeholder: 'Email',
            field_type: 'text',
            field_id: 'user_email',
            field_name: 'user_email',
            field_is_required:true,
            field_validation:` parsley-type="email" `,
            customClass:'col-md-4',
            field_value:""
          },
          {
            field_label: 'Contraseña',
            field_placeholder: 'Contraseña',
            field_type: 'password',
            field_id: 'user_password',
            field_name: 'user_password',
            field_is_required:true,
            field_validation:` data-parsley-equalto="#user_password2" `,
            customClass:'col-md-4',
            field_value:""
          },
          {
            field_label: 'Nombre',
            field_placeholder: 'Nombre',
            field_type: 'text',
            field_id: 'user_first_name',
            field_name: 'user_first_name',
            field_is_required:true,
            // field_validation:` data-parsley-type="alphanum"  `,
            customClass:'col-md-4',
            field_value:""
          },
          {
            field_label: 'Apellidos',
            field_placeholder: 'Apellidos',
            field_type: 'text',
            field_id: 'user_last_name',
            field_name: 'user_last_name',
            field_is_required:true,
            // field_validation:` data-parsley-type="alphanum"  `,
            customClass:'col-md-4',
            field_value:""
          },
          {
            field_type: 'select',
            field_label: 'Perfil',
            field_placeholder: 'Perfil',
            field_id: 'user_profile',
            field_name: 'user_profile',
            customClass:'col-md-2',
            field_is_required:true,
            field_options: [
                {value:20,text:'SuperAdmin'},
                {value:1,text:'Administrador'},
                {value:2,text:'Empresa'},
                {value:3,text:'Supervisor'},
                {value:4,text:'Operador'},
                {value:5,text:'Cobros'},
                {value:6,text:'Gerencia'}
              ],
            field_value:""
          },
          {
            field_type: 'select',
            field_placeholder: 'Empresa',
            field_label: 'Empresa',
            field_id: 'user_company',
            field_name: 'user_company',
            customClass:'col-md-4',
            field_is_multi:true,
            field_is_required:true,
            // field_validation:` data-parsley-min="4" `,
            field_options: app_fields_data.companies,
            field_value:""
          },
          {
            field_type: 'select',
            field_label: 'Vehiculos',
            field_placeholder: 'Vehiculos',
            field_id: 'user_vehicles',
            field_name: 'user_vehicles',
            field_is_multi:true,
            customClass:'col-md-2',
            field_options: [],
            field_value:""
          },
          {
            field_type: 'select',
            field_label: 'Grupo',
            field_placeholder: 'Grupo',
            field_id: 'user_groups',
            field_name: 'user_groups',
            field_is_multi:true,
            customClass:'col-md-2',
            field_options: [],
            field_value:""
          },
          {
              field_type: 'select',
              field_label: 'Estado',
              field_placeholder: 'Estado',
              field_id: 'user_status',
              field_name: 'user_status',
              customClass:'col-md-2',
              field_is_required:true,
              field_options: [{value:1,text:'Activo'},{value:0,text:'Inactivo'}],
              field_value:""
          },
      ];
  }
    // State Saving Datatable
  var dataTable= $('#dtUsers').DataTable({
        'processing': true,
        'serverSide': true,
        'serverMethod': 'get',
        //'searching': false, // Remove default Search Control
        'ajax': {
          'url': URLAPI+'/users/list/',
          'data': function (data) {

          }
        },
        "language":SetdataTableLanguage,
        "aaSorting": [],
        'columns': [
          { data: 'stt' },
        //   { data: 'image' },
          { data: 'user_id_reg' },
          { data: 'user_email' },
          { data: 'user_first_name' },
          { data: 'user_last_name' },
          { data: 'user_company' },
          // { data: 'user_groups' },
          { data: 'user_profile' },
          { data: 'user_status' },
          { data: 'date_created' },
          { data: 'opt' },
        ],
        "columnDefs": [{
          "targets": 0,
          "orderable": false
        },
        {
          "targets": 1,
          "orderable": false
        }
       ],
        "rowCallback": function (row, data, iDisplayIndex) {
          var info = dataTable.page.info();
          var page = info.page;
          var length = info.length;
          var index = (page * length + (iDisplayIndex + 1));
          $('td:eq(0)', row).html(index);
          $('td:eq(9)', row).html(` <a href="javascript:void(0);" class="me-3 text-primary btn-open-record" data-bs-container="#tooltip-container3" data-bs-toggle="tooltip" data-bs-placement="top" title="Editar" data-id="${data.user_id_reg}"><i class="mdi mdi-pencil font-size-18"></i></a>
          <a href="javascript:void(0);" class="me-3 text-primary btn-update-password" data-bs-container="#tooltip-container3" data-bs-toggle="tooltip" data-bs-placement="top" title="Actualizar Contrasena" data-id="${data.id}"><i class="fas fa-bahai font-size-18"></i></a>
          <a href="javascript:void(0);" class="text-danger" data-bs-container="#tooltip-container3" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"><i class="mdi mdi-trash-can font-size-18"></i></a>`);
        }

        // stateSave: true,
        // "language": {
        //     "paginate": {
        //         "previous": "<i class='mdi mdi-chevron-left'>",
        //         "next": "<i class='mdi mdi-chevron-right'>"
        //     }
        // },
        // "drawCallback": function () {
        //     $('.dataTables_paginate > .pagination').addClass('pagination-rounded');
        //     $(".dataTables_length select").addClass('form-select form-select-sm'); 
        // }
  });
  let openNewFormModal=function(){
    const formUserInput = new groupFieldUsers();

    builFormInput(formUserInput.formfieldUser).then(function(uidUserLogin){
      $("#users-general").html(uidUserLogin);
      buildFormValidation();
      appRenderSelect2('#form-add-user #user_groups');
      appRenderSelect2('#form-add-user #user_vehicles');
      appRenderSelect2('#form-add-user #user_company');
      formFieldsAddValidation= $('#form-add-user').parsley();
      $('#modalCreateUser').modal('show');
    });
  }
  
  $(document).on('click','.open-form-new-modal',function(){ openNewFormModal(); });
  $(document).on('submit','#form-add-user',function(e){
    e.preventDefault(); //=== To Avoid Page Refresh and Fire the Event "Click"===
    if ( $(this).parsley().isValid() ) {
        submitCreateUser();
    }
  });
  
  $(document).on('submit','#form-edit-user',function(e){
    e.preventDefault(); //=== To Avoid Page Refresh and Fire the Event "Click"===
    if ( $(this).parsley().isValid() ) {
      submitUpdateForm();
    }
  });

  var formSubmitPOST=function(formData){
    var settings = {
        "url": '/user/create',
        "method": "POST",
        "timeout": 0,
        "headers": { "Content-Type": "application/json" },
        "data": JSON.stringify(formData),
        };
    
    $.ajax(settings).done(function (response) {
        if (response) {
          if(response.status =='ok'){
            dataTable.ajax.reload(null, false); 
            $("#modalCreateUser").modal('hide');
            $('#form-add-user')[0].reset();
            toastr["success"](`Se ha agregado un nuevo registro satisfactoriamente!`);
          }else if(response.status =='found'){
            toastr["warning"](`Nombre Usuario [Email]: ya existe un usuario con el mismo email.`);
          }else{
            toastr["error"](`Error: comunicacion con el servidor!`);
          }
        }
    });
  }
  var submitCreateUser=function(){
    let data =getFormData('form-add-user');
    let userGroups=$('#form-add-user #user_groups').select2("val"); data.user_groups=userGroups.toString();
    let userVehicles=$('#form-add-user #user_vehicles').select2("val"); data.user_vehicles=userVehicles.toString();
    let userCompanies=$('#form-add-user #user_company').select2("val"); data.user_company=userCompanies.toString();
    // let userGroups=$('#form-edit-user #user_groups').select2("val"); data.user_groups=userGroups.toString();
    // let userVehicles=$('#form-edit-user #user_vehicles').select2("val"); data.user_vehicles=userVehicles.toString();

    let userPassword =$("#form-add-user #user_password").val();
    if( data.user_profile==1 || data.user_profile==20){data.user_groups='all';}
    let userPasswordCheck=FormAppHelper.isOkPass(userPassword);
    if( userPasswordCheck.result ==false){
      toastr["error"](`Error: ${userPasswordCheck.error}`);
      return false;
    }
    Swal.fire({
        title: "¿Estas seguro?",
        text: "Si deseas aplicar los cambios, presione [Si, continuar]!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, continuar",
        cancelButtonText: "Cancelar!",
        confirmButtonClass: "btn btn-success mt-2",
        cancelButtonClass: "btn btn-danger ml-2 mt-2",
    }).then((result) => {
        if (result.value) {
          formSubmitPOST(data);
        } 
    });
  }
  var fillGroupOptions=function(company_id,form_select,optionSelected){
    return new Promise(function(resolve, reject){
      var settings = {
        "url": '/app-group',
        "method": "POST",
        "timeout": 0,
        "headers": { "Content-Type": "application/json" },
        "data": JSON.stringify({ "company_id": company_id }),
      };

      $.ajax(settings).done(function (response) {
          if (response.data) {
            // $(form_select).select2('destroy'); 
            $(form_select).empty();
            $(form_select).append($('<option>', {value:'', text:'---'}));
            response.data.forEach((thisSection,index,array) => {
              $(form_select).append($('<option>', {value:thisSection.value, text:thisSection.text}));
              if (index === array.length - 1) { 
                $(form_select).select2();
                if( optionSelected != 0){ 
                  let strOptionsGroups = optionSelected.split(',');
                  $(form_select).select2().val(strOptionsGroups).trigger('change');
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
  var formFillWithData=function(thisFormData){
    formFieldEdit = new groupFieldUsers();
    formFieldEdit.formfieldUser.splice(2,1);
    builFormInput(formFieldEdit.formfieldUser,thisFormData).then(function(uidVehicle){
      $("#edit-users-general").html(uidVehicle);
      $("#form-edit-user #user_email").prop('disabled', true);
      FormAppHelper.fillGroupOptions(thisFormData.user_company,"#form-edit-user #user_groups",thisFormData.user_groups).then(function(uidGroups){
        FormAppHelper.fillVehicleCIAOptions(thisFormData.user_company,"#form-edit-user #user_vehicles",thisFormData.user_vehicles).then(function(uiUNits){
            formFieldsEditValidation= $('#form-edit-user').parsley();
            appRenderSelect2('#form-edit-user #user_company');
            let strOptionsGroups = thisFormData.user_company.split(',');
            $('#form-edit-user #user_company').select2().val(strOptionsGroups).trigger('change');
            $('#modalEditUser').modal('show');
        });
      });
    });
    
  }
  var formOpenRecord=function(recordID){
    var settings = {
        "url": '/user',
        "method": "POST",
        "timeout": 0,
        "headers": { "Content-Type": "application/json" },
        "data": JSON.stringify({ "record_id": recordID }),
        };
    
    $.ajax(settings).done(function (response) {
        if (response) {
          formFieldDataEdit=response.data;
          formFillWithData(response.data);
        }
    });
  }

  var formSubmitUpdatePOST=function(formData){
    var settings = {
        "url": '/user/update',
        "method": "POST",
        "timeout": 0,
        "headers": { "Content-Type": "application/json" },
        "data": JSON.stringify(formData),
        };
    
    $.ajax(settings).done(function (response) {
        if (response) {
            dataTable.ajax.reload(null, false); 
            $("#modalEditUser").modal('hide');
        }
    });
  }
  
  var formSubmitUpdatePASSWORD=function(formData){
    var settings = {
        "url": URLAPI+'/user/updatepassword',
        "method": "POST",
        "timeout": 0,
        "headers": { "Content-Type": "application/json" },
        "data": JSON.stringify(formData),
        };
    
    $.ajax(settings).done(function (response) {
        if (response) {
            dataTable.ajax.reload(null, false); 
            // $("#modalEditUser").modal('hide');
        }
    });
  }
  var submitUpdateForm=function(){
    let data =getFormData('form-edit-user');
    let userCompanies=$('#form-edit-user #user_company').select2("val"); data.user_company=userCompanies.toString();
    let userGroups=$('#form-edit-user #user_groups').select2("val"); data.user_groups=userGroups.toString();
    let userVehicles=$('#form-edit-user #user_vehicles').select2("val"); data.user_vehicles=userVehicles.toString();
    if( data.user_profile==1 || data.user_profile==20){data.user_groups='all';}
    // console.log('data -->', userCompanies);
    // console.log('data -->', data.user_company);
    // return false;
    Swal.fire({
        title: "¿Estas seguro?",
        text: "Si deseas aplicar los cambios, presione [Si, continuar]!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, continuar",
        cancelButtonText: "Cancelar!",
        confirmButtonClass: "btn btn-success mt-2",
        cancelButtonClass: "btn btn-danger ml-2 mt-2",
    }).then((result) => {
        if (result.value) {
          formSubmitUpdatePOST(data);
        } 
    });
  }
  var submitNewPassword= async function(recordID){
    const { value: password } = await Swal.fire({
      title: 'Actualizar Contraseña',
      input: 'password',
      inputLabel: 'Contraseña',
      inputPlaceholder: 'Nueva contraseña',
      showCancelButton: true,
      inputAttributes: {
        maxlength: 10,
        autocapitalize: 'off',
        autocorrect: 'off'
      }
    })
    
    if (password) {
      var formData={user_id:recordID,user_new_password:password,user_updated:8};
      formSubmitUpdatePASSWORD(formData);
      // Swal.fire(`Entered password: ${password}`)
    }
  }
  $(document).on('click','.btn-open-record',function(){
    let getRecordId= $(this).attr('data-id');
    formOpenRecord(getRecordId);
  });
  
  $(document).on('click','.btn-update-password',function(){
    let getRecordId= $(this).attr('data-id');
    submitNewPassword(getRecordId);
  });

  $(document).on('change','#form-edit-user  #user_company',function(){
    let getInputType = $(this).select2("val"); //.val();
    FormAppHelper.fillGroupOptions(getInputType.toString(),"#form-edit-user  #user_groups",formFieldDataEdit.user_groups).then(function(uid){
      FormAppHelper.fillVehicleCIAOptions(getInputType.toString(),"#form-edit-user  #user_vehicles",formFieldDataEdit.user_groups).then(function(uidUnits){
    
      });
    });
  });
  
  $(document).on('change','#form-add-user  #user_company',function(){
    let getInputType = $(this).select2("val");
    FormAppHelper.fillGroupOptions(getInputType.toString(),"#form-add-user  #user_groups",0).then(function(uid){
      FormAppHelper.fillVehicleCIAOptions(getInputType.toString(),"#form-add-user  #user_vehicles",0).then(function(uidUnits){
      });
    });
  });

} );