 /*
  * 설정
  */

 module.exports = {

     server_port: 3000,

     db_url: 'mongodb://localhost:27017/local',

     db_schemas: [{
             file: './user_account_schema',
             collection: 'users_accounts',
             specified_collection_name: 'users_accounts',
             schemaName: 'user_account_schema',
             modelName: 'user_account_model'
         },
         {
             file: './user_withdrawal_reason_schema',
             collection: 'withdrawal_reasons',
             specified_collection_name: 'withdrawal_reasons',
             schemaName: 'user_withdrawal_reason_schema',
             modelName: 'user_withdrawal_reason_model'
         }
     ],

     route_info: [{
             method_file_path: '../routes/route_files/current_password_confirm_changepwd_post',
             path: '/current_password_confirm_changepwd',
             type: 'post'
         },
         {
             method_file_path: '../routes/route_files/current_password_confirm_withdrawal_post',
             path: '/current_password_confirm_withdrawal',
             type: 'post'
         },
         {
             method_file_path: '../routes/route_files/modify_password_post',
             path: '/modify_password',
             type: 'post'
         },
         {
             method_file_path: '../routes/route_files/withdrawal_post',
             path: '/withdrawal',
             type: 'post'
         },
         {
             method_file_path: '../routes/route_files/create_room_get',
             path: '/create_room',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/current_password_confirm_changepwd_get',
             path: '/current_password_confirm_changepwd',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/current_password_confirm_withdrawal_get',
             path: '/current_password_confirm_withdrawal',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/find_account_get',
             path: '/find_account',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/home_get',
             path: '/',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/logout_get',
             path: '/logout',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/my_profile_get',
             path: '/my_profile',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/room_list_get',
             path: '/room_list',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/selection_get',
             path: '/selection',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/signin_failed_authentication_get',
             path: '/signin_failed_authentication',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/signup_success_get',
             path: '/signup_success',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/signup1_cellphone_authentication_get',
             path: '/signup1_cellphone_authentication',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/signup2_account_creation_get',
             path: '/signup2_account_creation',
             type: 'get'
         },
         {
             method_file_path: '../routes/route_files/withdrawal_reason_get',
             path: '/withdrawal_reason',
             type: 'get'
         }

     ],

     jsonrpc_api_path: '/api'
 }